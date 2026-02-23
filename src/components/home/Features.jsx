import React from 'react';
import './home.css';

const Features = () => {
  const features = [
    { icon: '⚡', title: 'Instant Booking', desc: 'Book your car in seconds with our streamlined process' },
    { icon: '🛡️', title: 'Fully Insured', desc: 'All vehicles come with comprehensive insurance coverage' },
    { icon: '💎', title: 'Premium Fleet', desc: 'Choose from our collection of luxury and premium vehicles' },
    { icon: '🔧', title: 'Well Maintained', desc: 'Regular maintenance ensures top performance' },
    { icon: '💰', title: 'Best Prices', desc: 'Competitive rates with no hidden fees' },
    { icon: '📞', title: '24/7 Support', desc: 'Round-the-clock customer support for your convenience' }
  ];

  return (
    <section className="features">
      <div className="container">
        <h2 className="section-title">Why Choose Us</h2>
        <div className="feature-grid">
          {features.map((f, i) => (
            <div key={i} className="feature-card">
              <div className="feature-icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
