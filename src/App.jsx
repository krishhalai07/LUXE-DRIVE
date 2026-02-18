import React, { useState } from 'react';
import Login from './auth/Login';
import Register from './auth/Register';

function App() {
  const [page, setPage] = useState('login');
  const [user, setUser] = useState(null);

  const handleLogin = (data) => {
    setUser(data);
    console.log('User logged in:', data);
  };

  const handleRegister = (data) => {
    setUser(data);
    console.log('User registered:', data);
  };

  return (
    <>
      {page === 'login' ? (
        <Login onLogin={handleLogin} onSwitchToRegister={() => setPage('register')} />
      ) : (
        <Register onRegister={handleRegister} onSwitchToLogin={() => setPage('login')} />
      )}
    </>
  );
}

export default App;
