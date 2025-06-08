// src/pages/HomePage.tsx
import React, { useEffect, useState } from 'react';
// import { getTrips, deleteTrip } from '../api/trips'; // Закоментирай тези редове
import type { Trip, TripFormData } from '../types';
import TripCard from '../components/trips/TripCard';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button';
import { mockTrips } from '../data/mockTrips'; // <--- Добави този import

const HomePage: React.FC = () => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Симулираме зареждане от бекенд с малко забавяне
    setLoading(true);
    setTimeout(() => {
      setTrips(mockTrips); // <--- Използваме моковите данни тук
      setLoading(false);
    }, 500); // Показваме "Зарежда се..." за 0.5 секунди
  }, []);

  const handleDeleteTrip = (id: number) => { // Променяме да не е async
    if (window.confirm('Сигурни ли сте, че искате да изтриете тази екскурзия?')) {
      // Симулираме изтриване
      setTrips((prevTrips) => prevTrips.filter((trip) => trip.id !== id));
      console.log(`Симулирано изтриване на екскурзия с ID: ${id}`);
    }
  };

  if (loading) return <p className="text-center text-xl mt-8 text-blue-300">Зареждат се екскурзии...</p>;
  if (error) return <p className="text-center text-red-500 text-xl mt-8">{error}</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-400">Всички екскурзии</h1>
        <Link to="/create-trip">
          <Button>Създай нова екскурзия</Button>
        </Link>
      </div>
      {trips.length === 0 ? (
        <p className="text-center text-gray-400 text-lg mt-10">Няма намерени екскурзии. Създайте първата си!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trips.map((trip) => (
            <TripCard key={trip.id} trip={trip} onDelete={handleDeleteTrip} />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;