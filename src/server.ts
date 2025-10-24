import cors from "cors";
import express, { type Express } from "express";
import { pino } from "pino";

import { healthCheckRouter } from "@/api/healthCheck/healthCheckRouter";
import { env } from "@/common/utils/envConfig";
import httpLogger from "@/common/middleware/requestLogger";

const serverLogger = pino({
  name: "server",
  transport: env.isProduction ? undefined : { target: "pino-pretty" },
});
const app: Express = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Request Logging
app.use(httpLogger)

// Routes
app.use("/health-check", healthCheckRouter);

export { app, serverLogger };
