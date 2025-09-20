import React from 'react';
import './Features.css';
import { FaWallet, FaComments, FaChartBar, FaLock, FaTools, FaGlobe } from 'react-icons/fa';

const featuresData = [
  {
    icon: <FaWallet />,
    title: "Multiple Revenue Streams",
    description: "One-time tips, monthly memberships, exclusive content sales, and commission-based work all in one place.",
  },
  {
    icon: <FaComments />,
    title: "Direct Fan Engagement",
    description: "Build meaningful relationships through comments, messages, and exclusive updates.",
  },
  {
    icon: <FaChartBar />,
    title: "Creator Analytics",
    description: "Track your growth, understand your audience, and optimize your content strategy.",
  },
  {
    icon: <FaLock />,
    title: "Secure Payments",
    description: "Bank-level security with instant payouts and transparent fee structure.",
  },
  {
    icon: <FaTools />,
    title: "Content Tools",
    description: "Rich media uploads, scheduling, polls, and content management made simple.",
  },
  {
    icon: <FaGlobe />,
    title: "Global Community",
    description: "Connect with creators and supporters worldwide with multi-language support.",
  },
];

const Features = () => {
  return (
    <section className="features-section">
      <h2>Everything you need to succeed as a creator</h2>

      <div className="features-grid">
        {featuresData.map((feature, index) => (
          <div className="feature-card" key={index}>
            <div className="feature-icon">{feature.icon}</div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
