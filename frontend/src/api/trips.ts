// src/api/trips.ts
import axios from 'axios';
import { Trip, TripFormData } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; // Взимаме URL от .env

const api = axios.create({
  baseURL: `${API_BASE_URL}/trips`, // Пример: http://localhost:5000/api/trips
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getTrips = async (): Promise<Trip[]> => {
  try {
    const response = await api.get('/');
    return response.data;
  } catch (error) {
    console.error('Error fetching trips:', error);
    throw error;
  }
};

export const getTripById = async (id: number): Promise<Trip> => {
  try {
    const response = await api.get(`/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching trip with ID ${id}:`, error);
    throw error;
  }
};

export const createTrip = async (tripData: TripFormData): Promise<Trip> => {
  try {
    const response = await api.post('/', tripData);
    return response.data;
  } catch (error) {
    console.error('Error creating trip:', error);
    throw error;
  }
};

export const updateTrip = async (id: number, tripData: Partial<TripFormData>): Promise<Trip> => {
  try {
    const response = await api.put(`/${id}`, tripData);
    return response.data;
  } catch (error) {
    console.error(`Error updating trip with ID ${id}:`, error);
    throw error;
  }
};

export const deleteTrip = async (id: number): Promise<void> => {
  try {
    await api.delete(`/${id}`);
  } catch (error) {
    console.error(`Error deleting trip with ID ${id}:`, error);
    throw error;
  }
};