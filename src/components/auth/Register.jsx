import React, { useState } from 'react';
import './auth.css';

const Register = ({ onRegister, onSwitchToLogin }) => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [validated, setValidated] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }
    const role = formData.email === 'admin@admin.com' ? 'admin' : 'user';
    onRegister({ ...formData, role });
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Create Account</h2>
        <p className="auth-subtitle">Join us today</p>
        <form onSubmit={handleSubmit} className={validated ? 'was-validated' : ''} noValidate>
          <div className="form-group">
            <label>Full Name</label>
            <input 
              className="input" 
              type="text" 
              required 
              minLength="3"
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
            />
            <div className="invalid-feedback" style={{ color: '#ef4444', fontSize: 12, marginTop: 4 }}>Name must be at least 3 characters.</div>
          </div>
          <div className="form-group">
            <label>Email</label>
            <input 
              className="input" 
              type="email" 
              required 
              value={formData.email}
              onChange={e => setFormData({...formData, email: e.target.value})}
            />
            <div className="invalid-feedback" style={{ color: '#ef4444', fontSize: 12, marginTop: 4 }}>Please enter a valid email address.</div>
          </div>
          <div className="form-group">
            <label>Password</label>
            <input 
              className="input" 
              type="password" 
              required 
              minLength="6"
              value={formData.password}
              onChange={e => setFormData({...formData, password: e.target.value})}
            />
            <div className="invalid-feedback" style={{ color: '#ef4444', fontSize: 12, marginTop: 4 }}>Password must be at least 6 characters.</div>
          </div>
          <button type="submit" className="btn btn-primary auth-btn">Sign Up</button>
        </form>
        <p className="auth-footer">
          Already have an account? 
          <span className="auth-link" onClick={onSwitchToLogin}> Sign In</span>
        </p>
      </div>
    </div>
  );
};

export default Register;
