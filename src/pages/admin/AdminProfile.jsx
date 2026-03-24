import React, { useState } from 'react';

const getStrength = (p) => {
  if (!p) return { w: '0%', color: '#333', label: '' };
  if (p.length < 6)  return { w: '25%', color: '#ef4444', label: 'Weak' };
  if (p.length < 10) return { w: '55%', color: '#fbbf24', label: 'Medium' };
  return { w: '100%', color: '#22c55e', label: 'Strong' };
};

const AdminProfile = ({ user }) => {
  const [profile, setProfile] = useState({ name: 'Admin', email: user?.email || '' });
  const [pass, setPass] = useState({ current: '', newPass: '', confirm: '' });
  const strength = getStrength(pass.newPass);

  return (
    <>
      <div className="page-header">
        <div><h1>Profile</h1><p>Manage your account</p></div>
      </div>

      <div className="profile-banner">
        <div className="profile-avatar-lg">{profile.name.charAt(0)}</div>
        <div>
          <h2>{profile.name}</h2>
          <p>{profile.email}</p>
          <p style={{ color: '#d4af37', fontSize: 12, marginTop: 4 }}>Administrator</p>
        </div>
      </div>

      <div className="settings-grid">
        {/* Profile Form */}
        <div className="settings-card">
          <h3>Profile Settings</h3>
          <div className="form-group" style={{ marginBottom: 16 }}>
            <label>Full Name</label>
            <input className="form-input" value={profile.name} onChange={e => setProfile({ ...profile, name: e.target.value })} />
          </div>
          <div className="form-group" style={{ marginBottom: 20 }}>
            <label>Email Address</label>
            <input className="form-input" value={profile.email} onChange={e => setProfile({ ...profile, email: e.target.value })} />
          </div>
          <button className="btn btn-gold" onClick={() => alert('Profile saved!')}>Save Changes</button>
        </div>

        {/* Password Form */}
        <div className="settings-card">
          <h3>Change Password</h3>
          <div className="form-group" style={{ marginBottom: 16 }}>
            <label>Current Password</label>
            <input className="form-input" type="password" value={pass.current} onChange={e => setPass({ ...pass, current: e.target.value })} />
          </div>
          <div className="form-group" style={{ marginBottom: 8 }}>
            <label>New Password</label>
            <input className="form-input" type="password" value={pass.newPass} onChange={e => setPass({ ...pass, newPass: e.target.value })} />
            <div className="strength-bar">
              <div className="strength-fill" style={{ width: strength.w, background: strength.color }} />
            </div>
            {strength.label && <span style={{ fontSize: 11, color: strength.color }}>{strength.label}</span>}
          </div>
          <div className="form-group" style={{ marginBottom: 20 }}>
            <label>Confirm Password</label>
            <input className="form-input" type="password" value={pass.confirm} onChange={e => setPass({ ...pass, confirm: e.target.value })} />
          </div>
          <button className="btn btn-gold" onClick={() => {
            if (pass.newPass !== pass.confirm) return alert('Passwords do not match!');
            alert('Password updated!');
            setPass({ current: '', newPass: '', confirm: '' });
          }}>Update Password</button>
        </div>
      </div>
    </>
  );
};

export default AdminProfile;
