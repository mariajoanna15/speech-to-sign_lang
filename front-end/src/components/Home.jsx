import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const styles = {
 container: {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  flex: 1,
  padding: '60px 20px',
  backgroundColor: '#f0f0f0',
  fontFamily: 'Poppins, Arial, sans-serif',
  minHeight: 'calc(100vh - 70px)', // ✅ add this — 70px = navbar height
},
    title: {
      fontSize: '40px',
      color: '#333',
      marginBottom: '8px',
      fontWeight: '600',
    },
    subtitle: {
      fontSize: '16px',
      color: '#888',
      marginBottom: '50px',
    },
    boxesWrapper: {
      display: 'flex',
      gap: '30px',
      flexWrap: 'wrap',
      justifyContent: 'center',
    },
    bigBox: {
      width: '280px',
      height: '280px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#ffffff',
      border: '2px solid #ccc',
      borderRadius: '12px',
      cursor: 'pointer',
      transition: 'transform 0.2s, border-color 0.2s',
    },
    smallBox: {
      width: '90px',
      height: '90px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '36px',
      backgroundColor: '#4a90e2',   // accent color
      color: '#ffffff',
      marginBottom: '18px',
    },
    boxTitle: {
      fontSize: '18px',
      fontWeight: '600',
      color: '#333',
      margin: 0,
    },
  };

  const handleMouseEnter = (e) => {
    e.currentTarget.style.transform = 'scale(1.03)';
    e.currentTarget.style.borderColor = '#4a90e2';
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.transform = 'scale(1)';
    e.currentTarget.style.borderColor = '#ccc';
  };

  return (
    <div style={styles.container}>

      <h1 style={styles.title}>Sign Language Translator</h1>
      <p style={styles.subtitle}>Choose a mode to get started</p>

      <div style={styles.boxesWrapper}>

        <div
          style={styles.bigBox}
          onClick={() => navigate('/speech-to-sign')}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div style={styles.smallBox}>🎤</div>
          <h2 style={styles.boxTitle}>Speech To Sign</h2>
        </div>

        <div
          style={styles.bigBox}
          onClick={() => navigate('/sign-to-speech')}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div style={styles.smallBox}>👤</div>
          <h2 style={styles.boxTitle}>Sign To Speech</h2>
        </div>

      </div>

    </div>
  );
};

export default Home;