import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Dashboard from './components/Dashboard.jsx'; // 👈 Import it here

import "./App.css"

function App() {
  return (
    <BrowserRouter basename="/tunely">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} /> 
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
