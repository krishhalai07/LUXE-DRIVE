import React from 'react';

export default function AdminDashboard({cars, bookings, onUpdateStatus}){
  const totalCars = cars.length;
  const activeBookings = bookings.filter(b=>b.status==='confirmed').length;
  const pending = bookings.filter(b=>b.status==='pending');
  const totalRevenue = bookings.filter(b=>b.status==='confirmed').reduce((s,b)=>s + Number(b.amount),0);

  return (
    <div className="admin">
      <h2>Admin Dashboard</h2>
      <div className="metrics">
        <div className="metric">
          <h3>{totalCars}</h3>
          <div className="small">Total Cars</div>
        </div>
        <div className="metric">
          <h3>{activeBookings}</h3>
          <div className="small">Active Bookings</div>
        </div>
        <div className="metric">
          <h3>₹{totalRevenue}</h3>
          <div className="small">Total Revenue</div>
        </div>
      </div>

      <div className="booking-list">
        <h4 style={{marginTop:12}}>Pending Payments</h4>
        {pending.length === 0 && <div className="small">No pending payments</div>}
        {pending.map(b => (
          <div key={b.id} className="booking-row">
            <div>
              <strong>{b.carName}</strong>
              <div className="small">{b.name} • {b.upi}</div>
            </div>
            <div style={{display:'flex',gap:8,alignItems:'center'}}>
              <div className="small">₹{b.amount}</div>
              <button className="btn confirm" onClick={()=>onUpdateStatus(b.id,'confirmed')}>Confirm</button>
              <button className="btn reject" onClick={()=>onUpdateStatus(b.id,'rejected')}>Reject</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
