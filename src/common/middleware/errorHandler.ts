import { type ErrorRequestHandler, type RequestHandler } from "express";
import status from "http-status";

import { serverLogger } from "@/server";
import { HttpException } from "@/common/models/httpException";

const unexpectedRequest: RequestHandler = (req, res) => {
  res
    .status(status.NOT_FOUND)
    .send(`Not Found ${req.method.toUpperCase()} ${req.url}`);
};

const errorHandler: ErrorRequestHandler = (error, req, res) => {
  serverLogger.error({ error, method: error.message });

  if (error instanceof HttpException) {
    return res.status(error.statusCode).json({
      success: false,
      message: error.message,
      payload: null,
    });
  }

  return res
    .status(status.INTERNAL_SERVER_ERROR)
    .json({ success: false, message: error.message, payload: null });
};

export default (): [RequestHandler, ErrorRequestHandler] => [
  unexpectedRequest,
  errorHandler,
];
