import { Router } from 'express';
import tripRoutes from './trip.routes';

const mainRouter = Router();

mainRouter.use('/trips', tripRoutes);

export default mainRouter;