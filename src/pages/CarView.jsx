import { useState } from 'react';
import { cars } from '../data/cars';
import '../styles/theme.css';
import './carview.css';

const CAR_DETAILS = {
  1: { stats: ['3.5s','305 km/h','600 HP','12 km/l'], subtitle: 'Competition · 2024 Model', desc: 'The BMW M5 Competition is the pinnacle of performance sedans, combining jaw-dropping speed with everyday refinement. Powered by a 4.4-litre V8 twin-turbo engine delivering 600hp, it blasts from 0–100 km/h in just 3.3 seconds.', features: ['Adaptive Cruise Control','Heated Seats','360° Camera','Ambient Lighting','Wireless Charging','Bang & Olufsen Audio','Head-Up Display','Keyless Entry'], specs: [{icon:'🚗',key:'Type',val:'Luxury Sedan'},{icon:'👥',key:'Seats',val:'4 Passengers'},{icon:'⚙️',key:'Transmission',val:'Automatic (8-Speed)'},{icon:'⛽',key:'Fuel',val:'Petrol'},{icon:'📅',key:'Year',val:'2024'},{icon:'🎨',key:'Color',val:'Carbon Black'}] },
  2: { stats: ['3.2s','330 km/h','620 HP','8 km/l'], subtitle: 'V10 Performance · 2024', desc: 'The Audi R8 V10 Performance is a naturally aspirated supercar like no other. With its mid-mounted V10 engine screaming to 8,700 rpm and quattro all-wheel drive, it delivers a pure, visceral driving experience.', features: ['Launch Control','Magnetic Ride','Dynamic Steering','Carbon Ceramic Brakes','Virtual Cockpit','Bang & Olufsen 3D','Audi Drive Select','Sport Exhaust'], specs: [{icon:'🚗',key:'Type',val:'Sports Coupe'},{icon:'👥',key:'Seats',val:'2 Passengers'},{icon:'⚙️',key:'Transmission',val:'S-Tronic (7-Speed)'},{icon:'⛽',key:'Fuel',val:'Petrol'},{icon:'📅',key:'Year',val:'2024'},{icon:'🎨',key:'Color',val:'Ibis White'}] },
  3: { stats: ['5.3s','250 km/h','400 HP','11 km/l'], subtitle: 'P400 R-Dynamic · 2024', desc: 'The Range Rover Velar redefines the SUV segment with its breathtaking design, advanced technology and outstanding capability. The perfect blend of sporting performance and supreme luxury.', features: ['Terrain Response 2','Air Suspension','Panoramic Roof','Meridian Sound','Touch Pro Duo','Wade Sensing','Activity Key','Adaptive Dynamics'], specs: [{icon:'🚗',key:'Type',val:'Luxury SUV'},{icon:'👥',key:'Seats',val:'5 Passengers'},{icon:'⚙️',key:'Transmission',val:'Automatic (8-Speed)'},{icon:'⛽',key:'Fuel',val:'Diesel'},{icon:'📅',key:'Year',val:'2024'},{icon:'🎨',key:'Color',val:'Fuji White'}] },
  4: { stats: ['4.3s','250 km/h','435 HP','13 km/l'], subtitle: 'S 500 4MATIC · 2024', desc: 'The Mercedes-Benz S-Class represents the very best in automotive luxury. Every journey becomes an indulgent experience with its massaging seats, perfume atomiser and cinema-quality rear screens.', features: ['MBUX Hyperscreen','Burmester 4D Audio','Rear Lounge Package','Active Ambient Lighting','Augmented Reality Nav','E-Active Body Control','Digital Light','Fragrance System'], specs: [{icon:'🚗',key:'Type',val:'Luxury Saloon'},{icon:'👥',key:'Seats',val:'5 Passengers'},{icon:'⚙️',key:'Transmission',val:'9G-TRONIC'},{icon:'⛽',key:'Fuel',val:'Petrol'},{icon:'📅',key:'Year',val:'2024'},{icon:'🎨',key:'Color',val:'Obsidian Black'}] },
  5: { stats: ['1.99s','322 km/h','1020 HP','637 km'], subtitle: 'Plaid · 2024', desc: 'The Tesla Model S Plaid is the world\'s quickest production car with a 0–100 km/h time of under 2 seconds. Three independent motors deliver 1,020 hp and a range of 637 km on a single charge.', features: ['Autopilot FSD','17" Touchscreen','Gaming Console','Ludicrous Mode','Over-The-Air Updates','Supercharger Access','HEPA Filter','Sentry Mode'], specs: [{icon:'🚗',key:'Type',val:'Electric Sedan'},{icon:'👥',key:'Seats',val:'5 Passengers'},{icon:'⚙️',key:'Transmission',val:'Single-Speed'},{icon:'⛽',key:'Fuel',val:'Electric'},{icon:'📅',key:'Year',val:'2024'},{icon:'🎨',key:'Color',val:'Midnight Silver'}] },
  6: { stats: ['2.9s','325 km/h','640 HP','6 km/l'], subtitle: 'EVO · 2024', desc: 'The Lamborghini Huracán EVO is a masterpiece of Italian engineering — a naturally-aspirated V10 howls to 8,000 rpm, producing 640 hp for an exhilarating supercar experience.', features: ['LDVI System','Magnetic Suspension','ALA Aerodynamics','Lift System','Drive Select Modes','Carbon Ceramic Brakes','Front Camera','Track Timer'], specs: [{icon:'🚗',key:'Type',val:'Super Sports Car'},{icon:'👥',key:'Seats',val:'2 Passengers'},{icon:'⚙️',key:'Transmission',val:'Dual-Clutch (7-Speed)'},{icon:'⛽',key:'Fuel',val:'Petrol'},{icon:'📅',key:'Year',val:'2024'},{icon:'🎨',key:'Color',val:'Arancio Borealis'}] },
};

