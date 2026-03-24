import React from 'react';

const AdminBookings = ({ bookings, onUpdateStatus }) => (
  <>
    <div className="page-header">
      <div>
        <h1>Bookings</h1>
        <p>Manage all customer bookings</p>
      </div>
    </div>

    <div className="table-card">
      <div className="table-card-header">
        <h2>All Bookings ({bookings.length})</h2>
      </div>
      {bookings.length === 0 ? (
        <div className="empty-state"><p>No bookings found</p></div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Customer</th>
              <th>Vehicle</th>
              <th>Pickup</th>
              <th>Return</th>
              <th>Days</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b, i) => (
              <tr key={b.id}>
                <td style={{ color: '#555' }}>{i + 1}</td>
                <td>
                  <div className="cell-avatar">
                    <div className="avatar-sm">{b.name.charAt(0)}</div>
                    <div>
                      <div className="cell-name">{b.name}</div>
                      <div className="cell-sub">{b.email}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="cell-name">{b.car.brand} {b.car.model}</div>
                  <div className="cell-sub">{b.car.type}</div>
                </td>
                <td>{b.pickup || '—'}</td>
                <td>{b.returnDate || '—'}</td>
                <td>{b.days}</td>
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

export default AdminBookings;
