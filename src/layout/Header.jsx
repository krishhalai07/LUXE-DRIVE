import React from 'react';
import './layout.css';

const Header = ({ user, onLogout, onNavigate, profilePic }) => {
  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <div className="logo-icon">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path d="M16 2L4 8V14C4 21 8 27 16 30C24 27 28 21 28 14V8L16 2Z" fill="url(#gold-gradient)" stroke="url(#gold-gradient)" strokeWidth="1.5"/>
                <path d="M16 10L12 14H20L16 10Z" fill="#000" opacity="0.3"/>
                <path d="M12 16L16 20L20 16H12Z" fill="#000" opacity="0.3"/>
                <defs>
                  <linearGradient id="gold-gradient" x1="4" y1="2" x2="28" y2="30" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#f4e4c1"/>
                    <stop offset="0.5" stopColor="#d4af37"/>
                    <stop offset="1" stopColor="#b8941f"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div className="logo-text">
              <h1>LUXE DRIVE</h1>
              <span>Premium Rentals</span>
            </div>
          </div>
          <nav className="nav">
            {user?.role === 'admin' && <span className="nav-link" onClick={() => onNavigate('admin')}>Dashboard</span>}
          </nav>
          <div className="header-actions">
            {user && (
              <>
                <span className="nav-link" onClick={() => onNavigate('home')} style={{ cursor: 'pointer' }}>Home</span>
                <span className="nav-link" onClick={() => onNavigate('cars')} style={{ cursor: 'pointer' }}>Cars</span>
                <div className="profile-icon" onClick={() => onNavigate('profile')} title="Profile">
                  {profilePic ? (
                    <img src={profilePic} alt="Profile" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
                  ) : (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
