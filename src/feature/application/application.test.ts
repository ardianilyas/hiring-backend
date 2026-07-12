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
      expect(response.body.data[0].jobOpening).toBeInstanceOf(Object);
      expect(response.body.data[0].jobOpening.title).toBeDefined();
      expect(response.body.meta).toBeDefined();
      expect(response.body.meta.page).toBe(1);
      expect(response.body.meta.limit).toBe(10);
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

    it("should return 403 if not an admin and not owner", async () => {
      const auth = await authenticate();
      const response = await auth.agent.get(
        APPLICATION_ROUTE_TEST.GET_APPLICATION(applicationId),
      );

      expect(response.status).toBe(403);
      expect(response.body.message).toBe("Forbidden");
    });

    it("should return 200 if the user is the owner", async () => {
      const auth = await authenticate();
      const jobOpening = await createTestJobOpening();

      if (!jobOpening) throw new Error("Failed to create job opening");

      const createResponse = await auth.agent
        .post(APPLICATION_ROUTE_TEST.CREATE_APPLICATION)
        .send({
          jobOpeningId: jobOpening.id,
          coverLetter: "Owner cover letter",
          resume: "https://example.com/resume.pdf",
        });
        
      const myApplicationId = createResponse.body.data.id;

      const response = await auth.agent.get(
        APPLICATION_ROUTE_TEST.GET_APPLICATION(myApplicationId),
      );

      expect(response.status).toBe(200);
      expect(response.body.message).toBe(APPLICATION_SUCCESS_MESSAGE);
      expect(response.body.data.id).toBe(myApplicationId);
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

  describe("GET /api/applications/me", () => {
    it("should return 401 if not authenticated", async () => {
      const response = await request(app).get(
        APPLICATION_ROUTE_TEST.GET_MY_APPLICATIONS,
      );

      expect(response.status).toBe(401);
      expect(response.body.message).toBe("Unauthorized");
    });

    it("should return 200 and get my applications", async () => {
      // First, create an application as a user
      const auth = await authenticate();
      const jobOpening = await createTestJobOpening();

      if (!jobOpening) throw new Error("Failed to create job opening");

      await auth.agent
        .post(APPLICATION_ROUTE_TEST.CREATE_APPLICATION)
        .send({
          jobOpeningId: jobOpening.id,
          coverLetter: "My cover letter",
          resume: "https://example.com/resume.pdf",
        });

      const response = await auth.agent.get(
        APPLICATION_ROUTE_TEST.GET_MY_APPLICATIONS,
      );

      expect(response.status).toBe(200);
      expect(response.body.message).toBe(APPLICATION_SUCCESS_MESSAGE);
      expect(response.body.data).toBeInstanceOf(Array);
      expect(response.body.data.length).toBeGreaterThanOrEqual(1);
      expect(response.body.data[0].coverLetter).toBe("My cover letter");
    });
  });

  describe("PATCH /api/applications/:id/status", () => {
    it("should return 401 if not authenticated", async () => {
      const response = await request(app).patch(
        APPLICATION_ROUTE_TEST.UPDATE_APPLICATION_STATUS(applicationId),
      );

      expect(response.status).toBe(401);
      expect(response.body.message).toBe("Unauthorized");
    });

    it("should return 403 if not an admin", async () => {
      const auth = await authenticate();
      const response = await auth.agent.patch(
        APPLICATION_ROUTE_TEST.UPDATE_APPLICATION_STATUS(applicationId),
      ).send({ status: "reviewing" });

      expect(response.status).toBe(403);
      expect(response.body.message).toBe("Forbidden");
    });

    it("should return 400 when id is not valid uuid", async () => {
      const auth = await authenticate("admin");
      const response = await auth.agent.patch(
        APPLICATION_ROUTE_TEST.UPDATE_APPLICATION_STATUS("invalid-uuid"),
      ).send({ status: "reviewing" });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe("Validation Error");
      expect(response.body.errors[0].message).toBe("Invalid UUID");
    });

    it("should return 400 when status is missing", async () => {
      const auth = await authenticate("admin");
      const response = await auth.agent.patch(
        APPLICATION_ROUTE_TEST.UPDATE_APPLICATION_STATUS(applicationId),
      ).send({});

      expect(response.status).toBe(400);
      expect(response.body.message).toBe("Validation Error");
      expect(response.body.errors[0].message).toContain("Invalid option: expected one of");
    });

    it("should return 400 when status is invalid enum", async () => {
      const auth = await authenticate("admin");
      const response = await auth.agent.patch(
        APPLICATION_ROUTE_TEST.UPDATE_APPLICATION_STATUS(applicationId),
      ).send({ status: "invalid_status" });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe("Validation Error");
      expect(response.body.errors[0].message).toContain("Invalid option: expected one of");
    });

    it("should return 404 when application not found", async () => {
      const auth = await authenticate("admin");
      const response = await auth.agent.patch(
        APPLICATION_ROUTE_TEST.UPDATE_APPLICATION_STATUS(invalidUuid),
      ).send({ status: "reviewing" });

      expect(response.status).toBe(404);
      expect(response.body.message).toBe("Application not found");
    });

    it("should return 200 and update status to reviewing", async () => {
      const auth = await authenticate("admin");
      const response = await auth.agent.patch(
        APPLICATION_ROUTE_TEST.UPDATE_APPLICATION_STATUS(applicationId),
      ).send({ status: "reviewing" });

      expect(response.status).toBe(200);
      expect(response.body.message).toBe(APPLICATION_SUCCESS_MESSAGE);
      expect(response.body.data.status).toBe("reviewing");
    });

    it("should return 200 and update status with feedback", async () => {
      const auth = await authenticate("admin");
      const response = await auth.agent.patch(
        APPLICATION_ROUTE_TEST.UPDATE_APPLICATION_STATUS(applicationId),
      ).send({ status: "rejected", feedback: "Not enough experience" });

      expect(response.status).toBe(200);
      expect(response.body.message).toBe(APPLICATION_SUCCESS_MESSAGE);
      expect(response.body.data.status).toBe("rejected");
      expect(response.body.data.feedback).toBe("Not enough experience");
    });
  });
});
