import React, { useState } from 'react';

const AdminCustomers = ({ bookings }) => {
  const [search, setSearch] = useState('');
  const [viewCustomer, setViewCustomer] = useState(null);

  // Deduplicate by email
  const customers = bookings.reduce((acc, b) => {
    if (!acc.find(c => c.email === b.email)) {
      acc.push({
        name: b.name,
        email: b.email,
        phone: b.phone || '—',
        bookings: bookings.filter(x => x.email === b.email),
      });
    }
    return acc;
  }, []).filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className="page-header">
        <div>
          <h1>Customers</h1>
          <p>All registered customers</p>
        </div>
        <div className="search-bar">
          <svg width="14" height="14" fill="none" stroke="#555" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
          </svg>
          <input placeholder="Search customers..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
      </div>

      <div className="table-card">
        <div className="table-card-header">
          <h2>Customers ({customers.length})</h2>
        </div>
        {customers.length === 0 ? (
          <div className="empty-state"><p>No customers found</p></div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Customer</th>
                <th>Phone</th>
                <th>Bookings</th>
                <th>Total Spent</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((c, i) => (
                <tr key={c.email}>
                  <td style={{ color: '#555' }}>{i + 1}</td>
                  <td>
                    <div className="cell-avatar">
                      <div className="avatar-sm">{c.name.charAt(0)}</div>
                      <div>
                        <div className="cell-name">{c.name}</div>
                        <div className="cell-sub">{c.email}</div>
                      </div>
                    </div>
                  </td>
                  <td>{c.phone}</td>
                  <td>{c.bookings.length}</td>
                  <td style={{ color: '#d4af37', fontWeight: 700 }}>
                    ₹{c.bookings.reduce((s, b) => s + b.total, 0)}
                  </td>
                  <td>
                    <button className="btn-icon btn-view" onClick={() => setViewCustomer(c)} title="View">👁</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {viewCustomer && (
        <div className="modal-backdrop" onClick={() => setViewCustomer(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Customer Details</h2>
              <button className="btn-icon btn-delete" onClick={() => setViewCustomer(null)}>✕</button>
            </div>
            <div className="modal-body">
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
                <div className="avatar-sm" style={{ width: 56, height: 56, fontSize: 22 }}>{viewCustomer.name.charAt(0)}</div>
                <div>
                  <div className="cell-name" style={{ fontSize: 18 }}>{viewCustomer.name}</div>
                  <div className="cell-sub">{viewCustomer.email}</div>
                </div>
              </div>
              {[['Phone', viewCustomer.phone],
                ['Total Bookings', viewCustomer.bookings.length],
                ['Total Spent', `₹${viewCustomer.bookings.reduce((s, b) => s + b.total, 0)}`]
              ].map(([k, v]) => (
                <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #1a1a1a' }}>
                  <span style={{ color: '#666', fontSize: 13 }}>{k}</span>
                  <span style={{ color: '#eee', fontWeight: 600 }}>{v}</span>
                </div>
              ))}
              <div style={{ marginTop: 20 }}>
                <div style={{ fontSize: 12, color: '#555', marginBottom: 10, textTransform: 'uppercase', letterSpacing: 1 }}>Booking History</div>
                {viewCustomer.bookings.map(b => (
                  <div key={b.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #1a1a1a' }}>
                    <span style={{ color: '#ccc', fontSize: 13 }}>{b.car.brand} {b.car.model}</span>
                    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                      <span style={{ color: '#d4af37', fontSize: 13 }}>₹{b.total}</span>
                      <span className={`badge badge-${b.status}`}>{b.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-gold" onClick={() => setViewCustomer(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminCustomers;
