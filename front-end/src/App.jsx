import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import Signup from './components/Signup';
import AboutUs from './components/AboutUs';
import ContactUs from './components/ContactUs';
import SpeechToSign from './components/SpeechToSign';
import SignToSpeech from './components/SignToSpeech';
import Alnum from './components/Alnum';
import Action from './components/Action';

const App = () => {
  return (
    <Router>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}>

        <Navbar />

        <div style={{ flex: 1, paddingTop: '70px' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/contactus" element={<ContactUs />} />
            <Route path="/speech-to-sign" element={<SpeechToSign />} />
            <Route path="/sign-to-speech" element={<SignToSpeech />} />
            <Route path="/alnum" element={<Alnum />} />
            <Route path="/action" element={<Action />} />
          </Routes>
        </div>

        <Footer />

      </div>
    </Router>
  );
};

export default App;