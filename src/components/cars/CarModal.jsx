import React from 'react';
import './cars.css';

const CarModal = ({ car, onClose, onRent }) => {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{car.brand} {car.model}</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body">
          <div className="modal-image" style={{ backgroundImage: `url(${car.img})` }} />
          <div className="modal-details">
            <div className="detail-item">
              <div className="detail-label">Type</div>
              <div className="detail-value">{car.type}</div>
            </div>
            <div className="detail-item">
              <div className="detail-label">Seats</div>
              <div className="detail-value">{car.seats} Passengers</div>
            </div>
            <div className="detail-item">
              <div className="detail-label">Transmission</div>
              <div className="detail-value">{car.transmission}</div>
            </div>
            <div className="detail-item">
              <div className="detail-label">Fuel</div>
              <div className="detail-value">{car.fuel || 'Petrol'}</div>
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <div className="car-price">
            <span className="price">₹{car.price}</span>
            <span className="period">/day</span>
          </div>
          <button className="btn btn-primary" onClick={() => onRent(car)}>Rent Now</button>
        </div>
      </div>
    </div>
  );
};

export default CarModal;
