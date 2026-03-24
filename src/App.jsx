import { useState } from 'react';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import CarView from './pages/CarView';
import CarRent from './pages/CarRent';
import HomePage from './pages/HomePage';
import CarsPage from './pages/CarsPage';
import ProfilePage from './pages/ProfilePage';
import AdminDashboard from './pages/admin/index';
import Header from './layout/Header';
import Footer from './layout/Footer';
import Contact from './components/home/Contact';
import Features from './components/home/Features';
import { cars } from './data/cars';
import './styles/theme.css';

function App() {
  const [page, setPage] = useState('login');
  const [user, setUser] = useState(null);
  const [selectedCarId, setSelectedCarId] = useState(null);
  const [selectedCar, setSelectedCar] = useState(null);
  const [profilePic, setProfilePic] = useState(null);
  const [bookings, setBookings] = useState([]);

  const handleLogin = (data) => { setUser(data); setPage(data.role === 'admin' ? 'admin' : 'home'); };
  const handleRegister = (data) => { setUser(data); setPage(data.role === 'admin' ? 'admin' : 'home'); };
  const handleLogout = () => { setUser(null); setPage('login'); };

  const handleView = (carId) => { setSelectedCarId(carId); setPage('carview'); };
  const handleRent = (car) => { setSelectedCar(car); setPage('carrent'); };

  if (page === 'login') return <Login onLogin={handleLogin} onSwitchToRegister={() => setPage('register')} />;
  if (page === 'register') return <Register onRegister={handleRegister} onSwitchToLogin={() => setPage('login')} />;
  if (page === 'carview') return <CarView carId={selectedCarId} onBack={() => setPage('home')} onRent={handleRent} />;
  if (page === 'carrent') return <CarRent car={selectedCar} onBack={() => setPage('carview')} />;
  if (page === 'admin') return <AdminDashboard bookings={bookings} onUpdateStatus={(id, status) => setBookings(prev => prev.map(b => b.id === id ? {...b, status} : b))} onLogout={handleLogout} onNavigate={setPage} user={user} />;

  return (
    <>
      <Header user={user} onLogout={handleLogout} onNavigate={setPage} profilePic={profilePic} />
      <main>
        {page === 'home' && <HomePage cars={cars} onView={handleView} onRent={handleRent} />}
        {page === 'cars' && <CarsPage cars={cars} onView={handleView} onRent={handleRent} />}
        {page === 'profile' && <ProfilePage user={user} onLogout={handleLogout} profilePic={profilePic} setProfilePic={setProfilePic} />}
        {page === 'about' && <Features />}
        {page === 'contact' && <Contact />}
      </main>
      <Footer />
    </>
  );
}

export default App;
