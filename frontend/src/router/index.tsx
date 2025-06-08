// src/router/index.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import TripDetailsPage from '../pages/TripDetailsPage';
import CreateTripPage from '../pages/CreateTripPage';

const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/trips/:id" element={<TripDetailsPage />} />
      <Route path="/create-trip" element={<CreateTripPage />} />
      {/* Добави други маршрути тук (напр. за логин, регистрация) */}
      <Route path="*" element={<h1 className="text-center text-4xl mt-20 text-red-500">404 - Страницата не е намерена</h1>} />
    </Routes>
  );
};

export default AppRouter;