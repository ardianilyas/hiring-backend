import { beforeEach, describe, expect, it } from "vitest";
import request from "supertest";
import app from "../../server";
import {
  APPLICATION_ROUTE_TEST,
  APPLICATION_SUCCESS_MESSAGE,
} from "./application.constant";
import { authenticate } from "../../../tests/helpers/auth.helper";
import { createTestApplication } from "../../shared/helpers/application.factory";
import { createTestJobOpening } from "../../shared/helpers/job-opening.factory";
import type { CreateApplicationDto } from "./application.dto";

describe("Application endpoint", () => {
  let applicationId: string;
  const invalidUuid = "00000000-0000-0000-0000-000000000000";

  beforeEach(async () => {
    const application = await createTestApplication();

    if (!application) {
      throw new Error("Failed to create application");
    }

    applicationId = application.id;
  });

  describe("GET /api/applications", () => {
    it("should return 401 if not authenticated", async () => {
      const response = await request(app).get(
        APPLICATION_ROUTE_TEST.GET_APPLICATIONS,
      );

      expect(response.status).toBe(401);
      expect(response.body.message).toBe("Unauthorized");
    });

    it("should return 403 if not an admin", async () => {
      const auth = await authenticate();
      const response = await auth.agent.get(
        APPLICATION_ROUTE_TEST.GET_APPLICATIONS,
      );

      expect(response.status).toBe(403);
      expect(response.body.message).toBe("Forbidden");
    });

    it("should return 200 and get applications", async () => {
      const auth = await authenticate("admin");
      const response = await auth.agent.get(
        APPLICATION_ROUTE_TEST.GET_APPLICATIONS,
      );

      expect(response.status).toBe(200);
      expect(response.body.message).toBe(APPLICATION_SUCCESS_MESSAGE);
      expect(response.body.data).toBeInstanceOf(Array);
    });
  });

  describe("GET /api/applications/:id", () => {
    it("should return 401 if not authenticated", async () => {
      const response = await request(app).get(
        APPLICATION_ROUTE_TEST.GET_APPLICATION(applicationId),
      );

      expect(response.status).toBe(401);
      expect(response.body.message).toBe("Unauthorized");
    });

    it("should return 403 if not an admin", async () => {
      const auth = await authenticate();
      const response = await auth.agent.get(
        APPLICATION_ROUTE_TEST.GET_APPLICATION(applicationId),
      );

      expect(response.status).toBe(403);
      expect(response.body.message).toBe("Forbidden");
    });

    it("should return 400 when id is not valid uuid", async () => {
      const auth = await authenticate("admin");
      const response = await auth.agent.get(
        APPLICATION_ROUTE_TEST.GET_APPLICATION("123123"),
      );

      expect(response.status).toBe(400);
      expect(response.body.message).toBe("Validation Error");
      expect(response.body.errors[0].message).toBe("Invalid UUID");
    });

    it("should return 404 when application not found", async () => {
      const auth = await authenticate("admin");
      const response = await auth.agent.get(
        APPLICATION_ROUTE_TEST.GET_APPLICATION(invalidUuid),
      );

      expect(response.status).toBe(404);
      expect(response.body.message).toBe("Application not found");
    });

    it("should return 200 and get application by id", async () => {
      const auth = await authenticate("admin");
      const response = await auth.agent.get(
        APPLICATION_ROUTE_TEST.GET_APPLICATION(applicationId),
      );

      expect(response.status).toBe(200);
      expect(response.body.message).toBe(APPLICATION_SUCCESS_MESSAGE);
      expect(response.body.data).toBeInstanceOf(Object);
      expect(response.body.data.user).toBeInstanceOf(Object);
    });
  });

  describe("POST /api/applications", () => {
    it("should return 401 if not authenticated", async () => {
      const response = await request(app).post(
        APPLICATION_ROUTE_TEST.CREATE_APPLICATION,
      );

      expect(response.status).toBe(401);
      expect(response.body.message).toBe("Unauthorized");
    });

    it("should return 400 if validation fails", async () => {
      const auth = await authenticate();
      const response = await auth.agent
        .post(APPLICATION_ROUTE_TEST.CREATE_APPLICATION)
        .send({});

      expect(response.status).toBe(400);
      expect(response.body.message).toBe("Validation Error");
    });

    it("should return 200 and create application", async () => {
      const auth = await authenticate();
      const jobOpening = await createTestJobOpening();

      if (!jobOpening) {
        throw new Error("Failed to create job opening");
      }

      const payload = {
        jobOpeningId: jobOpening.id,
        coverLetter: "My cover letter content",
        resume: "https://example.com/resume.pdf",
      };

      const response = await auth.agent
        .post(APPLICATION_ROUTE_TEST.CREATE_APPLICATION)
        .send(payload);

      expect(response.status).toBe(200);
      expect(response.body.message).toBe(APPLICATION_SUCCESS_MESSAGE);
      expect(response.body.data).toBeInstanceOf(Object);
      expect(response.body.data.jobOpeningId).toBe(payload.jobOpeningId);
      expect(response.body.data.coverLetter).toBe(payload.coverLetter);
      expect(response.body.data.resume).toBe(payload.resume);
    });
    it("should return 400 if job opening does not exist", async () => {
      const auth = await authenticate();
      
      const payload = {
        jobOpeningId: invalidUuid,
        coverLetter: "My cover letter content",
        resume: "https://example.com/resume.pdf",
      };

      const response = await auth.agent
        .post(APPLICATION_ROUTE_TEST.CREATE_APPLICATION)
        .send(payload);

      expect(response.status).toBe(400);
      expect(response.body.message).toBe("Related record not found");
    });
  });
});