const CarView = ({ carId, onBack, onRent }) => {
  const car = cars.find(c => c.id === carId);
  const details = CAR_DETAILS[carId];
  const [mainImg, setMainImg] = useState(car?.img);

  if (!car || !details) return null;

  return (
    <div className="cv-page">
      <nav className="cv-nav">
        <div className="cv-nav-logo">
          <div className="cv-logo-icon"><div className="cv-shield"></div></div>
          <div>
            <div className="cv-brand">LUXE DRIVE</div>
            <div className="cv-sub">Premium Rentals</div>
          </div>
        </div>
        <button className="cv-back-btn" onClick={onBack}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
          Back to Fleet
        </button>
      </nav>

      <div className="cv-breadcrumb">
        <span className="cv-breadcrumb-link" onClick={onBack}>Home</span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
        <span>{car.brand} {car.model}</span>
      </div>

      <div className="cv-wrap">
        {/* LEFT GALLERY */}
        <div className="cv-gallery">
          <div className="cv-main-img-wrap">
            <img className="cv-main-img" src={mainImg} alt={car.brand} />
            <div className="cv-type-ribbon">{car.type}</div>
          </div>
          <div className="cv-thumb-row">
            {[car.img, car.img, car.img].map((src, i) => (
              <img key={i} className={`cv-thumb ${mainImg === src && i === 0 ? 'active' : ''}`} src={src} alt={car.brand} onClick={() => setMainImg(src)} />
            ))}
          </div>
          <div className="cv-stats-bar">
            {[['⚡','0–100 km/h'],['🔝','Top Speed'],['🐎','Horsepower'],['⛽','Mileage']].map(([icon, lbl], i) => (
              <div className="cv-stat-item" key={i}>
                <div className="cv-stat-icon">{icon}</div>
                <span className="cv-stat-val">{details.stats[i]}</span>
                <span className="cv-stat-lbl">{lbl}</span>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT DETAILS */}
        <div className="cv-details-col">
          <div className="cv-eyebrow">{car.type} · Premium Fleet</div>
          <h1 className="cv-title">{car.brand} {car.model}</h1>
          <div className="cv-subtitle">{details.subtitle}</div>

          <div className="cv-price-block">
            <div className="cv-price-main">₹{car.price.toLocaleString()}</div>
            <div className="cv-price-period">/ day</div>
            <div className="cv-price-note">Inclusive of taxes</div>
          </div>

          <div className="cv-specs-title">Specifications</div>
          <div className="cv-specs-table">
            {details.specs.map((s, i) => (
              <div className="cv-spec-row" key={i}>
                <div className="cv-spec-key"><span>{s.icon}</span>{s.key}</div>
                <div className="cv-spec-val">{s.val}</div>
              </div>
            ))}
          </div>

          <div className="cv-specs-title" style={{marginTop:24}}>About This Car</div>
          <p className="cv-desc">{details.desc}</p>

          <div className="cv-specs-title" style={{marginTop:24}}>Key Features</div>
          <div className="cv-features-grid">
            {details.features.map((f, i) => (
              <div className="cv-feature-tag" key={i}>
                <div className="cv-feature-dot"></div>{f}
              </div>
            ))}
          </div>

          <div className="cv-cta">
            <button className="cv-btn-rent" onClick={() => onRent(car)}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              Rent Now
            </button>
            <button className="cv-btn-back" onClick={onBack}>← Back</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarView;
