import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignToSpeech = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState("Idle");
  const [transcript, setTranscript] = useState("");

  const handleAlnum = async () => {
    setStatus("Processing...");
    setTranscript("");
    try {
      const response = await axios.post("http://127.0.0.1:5000/sign_to_speech/alnum");
      if (response.data.status === "success") {
        setStatus("Conversion Completed");
        setTranscript(response.data.transcript || "");
      } else {
        setStatus("Conversion Failed");
        alert("Conversion failed: " + (response.data.message || "Unknown error"));
      }
    } catch (error) {
      console.error("Alnum error:", error);
      setStatus("Conversion Failed");
      alert("Failed to process alphanumeric signs.");
    }
  };

  const handleAction = async () => {
    setStatus("Processing...");
    setTranscript("");
    try {
      const response = await axios.post("http://127.0.0.1:5000/sign_to_speech/action");
      if (response.data.status === "success") {
        setStatus("Conversion Completed");
        setTranscript(response.data.transcript || "");
      } else {
        setStatus("Conversion Failed");
        alert("Conversion failed: " + (response.data.message || "Unknown error"));
      }
    } catch (error) {
      console.error("Action error:", error);
      setStatus("Conversion Failed");
      alert("Failed to process action signs.");
    }
  };

  const getStatusColor = () => {
    if (status === "Processing...") return "#4a90e2";
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
    boxSubtitle: {
      fontSize: "12px",
      color: "#aaa",
      marginTop: "6px",
      textAlign: "center",
    },
    outputSection: {
      marginTop: "40px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "14px",
      width: "100%",
      maxWidth: "600px",
    },
    outputTitle: {
      fontSize: "20px",
      fontWeight: "600",
      color: "#333",
      margin: 0,
    },
    transcriptBox: {
      width: "100%",
      backgroundColor: "#ffffff",
      border: "2px solid #ccc",
      borderRadius: "12px",
      padding: "20px 24px",
      fontSize: "18px",
      fontWeight: "500",
      color: "#333",
      textAlign: "center",
      lineHeight: "1.6",
      minHeight: "80px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Sign to Speech</h1>
      <p style={styles.subtitle}>Detect signs from camera and convert to speech</p>

      <div style={styles.statusBadge}>● {status}</div>

      <div style={styles.boxesWrapper}>

        <div
          style={styles.bigBox}
          onClick={handleAlnum}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div style={styles.smallBox}>🔤</div>
          <h2 style={styles.boxTitle}>Alnum</h2>
          <p style={styles.boxSubtitle}>Letters & numbers</p>
        </div>

        <div
          style={styles.bigBox}
          onClick={handleAction}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div style={styles.smallBox}>🤝</div>
          <h2 style={styles.boxTitle}>Action</h2>
          <p style={styles.boxSubtitle}>Word & phrase signs</p>
        </div>

      </div>

      {transcript && (
        <div style={styles.outputSection}>
          <h2 style={styles.outputTitle}>Detected Speech</h2>
          <div style={styles.transcriptBox}>
            {transcript}
          </div>
        </div>
      )}
    </div>
  );
};

export default SignToSpeech;