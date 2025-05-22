import { Router } from 'express';
import * as tripController from '../controllers/trip.controller';

const router = Router();

router.post('/', tripController.createNewTrip);

router.get('/', tripController.fetchAllTrips);            // GET /api/trips
router.get('/:id', tripController.fetchTripById);         // GET /api/trips/:id
router.put('/:id', tripController.modifyTrip);            // PUT /api/trips/:id
router.delete('/:id', tripController.removeTrip);         // DELETE /api/trips/:id

export default router;