import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import CustomerPage from './pages/CustomerPages/CustomerPage';
import ConfirmationPage from './pages/CustomerPages/ConfirmationPage';
import WaiterPage from './pages/WaiterPages/WaiterPage';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/musteri" replace />} />
      <Route path="/musteri" element={<CustomerPage />} />
      <Route path="/onay" element={<ConfirmationPage />} />
      <Route path="/waiter-panel-xyz2025" element={<WaiterPage />} />
    </Routes>
  );
};

export default App;
