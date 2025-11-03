import request from "supertest";
import status from "http-status";

import { app } from "@/server";

interface ResponseSchema {
  success: boolean;
  message: string;
  payload: null;
}

describe("Health Check API endpoints", () => {
  it("GET / - success", async () => {
    const response = await request(app).get("/health-check");
    const result: ResponseSchema = response.body;

    expect(response.statusCode).toEqual(status.OK);
    expect(result.success).toBeTruthy();
    expect(result.payload).toBeNull();
    expect(result.message).toEqual("Service is healthy and running");
  });
});
