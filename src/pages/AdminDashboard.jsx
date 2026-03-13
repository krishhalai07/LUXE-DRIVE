import React, { useState } from 'react';
import './admin.css';

const AdminDashboard = ({ bookings, onUpdateStatus, onLogout, user }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [cars, setCars] = useState([
    { id: 1, brand: 'BMW', model: 'M5', type: 'Luxury', price: 10000, status: 'available' },
    { id: 2, brand: 'Audi', model: 'R8', type: 'Sports', price: 20000, status: 'available' },
    { id: 3, brand: 'Tesla', model: 'Model S', type: 'Electric', price: 13000, status: 'rented' }
  ]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
  const [newCar, setNewCar] = useState({ brand: '', model: '', type: '', price: '', status: 'available' });
  
  const stats = {
    total: bookings.length,
    pending: bookings.filter(b => b.status === 'pending').length,
    confirmed: bookings.filter(b => b.status === 'confirmed').length,
    revenue: bookings.reduce((sum, b) => sum + b.total, 0)
  };

  const handleAddVehicle = () => {
    if (newCar.brand && newCar.model && newCar.type && newCar.price) {
      setCars([...cars, { ...newCar, id: Date.now(), price: parseInt(newCar.price) }]);
      setNewCar({ brand: '', model: '', type: '', price: '', status: 'available' });
      setShowAddModal(false);
    }
  };

  const handleEditVehicle = () => {
    if (selectedCar) {
      setCars(cars.map(c => c.id === selectedCar.id ? selectedCar : c));
      setShowEditModal(false);
      setSelectedCar(null);
    }
  };

  const handleViewCar = (car) => {
    setSelectedCar(car);
    setShowViewModal(true);
  };

  const handleEditCar = (car) => {
    setSelectedCar(car);
    setShowEditModal(true);
  };

  const handleDeleteCar = (carId) => {
    if (window.confirm('Are you sure you want to delete this vehicle?')) {
      setCars(cars.filter(c => c.id !== carId));
      alert('Vehicle deleted successfully!');
    }
  };

  const renderDashboard = () => (
    <>
      <div className="admin-header">
        <div>
          <h1 className="admin-title">Admin Dashboard</h1>
          <p className="admin-subtitle">Manage bookings and monitor performance</p>
        </div>
        <button className="btn btn-primary">Export Report</button>
      </div>
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'linear-gradient(135deg, var(--primary), var(--accent))' }}>📊</div>
          <div className="stat-content">
            <p className="stat-label">Total Bookings</p>
            <h3 className="stat-value">{stats.total}</h3>
            <span className="stat-change positive">+12% from last month</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)' }}>⏳</div>
          <div className="stat-content">
            <p className="stat-label">Pending</p>
            <h3 className="stat-value">{stats.pending}</h3>
            <span className="stat-change">Awaiting approval</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #10b981, #059669)' }}>✓</div>
          <div className="stat-content">
            <p className="stat-label">Confirmed</p>
            <h3 className="stat-value">{stats.confirmed}</h3>
            <span className="stat-change positive">+8% this week</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'linear-gradient(135deg, var(--primary), var(--accent))' }}>💰</div>
          <div className="stat-content">
            <p className="stat-label">Total Revenue</p>
            <h3 className="stat-value">₹{stats.revenue}</h3>
            <span className="stat-change positive">+24% growth</span>
          </div>
        </div>
      </div>
      <div className="bookings-section">
        <div className="section-header">
          <h2>Recent Bookings</h2>
        </div>
        <div className="bookings-table">
          <div className="table-header">
            <div className="th">Customer</div>
            <div className="th">Vehicle</div>
            <div className="th">Duration</div>
            <div className="th">Amount</div>
            <div className="th">Status</div>
            <div className="th">Actions</div>
          </div>
          {bookings.map(booking => (
            <div key={booking.id} className="table-row">
              <div className="td">
                <div className="customer-info">
                  <div className="avatar-sm">{booking.name.charAt(0)}</div>
                  <div>
                    <div className="customer-name">{booking.name}</div>
                    <div className="customer-email">{booking.email}</div>
                  </div>
                </div>
              </div>
              <div className="td">
                <div className="vehicle-info">
                  <strong>{booking.car.brand} {booking.car.model}</strong>
                  <span className="vehicle-type">{booking.car.type}</span>
                </div>
              </div>
              <div className="td">{booking.days} days</div>
              <div className="td"><span className="amount">₹{booking.total}</span></div>
              <div className="td"><span className={`status-badge ${booking.status}`}>{booking.status}</span></div>
              <div className="td">
                {booking.status === 'pending' ? (
                  <div className="action-buttons">
                    <button className="btn-action confirm" onClick={() => onUpdateStatus(booking.id, 'confirmed')}>✓</button>
                    <button className="btn-action reject" onClick={() => onUpdateStatus(booking.id, 'rejected')}>✕</button>
                  </div>
                ) : (
                  <button className="btn btn-secondary">View</button>
                )}
              </div>
            </div>
          ))}
          {bookings.length === 0 && (
            <div className="empty-state">
              <div className="empty-icon">📋</div>
              <h3>No bookings yet</h3>
              <p>Bookings will appear here once customers make reservations</p>
            </div>
          )}
        </div>
      </div>
    </>
  );

  const renderBookings = () => (
    <>
      <div className="admin-header">
        <div>
          <h1 className="admin-title">Bookings Management</h1>
          <p className="admin-subtitle">View and manage all customer bookings</p>
        </div>
      </div>
      <div className="bookings-section">
        <div className="bookings-table">
          <div className="table-header">
            <div className="th">Customer</div>
            <div className="th">Vehicle</div>
            <div className="th">Duration</div>
            <div className="th">Amount</div>
            <div className="th">Status</div>
            <div className="th">Actions</div>
          </div>
          {bookings.map(booking => (
            <div key={booking.id} className="table-row">
              <div className="td">
                <div className="customer-info">
                  <div className="avatar-sm">{booking.name.charAt(0)}</div>
                  <div>
                    <div className="customer-name">{booking.name}</div>
                    <div className="customer-email">{booking.email}</div>
                  </div>
                </div>
              </div>
              <div className="td">
                <div className="vehicle-info">
                  <strong>{booking.car.brand} {booking.car.model}</strong>
                  <span className="vehicle-type">{booking.car.type}</span>
                </div>
              </div>
              <div className="td">{booking.days} days</div>
              <div className="td"><span className="amount">₹{booking.total}</span></div>
              <div className="td"><span className={`status-badge ${booking.status}`}>{booking.status}</span></div>
              <div className="td">
                {booking.status === 'pending' ? (
                  <div className="action-buttons">
                    <button className="btn-action confirm" onClick={() => onUpdateStatus(booking.id, 'confirmed')}>✓</button>
                    <button className="btn-action reject" onClick={() => onUpdateStatus(booking.id, 'rejected')}>✕</button>
                  </div>
                ) : (
                  <button className="btn btn-secondary">View</button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );

  const renderVehicles = () => (
    <>
      <div className="admin-header">
        <div>
          <h1 className="admin-title">Vehicle Management</h1>
          <p className="admin-subtitle">Manage your fleet of vehicles</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>+ Add Vehicle</button>
      </div>
      <div className="vehicles-grid">
        {cars.map(car => (
          <div key={car.id} className="vehicle-card">
            <div className="vehicle-status">
              <span className={`status-dot ${car.status}`}></span>
              {car.status}
            </div>
            <h3>{car.brand} {car.model}</h3>
            <p className="vehicle-type">{car.type}</p>
            <div className="vehicle-price">₹{car.price}/day</div>
            <div className="vehicle-actions">
              <button className="btn btn-secondary" onClick={() => handleViewCar(car)}>View</button>
              <button className="btn btn-secondary" onClick={() => handleEditCar(car)}>Edit</button>
              <button className="btn-action reject" onClick={() => handleDeleteCar(car.id)} title="Delete">✕</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );

  const renderCustomers = () => (
    <>
      <div className="admin-header">
        <div>
          <h1 className="admin-title">Customers</h1>
          <p className="admin-subtitle">View all registered customers</p>
        </div>
      </div>
      <div className="customers-list">
        {bookings.map((booking, i) => (
          <div key={i} className="customer-card">
            <div className="avatar-lg">{booking.name.charAt(0)}</div>
            <div className="customer-details">
              <h3>{booking.name}</h3>
              <p>{booking.email}</p>
              <p>{booking.phone}</p>
            </div>
            <div className="customer-stats">
              <div>Bookings: 1</div>
              <div>Total: ₹{booking.total}</div>
            </div>
          </div>
        ))}
        {bookings.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">👥</div>
            <h3>No customers yet</h3>
          </div>
        )}
      </div>
    </>
  );

  const renderSettings = () => (
    <>
      <div className="admin-header">
        <div>
          <h1 className="admin-title">Settings</h1>
          <p className="admin-subtitle">Manage your account and preferences</p>
        </div>
      </div>
      <div className="settings-section">
        <div className="settings-card">
          <h3>Profile Settings</h3>
          <div className="form-group">
            <label>Email</label>
            <input className="input" value={user?.email} readOnly />
          </div>
          <div className="form-group">
            <label>Name</label>
            <input className="input" placeholder="Admin Name" />
          </div>
          <button className="btn btn-primary">Save Changes</button>
        </div>
        <div className="settings-card">
          <h3>Change Password</h3>
          <div className="form-group">
            <label>Current Password</label>
            <input className="input" type="password" />
          </div>
          <div className="form-group">
            <label>New Password</label>
            <input className="input" type="password" />
          </div>
          <button className="btn btn-primary">Update Password</button>
        </div>
      </div>
    </>
  );

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-logo">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path d="M16 2L4 8V14C4 21 8 27 16 30C24 27 28 21 28 14V8L16 2Z" fill="url(#gold-gradient-admin)" stroke="url(#gold-gradient-admin)" strokeWidth="1.5"/>
            <path d="M16 10L12 14H20L16 10Z" fill="#000" opacity="0.3"/>
            <path d="M12 16L16 20L20 16H12Z" fill="#000" opacity="0.3"/>
            <defs>
              <linearGradient id="gold-gradient-admin" x1="4" y1="2" x2="28" y2="30" gradientUnits="userSpaceOnUse">
                <stop stopColor="#f4e4c1"/>
                <stop offset="0.5" stopColor="#d4af37"/>
                <stop offset="1" stopColor="#b8941f"/>
              </linearGradient>
            </defs>
          </svg>
          <h2>LUXE DRIVE Admin</h2>
        </div>
        <nav className="admin-nav">
          <div className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveTab('dashboard')}>
            <span>📊</span> Dashboard
          </div>
          <div className={`nav-item ${activeTab === 'bookings' ? 'active' : ''}`} onClick={() => setActiveTab('bookings')}>
            <span>📋</span> Bookings
          </div>
          <div className={`nav-item ${activeTab === 'vehicles' ? 'active' : ''}`} onClick={() => setActiveTab('vehicles')}>
            <span>🚗</span> Vehicles
          </div>
          <div className={`nav-item ${activeTab === 'customers' ? 'active' : ''}`} onClick={() => setActiveTab('customers')}>
            <span>👥</span> Customers
          </div>
          <div className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`} onClick={() => setActiveTab('profile')}>
            <span>👤</span> Profile
          </div>
          <div className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`} onClick={() => setActiveTab('settings')}>
            <span>⚙️</span> Settings
          </div>
        </nav>
        <div className="admin-user">
          <div className="user-avatar">{user?.email?.charAt(0).toUpperCase()}</div>
          <div className="user-info">
            <div className="user-name">Admin</div>
            <div className="user-email">{user?.email}</div>
          </div>
          <button className="btn-logout" onClick={onLogout}>🚪</button>
        </div>
      </aside>
      
      <main className="admin-main">
        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'bookings' && renderBookings()}
        {activeTab === 'vehicles' && renderVehicles()}
        {activeTab === 'customers' && renderCustomers()}
        {activeTab === 'profile' && renderSettings()}
        {activeTab === 'settings' && renderSettings()}
      </main>

      {showAddModal && (
        <div className="modal-backdrop" onClick={() => setShowAddModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Add New Vehicle</h2>
              <button className="modal-close" onClick={() => setShowAddModal(false)}>✕</button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Brand</label>
                <input className="input" value={newCar.brand} onChange={e => setNewCar({...newCar, brand: e.target.value})} placeholder="e.g. BMW" />
              </div>
              <div className="form-group">
                <label>Model</label>
                <input className="input" value={newCar.model} onChange={e => setNewCar({...newCar, model: e.target.value})} placeholder="e.g. M5" />
              </div>
              <div className="form-group">
                <label>Type</label>
                <select className="input" value={newCar.type} onChange={e => setNewCar({...newCar, type: e.target.value})}>
                  <option value="">Select Type</option>
                  <option value="Luxury">Luxury</option>
                  <option value="Sports">Sports</option>
                  <option value="SUV">SUV</option>
                  <option value="Electric">Electric</option>
                </select>
              </div>
              <div className="form-group">
                <label>Price per Day (₹)</label>
                <input className="input" type="number" value={newCar.price} onChange={e => setNewCar({...newCar, price: e.target.value})} placeholder="10000" />
              </div>
              <div className="form-group">
                <label>Status</label>
                <select className="input" value={newCar.status} onChange={e => setNewCar({...newCar, status: e.target.value})}>
                  <option value="available">Available</option>
                  <option value="rented">Rented</option>
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowAddModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={handleAddVehicle}>Add Vehicle</button>
            </div>
          </div>
        </div>
      )}

      {showEditModal && selectedCar && (
        <div className="modal-backdrop" onClick={() => setShowEditModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Edit Vehicle</h2>
              <button className="modal-close" onClick={() => setShowEditModal(false)}>✕</button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Brand</label>
                <input className="input" value={selectedCar.brand} onChange={e => setSelectedCar({...selectedCar, brand: e.target.value})} />
              </div>
              <div className="form-group">
                <label>Model</label>
                <input className="input" value={selectedCar.model} onChange={e => setSelectedCar({...selectedCar, model: e.target.value})} />
              </div>
              <div className="form-group">
                <label>Type</label>
                <select className="input" value={selectedCar.type} onChange={e => setSelectedCar({...selectedCar, type: e.target.value})}>
                  <option value="Luxury">Luxury</option>
                  <option value="Sports">Sports</option>
                  <option value="SUV">SUV</option>
                  <option value="Electric">Electric</option>
                </select>
              </div>
              <div className="form-group">
                <label>Price per Day (₹)</label>
                <input className="input" type="number" value={selectedCar.price} onChange={e => setSelectedCar({...selectedCar, price: parseInt(e.target.value)})} />
              </div>
              <div className="form-group">
                <label>Status</label>
                <select className="input" value={selectedCar.status} onChange={e => setSelectedCar({...selectedCar, status: e.target.value})}>
                  <option value="available">Available</option>
                  <option value="rented">Rented</option>
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowEditModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={handleEditVehicle}>Save Changes</button>
            </div>
          </div>
        </div>
      )}

      {showViewModal && selectedCar && (
        <div className="modal-backdrop" onClick={() => setShowViewModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Vehicle Details</h2>
              <button className="modal-close" onClick={() => setShowViewModal(false)}>✕</button>
            </div>
            <div className="modal-body">
              <div className="modal-details">
                <div className="detail-item">
                  <div className="detail-label">Brand</div>
                  <div className="detail-value">{selectedCar.brand}</div>
                </div>
                <div className="detail-item">
                  <div className="detail-label">Model</div>
                  <div className="detail-value">{selectedCar.model}</div>
                </div>
                <div className="detail-item">
                  <div className="detail-label">Type</div>
                  <div className="detail-value">{selectedCar.type}</div>
                </div>
                <div className="detail-item">
                  <div className="detail-label">Price per Day</div>
                  <div className="detail-value">₹{selectedCar.price}</div>
                </div>
                <div className="detail-item">
                  <div className="detail-label">Status</div>
                  <div className="detail-value">
                    <span className={`status-badge ${selectedCar.status}`}>{selectedCar.status}</span>
                  </div>
                </div>
                <div className="detail-item">
                  <div className="detail-label">Vehicle ID</div>
                  <div className="detail-value">#{selectedCar.id}</div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-primary" onClick={() => setShowViewModal(false)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
