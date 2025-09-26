import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

import music1 from "../assets/Nainowale.mp3";
import music2 from "../assets/NightChanges.mp3";
import music3 from "../assets/Pasoori.mp3";
import music4 from "../assets/RainThunder.mp3";
import music5 from "../assets/Samajavaragamana.mp3";
import music6 from "../assets/ShivaTandava.mp3";
import music7 from "../assets/ShreeGanesha.mp3";
import music8 from "../assets/SoSoGa.mp3";
import music9 from "../assets/UnakkulNaaneNeneJilJil.mp3";
import music10 from "../assets/UnStopabble.mp3";

import img1 from "../assets/Nainowale.jpeg";
import img2 from "../assets/NightChanges.jpeg";
import img3 from "../assets/Pasoori.jpeg";
import img4 from "../assets/Rainthunder.jpeg";
import img5 from "../assets/Samajavaragamana.jpeg";
import img6 from "../assets/ShivaTandava.jpeg";
import img7 from "../assets/ShreeGanesha.jpeg";
import img8 from "../assets/SoSoGa.jpeg";
import img9 from "../assets/UnakkulNaaneNeneJilJil.jpeg";
import img10 from "../assets/UnStopabble.png";

const songs = [
  { id: 1, title: "Nainowale", audio: music1, image: img1 },
  { id: 2, title: "Night Changes", audio: music2, image: img2 },
  { id: 3, title: "Pasoori", audio: music3, image: img3 },
  { id: 4, title: "Rain Thunder", audio: music4, image: img4 },
  { id: 5, title: "Samajavaragamana", audio: music5, image: img5 },
  { id: 6, title: "Shiva Tandava", audio: music6, image: img6 },
  { id: 7, title: "Shree Ganesha", audio: music7, image: img7 },
  { id: 8, title: "So So Ga", audio: music8, image: img8 },
  { id: 9, title: "Unakkul Naane", audio: music9, image: img9 },
  { id: 10, title: "Unstoppable", audio: music10, image: img10 },
];

const Dashboard = () => {
  const navigate = useNavigate();

  // Redirect if not authenticated
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    const token = localStorage.getItem("token");
    if (!isAuthenticated || !token) {
      navigate("/login");
    }
  }, [navigate]);

  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [speed, setSpeed] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoop, setIsLoop] = useState(false);
  const [progress, setProgress] = useState(0);

  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.playbackRate = speed;
      audioRef.current.muted = isMuted;
      audioRef.current.loop = isLoop;
    }
  }, [volume, speed, isMuted, isLoop]);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, currentSongIndex]);

  // Update progress bar
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      setProgress(audio.currentTime / audio.duration || 0);
    };

    const onEnded = () => setIsPlaying(false);

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("ended", onEnded);
    };
  }, [currentSongIndex]);

  const togglePlayPause = () => setIsPlaying(!isPlaying);

  const restartSong = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      if (!isPlaying) setIsPlaying(true);
    }
  };

  const toggleMute = () => setIsMuted(!isMuted);

  const toggleLoop = () => setIsLoop(!isLoop);

  const handleVolumeChange = (e) => setVolume(parseFloat(e.target.value));

  const handleSpeedChange = (e) => setSpeed(parseFloat(e.target.value));

  const selectSong = (index) => {
    setCurrentSongIndex(index);
    setIsPlaying(true);
  };

  // Click progress bar to seek
  const handleProgressClick = (e) => {
    const progressContainer = e.currentTarget;
    const rect = progressContainer.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newProgress = clickX / rect.width;
    if (audioRef.current && audioRef.current.duration) {
      audioRef.current.currentTime = newProgress * audioRef.current.duration;
      setProgress(newProgress);
    }
  };

  return (
    <div className="dashboard-container">
      {/* Left Panel */}
      <div className="left-panel">
        <h2>Available Songs</h2>
        <ul className="song-list">
          {songs.map((song, index) => (
            <li
              key={song.id}
              className={index === currentSongIndex ? "active-song" : ""}
              onClick={() => selectSong(index)}
            >
              <img src={song.image} alt={song.title} className="song-thumbnail" />
              <span>{song.title}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Right Panel */}
      <div className="right-panel">
        {/* Top: Image + Song Title */}
        <div className="right-top">
          <h2>Now Playing</h2>
          <img
            src={songs[currentSongIndex].image}
            alt={songs[currentSongIndex].title}
            className="current-song-image"
          />
          <h3>{songs[currentSongIndex].title}</h3>
        </div>

        {/* Bottom: Controls + Progress Bar */}
        <div className="right-bottom">
          <div className="progress-container" onClick={handleProgressClick} aria-label="Progress Bar" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(progress * 100)}>
            <div className="progress-bar" style={{ width: `${progress * 100}%` }}></div>
          </div>

          <div className="controls">
            <button onClick={togglePlayPause} className="control-button">
              {isPlaying ? "Pause" : "Play"}
            </button>
            <button onClick={restartSong} className="control-button">
              Restart
            </button>
            <button onClick={toggleMute} className="control-button">
              {isMuted ? "Unmute" : "Mute"}
            </button>
            <button
              onClick={toggleLoop}
              className={`control-button ${isLoop ? "active" : ""}`}
            >
              Loop
            </button>

            <div className="slider-container">
              <label htmlFor="volume-slider">Volume:</label>
              <input
                id="volume-slider"
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolumeChange}
              />
            </div>

            <div className="slider-container">
              <label htmlFor="speed-slider">Speed:</label>
              <input
                id="speed-slider"
                type="range"
                min="0.5"
                max="2"
                step="0.1"
                value={speed}
                onChange={handleSpeedChange}
              />
            </div>
          </div>
        </div>

        <audio ref={audioRef} src={songs[currentSongIndex].audio} />
      </div>
    </div>
  );
};

export default Dashboard;
