import { AppDataSource } from '../config/db';
import { Trip } from '../entities/Trip';
import { User } from '../entities/User';

const tripRepository = AppDataSource.getRepository(Trip);


export const createTrip = async (tripData: Partial<Trip>, organizerId?: string): Promise<Trip> => {
    const newTrip = tripRepository.create(tripData);
    if (organizerId) {

        newTrip.organizerId = organizerId;
    }
    return tripRepository.save(newTrip);
};

export const getAllTrips = async (): Promise<Trip[]> => {
    return tripRepository.find({ relations: ['organizer'] });
};

export const getTripById = async (id: string): Promise<Trip | null> => {
    return tripRepository.findOne({ where: { id }, relations: ['organizer'] });
};

export const updateTrip = async (id: string, tripData: Partial<Trip>): Promise<Trip | null> => {
    await tripRepository.update(id, tripData);
    return getTripById(id);
};

export const deleteTrip = async (id: string): Promise<boolean> => {
    const result = await tripRepository.delete(id);
    return result.affected !== null && result.affected !== undefined && result.affected > 0;
};