// src/App.js

import React from 'react';
import "./App.css"

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>Welcome to Z-MES System</h1>
      </header>
      <main className="app-content">
        <section className="hero">
          <div className="hero-content">
            <h2>Boost Your Manufacturing Efficiency with Z-MES</h2>
            <p>
              Z-MES is a powerful Manufacturing Execution System (MES) that streamlines your production processes,
              optimizes resource utilization, and improves overall efficiency.
            </p>
            <button className="btn btn-primary">Get Started</button>
          </div>
        </section>

        <section className="features">
          <div className="feature-item">
            <h3>Real-time Production Monitoring</h3>
            <p>Monitor your production processes in real-time to identify issues and make data-driven decisions.</p>
          </div>
          <div className="feature-item">
            <h3>Efficient Resource Management</h3>
            <p>Optimize resource utilization and reduce waste by effectively managing your production resources.</p>
          </div>
          <div className="feature-item">
            <h3>Quality Control and Analysis</h3>
            <p>Implement robust quality control measures and analyze production data for continuous improvement.</p>
          </div>
        </section>
      </main>
      <footer className="app-footer">
        <p>© {new Date().getFullYear()} Z-MES System. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
