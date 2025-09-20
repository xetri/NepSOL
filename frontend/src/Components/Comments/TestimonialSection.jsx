import React from "react";
import "./TestimonialSection.css";

const testimonials = [
  {
    stars: 5,
    quote: `"NepSOL transformed my art from a hobby into a sustainable career. The community support is incredible!"`,
    name: "Sarah Chen",
    role: "Digital Artist",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    stars: 5,
    quote: `"The direct connection with fans and multiple revenue streams helped me quit my day job and focus on music full-time."`,
    name: "Marcus Rodriguez",
    role: "Music Producer",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    stars: 5,
    quote: `"I love how easy it is to share exclusive content with my supporters. The analytics help me understand what resonates most."`,
    name: "Emma Thompson",
    role: "Writer & Blogger",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
  },
];

const StarRating = ({ count }) => (
  <div className="star-rating">
    {Array(count).fill("⭐").map((star, idx) => (
      <span key={idx}>{star}</span>
    ))}
  </div>
);

export default function TestimonialSection() {
  return (
    <section className="testimonial-section">
      <h2 className="testimonial-title">Loved by creators worldwide</h2>
      <p className="testimonial-subtitle">
        Join thousands of creators who are building sustainable careers with our platform.
      </p>

      <div className="testimonial-grid">
        {testimonials.map(({ stars, quote, name, role, avatar }, i) => (
          <div key={i} className="testimonial-card">
            <StarRating count={stars} />
            <p className="testimonial-quote">{quote}</p>
            <div className="testimonial-author">
              <img src={avatar} alt={`${name} avatar`} className="testimonial-avatar" />
              <div>
                <div className="author-name">{name}</div>
                <div className="author-role">{role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
