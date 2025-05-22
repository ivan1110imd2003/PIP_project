import { Request, Response } from 'express';
import * as tripService from '../services/trip.service';

export const createNewTrip = async (req: Request, res: Response): Promise<void> => {
    try {
        const trip = await tripService.createTrip(req.body);
        res.status(201).json(trip);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const fetchAllTrips = async (req: Request, res: Response): Promise<void> => {
    try {
        const trips = await tripService.getAllTrips();
        res.status(200).json(trips);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const fetchTripById = async (req: Request, res: Response): Promise<void> => {
    try {
        const trip = await tripService.getTripById(req.params.id);
        if (trip) {
            res.status(200).json(trip);
        } else {
            res.status(404).json({ message: 'Trip not found' });
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const modifyTrip = async (req: Request, res: Response): Promise<void> => {
    try {
        const trip = await tripService.updateTrip(req.params.id, req.body);
        if (trip) {
            res.status(200).json(trip);
        } else {
            res.status(404).json({ message: 'Trip not found' });
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const removeTrip = async (req: Request, res: Response): Promise<void> => {
    try {
        const success = await tripService.deleteTrip(req.params.id);
        if (success) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Trip not found or could not be deleted' });
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};