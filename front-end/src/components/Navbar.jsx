import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import logo from '../assets/logo.webp';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <nav style={styles.navbar}>

        {/* LEFT SIDE */}
        <div style={styles.navLeft}>
          <div style={styles.logoContainer}>
            <img src={logo} alt="Logo" style={styles.logo} />
          </div>
          <h1 style={styles.navTitle}>Voice Bridge</h1>
        </div>

        {/* RIGHT SIDE — desktop */}
        <ul style={styles.navLinks}>
          <li>
            <Link
              to="/"
              style={{
                ...styles.navLink,
                color: isActive('/') ? '#4a90e2' : '#555',
                borderBottom: isActive('/') ? '2px solid #4a90e2' : '2px solid transparent',
              }}
            >
              Home
            </Link>
          </li>
          <li><Link to="/aboutus" style={{...styles.navLink,
            color: isActive('/aboutus') ? '#4a90e2' : '#555',
                borderBottom: isActive('/aboutus') ? '2px solid #4a90e2' : '2px solid transparent',
              }}
              >
              About Us
            </Link>
          </li>
          <li>
            <Link
              to="/contactus"
              style={{
                ...styles.navLink,
                color: isActive('/contactus') ? '#4a90e2' : '#555',
                borderBottom: isActive('/contactus') ? '2px solid #4a90e2' : '2px solid transparent',
              }}
            >
              Contact Us
            </Link>
          </li>
          <li>
            <button
              style={styles.loginBtn}
              onMouseEnter={e => e.currentTarget.style.borderColor = '#4a90e2'}
              onMouseLeave={e => e.currentTarget.style.borderColor = '#ccc'}
              onClick={() => navigate('/signup')}
            >
              Login
            </button>
          </li>
        </ul>

        {/* HAMBURGER — mobile only */}
        <button
          style={styles.hamburger}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span style={{ ...styles.bar, transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }} />
          <span style={{ ...styles.bar, opacity: menuOpen ? 0 : 1 }} />
          <span style={{ ...styles.bar, transform: menuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none' }} />
        </button>

      </nav>

      {/* MOBILE DROPDOWN */}
      {menuOpen && (
        <div style={styles.mobileMenu}>
          <Link
            to="/"
            style={{ ...styles.mobileLink, color: isActive('/') ? '#4a90e2' : '#333' }}
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/contactus"
            style={{ ...styles.mobileLink, color: isActive('/contactus') ? '#4a90e2' : '#333' }}
            onClick={() => setMenuOpen(false)}
          >
            Contact Us
          </Link>
          <button
            style={styles.mobilLoginBtn}
            onClick={() => { navigate('/signup'); setMenuOpen(false); }}
          >
            Login
          </button>
        </div>
      )}
    </>
  );
};

const styles = {
  navbar: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    height: '70px',
    padding: '0 50px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    borderBottom: '2px solid #ccc',
    fontFamily: 'Poppins, Arial, sans-serif',
    zIndex: 1000,
  },
  navLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  logoContainer: {
    width: '42px',
    height: '42px',
    borderRadius: '50%',
    overflow: 'hidden',
    border: '2px solid #ccc',
  },
  logo: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  navTitle: {
    fontSize: '20px',
    fontWeight: '600',
    color: '#333',
    margin: 0,
  },
  navLinks: {
    display: 'flex',
    alignItems: 'center',
    gap: '30px',
    listStyle: 'none',
    margin: 0,
    padding: 0,
    // Hide on mobile via CSS — handled by a style tag injected below
  },
  navLink: {
    color: '#555',
    textDecoration: 'none',
    fontSize: '15px',
    fontWeight: '500',
    paddingBottom: '2px',
    transition: 'color 0.2s, border-color 0.2s',
  },
  loginBtn: {
    padding: '8px 20px',
    backgroundColor: '#ffffff',
    color: '#333',
    border: '2px solid #ccc',
    borderRadius: '8px',
    fontSize: '15px',
    fontWeight: '600',
    cursor: 'pointer',
    fontFamily: 'Poppins, Arial, sans-serif',
    transition: 'border-color 0.2s',
  },
  hamburger: {
    display: 'none',
    flexDirection: 'column',
    gap: '5px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '4px',
  },
  bar: {
    display: 'block',
    width: '24px',
    height: '2px',
    backgroundColor: '#333',
    borderRadius: '2px',
    transition: 'transform 0.25s, opacity 0.25s',
  },
  mobileMenu: {
    position: 'fixed',
    top: '70px',
    left: 0,
    right: 0,
    backgroundColor: '#ffffff',
    borderBottom: '2px solid #ccc',
    display: 'flex',
    flexDirection: 'column',
    padding: '16px 28px 20px',
    gap: '16px',
    zIndex: 999,
    fontFamily: 'Poppins, Arial, sans-serif',
  },
  mobileLink: {
    fontSize: '16px',
    fontWeight: '500',
    textDecoration: 'none',
    color: '#333',
  },
  mobilLoginBtn: {
    padding: '10px 20px',
    backgroundColor: '#ffffff',
    color: '#333',
    border: '2px solid #ccc',
    borderRadius: '8px',
    fontSize: '15px',
    fontWeight: '600',
    cursor: 'pointer',
    fontFamily: 'Poppins, Arial, sans-serif',
    alignSelf: 'flex-start',
    transition: 'border-color 0.2s',
  },
};

// Inject responsive CSS for hamburger / desktop toggle
const styleTag = document.createElement('style');
styleTag.innerHTML = `
  @media (max-width: 640px) {
    nav ul { display: none !important; }
    button[aria-label="Toggle menu"] { display: flex !important; }
  }
`;
document.head.appendChild(styleTag);

export default Navbar;