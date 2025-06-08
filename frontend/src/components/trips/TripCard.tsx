// src/components/trips/TripCard.tsx
import React from 'react';
import  type { Trip, TripFormData } from '../../types';
import { Link } from 'react-router-dom';
import Button from '../common/Button';

interface TripCardProps {
  trip: Trip;
  onDelete: (id: number) => void;
}

const TripCard: React.FC<TripCardProps> = ({ trip, onDelete }) => {
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md mb-4 border border-gray-700">
      <h3 className="text-xl font-semibold text-blue-400 mb-2">{trip.name}</h3>
      <p className="text-gray-300 mb-1">Дестинация: {trip.destination}</p>
      <p className="text-gray-400 text-sm mb-3">
        {trip.startDate} - {trip.endDate}
      </p>
      {trip.description && <p className="text-gray-400 text-sm mb-4">{trip.description}</p>}
      <div className="flex justify-end space-x-2">
        <Link to={`/trips/${trip.id}`}>
          <Button variant="secondary">Виж детайли</Button>
        </Link>
        <Button variant="danger" onClick={() => onDelete(trip.id)}>
          Изтрий
        </Button>
      </div>
    </div>
  );
};

export default TripCard;