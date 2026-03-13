import React, { useState } from 'react';
import './profile.css';

const ProfilePage = ({ user, onLogout, profilePic, setProfilePic }) => {
  const [activeTab, setActiveTab] = useState('personal');
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    address: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Profile updated successfully!');
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
        alert('Profile picture updated!');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePicture = () => {
    setProfilePic(null);
    alert('Profile picture removed!');
  };

  return (
    <div className="profile-page">
      <div className="container">
        <h1 className="page-title">My Profile</h1>
        
        <div className="profile-grid">
          <div className="profile-card">
            <div className="profile-avatar-section">
              <div className="profile-avatar-wrapper">
                {profilePic ? (
                  <img src={profilePic} alt="Profile" className="profile-avatar-large" style={{ objectFit: 'cover' }} />
                ) : (
                  <div className="profile-avatar-large">{user?.email?.charAt(0).toUpperCase()}</div>
                )}
                <label className="avatar-upload-btn" title="Change Picture">
                  <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                    <circle cx="12" cy="13" r="4"></circle>
                  </svg>
                </label>
              </div>
              {profilePic && (
                <button className="btn btn-secondary" style={{ marginTop: 16, padding: '8px 16px', fontSize: 14 }} onClick={handleRemovePicture}>
                  Remove Picture
                </button>
              )}
              <h2>{user?.name || 'User'}</h2>
              <p className="profile-email">{user?.email}</p>
              <span className="profile-badge">Premium Member</span>
            </div>
          </div>

          <div style={{ gridColumn: 'span 1' }}>
            <div className="profile-tabs">
              <button className={`profile-tab ${activeTab === 'personal' ? 'active' : ''}`} onClick={() => setActiveTab('personal')}>
                Personal Details
              </button>
              <button className={`profile-tab ${activeTab === 'password' ? 'active' : ''}`} onClick={() => setActiveTab('password')}>
                Password
              </button>
              <button className={`profile-tab ${activeTab === 'stats' ? 'active' : ''}`} onClick={() => setActiveTab('stats')}>
                Statistics
              </button>
              <button className={`profile-tab ${activeTab === 'actions' ? 'active' : ''}`} onClick={() => setActiveTab('actions')}>
                Account Actions
              </button>
            </div>

            {activeTab === 'personal' && (
              <div className="profile-card">
                <h3>Personal Information</h3>
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label>Full Name</label>
                    <input
                      className="input"
                      value={profileData.name}
                      onChange={e => setProfileData({...profileData, name: e.target.value})}
                      placeholder="Enter your name"
                    />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      className="input"
                      type="email"
                      value={profileData.email}
                      readOnly
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone</label>
                    <input
                      className="input"
                      value={profileData.phone}
                      onChange={e => setProfileData({...profileData, phone: e.target.value})}
                      placeholder="+91 XXXXX XXXXX"
                    />
                  </div>
                  <div className="form-group">
                    <label>Address</label>
                    <textarea
                      className="input"
                      rows="3"
                      value={profileData.address}
                      onChange={e => setProfileData({...profileData, address: e.target.value})}
                      placeholder="Enter your address"
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">Save Changes</button>
                </form>
              </div>
            )}

            {activeTab === 'password' && (
              <div className="profile-card">
                <h3>Change Password</h3>
                <form>
                  <div className="form-group">
                    <label>Current Password</label>
                    <input className="input" type="password" />
                  </div>
                  <div className="form-group">
                    <label>New Password</label>
                    <input className="input" type="password" />
                  </div>
                  <div className="form-group">
                    <label>Confirm Password</label>
                    <input className="input" type="password" />
                  </div>
                  <button type="submit" className="btn btn-primary">Update Password</button>
                </form>
              </div>
            )}

            {activeTab === 'stats' && (
              <div className="profile-card">
                <h3>Account Statistics</h3>
                <div className="stats-list">
                  <div className="stat-item">
                    <span className="stat-label">Total Bookings</span>
                    <span className="stat-value">0</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Active Rentals</span>
                    <span className="stat-value">0</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Total Spent</span>
                    <span className="stat-value">₹0</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Member Since</span>
                    <span className="stat-value">2024</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'actions' && (
              <div className="profile-card danger-zone">
                <h3>Account Actions</h3>
                <div className="action-buttons">
                  <button className="btn btn-secondary" style={{ width: '100%', marginBottom: 12 }}>Download My Data</button>
                  <button className="btn btn-primary" style={{ width: '100%' }} onClick={onLogout}>Logout</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
