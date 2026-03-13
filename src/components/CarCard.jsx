import React from 'react';

export default function CarCard({car, onView, onRent}){
  return (
    <div className="card">
      <div className="thumb" style={{backgroundImage:`url(${car.img})`}} />
      <h3>{car.brand} {car.model}</h3>
      <div className="small">{car.seats} seats • {car.transmission} • {car.fuel}</div>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginTop:8}}>
        <div>
          <div className="price">₹{car.pricePerDay}/day</div>
          <div className="small">Starting price</div>
        </div>
        <div className="actions">
          <button className="btn secondary" onClick={()=>onView(car)}>View</button>
          <button className="btn" onClick={()=>onRent(car)}>Rent</button>
        </div>
      </div>
      <div className="features">
        {car.features.map((f,idx)=> <div key={idx} className="feature">{f}</div>)}
      </div>
    </div>
  )
}
