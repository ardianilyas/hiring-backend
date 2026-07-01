import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { clearDb } from "../../../tests/helpers/clear-db";
import request from "supertest";
import app from "../../server";
import { authenticate } from "../../../tests/helpers/auth.helper";
import { createTestJobOpening } from "../../helpers/job-opening.factory";
import { JOB_OPENING_DTO_VALIDATION_MESSAGE, JOB_OPENING_NOT_FOUND, JOB_OPENING_ROUTE_TEST, JOB_OPENING_SUCCESS_MESSAGE } from "./job-opening.constant";
import type { CreateJobOpeningDto } from "./job-opening.dto";

describe("Job opening test", () => {
  let jobOpeningId: string;
  let departmentId: string;
  const invalidUuid = "00000000-0000-0000-0000-000000000000";

  const data: Partial<CreateJobOpeningDto> = {
    title: "Software Engineer",
    description: "Software Engineer",
    location: "Jakarta",
    employmentType: "internship",
    isActive: true
  }

  beforeEach(async () => {
    const jobOpening = await createTestJobOpening();

    if(!jobOpening) {
      throw new Error("Failed to create job opening");
    }

    departmentId = jobOpening.departmentId;
    jobOpeningId = jobOpening.id;
  });

  describe("GET /api/job-openings", () => {
    it("should return 401 if not authenticated", async () => {
      const response = await request(app).get(JOB_OPENING_ROUTE_TEST.GET_JOB_OPENINGS);

      expect(response.status).toBe(401);
      expect(response.body.message).toBe("Unauthorized");
    });

    it("should return 403 if not an admin", async () => {
      const auth = await authenticate();
      const response = await auth.agent.get(JOB_OPENING_ROUTE_TEST.GET_JOB_OPENINGS);

      expect(response.status).toBe(403);
      expect(response.body.message).toBe("Forbidden");
    });

    it("should return 200 and get job openings", async () => {
      const auth = await authenticate('admin');
      const response = await auth.agent.get(JOB_OPENING_ROUTE_TEST.GET_JOB_OPENINGS);

      expect(response.status).toBe(200);
      expect(response.body.message).toBe(JOB_OPENING_SUCCESS_MESSAGE.GET_JOB_OPENINGS);
      expect(response.body.data).toBeInstanceOf(Array);
      expect(response.body.data[0].department).toBeInstanceOf(Object);
    });
  });

  describe("GET api/job-openings/:id", () => {
    it("should return 401 if not authenticated", async () => {
      const response = await request(app).get(JOB_OPENING_ROUTE_TEST.GET_JOB_OPENING(jobOpeningId));

      expect(response.status).toBe(401);
      expect(response.body.message).toBe("Unauthorized");
    });

    it("should return 403 if not an admin", async () => {
      const auth = await authenticate();
      const response = await auth.agent.get(JOB_OPENING_ROUTE_TEST.GET_JOB_OPENING(jobOpeningId));

      expect(response.status).toBe(403);
      expect(response.body.message).toBe("Forbidden");
    });

    it("should return 400 when id is not valid uuid", async () => {
      const auth = await authenticate('admin');
      const response = await auth.agent.get(JOB_OPENING_ROUTE_TEST.GET_JOB_OPENING("123123"));

      expect(response.status).toBe(400);
      expect(response.body.message).toBe("Validation Error");
      expect(response.body.errors[0].message).toBe(JOB_OPENING_DTO_VALIDATION_MESSAGE.GET_JOB_OPENING.id.uuid);
    });

    it("should return 404 when job opening not found", async () => {
      const auth = await authenticate('admin');
      const response = await auth.agent.get(JOB_OPENING_ROUTE_TEST.GET_JOB_OPENING(invalidUuid));

      expect(response.status).toBe(404);
      expect(response.body.message).toBe(JOB_OPENING_NOT_FOUND);
    });

    it("should return 200 and get job opening", async () => {
      const auth = await authenticate('admin');
      const response = await auth.agent.get(JOB_OPENING_ROUTE_TEST.GET_JOB_OPENING(jobOpeningId));

      expect(response.status).toBe(200);
      expect(response.body.message).toBe(JOB_OPENING_SUCCESS_MESSAGE.GET_JOB_OPENING)
      expect(response.body.data).toBeInstanceOf(Object);
      expect(response.body.data.department).toBeInstanceOf(Object);
    });
  });

  describe("POST /api/job-opening", () => {
    it("should return 401 if not authenticated", async () => {
      const response = await request(app).post(JOB_OPENING_ROUTE_TEST.CREATE_JOB_OPENING).send(data);

      expect(response.status).toBe(401);
      expect(response.body.message).toBe("Unauthorized");
    });

    it("should return 403 if not admin", async () => {
      const auth = await authenticate();
      const response = await auth.agent.post(JOB_OPENING_ROUTE_TEST.CREATE_JOB_OPENING).send(data);

      expect(response.status).toBe(403);
      expect(response.body.message).toBe("Forbidden");
    });

    it("should return 400 when data is invalid", async () => {
      const auth = await authenticate('admin');
      const response = await auth.agent.post(JOB_OPENING_ROUTE_TEST.CREATE_JOB_OPENING).send({
        departmentId: "",
        title: "",
        description: "",
        location: "",
        employmentType: ""
      });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe("Validation Error");
      
      expect(response.body.errors[0].message).toBe(JOB_OPENING_DTO_VALIDATION_MESSAGE.CREATE_JOB_OPENING.departmentId.required);
      expect(response.body.errors[1].message).toBe(JOB_OPENING_DTO_VALIDATION_MESSAGE.CREATE_JOB_OPENING.title.required);
      expect(response.body.errors[2].message).toBe(JOB_OPENING_DTO_VALIDATION_MESSAGE.CREATE_JOB_OPENING.description.required);
      expect(response.body.errors[3].message).toBe(JOB_OPENING_DTO_VALIDATION_MESSAGE.CREATE_JOB_OPENING.location.required);
      expect(response.body.errors[4].message).toBe(JOB_OPENING_DTO_VALIDATION_MESSAGE.CREATE_JOB_OPENING.employmentType.enum);
    });

    it("should return 200 and create job opening", async () => {
      const auth = await authenticate('admin');
      const response = await auth.agent.post(JOB_OPENING_ROUTE_TEST.CREATE_JOB_OPENING).send({...data, departmentId });

      expect(response.status).toBe(200);
      expect(response.body.message).toBe(JOB_OPENING_SUCCESS_MESSAGE.CREATE_JOB_OPENING);
      expect(response.body.data).toBeInstanceOf(Object);
    });
  });

  describe("PUT /api/job-opening/:id", () => {
    it("should return 401 if not authenticated", async () => {
      const response = await request(app).put(JOB_OPENING_ROUTE_TEST.UPDATE_JOB_OPENING(jobOpeningId)).send(data);

      expect(response.status).toBe(401);
      expect(response.body.message).toBe("Unauthorized");
    });

    it("should return 403 if not admin", async () => {
      const auth = await authenticate();
      const response = await auth.agent.put(JOB_OPENING_ROUTE_TEST.UPDATE_JOB_OPENING(jobOpeningId)).send(data);

      expect(response.status).toBe(403);
      expect(response.body.message).toBe("Forbidden");
    });

    it("should return 400 when id is not valid uuid", async () => {
      const auth = await authenticate('admin');
      const response = await auth.agent.put(JOB_OPENING_ROUTE_TEST.UPDATE_JOB_OPENING("123123")).send(data);  

      expect(response.status).toBe(400);
      expect(response.body.message).toBe("Validation Error");
      expect(response.body.errors[0].message).toBe(JOB_OPENING_DTO_VALIDATION_MESSAGE.GET_JOB_OPENING.id.uuid);
    });

    it("should return 404 when job opening not found", async () => {
      const auth = await authenticate('admin');
      const response = await auth.agent.put(JOB_OPENING_ROUTE_TEST.UPDATE_JOB_OPENING(invalidUuid)).send(data);

      expect(response.status).toBe(404);
      expect(response.body.message).toBe(JOB_OPENING_NOT_FOUND);
    });

    it("should return 200 and update job opening", async () => {
      const auth = await authenticate('admin');
      const response = await auth.agent.put(JOB_OPENING_ROUTE_TEST.UPDATE_JOB_OPENING(jobOpeningId)).send({
        title: "Web Developer",
      });

      expect(response.status).toBe(200);
      expect(response.body.message).toBe(JOB_OPENING_SUCCESS_MESSAGE.UPDATE_JOB_OPENING);
      expect(response.body.data).toBeInstanceOf(Object);
      expect(response.body.data.title).toBe("Web Developer");
    });
  });

  describe("DELETE /api/job-opening/:id", () => {
    it("should return 401 if not authenticated", async () => {
      const response = await request(app).delete(JOB_OPENING_ROUTE_TEST.DELETE_JOB_OPENING(jobOpeningId));

      expect(response.status).toBe(401);
      expect(response.body.message).toBe("Unauthorized");
    });

    it("should return 403 if not admin", async () => {
      const auth = await authenticate();
      const response = await auth.agent.delete(JOB_OPENING_ROUTE_TEST.DELETE_JOB_OPENING(jobOpeningId));

      expect(response.status).toBe(403);
      expect(response.body.message).toBe("Forbidden");
    });

    it("should return 404 when job opening not found", async () => {
      const auth = await authenticate('admin');
      const response = await auth.agent.delete(JOB_OPENING_ROUTE_TEST.DELETE_JOB_OPENING(invalidUuid));

      expect(response.status).toBe(404);
      expect(response.body.message).toBe(JOB_OPENING_NOT_FOUND);
    });

    it("should return 200 and delete job opening", async () => {
      const auth = await authenticate('admin');
      const response = await auth.agent.delete(JOB_OPENING_ROUTE_TEST.DELETE_JOB_OPENING(jobOpeningId));

      expect(response.status).toBe(200);
      expect(response.body.message).toBe(JOB_OPENING_SUCCESS_MESSAGE.DELETE_JOB_OPENING);
      expect(response.body.data).toBeInstanceOf(Object);
    });
  });
});