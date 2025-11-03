import cors from "cors";
import express, { type Express } from "express";
import { pino } from "pino";

import { env } from "@/common/utils/envConfig";
import httpLogger from "@/common/middleware/requestLogger";
import errorHandler from "@/common/middleware/errorHandler";
import { healthCheckRouter } from "@/api/healthCheck/healthCheckRouter";
import { submissionRouter } from "@/api/submission/submissionRouter";

const serverLogger = pino({
  name: "server",
  transport: env.isDevelopment ? { target: "pino-pretty" } : undefined,
});
const app: Express = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Request logging
app.use(httpLogger);

// Routes
app.use("/health-check", healthCheckRouter);
app.use("/submission", submissionRouter);

// Error handlers
app.use(errorHandler());

export { app, serverLogger };
