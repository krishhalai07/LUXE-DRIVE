import React, { useState } from 'react';
import './admin.css';
import Sidebar       from './Sidebar';
import AdminHome     from './AdminHome';
import AdminBookings from './AdminBookings';
import AdminVehicles from './AdminVehicles';
import AdminCustomers from './AdminCustomers';
import AdminProfile  from './AdminProfile';

const AdminDashboard = ({ bookings, onUpdateStatus, onLogout, user }) => {
  const [active, setActive] = useState('dashboard');

  const pages = {
    dashboard: <AdminHome      bookings={bookings} onUpdateStatus={onUpdateStatus} />,
    bookings:  <AdminBookings  bookings={bookings} onUpdateStatus={onUpdateStatus} />,
    vehicles:  <AdminVehicles />,
    customers: <AdminCustomers bookings={bookings} />,
    profile:   <AdminProfile   user={user} />,
  };

  return (
    <div className="admin-layout">
      <Sidebar active={active} onNav={setActive} user={user} onLogout={onLogout} />
      <main className="admin-main">
        {pages[active]}
      </main>
    </div>
  );
};

export default AdminDashboard;
