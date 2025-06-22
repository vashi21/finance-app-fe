import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './index.css';

import ProtectedRoute from './components/ProtectedRoute';
import Login         from './pages/Login';
import Signup        from './pages/Signup';
import Dashboard     from './pages/Dashboard';
import FdVsDebt      from './pages/calculators/FdVsDebt';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* public */}
        <Route path="/login"  element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* protected */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/calculators/fd-vs-debt" element={<FdVsDebt />} />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Route>

        {/* fallback */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
