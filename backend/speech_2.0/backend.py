from flask import Flask, jsonify, send_from_directory
from flask_cors import CORS
import os
import numpy as np
from scipy.io.wavfile import write
import sounddevice as sd
import threading
import queue
import time
import whisper
from PIL import Image, ImageSequence
import imageio
import string
import cv2   # ✅ NEW

app = Flask(__name__)
CORS(app)

# ---------------- CONFIG ----------------
fs = 16000
channels = 1
volume_factor = 2.0
blocksize = 2048
signs_folder = "signs"
fps = 10

print("Loading Whisper model...")
model = whisper.load_model("medium")
print("Whisper model loaded!")

# ----------------------------------------

audio_queue = queue.Queue()
recording = False

recording_thread = None
writer_thread = None

last_audio_file = None


# ---------------- AUDIO CALLBACK ----------------
def audio_callback(indata, frames, time_, status):
    if status:
        print(status)
    audio_queue.put(indata.copy())


# ---------------- AUDIO WRITER ----------------
def audio_writer(audio_filename):

    all_data = []

    while True:
        block = audio_queue.get()

        if block is None:
            break

        block *= volume_factor
        block = np.clip(block, -1.0, 1.0)
        all_data.append(block)

    if all_data:
        all_data = np.concatenate(all_data, axis=0)

        write(
            audio_filename,
            fs,
            (all_data * np.iinfo(np.int16).max).astype(np.int16),
        )

        print("Audio saved:", audio_filename)


# ---------------- RECORDING THREAD ----------------
def record_audio():

    global writer_thread
    global last_audio_file
    global recording

    audio_filename = f"audio_{int(time.time()*1000)}.wav"

    writer_thread = threading.Thread(
        target=audio_writer,
        args=(audio_filename,),
    )

    writer_thread.start()

    with sd.InputStream(
        samplerate=fs,
        channels=1,
        dtype='float32',
        callback=audio_callback,
        blocksize=blocksize,
    ):
        while recording:
            time.sleep(0.1)

    audio_queue.put(None)
    writer_thread.join()

    last_audio_file = audio_filename

    print("Recording finished:", audio_filename)


# ---------------- START RECORDING ----------------
@app.route("/start_recording", methods=["POST"])
def start_recording():

    global recording
    global recording_thread

    if recording:
        return jsonify({"status": "already recording"})

    recording = True

    recording_thread = threading.Thread(target=record_audio)
    recording_thread.start()

    return jsonify({"status": "recording started"})


# ---------------- STOP RECORDING ----------------
@app.route("/stop_recording", methods=["POST"])
def stop_recording():

    global recording
    global recording_thread

    if not recording:
        return jsonify({"status": "not recording"})

    recording = False
    recording_thread.join()

    time.sleep(0.5)  # ✅ ensure file is written

    return jsonify({
        "status": "recording stopped",
        "audio_file": last_audio_file
    })


# ---------------- LOAD SIGN (MP4 + GIF) ----------------
def load_sign_from_local(filename):

    path = os.path.join(signs_folder, filename)

    if not os.path.exists(path):
        return None

    try:
        if filename.endswith(".gif"):
            return ("gif", Image.open(path))

        elif filename.endswith(".mp4"):
            return ("mp4", path)

    except Exception as e:
        print("Load error:", e)

    return None


# ---------------- TEXT TO SIGNS ----------------
def text_to_signs(text):

    signs = []

    for word in text.split():

        mp4_name = f"{word}.mp4"
        gif_name = f"{word}.gif"

        sign = load_sign_from_local(mp4_name)

        if not sign:
            sign = load_sign_from_local(gif_name)

        if sign:
            signs.append(sign)
        else:
            print("No sign for:", word)

    return signs


# ---------------- VIDEO CREATION ----------------
def create_mp4_video(signs, video_filename):

    frames = []
    max_width = 0
    max_height = 0

    for sign_type, data in signs:

        # ---- GIF ----
        if sign_type == "gif":

            for frame in ImageSequence.Iterator(data):

                frame_np = np.array(frame.convert("RGB"))
                frames.append(frame_np)

                max_width = max(max_width, frame_np.shape[1])
                max_height = max(max_height, frame_np.shape[0])

        # ---- MP4 ----
        elif sign_type == "mp4":

            cap = cv2.VideoCapture(data)

            while cap.isOpened():
                ret, frame = cap.read()
                if not ret:
                    break

                frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
                frames.append(frame)

                max_height = max(max_height, frame.shape[0])
                max_width = max(max_width, frame.shape[1])

            cap.release()

    # ---- Resize frames ----
    resized_frames = []

    for frame in frames:

        canvas = np.zeros((max_height, max_width, 3), dtype=np.uint8)
        canvas[: frame.shape[0], : frame.shape[1]] = frame

        resized_frames.append(canvas)

    # ---- Write video ----
    if resized_frames:

        with imageio.get_writer(video_filename, fps=fps, format='FFMPEG') as writer:
            for frame in resized_frames:
                writer.append_data(frame)

        print("Video saved:", video_filename)
        return True

    return False


# ---------------- CONVERSION ----------------
@app.route("/perform_conversion", methods=["POST"])
def perform_conversion():

    global last_audio_file

    try:

        if not last_audio_file:
            return jsonify({"status": "error", "message": "Record audio first"})

        print("Transcribing:", last_audio_file)

        result = model.transcribe(last_audio_file)

        text = result["text"].lower().strip()
        text = text.translate(str.maketrans("", "", string.punctuation))

        print("Recognized:", text)

        signs = text_to_signs(text)

        if not signs:
            return jsonify({
                "status": "error",
                "message": f"No sign found for '{text}'"
            })

        video_filename = f"video_{int(time.time()*1000)}.mp4"

        create_mp4_video(signs, video_filename)

        return jsonify({
            "status": "success",
            "video_url": f"http://127.0.0.1:5000/video/{video_filename}",
        })

    except Exception as e:
        print("ERROR:", e)
        return jsonify({"status": "error", "message": str(e)})


# ---------------- VIDEO ROUTE ----------------
@app.route("/video/<filename>")
def serve_video(filename):
    return send_from_directory(".", filename)


# ---------------- RUN ----------------
if __name__ == "__main__":
    app.run(debug=True)