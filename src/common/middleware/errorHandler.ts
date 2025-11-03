import { ZodError } from "zod";
import { type ErrorRequestHandler, type RequestHandler } from "express";
import status from "http-status";

import { HttpException } from "@/common/models/httpException";

const unexpectedRequest: RequestHandler = (req, res) => {
  res
    .status(status.NOT_FOUND)
    .send(`Not Found ${req.method.toUpperCase()} ${req.url}`);
};

const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  if (error instanceof HttpException) {
    return res.status(error.statusCode).json({
      success: false,
      message: error.message,
      payload: null,
    });
  }

  if (error instanceof ZodError) {
    // Collect only the field names that failed
    const fields = error.issues.map((e) =>
      e.path.length > 0 ? e.path.join(".") : "request",
    );

    // Remove duplicates and join into a short message
    const uniqueFields = [...new Set(fields)];
    const fieldList = uniqueFields.join(", ");

    const errorMessage = `Invalid input(s): ${fieldList}`;

    return res.status(status.BAD_REQUEST).json({
      success: false,
      message: errorMessage,
      payload: null,
    });
  }

  return res
    .status(status.INTERNAL_SERVER_ERROR)
    .json({ success: false, message: error.message, payload: null });
};

export { unexpectedRequest, errorHandler };
