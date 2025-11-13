import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './index.css';
import Home from './Home.jsx';
import Start from './Start.jsx';
import Assessment from './Assessment.jsx';
import Dashboard from './Dashboard.jsx';
import Leaderboard from './Leaderboard.jsx';
import ESGCompliance from './ESGCompliance.jsx';
import Admin from './Admin.jsx';
import { PaymentSuccess, PaymentFailed, PaymentError } from './PaymentHandlers.jsx';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/start" element={<Start />} />
        <Route path="/login" element={<Start />} />
        <Route path="/assessment" element={<Assessment />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/esg-compliance" element={<ESGCompliance />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/payment/success" element={<PaymentSuccess />} />
        <Route path="/payment/failed" element={<PaymentFailed />} />
        <Route path="/payment/error" element={<PaymentError />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
