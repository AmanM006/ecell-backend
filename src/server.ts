import cors from "cors";
import express, { type Express } from "express";
import { pino } from "pino";

const serverLogger = pino({ name: "server" });
const app: Express = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

export { app, serverLogger };
