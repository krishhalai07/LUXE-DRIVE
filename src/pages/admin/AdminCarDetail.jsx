import { useState } from 'react';
import { cars } from '../../data/cars';
import './adminCarDetail.css';

const CAR_DETAILS = {
  1: { stats: ['3.5s','305 km/h','600 HP','12 km/l'], subtitle: 'Competition · 2024 Model', desc: 'The BMW M5 Competition is the pinnacle of performance sedans, combining jaw-dropping speed with everyday refinement. Powered by a 4.4-litre V8 twin-turbo engine delivering 600hp, it blasts from 0–100 km/h in just 3.3 seconds.', features: ['Adaptive Cruise Control','Heated Seats','360° Camera','Ambient Lighting','Wireless Charging','Bang & Olufsen Audio','Head-Up Display','Keyless Entry'], specs: [{icon:'🚗',key:'Type',val:'Luxury Sedan'},{icon:'👥',key:'Seats',val:'4 Passengers'},{icon:'⚙️',key:'Transmission',val:'Automatic (8-Speed)'},{icon:'⛽',key:'Fuel',val:'Petrol'},{icon:'📅',key:'Year',val:'2024'},{icon:'🎨',key:'Color',val:'Carbon Black'}] },
  2: { stats: ['3.2s','330 km/h','620 HP','8 km/l'],  subtitle: 'V10 Performance · 2024',   desc: 'The Audi R8 V10 Performance is a naturally aspirated supercar like no other. With its mid-mounted V10 engine screaming to 8,700 rpm and quattro all-wheel drive, it delivers a pure, visceral driving experience.', features: ['Launch Control','Magnetic Ride','Dynamic Steering','Carbon Ceramic Brakes','Virtual Cockpit','Bang & Olufsen 3D','Audi Drive Select','Sport Exhaust'], specs: [{icon:'🚗',key:'Type',val:'Sports Coupe'},{icon:'👥',key:'Seats',val:'2 Passengers'},{icon:'⚙️',key:'Transmission',val:'S-Tronic (7-Speed)'},{icon:'⛽',key:'Fuel',val:'Petrol'},{icon:'📅',key:'Year',val:'2024'},{icon:'🎨',key:'Color',val:'Ibis White'}] },
  3: { stats: ['5.3s','250 km/h','400 HP','11 km/l'], subtitle: 'P400 R-Dynamic · 2024',    desc: 'The Range Rover Velar redefines the SUV segment with its breathtaking design, advanced technology and outstanding capability. The perfect blend of sporting performance and supreme luxury.', features: ['Terrain Response 2','Air Suspension','Panoramic Roof','Meridian Sound','Touch Pro Duo','Wade Sensing','Activity Key','Adaptive Dynamics'], specs: [{icon:'🚗',key:'Type',val:'Luxury SUV'},{icon:'👥',key:'Seats',val:'5 Passengers'},{icon:'⚙️',key:'Transmission',val:'Automatic (8-Speed)'},{icon:'⛽',key:'Fuel',val:'Diesel'},{icon:'📅',key:'Year',val:'2024'},{icon:'🎨',key:'Color',val:'Fuji White'}] },
  4: { stats: ['4.3s','250 km/h','435 HP','13 km/l'], subtitle: 'S 500 4MATIC · 2024',      desc: 'The Mercedes-Benz S-Class represents the very best in automotive luxury. Every journey becomes an indulgent experience with its massaging seats, perfume atomiser and cinema-quality rear screens.', features: ['MBUX Hyperscreen','Burmester 4D Audio','Rear Lounge Package','Active Ambient Lighting','Augmented Reality Nav','E-Active Body Control','Digital Light','Fragrance System'], specs: [{icon:'🚗',key:'Type',val:'Luxury Saloon'},{icon:'👥',key:'Seats',val:'5 Passengers'},{icon:'⚙️',key:'Transmission',val:'9G-TRONIC'},{icon:'⛽',key:'Fuel',val:'Petrol'},{icon:'📅',key:'Year',val:'2024'},{icon:'🎨',key:'Color',val:'Obsidian Black'}] },
  5: { stats: ['1.99s','322 km/h','1020 HP','637 km'], subtitle: 'Plaid · 2024',            desc: "The Tesla Model S Plaid is the world's quickest production car with a 0–100 km/h time of under 2 seconds. Three independent motors deliver 1,020 hp and a range of 637 km on a single charge.", features: ['Autopilot FSD','17" Touchscreen','Gaming Console','Ludicrous Mode','Over-The-Air Updates','Supercharger Access','HEPA Filter','Sentry Mode'], specs: [{icon:'🚗',key:'Type',val:'Electric Sedan'},{icon:'👥',key:'Seats',val:'5 Passengers'},{icon:'⚙️',key:'Transmission',val:'Single-Speed'},{icon:'⛽',key:'Fuel',val:'Electric'},{icon:'📅',key:'Year',val:'2024'},{icon:'🎨',key:'Color',val:'Midnight Silver'}] },
  6: { stats: ['2.9s','325 km/h','640 HP','6 km/l'],  subtitle: 'EVO · 2024',               desc: 'The Lamborghini Huracán EVO is a masterpiece of Italian engineering — a naturally-aspirated V10 howls to 8,000 rpm, producing 640 hp for an exhilarating supercar experience.', features: ['LDVI System','Magnetic Suspension','ALA Aerodynamics','Lift System','Drive Select Modes','Carbon Ceramic Brakes','Front Camera','Track Timer'], specs: [{icon:'🚗',key:'Type',val:'Super Sports Car'},{icon:'👥',key:'Seats',val:'2 Passengers'},{icon:'⚙️',key:'Transmission',val:'Dual-Clutch (7-Speed)'},{icon:'⛽',key:'Fuel',val:'Petrol'},{icon:'📅',key:'Year',val:'2024'},{icon:'🎨',key:'Color',val:'Arancio Borealis'}] },
};

