// src/components/trips/TripForm.tsx
import React, { useState, useEffect } from 'react';
import type { Trip, TripFormData } from '../../types';
import Input from '../common/Input';
import Button from '../common/Button';

interface TripFormProps {
  initialData?: TripFormData;
  onSubmit: (data: TripFormData) => void;
  isEditMode?: boolean;
}

const TripForm: React.FC<TripFormProps> = ({ initialData, onSubmit, isEditMode = false }) => {
  const [formData, setFormData] = useState<TripFormData>({
    name: '',
    destination: '',
    startDate: '',
    endDate: '',
    description: '',
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg shadow-md">
      <Input
        label="Име на екскурзията"
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <Input
        label="Дестинация"
        type="text"
        name="destination"
        value={formData.destination}
        onChange={handleChange}
        required
      />
      <Input
        label="Начална дата"
        type="date"
        name="startDate"
        value={formData.startDate}
        onChange={handleChange}
        required
      />
      <Input
        label="Крайна дата"
        type="date"
        name="endDate"
        value={formData.endDate}
        onChange={handleChange}
        required
      />
      <div className="mb-4">
        <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1">
          Описание
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
          className="w-full p-2 border border-gray-700 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        ></textarea>
      </div>
      <Button type="submit" className="w-full mt-4">
        {isEditMode ? 'Запази промените' : 'Създай екскурзия'}
      </Button>
    </form>
  );
};

export default TripForm;