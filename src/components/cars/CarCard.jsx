import React from 'react';
import './cars.css';

const CarCard = ({ car, onView, onRent }) => {
  return (
    <div className="car-card">
      <div className="car-image" style={{ backgroundImage: `url(${car.img})` }}>
        <span className="car-badge">{car.type}</span>
      </div>
      <div className="car-info">
        <h3>{car.brand} {car.model}</h3>
        <div className="car-specs">
          <span>👥 {car.seats} Seats</span>
          <span>⚙️ {car.transmission}</span>
        </div>
        <div className="car-footer">
          <div className="car-price">
            <span className="price">₹{car.price}</span>
            <span className="period">/day</span>
          </div>
          <div className="car-actions">
            <button className="btn btn-secondary" onClick={() => onView(car.id)}>View</button>
            <button className="btn btn-primary" onClick={() => onRent(car)}>Rent</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
