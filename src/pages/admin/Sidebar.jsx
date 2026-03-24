import React from 'react';

const icons = {
  dashboard: <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>,
  bookings:  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>,
  vehicles:  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 17H3v-5l2-5h14l2 5v5h-2M5 17a2 2 0 104 0M15 17a2 2 0 104 0"/></svg>,
  customers: <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>,
  profile:   <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  logout:    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"/></svg>,
};

const NAV = [
  { key: 'dashboard', label: 'Dashboard' },
  { key: 'bookings',  label: 'Bookings' },
  { key: 'vehicles',  label: 'Vehicles' },
  { key: 'customers', label: 'Customers' },
  { key: 'profile',   label: 'Profile' },
];

const Sidebar = ({ active, onNav, user, onLogout }) => (
  <aside className="admin-sidebar">
    <div className="sidebar-logo">
      <h2>LUXE DRIVE</h2>
      <span>Admin Panel</span>
    </div>

    <nav className="sidebar-nav">
      {NAV.map(n => (
        <button key={n.key} className={`nav-item ${active === n.key ? 'active' : ''}`} onClick={() => onNav(n.key)}>
          {icons[n.key]}
          {n.label}
        </button>
      ))}
    </nav>

    <div className="sidebar-footer">
      <div className="sidebar-user">
        <div className="user-avatar">{user?.email?.charAt(0).toUpperCase()}</div>
        <div className="user-info">
          <div className="user-name">Admin</div>
          <div className="user-email">{user?.email}</div>
        </div>
        <button className="btn-logout" onClick={onLogout} title="Logout">{icons.logout}</button>
      </div>
    </div>
  </aside>
);

export default Sidebar;
