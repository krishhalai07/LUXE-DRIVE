import React from 'react';
import './layout.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col">
            <div className="footer-logo">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path d="M16 2L4 8V14C4 21 8 27 16 30C24 27 28 21 28 14V8L16 2Z" fill="url(#gold-gradient-footer)" stroke="url(#gold-gradient-footer)" strokeWidth="1.5"/>
                <path d="M16 10L12 14H20L16 10Z" fill="#000" opacity="0.3"/>
                <path d="M12 16L16 20L20 16H12Z" fill="#000" opacity="0.3"/>
                <defs>
                  <linearGradient id="gold-gradient-footer" x1="4" y1="2" x2="28" y2="30" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#f4e4c1"/>
                    <stop offset="0.5" stopColor="#d4af37"/>
                    <stop offset="1" stopColor="#b8941f"/>
                  </linearGradient>
                </defs>
              </svg>
              <h3>LUXE DRIVE</h3>
            </div>
            <p>Experience premium car rentals with exceptional service and quality vehicles.</p>
          </div>
          <div className="footer-col">
            <h4>Quick Links</h4>
            <a href="/">Home</a>
            <a href="/fleet">Our Fleet</a>
            <a href="/pricing">Pricing</a>
            <a href="/about">About Us</a>
          </div>
          <div className="footer-col">
            <h4>Support</h4>
            <a href="/faq">FAQ</a>
            <a href="/terms">Terms</a>
            <a href="/privacy">Privacy</a>
            <a href="/help">Help</a>
          </div>
          <div className="footer-col">
            <h4>Contact</h4>
            <p>info@luxedrive.com</p>
            <p>+91 (555) 123-4567</p>
            <p>24/7 Support</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 LUXE DRIVE. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
