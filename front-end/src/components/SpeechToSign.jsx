import React, { useState } from "react";
import axios from "axios";

const SignToSpeech = () => {
  const [status, setStatus] = useState("Not Recording");
  const [videoUrl, setVideoUrl] = useState("");

  const startRecording = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:5000/start_recording");
      if (response.data.status === "recording started") {
        setStatus("Recording...");
      } else {
        alert("Recording already in progress.");
      }
    } catch (error) {
      console.error("Start recording error:", error);
      alert("Failed to start recording.");
    }
  };

  const stopRecording = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:5000/stop_recording");
      if (response.data.status === "recording stopped") {
        setStatus("Recording Stopped");
      } else {
        alert("Recording not in progress.");
      }
    } catch (error) {
      console.error("Stop recording error:", error);
      alert("Failed to stop recording.");
    }
  };

  const convertToSignLanguage = async () => {
    setStatus("Converting...");
    try {
      const response = await axios.post("http://127.0.0.1:5000/perform_conversion");
      console.log("Backend Response:", response.data);
      if (response.data.status === "success") {
        setStatus("Conversion Completed");
        const newVideoUrl = response.data.video_url + "?cache=" + new Date().getTime();
        setVideoUrl(newVideoUrl);
      } else {
        setStatus("Conversion Failed");
        alert("Conversion failed: " + (response.data.message || "Unknown error"));
      }
    } catch (error) {
      console.error("Conversion error:", error);
      setStatus("Conversion Failed");
      alert("Failed to convert speech.");
    }
  };

  const getStatusColor = () => {
    if (status === "Recording...") return "#4caf50";
    if (status === "Converting...") return "#4a90e2";
    if (status === "Conversion Completed") return "#4caf50";
    if (status === "Conversion Failed") return "#e74c3c";
    return "#888";
  };

  const handleMouseEnter = (e) => {
    e.currentTarget.style.transform = "scale(1.03)";
    e.currentTarget.style.borderColor = "#4a90e2";
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.transform = "scale(1)";
    e.currentTarget.style.borderColor = "#ccc";
  };

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      flex: 1,
      padding: "50px 20px",
      backgroundColor: "#f0f0f0",
      fontFamily: "Poppins, Arial, sans-serif",
      minHeight: "80vh",
      overflow: "auto",
    },
    title: {
      fontSize: "36px",
      fontWeight: "600",
      color: "#333",
      marginBottom: "8px",
    },
    subtitle: {
      fontSize: "15px",
      color: "#888",
      marginBottom: "20px",
    },
    statusBadge: {
      display: "inline-block",
      padding: "6px 18px",
      borderRadius: "20px",
      backgroundColor: "#ffffff",
      border: "2px solid #ccc",
      fontSize: "14px",
      fontWeight: "600",
      color: getStatusColor(),
      marginBottom: "36px",
    },
    boxesWrapper: {
      display: "flex",
      gap: "24px",
      flexWrap: "wrap",
      justifyContent: "center",
    },
    bigBox: {
      width: "220px",
      height: "220px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#ffffff",
      border: "2px solid #ccc",
      borderRadius: "12px",
      cursor: "pointer",
      transition: "transform 0.2s, border-color 0.2s",
    },
    smallBox: {
      width: "80px",
      height: "80px",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "32px",
      backgroundColor: "#4a90e2",
      color: "#ffffff",
      marginBottom: "14px",
    },
    boxTitle: {
      fontSize: "15px",
      fontWeight: "600",
      color: "#333",
      margin: 0,
      textAlign: "center",
    },
    videoSection: {
      marginTop: "40px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "14px",
    },
    videoTitle: {
      fontSize: "20px",
      fontWeight: "600",
      color: "#333",
      margin: 0,
    },
    video: {
      borderRadius: "12px",
      border: "2px solid #ccc",
      maxWidth: "100%",
      width: "600px",
    },
  };

  return (
    <div style={styles.container}>

      <h1 style={styles.title}>Speech To Sign</h1>
      <p style={styles.subtitle}>Record your speech and convert it to sign language</p>

      {/* Status Badge */}
      <div style={styles.statusBadge}>● {status}</div>

      {/* Action Boxes */}
      <div style={styles.boxesWrapper}>

        <div
          style={styles.bigBox}
          onClick={startRecording}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div style={styles.smallBox}>🎤</div>
          <h2 style={styles.boxTitle}>Start Recording</h2>
        </div>

        <div
          style={styles.bigBox}
          onClick={stopRecording}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div style={styles.smallBox}>🛑</div>
          <h2 style={styles.boxTitle}>Stop Recording</h2>
        </div>

        <div
          style={styles.bigBox}
          onClick={convertToSignLanguage}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div style={styles.smallBox}>💬</div>
          <h2 style={styles.boxTitle}>Convert to Sign Language</h2>
        </div>

      </div>

      {/* Video Output */}
      {videoUrl && (
        <div style={styles.videoSection}>
          <h2 style={styles.videoTitle}>Generated Sign Video</h2>
          <video
            key={videoUrl}
            controls
            style={styles.video}
          >
            <source src={videoUrl} type="video/mp4" />
          </video>
        </div>
      )}

    </div>
  );
};

export default SignToSpeech;