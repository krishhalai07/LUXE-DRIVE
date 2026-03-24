import React from 'react';

const AdminHome = ({ bookings, onUpdateStatus }) => {
  const stats = [
    { label: 'Total Bookings', value: bookings.length, color: '#d4af37', icon: '📋' },
    { label: 'Pending',        value: bookings.filter(b => b.status === 'pending').length,   color: '#fbbf24', icon: '⏳' },
    { label: 'Confirmed',      value: bookings.filter(b => b.status === 'confirmed').length, color: '#22c55e', icon: '✓' },
    { label: 'Revenue',        value: `₹${bookings.reduce((s, b) => s + b.total, 0)}`,       color: '#818cf8', icon: '💰' },
  ];

  return (
    <>
      <div className="page-header">
        <div>
          <h1>Dashboard</h1>
          <p>Welcome back, Admin</p>
        </div>
      </div>

      <div className="stats-grid">
        {stats.map(s => (
          <div className="stat-card" key={s.label}>
            <div className="stat-icon" style={{ background: `${s.color}18` }}>
              <span style={{ fontSize: 22 }}>{s.icon}</span>
            </div>
            <div>
              <div className="stat-label">{s.label}</div>
              <div className="stat-value">{s.value}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="table-card">
        <div className="table-card-header">
          <h2>Recent Bookings</h2>
        </div>
        {bookings.length === 0 ? (
          <div className="empty-state"><p>No bookings yet</p></div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Customer</th>
                <th>Vehicle</th>
                <th>Days</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.slice(0, 8).map(b => (
                <tr key={b.id}>
                  <td>
                    <div className="cell-avatar">
                      <div className="avatar-sm">{b.name.charAt(0)}</div>
                      <div>
                        <div className="cell-name">{b.name}</div>
                        <div className="cell-sub">{b.email}</div>
                      </div>
                    </div>
                  </td>
                  <td>{b.car.brand} {b.car.model}</td>
                  <td>{b.days} days</td>
                  <td style={{ color: '#d4af37', fontWeight: 700 }}>₹{b.total}</td>
                  <td><span className={`badge badge-${b.status}`}>{b.status}</span></td>
                  <td>
                    {b.status === 'pending' ? (
                      <div className="action-btns">
                        <button className="btn-icon btn-view" onClick={() => onUpdateStatus(b.id, 'confirmed')} title="Confirm">✓</button>
                        <button className="btn-icon btn-delete" onClick={() => onUpdateStatus(b.id, 'rejected')} title="Reject">✕</button>
                      </div>
                    ) : (
                      <span className="cell-sub">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default AdminHome;
