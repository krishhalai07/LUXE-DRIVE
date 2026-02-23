import React, { useState } from 'react';
import Hero from '../components/home/Hero';
// import CarGrid from '../components/cars/CarGrid';
import Features from '../components/home/Features';
import Reviews from '../components/home/Reviews';
import Contact from '../components/home/Contact';

const HomePage = ({ cars, onView, onRent }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  const filteredCars = cars.filter(car => {
    const matchesSearch = car.brand.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         car.model.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || car.type === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <>
      <Hero />
      <div style={{ padding: '60px 0', background: 'rgba(20, 20, 20, 0.5)' }}>
        <div className="container">
          <h2 style={{ fontSize: 36, marginBottom: 24, textAlign: 'center', background: 'linear-gradient(135deg, var(--primary), var(--accent))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Find Your Perfect Car</h2>
          <div style={{ display: 'flex', gap: 16, maxWidth: 800, margin: '0 auto 40px' }}>
            <div style={{ flex: 1, position: 'relative' }}>
              <input
                className="input"
                type="text"
                placeholder="Search by brand or model..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                style={{ paddingLeft: 40 }}
              />
              <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', fontSize: 18 }}>🔍</span>
            </div>
            <select className="input" value={filterType} onChange={e => setFilterType(e.target.value)} style={{ width: 200 }}>
              <option value="all">All Types</option>
              <option value="Luxury">Luxury</option>
              <option value="Sports">Sports</option>
              <option value="SUV">SUV</option>
              <option value="Electric">Electric</option>
            </select>
          </div>
        </div>
      </div>
      <CarGrid cars={filteredCars.slice(0, 6)} onView={onView} onRent={onRent} />
      <Features />
      <Reviews />
      <Contact />
    </>
  );
};

export default HomePage;
