import React, { useState } from 'react';
import './styles/theme.css';
// import Header from './layout/Header';
// import Footer from './layout/Footer';
import HomePage from './pages/HomePage';
import CarsPage from './pages/CarsPage';
// import ProfilePage from './pages/ProfilePage';
// import AdminDashboard from './pages/AdminDashboard';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
// import CarModal from './components/cars/CarModal';
// import PaymentModal from './components/common/PaymentModal';
import { cars as sampleCars } from './data/cars';

function App() {
  const [page, setPage] = useState('login');
  const [user, setUser] = useState(null);
  const [profilePic, setProfilePic] = useState(null);
  const [cars] = useState(sampleCars);
  const [selectedCar, setSelectedCar] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [bookings, setBookings] = useState([]);

  const handleView = (car) => {
    setSelectedCar(car);
    setShowModal(true);
    setShowPayment(false);
  };

  const handleRent = (car) => {
    setSelectedCar(car);
    setShowModal(false);
    setShowPayment(true);
  };

  const handleBooking = (booking) => {
    setBookings(prev => [booking, ...prev]);
    setShowPayment(false);
    alert('Booking confirmed!');
  };

  const handleLogin = (data) => {
    setUser(data);
    setPage(data.role === 'admin' ? 'admin' : 'home');
  };

  const handleRegister = (data) => {
    setUser(data);
    setPage(data.role === 'admin' ? 'admin' : 'home');
  };

  const handleLogout = () => {
    setUser(null);
    setPage('login');
  };

  const updateBookingStatus = (id, status) => {
    setBookings(prev => prev.map(b => b.id === id ? {...b, status} : b));
  };

  if (page === 'login') {
    return <Login onLogin={handleLogin} onSwitchToRegister={() => setPage('register')} />;
  }

  if (page === 'register') {
    return <Register onRegister={handleRegister} onSwitchToLogin={() => setPage('login')} />;
  }

  if (page === 'admin' && user?.role === 'admin') {
    return <AdminDashboard bookings={bookings} onUpdateStatus={updateBookingStatus} onLogout={handleLogout} onNavigate={setPage} user={user} />;
  }

  return (
    <>
      <Header user={user} onLogout={handleLogout} onNavigate={setPage} profilePic={profilePic} />
      <main>
        {page === 'home' && <HomePage cars={cars} onView={handleView} onRent={handleRent} />}
        {page === 'cars' && <CarsPage cars={cars} onView={handleView} onRent={handleRent} />}
        {page === 'profile' && <ProfilePage user={user} onLogout={handleLogout} profilePic={profilePic} setProfilePic={setProfilePic} />}
      </main>
      <Footer />
      
      {showModal && selectedCar && (
        <CarModal car={selectedCar} onClose={() => setShowModal(false)} onRent={handleRent} />
      )}
      
      {showPayment && selectedCar && (
        <PaymentModal car={selectedCar} onClose={() => setShowPayment(false)} onSubmit={handleBooking} />
      )}
    </>
  );
}

export default App;
