import React, { useState } from 'react';
import { ref, push, set } from 'firebase/database';
import { db } from './firebaseConfig';
import './LandingPage.css';

const LandingPage = () => {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);

     const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    try {
      const emailRef = ref(db, 'waitlist');
      const newEmailRef = push(emailRef);
      await set(newEmailRef, {
        email,
        timestamp: Date.now(),
      });
      setSubmitted(true);
    } catch (err) {
      console.error('Error writing to database', err);
    }
  };

  return (
    <div className="landing-container">
      <header className="hero-section">
        <h1>Grow Smarter. Eat Cleaner. Save the Planet.</h1>
        <p className="subheadline">
          AI-powered organic gardening tools for every home — balcony to backyard.
        </p>
        {!submitted ? (
            <form onSubmit={handleSubmit} className="signup-form">
          <input 
            type="email" 
            placeholder="Your Email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">Join the Waitlist</button>
        </form>
        ) : (
           <p>✅ You're on the waitlist! We'll keep you updated 🌿</p> 
        )}
        
      </header>

      <section className="features-section">
        <h2>🌿 Why Choose Us?</h2>
        <div className="features">
          <div>
            <h3>AI-Powered Gardening Assistant</h3>
            <p>Know when to water, plant, or treat — using natural, smart tips.</p>
          </div>
          <div>
            <h3>Smart Soil & Climate Sensors</h3>
            <p>Track soil moisture, temperature, humidity — all in real time.</p>
          </div>
          <div>
            <h3>Organic & Eco-Friendly Focus</h3>
            <p>No chemicals. No waste. Just clean food from your own home.</p>
          </div>
        </div>
      </section>

      <section className="testimonial-section">
        <h2>💬 What People Say</h2>
        <div className="testimonial">
          <p>
            “I’ve never had a tomato plant live this long! The AI told me exactly when to water — no guesswork.”<br />
            <strong>— Sarah, Urban Gardener</strong>
          </p>
          <p>
            “My kids love checking on the soil moisture and getting AI plant tips. Fun and educational!”<br />
            <strong>— David, STEM Teacher</strong>
          </p>
        </div>
      </section>

      <section className="cta-section">
        <h2>🌍 Be First to Grow the Future</h2>
        <p>Sign up now and get early access to:</p>
        <ul>
          <li>🌿 Smart Garden Starter Kit</li>
          <li>🌿 AI Gardening Assistant App</li>
          <li>🌿 Organic Crop Planner (Coming Soon)</li>
        </ul>
        <form className="signup-form">
          <input type="email" placeholder="Your Email" />
          <button type="submit">Reserve My Spot</button>
        </form>
      </section>

      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} SmartGrow AI. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
