import React from 'react';
import './Footer.css';
import logo from '../../assets/logo.png';
import { FaTwitter, FaInstagram, FaYoutube, FaGithub } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        {/* Left section: Logo and description */}
        <div className="footer-brand">
          <img src={logo} alt="NepSOL Logo" className="footer-logo" />
          <h2>NepSOL</h2>
          <br />
          <div className="social-icons">
            <FaTwitter />
            <FaInstagram />
            <FaYoutube />
            <FaGithub href="https://github.com/xetri/NepSOL" />
          </div>
        </div>

        {/* Right section: Links */}
        <div className="footer-links">
          <p>
            Empowering creators to build sustainable careers through community support and innovative monetization tools.
          </p>
        </div>
        {/* <div className="footer-links">
          <div>
            <h4>For Creators</h4>
            <ul>
              <li>Getting Started</li>
              <li>Creator Tools</li>
              <li>Success Stories</li>
              <li>Best Practices</li>
            </ul>
          </div>
          <div>
            <h4>For Supporters</h4>
            <ul>
              <li>How to Support</li>
              <li>Discover Creators</li>
              <li>Community Guidelines</li>
              <li>Safety & Security</li>
            </ul>
          </div>
          <div>
            <h4>Company</h4>
            <ul>
              <li>About Us</li>
              <li>Careers</li>
              <li>Press</li>
              <li>Contact</li>
            </ul>
          </div>
        </div> */}
      </div>

      {/* Bottom bar */}
      <div className="footer-bottom">
        <p>© 2025 NepSOL. All rights reserved.</p>
        <div className="footer-policy">
          <span>Privacy Policy</span>
          <span>Terms of Service</span>
          <span>Cookie Policy</span>
        </div>
      </div>
    </footer>
  );
}
