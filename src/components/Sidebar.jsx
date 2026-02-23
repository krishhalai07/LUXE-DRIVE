import React from 'react';

export default function Sidebar({active, onNavigate}){
  const items = [
    {key:'home',label:'Home'},
    {key:'rentals',label:'My Rentals'},
    {key:'membership',label:'Membership'},
    {key:'payments',label:'Payments & Wallet'},
    {key:'support',label:'Support'}
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-top">
        <div className="brand">🚘</div>
        <div className="brand-title">LuxuryCars</div>
      </div>

      <nav className="sidebar-nav">
        {items.map(it => (
          <div key={it.key} className={"sidebar-item " + (active===it.key ? 'active' : '')} onClick={()=>onNavigate(it.key)}>
            <span className="item-text">{it.label}</span>
          </div>
        ))}
      </nav>

      <div className="sidebar-bottom">
        <div className="profile">
          <div className="avatar">K</div>
          <div>
            <div className="small">Welcome back</div>
            <strong>Krish</strong>
          </div>
        </div>
        <div className="gold-badge">Gold Member</div>
      </div>
    </aside>
  )
}
