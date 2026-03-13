import React from 'react';

export default function Hero({onViewCars}){
  return (
    <section className="hero">
      <div className="left">
        <h2>Drive the Luxury You Deserve</h2>
        <p>Premium cars, transparent pricing, and effortless bookings — no fuss, just drive.</p>
        <div style={{marginTop:18}}>
          <button className="btn" onClick={() => onViewCars()}>View Cars</button>
          <button className="btn secondary" style={{marginLeft:10}}>Rent Now</button>
        </div>
      </div>
    </section>
  )
}
