import { type ZodType } from "zod";
import { type RequestHandler } from "express";

export const validateRequest =
  (schemas: {
    body?: ZodType;
    query?: ZodType;
    params?: ZodType;
  }): RequestHandler =>
  async (req, _res, next) => {
    try {
      if (schemas.body) {
        await schemas.body.parseAsync(req.body);
      }

      if (schemas.query) {
        await schemas.query.parseAsync(req.query);
      }

      if (schemas.params) {
        await schemas.params.parseAsync(req.params);
      }

      next();
    } catch (error) {
      next(error);
    }
  };
