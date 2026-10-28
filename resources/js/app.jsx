import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Splash from './pages/Splash';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AdminSignup from './pages/AdminSignup';
import Dashboard from './pages/Dashboard';
import ResidentHome from './pages/ResidentHome';
import ResidentAnnouncements from './pages/ResidentAnnouncements';
import ResidentServices from './pages/ResidentServices';
import ResidentAppointments from './pages/ResidentAppointments';
import ResidentFeedback from './pages/ResidentFeedback';
import ResidentHotlines from './pages/ResidentHotlines';
import ThemeToggle from './components/ThemeToggle';

createRoot(document.getElementById('app')).render(
  <BrowserRouter>
    <>
      <ThemeToggle />
      <Routes>
        <Route path="/" element={<Splash />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin-signup" element={<AdminSignup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/resident/home" element={<ResidentHome />} />
        <Route path="/resident/announcements" element={<ResidentAnnouncements />} />
        <Route path="/resident/services" element={<ResidentServices />} />
        <Route path="/resident/appointments" element={<ResidentAppointments />} />
        <Route path="/resident/feedback" element={<ResidentFeedback />} />
        <Route path="/resident/hotlines" element={<ResidentHotlines />} />
      </Routes>
    </>
  </BrowserRouter>
);