import React from 'react';

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.content}>


        <p style={styles.text}>
          📧{' '}
          <a href="mailto:sneka@gmail.com" style={styles.link}>sneka@gmail.com</a>
          {' · '}
          <a href="mailto:mariajoanna@gmail.com" style={styles.link}>mariajoanna@gmail.com</a>
        </p>

        <p style={styles.copy}>© 2026 Sign Language Translator.</p>

      </div>
    </footer>
  );
};

const styles = {
  footer: {
    width: '100%',
    backgroundColor: '#ffffff',
    borderTop: '2px solid #ccc',
    padding: '24px 20px',
    fontFamily: 'Poppins, Arial, sans-serif',
    textAlign: 'center',
  },
  content: {
    maxWidth: '600px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px',
  },
  brand: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#333',
    margin: 0,
  },
  text: {
    fontSize: '14px',
    color: '#555',
    margin: 0,
  },
  link: {
    color: '#4a90e2',       // 🔴 your existing accent color
    textDecoration: 'none',
    fontWeight: '500',
  },
  copy: {
    fontSize: '12px',
    color: '#aaa',
    margin: 0,
  },
};

export default Footer;