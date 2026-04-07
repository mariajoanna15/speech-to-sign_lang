import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(isLogin ? 'Login:' : 'Signup:', formData);
    setSubmitted(true);
    setTimeout(() => {
      navigate('/');
    }, 1500);
  };

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
      minHeight: '80vh',
    },
    card: {
      backgroundColor: '#ffffff',
      borderRadius: '12px',
      border: '2px solid #ccc',
      padding: '40px',
      width: '100%',
      maxWidth: '420px',
    },
    toggle: {
      display: 'flex',
      marginBottom: '30px',
      borderRadius: '8px',
      overflow: 'hidden',
      border: '2px solid #ccc',
    },
    toggleBtn: (active) => ({
      flex: 1,
      padding: '10px',
      border: 'none',
      cursor: 'pointer',
      fontSize: '15px',
      fontFamily: 'Poppins, Arial, sans-serif',
      fontWeight: '600',
      backgroundColor: active ? '#4a90e2' : '#ffffff',
      color: active ? '#ffffff' : '#888',
      transition: 'background-color 0.2s, color 0.2s',
    }),
    title: {
      fontSize: '24px',
      fontWeight: '600',
      color: '#333',
      marginBottom: '6px',
      textAlign: 'center',
    },
    subtitle: {
      fontSize: '14px',
      color: '#888',
      marginBottom: '24px',
      textAlign: 'center',
    },
    label: {
      display: 'block',
      fontSize: '14px',
      color: '#555',
      marginBottom: '6px',
      textAlign: 'left',
    },
    input: {
      width: '100%',
      padding: '10px 14px',
      marginBottom: '18px',
      borderRadius: '8px',
      border: '1px solid #ccc',
      fontSize: '15px',
      outline: 'none',
      boxSizing: 'border-box',
      fontFamily: 'inherit',
      backgroundColor: '#fafafa',
    },
    button: {
      width: '100%',
      padding: '12px',
      backgroundColor: '#4a90e2',
      color: '#fff',
      border: 'none',
      borderRadius: '8px',
      fontSize: '16px',
      cursor: 'pointer',
      fontFamily: 'inherit',
      fontWeight: '600',
      marginTop: '6px',
    },
    successMsg: {
      color: '#4caf50',
      fontWeight: '600',
      marginTop: '14px',
      textAlign: 'center',
    },
    switchText: {
      marginTop: '20px',
      fontSize: '14px',
      color: '#888',
      textAlign: 'center',
    },
    switchLink: {
      color: '#4a90e2',
      cursor: 'pointer',
      fontWeight: '600',
      textDecoration: 'none',
    },
  };

  return (
    <div style={styles.container}>

      <div style={styles.card}>

        {/* Toggle */}
        <div style={styles.toggle}>
          <button
            style={styles.toggleBtn(isLogin)}
            onClick={() => { setIsLogin(true); setSubmitted(false); }}
          >
            Login
          </button>
          <button
            style={styles.toggleBtn(!isLogin)}
            onClick={() => { setIsLogin(false); setSubmitted(false); }}
          >
            Sign Up
          </button>
        </div>

        {/* Title */}
        <h2 style={styles.title}>{isLogin ? 'Welcome back 👋' : 'Create an account'}</h2>
        <p style={styles.subtitle}>
          {isLogin ? 'Login to use the Sign Language Translator' : 'Sign up to get started'}
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit}>

          {!isLogin && (
            <>
              <label style={styles.label}>Name</label>
              <input
                style={styles.input}
                type="text"
                name="name"
                placeholder="Your name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </>
          )}

          <label style={styles.label}>Email</label>
          <input
            style={styles.input}
            type="email"
            name="email"
            placeholder="your@email.com"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label style={styles.label}>Password</label>
          <input
            style={styles.input}
            type="password"
            name="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button style={styles.button} type="submit">
            {isLogin ? 'Login' : 'Create Account'}
          </button>

          {submitted && (
            <p style={styles.successMsg}>
              {isLogin ? '✅ Logged in! Redirecting...' : '✅ Account created! Redirecting...'}
            </p>
          )}

        </form>

        {/* Switch */}
        <p style={styles.switchText}>
          {isLogin ? "Don't have an account? " : 'Already have an account? '}
          <span
            style={styles.switchLink}
            onClick={() => { setIsLogin(!isLogin); setSubmitted(false); }}
          >
            {isLogin ? 'Sign Up' : 'Login'}
          </span>
        </p>

      </div>

    </div>
  );
};

export default Signup;