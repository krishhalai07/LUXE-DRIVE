import React from 'react';
import './home.css';

const Reviews = () => {
  const reviews = [
    { name: 'John Smith', rating: 5, text: 'Excellent service! The car was in perfect condition and the booking process was seamless.', avatar: 'JS' },
    { name: 'Sarah Johnson', rating: 5, text: 'Best car rental experience ever. Professional staff and amazing vehicles.', avatar: 'SJ' },
    { name: 'Mike Davis', rating: 4, text: 'Great selection of cars and competitive prices. Highly recommended!', avatar: 'MD' },
    { name: 'Emily Brown', rating: 5, text: 'Smooth rental process and excellent customer support. Will definitely use again.', avatar: 'EB' }
  ];

  return (
    <section className="reviews-section">
      <div className="container">
        <h2 className="section-title">What Our Customers Say</h2>
        <div className="reviews-grid">
          {reviews.map((review, i) => (
            <div key={i} className="review-card">
              <div className="review-header">
                <div className="review-avatar">{review.avatar}</div>
                <div>
                  <h4>{review.name}</h4>
                  <div className="rating">
                    {[...Array(review.rating)].map((_, j) => (
                      <span key={j}>⭐</span>
                    ))}
                  </div>
                </div>
              </div>
              <p className="review-text">{review.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