const AdminCarDetail = ({ car: adminCar, onBack }) => {
  const car = cars.find(c => c.id === adminCar.id) || adminCar;
  const details = CAR_DETAILS[car.id];
  const [mainImg, setMainImg] = useState(car.img);

  return (
    <div className="acd-page">

    

      {/* BREADCRUMB */}
      <div className="acd-breadcrumb">
        <span className="acd-breadcrumb-link" onClick={onBack}>Vehicles</span>
        <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"/></svg>
        <span>{car.brand} {car.model}</span>
      </div>

      {/* MAIN GRID */}
      <div className="acd-wrap">

        {/* LEFT — GALLERY */}
        <div>
          <div className="acd-img-wrap">
            <img className="acd-main-img" src={mainImg} alt={car.brand} />
            <div className="acd-type-badge">{car.type}</div>
            <div className="acd-admin-badge">Admin View</div>
          </div>

          <div className="acd-thumbs">
            {[car.img, car.img, car.img].map((src, i) => (
              <img key={i} src={src} alt="" className={`acd-thumb ${i === 0 && mainImg === src ? 'active' : ''}`} onClick={() => setMainImg(src)} />
            ))}
          </div>

          {details && (
            <div className="acd-stats">
              {[['⚡','0–100 km/h'],['🔝','Top Speed'],['🐎','Horsepower'],['⛽','Mileage']].map(([icon, lbl], i) => (
                <div className="acd-stat" key={i}>
                  <div className="acd-stat-icon">{icon}</div>
                  <span className="acd-stat-val">{details.stats[i]}</span>
                  <span className="acd-stat-lbl">{lbl}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT — DETAILS */}
        <div>
          <div className="acd-eyebrow">{car.type} · Admin Panel</div>
          <h1 className="acd-title">{car.brand} {car.model}</h1>
          {details && <div className="acd-subtitle">{details.subtitle}</div>}

          <div className="acd-price-box">
            <span className="acd-price">₹{car.price?.toLocaleString()}</span>
            <span className="acd-price-per">/ day</span>
            <span className="acd-price-note">Inclusive of taxes</span>
          </div>

          <div className="acd-status-row">
            <span className="acd-status-label">Current Status:</span>
            <span className={`badge badge-${adminCar.status}`}>{adminCar.status}</span>
          </div>

          {details && (
            <>
              <div className="acd-section-title">Specifications</div>
              <div className="acd-specs">
                {details.specs.map((s, i) => (
                  <div className="acd-spec-row" key={i}>
                    <span className="acd-spec-key"><span>{s.icon}</span>{s.key}</span>
                    <span className="acd-spec-val">{s.val}</span>
                  </div>
                ))}
              </div>

              <div className="acd-section-title">About This Car</div>
              <p className="acd-desc">{details.desc}</p>

              <div className="acd-section-title">Key Features</div>
              <div className="acd-features">
                {details.features.map((f, i) => (
                  <div className="acd-feature" key={i}>
                    <div className="acd-feature-dot"></div>
                    {f}
                  </div>
                ))}
              </div>
            </>
          )}

          <button className="acd-btn-back" onClick={onBack}>← Back to Vehicles</button>
        </div>
      </div>
    </div>
  );
};

export default AdminCarDetail;
