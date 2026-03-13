import React, { useState } from 'react';

const PaymentModal = ({ car, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', days: 1 });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...formData, car, total: car.price * formData.days, id: Date.now(), status: 'pending' });
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Book {car.brand} {car.model}</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body">
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', marginBottom: 8, color: 'var(--text-secondary)' }}>Name</label>
              <input className="input" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
            </div>
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', marginBottom: 8, color: 'var(--text-secondary)' }}>Email</label>
              <input className="input" type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
            </div>
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', marginBottom: 8, color: 'var(--text-secondary)' }}>Phone</label>
              <input className="input" required value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
            </div>
            <div style={{ marginBottom: 24 }}>
              <label style={{ display: 'block', marginBottom: 8, color: 'var(--text-secondary)' }}>Days</label>
              <input className="input" type="number" min="1" required value={formData.days} onChange={e => setFormData({...formData, days: parseInt(e.target.value)})} />
            </div>
            <div style={{ padding: 16, background: 'rgba(212, 175, 55, 0.1)', borderRadius: 8, marginBottom: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span>Price per day</span>
                <span>₹{car.price}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 20, fontWeight: 700 }}>
                <span>Total</span>
                <span style={{ background: 'linear-gradient(135deg, var(--primary), var(--accent))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>₹{car.price * formData.days}</span>
              </div>
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Confirm Booking</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
