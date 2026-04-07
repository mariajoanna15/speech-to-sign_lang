import React, { useState } from 'react';

const ContactUs = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.message) return;
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 800));
    console.log('Form submitted:', formData);
    setIsSubmitting(false);
    setSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
    setTimeout(() => setSubmitted(false), 4000);
  };

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '60px 20px',
      fontFamily: 'Poppins, Arial, sans-serif',
      backgroundColor: '#f0f0f0',
      minHeight: 'auto',  // ✅ fix
    },
    title: {
      fontSize: '36px',
      fontWeight: '600',
      color: '#333',
      marginBottom: '8px',
    },
    subtitle: {
      fontSize: '15px',
      color: '#888',
      marginBottom: '40px',
      textAlign: 'center',
      maxWidth: '460px',
    },
    card: {
      backgroundColor: '#ffffff',
      borderRadius: '12px',
      border: '2px solid #ccc',
      padding: '36px 40px',
      width: '100%',
      maxWidth: '500px',
      marginBottom: '24px',
      boxSizing: 'border-box',
    },
    label: {
      display: 'block',
      fontSize: '13px',
      fontWeight: '600',
      color: '#555',
      marginBottom: '6px',
      textAlign: 'left',
    },
    input: {
      width: '100%',
      padding: '10px 14px',
      marginBottom: '20px',
      borderRadius: '8px',
      border: '1.5px solid #ddd',
      fontSize: '14px',
      outline: 'none',
      boxSizing: 'border-box',
      fontFamily: 'Poppins, Arial, sans-serif',
      backgroundColor: '#fafafa',
      color: '#333',
      transition: 'border-color 0.2s',
    },
    textarea: {
      width: '100%',
      padding: '10px 14px',
      marginBottom: '24px',
      borderRadius: '8px',
      border: '1.5px solid #ddd',
      fontSize: '14px',
      outline: 'none',
      boxSizing: 'border-box',
      fontFamily: 'Poppins, Arial, sans-serif',
      backgroundColor: '#fafafa',
      color: '#333',
      resize: 'vertical',
      minHeight: '120px',
      transition: 'border-color 0.2s',
    },
    button: {
      width: '100%',
      padding: '12px',
      backgroundColor: isSubmitting ? '#888' : '#333',
      color: '#fff',
      border: 'none',
      borderRadius: '8px',
      fontSize: '15px',
      fontWeight: '600',
      cursor: isSubmitting ? 'not-allowed' : 'pointer',
      fontFamily: 'Poppins, Arial, sans-serif',
      transition: 'background-color 0.2s, transform 0.1s',
    },
    successMsg: {
      color: '#4caf50',
      fontWeight: '600',
      fontSize: '14px',
      marginTop: '14px',
      textAlign: 'center',
    },
    infoCard: {
      backgroundColor: '#ffffff',
      borderRadius: '12px',
      border: '2px solid #ccc',
      padding: '24px 40px',
      width: '100%',
      maxWidth: '500px',
      textAlign: 'left',
      boxSizing: 'border-box',
    },
    infoTitle: {
      fontSize: '15px',
      fontWeight: '600',
      color: '#333',
      marginBottom: '16px',
      marginTop: 0,
    },
    infoRow: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      fontSize: '14px',
      color: '#555',
      marginBottom: '10px',
    },
    iconCircle: {
      width: '34px',
      height: '34px',
      borderRadius: '50%',
      backgroundColor: '#4a90e2',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '16px',
      flexShrink: 0,
    },
  };

  const handleMouseEnter = (e) => {
    if (!isSubmitting) e.currentTarget.style.backgroundColor = '#444';
  };
  const handleMouseLeave = (e) => {
    if (!isSubmitting) e.currentTarget.style.backgroundColor = '#333';
  };
  const handleMouseDown = (e) => {
    if (!isSubmitting) e.currentTarget.style.transform = 'scale(0.98)';
  };
  const handleMouseUp = (e) => {
    e.currentTarget.style.transform = 'scale(1)';
  };

  const handleFocus = (e) => { e.target.style.borderColor = '#4a90e2'; };
  const handleBlur = (e) => { e.target.style.borderColor = '#ddd'; };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Contact Us</h1>
      <p style={styles.subtitle}>
        Have a question about our Sign Language Translator? We'd love to hear from you.
      </p>

      {/* Contact Form */}
      <div style={styles.card}>
        <label style={styles.label}>Name</label>
        <input
          style={styles.input}
          type="text"
          name="name"
          placeholder="Your name"
          value={formData.name}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />

        <label style={styles.label}>Email</label>
        <input
          style={styles.input}
          type="email"
          name="email"
          placeholder="your@email.com"
          value={formData.email}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />

        <label style={styles.label}>Message</label>
        <textarea
          style={styles.textarea}
          name="message"
          placeholder="Write your message here..."
          value={formData.message}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />

        <button
          style={styles.button}
          onClick={handleSubmit}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>

        {submitted && (
          <p style={styles.successMsg}>✅ Message sent successfully!</p>
        )}
      </div>

      {/* Contact Info */}
      <div style={styles.infoCard}>
        <p style={styles.infoTitle}>Get in Touch</p>
        <div style={styles.infoRow}>
          <div style={styles.iconCircle}>📧</div>
          <span>support@signtranslator.com</span>
        </div>
        <div style={styles.infoRow}>
          <div style={styles.iconCircle}>📞</div>
          <span>+91 98765 43210</span>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;