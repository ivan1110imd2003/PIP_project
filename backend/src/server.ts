import 'reflect-metadata';
import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { AppDataSource } from './config/db';
import mainRouter from './routes';

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
    res.send('Hello from Group Trip Organizer API!');
});

app.use('/api', mainRouter);

const startServer = async () => {
    try {
        await AppDataSource.initialize();
        console.log("Data Source has been initialized!");

        app.listen(port, () => {
            console.log(`Backend server is running on http://localhost:${port}`);
        });
    } catch (error) {
        console.error("Error during Data Source initialization or server start:", error);
        process.exit(1);
    }
};

startServer();