// src/pages/TripDetailsPage.tsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { Trip, TripFormData } from '../types';
import TripForm from '../components/trips/TripForm';
import Button from '../components/common/Button';
import { mockTrips } from '../data/mockTrips'; // <--- Добави този import

const TripDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [trip, setTrip] = useState<Trip | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      if (!id) {
        setError('Идентификаторът на екскурзията липсва.');
        setLoading(false);
        return;
      }
      // Намираме екскурзията по ID от моковите данни
      const foundTrip = mockTrips.find(t => t.id === parseInt(id));
      if (foundTrip) {
        setTrip(foundTrip);
      } else {
        setError('Екскурзията не е намерена.');
      }
      setLoading(false);
    }, 500);
  }, [id]);

  const handleUpdateTrip = (formData: TripFormData) => { // Променяме да не е async
    if (!id) return;
    // Симулираме обновяване на данни
    const updatedTrip = { ...trip!, ...formData, id: parseInt(id) }; // За да запазим ID
    setTrip(updatedTrip); // Обновяваме локално състоянието
    setIsEditing(false);
    alert('Екскурзията е обновена успешно (симулирано)!');
    console.log('Симулирано обновяване:', updatedTrip);
  };

  if (loading) return <p className="text-center text-xl mt-8 text-blue-300">Зареждат се детайли...</p>;
  if (error) return <p className="text-center text-red-500 text-xl mt-8">{error}</p>;
  if (!trip) return <p className="text-center text-gray-400 text-xl mt-8">Екскурзията не е намерена.</p>;

  return (
    <div className="max-w-3xl mx-auto bg-gray-800 p-8 rounded-lg shadow-xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-400">{trip.name}</h1>
        <Button onClick={() => setIsEditing(!isEditing)} variant={isEditing ? 'secondary' : 'primary'}>
          {isEditing ? 'Откажи редактиране' : 'Редактирай'}
        </Button>
      </div>

      {isEditing ? (
        <TripForm initialData={trip} onSubmit={handleUpdateTrip} isEditMode={true} />
      ) : (
        <div>
          <p className="text-gray-300 mb-2">
            <span className="font-semibold">Дестинация:</span> {trip.destination}
          </p>
          <p className="text-gray-300 mb-2">
            <span className="font-semibold">Период:</span> {trip.startDate} до {trip.endDate}
          </p>
          {trip.description && (
            <p className="text-gray-300 mb-4">
              <span className="font-semibold">Описание:</span> {trip.description}
            </p>
          )}
          <Button onClick={() => navigate('/')} variant="secondary">
            Обратно към списъка
          </Button>
        </div>
      )}
    </div>
  );
};

export default TripDetailsPage;