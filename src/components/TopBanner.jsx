import React from 'react';

export default function TopBanner(){
  return (
    <div className="top-banner">
      <div className="banner-left">
        <h2>Welcome back, <span style={{color:'var(--accent)'}}>Krish</span></h2>
        <div className="small">Find your next ride — quick search or explore featured picks</div>
      </div>
      <div className="banner-right">
        <div className="search-box">
          <input placeholder="Search vehicles, models or locations" />
        </div>
        <div className="member-pill">Gold Member</div>
      </div>
    </div>
  )
}
