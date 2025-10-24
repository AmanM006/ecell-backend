import { type ZodAny, type ZodError } from "zod";
import { type RequestHandler } from "express";
import status from "http-status";

import { HttpException } from "@/common/models/httpException";

export const validateRequest =
  (schema: ZodAny): RequestHandler =>
  async (req, _res, next) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      next();
    } catch (error) {
      const errors = (error as ZodError).issues.map((e) => {
        const fieldPath = e.path.length > 0 ? e.path.join(".") : "root";
        return `${fieldPath}: ${e.message}`;
      });

      const errorMessage =
        errors.length === 1
          ? `Invalid input: ${errors[0]}`
          : `Invalid input (${errors.length} errors): ${errors.join("; ")}`;

      throw new HttpException(status.BAD_REQUEST, errorMessage);
    }
  };
