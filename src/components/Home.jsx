import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      {/* Section 1: Welcome / Hero */}
      <section className="hero-section">
        <div className="overlay">
          <h1>Welcome to <span className="app-name">Tunely</span></h1>
          <p>Your personalized music experience</p>
        </div>
        <div className="animated-bg"></div>
      </section>

      {/* Section 2: Music Info */}
      <section className="info-section">
        <h2>Feel the Beat</h2>
        <p>
          Explore a vast library of songs, playlists, and genres. Stream your favorite music,
          discover new artists, and vibe anytime, anywhere. Tunely brings music to life.
        </p>
      </section>

      {/* Section 3: Marquee / Music Vibes */}
      <section className="marquee-section">
        <marquee behavior="scroll" direction="left" scrollamount="8">
          🎵 Pop &nbsp;&nbsp; 🎧 Lo-fi &nbsp;&nbsp; 🎸 Rock &nbsp;&nbsp; 🎤 Indie &nbsp;&nbsp; 🎷 Jazz &nbsp;&nbsp;
          🎹 Piano &nbsp;&nbsp; 🔊 Beats &nbsp;&nbsp; 🎼 Classical &nbsp;&nbsp; 🥁 EDM &nbsp;&nbsp;
        </marquee>
      </section>
    </div>
  );
};

export default Home;
