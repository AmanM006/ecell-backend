import express from "express";
import request from "supertest";
import status from "http-status";

import errorHandler from "@/common/middleware/errorHandler";
import requestLogger from "@/common/middleware/requestLogger";

describe("Request Logger Middleware", () => {
  const app = express();

  beforeAll(() => {
    app.use(requestLogger);
    app.get("/success", (_req, res) => {
      res.status(status.OK).send("Success");
    });
    app.get("/redirect", (_req, res) => res.redirect("/success"));
    app.get("/error", () => {
      throw new Error("Test error");
    });
    app.use(errorHandler());
  });

  describe("Successful requests", () => {
    it("logs successful requests", async () => {
      const response = await request(app).get("/success");
      expect(response.status).toBe(status.OK);
    });

    it("checks existing request id", async () => {
      const requestId = "test-request-id";
      const response = await request(app)
        .get("/success")
        .set("X-Request-Id", requestId);
      expect(response.status).toBe(status.OK);
    });
  });

  describe("Re-directions", () => {
    it("logs re-directions correctly", async () => {
      const response = await request(app).get("/redirect");
      expect(response.status).toBe(status.FOUND);
    });
  });

  describe("Error handling", () => {
    it("logs thrown errors with a 500 status code", async () => {
      const response = await request(app).get("/error");
      expect(response.status).toBe(status.INTERNAL_SERVER_ERROR);
    });

    it("logs 404 for unknown routes", async () => {
      const response = await request(app).get("/unknown");
      expect(response.status).toBe(status.NOT_FOUND);
    });
  });
});
