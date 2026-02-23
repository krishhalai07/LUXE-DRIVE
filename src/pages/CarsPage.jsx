import React, { useState } from 'react';
// import CarGrid from '../components/cars/CarGrid';

const CarsPage = ({ cars, onView, onRent }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  const filteredCars = cars.filter(car => {
    const matchesSearch = car.brand.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         car.model.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || car.type === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <div style={{ paddingTop: 40 }}>
      <div className="container">
        <div style={{ marginBottom: 32 }}>
          <h1 style={{ fontSize: 36, marginBottom: 16, background: 'linear-gradient(135deg, var(--primary), var(--accent))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Browse Our Fleet</h1>
          <div style={{ display: 'flex', gap: 16, marginBottom: 24 }}>
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
          <p style={{ color: 'var(--text-secondary)' }}>Found {filteredCars.length} vehicles</p>
        </div>
      </div>
      <CarGrid cars={filteredCars} onView={onView} onRent={onRent} />
    </div>
  );
};

export default CarsPage;
