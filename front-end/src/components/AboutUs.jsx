import React from 'react';

const AboutUs = () => {
  const steps = [
    {
      icon: '🎤',
      title: 'Speak or Sign',
      description: 'Use your microphone to speak, or your camera to perform sign language gestures.',
    },
    {
      icon: '⚙️',
      title: 'AI Processing',
      description: 'Our backend processes your input using machine learning models in real time.',
    },
    {
      icon: '🤟',
      title: 'Translation',
      description: 'Speech is converted to sign language video, or signs are converted to speech output.',
    },
    {
      icon: '✅',
      title: 'Result',
      description: 'View the generated sign language video or hear the speech output instantly.',
    },
  ];

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      flex: 1,
      padding: '50px 20px',
      backgroundColor: '#f0f0f0',
      fontFamily: 'Poppins, Arial, sans-serif',
      minHeight: '80vh',
    },

    // HERO SECTION
    hero: {
      backgroundColor: '#ffffff',
      border: '2px solid #ccc',
      borderRadius: '12px',
      padding: '40px',
      maxWidth: '700px',
      width: '100%',
      textAlign: 'center',
      marginBottom: '40px',
    },
    badge: {
      display: 'inline-block',
      padding: '4px 14px',
      backgroundColor: '#eaf2ff',
      color: '#4a90e2',
      borderRadius: '20px',
      fontSize: '13px',
      fontWeight: '600',
      marginBottom: '16px',
    },
    heroTitle: {
      fontSize: '32px',
      fontWeight: '600',
      color: '#333',
      marginBottom: '14px',
    },
    heroText: {
      fontSize: '15px',
      color: '#666',
      lineHeight: '1.8',
      margin: 0,
    },

    // HOW IT WORKS
    sectionTitle: {
      fontSize: '22px',
      fontWeight: '600',
      color: '#333',
      marginBottom: '24px',
      textAlign: 'center',
    },
    stepsWrapper: {
      display: 'flex',
      gap: '20px',
      flexWrap: 'wrap',
      justifyContent: 'center',
      maxWidth: '900px',
      width: '100%',
    },
    stepCard: {
      backgroundColor: '#ffffff',
      border: '2px solid #ccc',
      borderRadius: '12px',
      padding: '28px 24px',
      width: '190px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      gap: '12px',
    },
    stepIcon: {
      width: '64px',
      height: '64px',
      borderRadius: '50%',
      backgroundColor: '#4a90e2',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '26px',
    },
    stepNumber: {
      fontSize: '11px',
      fontWeight: '600',
      color: '#4a90e2',
      letterSpacing: '1px',
      margin: 0,
    },
    stepTitle: {
      fontSize: '15px',
      fontWeight: '600',
      color: '#333',
      margin: 0,
    },
    stepDesc: {
      fontSize: '13px',
      color: '#888',
      lineHeight: '1.6',
      margin: 0,
    },
  };

  return (
    <div style={styles.container}>

      {/* HERO */}
      <div style={styles.hero}>
        <span style={styles.badge}>🤟 Final Year Project</span>
        <h1 style={styles.heroTitle}>About Voice Bridge</h1>
        <p style={styles.heroText}>
          Voice Bridge is a two-way sign language translation platform designed to break
          communication barriers between the hearing and non-hearing communities.
          It converts speech to sign language videos and interprets sign language gestures
          back into speech — making communication seamless and accessible for everyone.
        </p>
      </div>

      {/* HOW IT WORKS */}
      <h2 style={styles.sectionTitle}>How It Works</h2>
      <div style={styles.stepsWrapper}>
        {steps.map((step, index) => (
          <div key={index} style={styles.stepCard}>
            <div style={styles.stepIcon}>{step.icon}</div>
            <p style={styles.stepNumber}>STEP {index + 1}</p>
            <h3 style={styles.stepTitle}>{step.title}</h3>
            <p style={styles.stepDesc}>{step.description}</p>
          </div>
        ))}
      </div>

    </div>
  );
};

export default AboutUs;