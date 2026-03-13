import React from 'react';

export default function CarDetailModal({car, onClose, onRent}){
  if(!car) return null;
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={e=>e.stopPropagation()}>
        <button className="close" onClick={onClose}>✕</button>
        <div className="details">
          <div className="left">
            <div style={{backgroundImage:`url(${car.img})`,height:320,backgroundSize:'cover',borderRadius:8}} />
            <h2 style={{marginTop:10}}>{car.brand} {car.model}</h2>
            <p className="small">{car.seats} seats • {car.transmission} • {car.fuel}</p>
            <p style={{color:'#bdb6ac',marginTop:10}}>Experience the ultimate comfort and performance in this premium vehicle. Perfect for city drives and weekend getaways.</p>
            <div style={{marginTop:12}} className="specs">
              <div className="spec"><span>🚗 Seats</span><strong>{car.seats}</strong></div>
              <div className="spec"><span>⚙️ Transmission</span><strong>{car.transmission}</strong></div>
              <div className="spec"><span>⛽ Fuel</span><strong>{car.fuel}</strong></div>
            </div>
          </div>
          <div className="right">
            <div className="price-block">
              <div className="small">Price</div>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <div>
                  <div className="price">₹{car.pricePerDay}/Day</div>
                  <div className="small">Select dates to calculate total</div>
                </div>
                <div>
                  <button className="btn" onClick={()=>onRent(car)}>Rent Now</button>
                </div>
              </div>
            </div>

            <div style={{marginTop:10}}>
              <h4 className="small">Booking Options</h4>
              <div style={{display:'flex',gap:8,marginTop:8}}>
                <button className="btn secondary">4 Seats</button>
                <button className="btn secondary">Automatic</button>
                <button className="btn secondary">Petrol</button>
              </div>
            </div>

            <div style={{marginTop:12}}>
              <h4 className="small">Select Dates</h4>
              <div style={{display:'flex',gap:6,flexWrap:'wrap',marginTop:8}}>
                {['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map(d=> (
                  <div key={d} style={{background:'rgba(255,255,255,0.02)',padding:'8px 10px',borderRadius:6,color:varOr('#bdb6ac')}}>{d}</div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

function varOr(fallback){return '#bdb6ac'}
