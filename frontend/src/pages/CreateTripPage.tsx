// src/pages/CreateTripPage.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { createTrip } from '../api/trips';
import type { Trip, TripFormData } from '../types';
import TripForm from '../components/trips/TripForm';

const CreateTripPage: React.FC = () => {
  const navigate = useNavigate();

  const handleCreateTrip = async (formData: TripFormData) => {
    try {
      await createTrip(formData);
      alert('Екскурзията е създадена успешно!');
      navigate('/'); // Връщаме се към началната страница след създаване
    } catch (error) {
      alert('Неуспешно създаване на екскурзията.');
      console.error(error);
    }
  };

  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-3xl font-bold text-blue-400 mb-6 text-center">Създай нова екскурзия</h1>
      <TripForm onSubmit={handleCreateTrip} />
    </div>
  );
};

export default CreateTripPage;