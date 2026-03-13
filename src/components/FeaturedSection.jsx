import React from 'react';

export default function FeaturedSection({cars, onView}){
  return (
    <div>
      <h3 style={{margin:0}}>Featured Cars</h3>
      <div className="feature-grid">
        {cars.map(c=> (
          <div className="feature-small" key={c.id}>
            <div className="img" style={{backgroundImage:`url(${c.img})`}} />
            <div style={{marginTop:8}}>
              <strong>{c.brand} {c.model}</strong>
              <div className="meta">
                <div className="price">₹{c.pricePerDay}/day</div>
                <div style={{display:'flex',gap:8}}>
                  <button className="btn secondary" onClick={()=>onView(c)}>View Details</button>
                  <button className="btn" onClick={()=>onView(c)}>View Now</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}