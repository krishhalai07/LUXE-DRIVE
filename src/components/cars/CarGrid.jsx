import React from 'react';
import CarCard from './CarCard';
import './cars.css';

const CarGrid = ({ cars, onView, onRent }) => {
  return (
    <section className="car-section">
      <div className="container">
        <h2 className="section-title">Available Cars</h2>
        <div className="car-grid">
          {cars.map(car => (
            <CarCard key={car.id} car={car} onView={onView} onRent={onRent} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CarGrid;
