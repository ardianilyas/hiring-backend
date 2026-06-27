import { afterEach, describe, expect, it } from "vitest";
import { clearDb } from "../../../tests/helpers/clear-db";
import { authenticate } from "../../../tests/helpers/auth.helper";
import request from "supertest";
import app from "../../server";

describe("Department endpoint test", () => {
  afterEach(async () => {
    await clearDb();
  });

  describe("GET /api/departments", () => {
    it("should return 401 if not authenticated", async () => {
      const response = await request(app).get("/api/departments");

      expect(response.status).toBe(401);
      expect(response.body.message).toBe("Unauthorized");
    });

    
    it("should get all departments", async () => {
      const auth = await authenticate();
      const response = await auth.agent.get("/api/departments");

      expect(response.status).toBe(200);
      expect(response.body.data).toBeInstanceOf(Array);
    });
  });
})