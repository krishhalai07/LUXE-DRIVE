import React from 'react';

export default function WhyChoose(){
  const items = [
    {title:'Premium Vehicles', desc:'Top-notch maintained fleet'},
    {title:'Insurance Included', desc:'Hassle-free coverage'},
    {title:'Multiple Locations', desc:'Pickup across cities'}
  ];

  return (
    <div className="why">
      {items.map((it,idx)=> (
        <div key={idx} className="why-box">
          <h3 style={{color:'var(--accent)'}}>{it.title}</h3>
          <div className="small">{it.desc}</div>
        </div>
      ))}
    </div>
  )
}