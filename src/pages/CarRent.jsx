import { useState } from 'react';
import '../styles/theme.css';
import './carrent.css';

const CarRent = ({ car, onBack }) => {
  const [days, setDays] = useState(1);
  const [formData, setFormData] = useState({ firstName:'', lastName:'', email:'', phone:'', license:'', licenseExpiry:'', pickupDate:'', pickupTime:'' });
  const [submitted, setSubmitted] = useState(false);

  const total = car ? car.price * days : 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    alert('Booking Confirmed!');
  };

  return (
    <div className="cr-page">
      <nav className="cr-nav">
        <div className="cr-nav-logo">
          <div className="cr-logo-icon"><div className="cr-shield"></div></div>
          <div>
            <div className="cr-brand">LUXE DRIVE</div>
            <div className="cr-sub">Premium Rentals</div>
          </div>
        </div>
        <button className="cr-back-btn" onClick={onBack}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
          Back
        </button>
      </nav>

      <form className="cr-wrap" onSubmit={handleSubmit}>
        {/* LEFT FORM */}
        <div className="cr-form-col">
          <div className="cr-section">
            <div className="cr-section-title">Personal Information</div>
            <div className="cr-row">
              <div className="cr-group">
                <label>First Name *</label>
                <input className="input" required value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})} />
              </div>
              <div className="cr-group">
                <label>Last Name *</label>
                <input className="input" required value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})} />
              </div>
            </div>
            <div className="cr-row">
              <div className="cr-group">
                <label>Email *</label>
                <input className="input" type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
              </div>
              <div className="cr-group">
                <label>Phone *</label>
                <input className="input" required value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
              </div>
            </div>
            <div className="cr-row">
              <div className="cr-group">
                <label>Driving License Number *</label>
                <input className="input" required value={formData.license} onChange={e => setFormData({...formData, license: e.target.value})} />
              </div>
              <div className="cr-group">
                <label>License Expiry Date</label>
                <input className="input" type="date" value={formData.licenseExpiry} onChange={e => setFormData({...formData, licenseExpiry: e.target.value})} />
              </div>
            </div>
          </div>

          <div className="cr-section">
            <div className="cr-section-title">Rental Details</div>
            <div className="cr-row">
              <div className="cr-group">
                <label>Pickup Date *</label>
                <input className="input" type="date" required value={formData.pickupDate} onChange={e => setFormData({...formData, pickupDate: e.target.value})} />
              </div>
              <div className="cr-group">
                <label>Pickup Time</label>
                <select className="input" value={formData.pickupTime} onChange={e => setFormData({...formData, pickupTime: e.target.value})}>
                  <option value="">Select time...</option>
                  {['09:00 AM','10:00 AM','11:00 AM','12:00 PM','02:00 PM','04:00 PM'].map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
            </div>
            <div className="cr-row">
              <div className="cr-group">
                <label>Number of Days</label>
                <input className="input" type="number" min="1" value={days} onChange={e => setDays(Number(e.target.value))} />
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SUMMARY */}
        <div className="cr-summary-col">
          <div className="cr-summary-card">
            <img className="cr-summary-img" src={car?.img} alt={car?.brand} />
            <div className="cr-summary-body">
              <div className="cr-summary-name">{car?.brand} {car?.model}</div>
              <div className="cr-summary-type">{car?.type}</div>
              <div className="cr-summary-line"><span>Price / Day</span><span>₹{car?.price?.toLocaleString()}</span></div>
              <div className="cr-summary-line"><span>Days</span><span>{days}</span></div>
              <div className="cr-summary-total"><span>Total</span><span>₹{total.toLocaleString()}</span></div>
            </div>
            <div className="cr-confirm-wrap">
              <button type="submit" className="cr-btn-confirm">Confirm Booking →</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CarRent;
