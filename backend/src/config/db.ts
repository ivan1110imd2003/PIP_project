import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { Trip } from "../entities/Trip"; // Това е правилно
import { User } from "../entities/User"; // Това е правилно

dotenv.config();

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 3306,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: process.env.NODE_ENV === "development" ? true : false,
  entities: [Trip, User],
  migrations: ["src/migration/**/*.ts"],
  subscribers: ["src/subscriber/**/*.ts"],
});
