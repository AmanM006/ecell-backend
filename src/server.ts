import cors from "cors";
import express, { type Express } from "express";
import { pino } from "pino";

import { healthCheckRouter } from "@/api/healthCheck/healthCheckRouter";

const serverLogger = pino({ name: "server" });
const app: Express = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Routes
app.use("/health-check", healthCheckRouter);

export { app, serverLogger };
