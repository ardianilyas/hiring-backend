import { beforeEach, describe, expect, it } from "vitest";
import { authenticate } from "../../../tests/helpers/auth.helper";
import request from "supertest";
import app from "../../server";
import { DEPARTMENT_DTO_VALIDATION_MESSAGE, DEPARTMENT_NOT_FOUND, DEPARTMENT_ROUTE_TEST, DEPARTMENT_SUCCESS_MESSAGE } from "./department.constant";
import { createTestDepartment } from "../../helpers/department.factory";

describe("Department endpoint test", () => {
  let departmentId: string;
  const invalidUuid = "00000000-0000-0000-0000-000000000000";

  beforeEach(async () => {
    const department = await createTestDepartment();

    if(!department) {
      throw new Error("Failed to create department");
    }

    departmentId = department.id;
  });

  describe("GET /api/departments", () => {
    it("should return 401 if not authenticated", async () => {
      const response = await request(app).get(DEPARTMENT_ROUTE_TEST.GET_DEPARTMENTS);

      expect(response.status).toBe(401);
      expect(response.body.message).toBe("Unauthorized");
    });
    
    it("should return 200 and get all departments", async () => {
      const auth = await authenticate();
      const response = await auth.agent.get(DEPARTMENT_ROUTE_TEST.GET_DEPARTMENTS);

      expect(response.status).toBe(200);
      expect(response.body.data).toBeInstanceOf(Array);
    });
  });

  describe("GET /api/departments/:id", async () => {
    it("should return 401 if not authenticated", async () => {
      const response = await request(app).get(DEPARTMENT_ROUTE_TEST.GET_DEPARTMENT(departmentId));

      expect(response.status).toBe(401);
      expect(response.body.message).toBe("Unauthorized");
    });

    it("should return 400 when id is not valid uuid", async () => {
      const auth = await authenticate();
      const response = await auth.agent.get(DEPARTMENT_ROUTE_TEST.GET_DEPARTMENT("invalid-uuid"));

      expect(response.status).toBe(400);
      expect(response.body.message).toBe("Validation Error");
      expect(response.body.errors[0].message).toBe(DEPARTMENT_DTO_VALIDATION_MESSAGE.GET_DEPARTMENT.id.uuid);
    })

    it("should return 404 when department not found", async () => {
      const auth = await authenticate();
      const response = await auth.agent.get(DEPARTMENT_ROUTE_TEST.GET_DEPARTMENT(invalidUuid));

      expect(response.status).toBe(404);
      expect(response.body.message).toBe("Department not found");
    })

    it("should return 200 and get department by id", async () => {
      const auth = await authenticate();
      const response = await auth.agent.get(DEPARTMENT_ROUTE_TEST.GET_DEPARTMENT(departmentId));

      expect(response.status).toBe(200);
      expect(response.body.data).toBeInstanceOf(Object);
    });
  });

  describe("POST /api/departments", async () => {
    it("should return 401 if not authenticated", async () => {
      const response = await request(app).post(DEPARTMENT_ROUTE_TEST.CREATE_DEPARTMENT).send({});

      expect(response.status).toBe(401);
      expect(response.body.message).toBe("Unauthorized");
    });

    it("should return 403 if not admin", async () => {
      const auth = await authenticate();
      const response = await auth.agent.post(DEPARTMENT_ROUTE_TEST.CREATE_DEPARTMENT).send({});

      expect(response.status).toBe(403);
      expect(response.body.message).toBe("Forbidden");
    })

    it("should return 400 when data is invalid", async () => {
      const auth = await authenticate('admin');
      const response = await auth.agent.post(DEPARTMENT_ROUTE_TEST.CREATE_DEPARTMENT).send({
        name: "",
        description: "",
      });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe("Validation Error");
      expect(response.body.errors[0].message).toBe(DEPARTMENT_DTO_VALIDATION_MESSAGE.CREATE_DEPARTMENT.name.required);
      expect(response.body.errors[1].message).toBe(DEPARTMENT_DTO_VALIDATION_MESSAGE.CREATE_DEPARTMENT.description.required);
    });

    it("should return 201 and create department", async () => {
      const auth = await authenticate('admin');
      const response = await auth.agent.post(DEPARTMENT_ROUTE_TEST.CREATE_DEPARTMENT).send({
        name: "Finance",
        description: "Finance department",
        isActive: true,
      });

      expect(response.status).toBe(200);
      expect(response.body.data).toBeInstanceOf(Object);
    });
  });

  describe("PUT /api/departments/:id", async () => {
    it("should return 401 if not authenticated", async () => {
      const response = await request(app).put(DEPARTMENT_ROUTE_TEST.UPDATE_DEPARTMENT(departmentId)).send({});

      expect(response.status).toBe(401);
      expect(response.body.message).toBe("Unauthorized");
    });

    it("should return 403 if not admin", async () => {
      const auth = await authenticate();
      const response = await auth.agent.put(DEPARTMENT_ROUTE_TEST.UPDATE_DEPARTMENT(departmentId)).send({});

      expect(response.status).toBe(403);
      expect(response.body.message).toBe("Forbidden");
    });

    it("should return 400 when id is not valid uuid", async () => {
      const auth = await authenticate('admin');
      const response = await auth.agent.put(DEPARTMENT_ROUTE_TEST.UPDATE_DEPARTMENT("invalid-uuid")).send({});  

      expect(response.status).toBe(400);
      expect(response.body.message).toBe("Validation Error");
      expect(response.body.errors[0].message).toBe(DEPARTMENT_DTO_VALIDATION_MESSAGE.UPDATE_DEPARTMENT.id.uuid);
    });

    it("should return 404 when department not found", async () => {
      const auth = await authenticate('admin');
      const response = await auth.agent.put(DEPARTMENT_ROUTE_TEST.UPDATE_DEPARTMENT(invalidUuid)).send({});

      expect(response.status).toBe(404);
      expect(response.body.message).toBe(DEPARTMENT_NOT_FOUND);
    });

    it("should return 200 and update department", async () => {
      const auth = await authenticate('admin');
      const response = await auth.agent.put(DEPARTMENT_ROUTE_TEST.UPDATE_DEPARTMENT(departmentId)).send({
        name: "Finance",
        description: "Finance department",
        isActive: true,
      });

      expect(response.status).toBe(200);
      expect(response.body.data).toBeInstanceOf(Object);
      expect(response.body.message).toBe(DEPARTMENT_SUCCESS_MESSAGE.UPDATE_DEPARTMENT);
    });
  });

  describe("DELETE /api/departments/:id", async () => {
    it("should return 401 if not authenticated", async () => {
      const response = await request(app).delete(DEPARTMENT_ROUTE_TEST.DELETE_DEPARTMENT(departmentId));

      expect(response.status).toBe(401);
      expect(response.body.message).toBe("Unauthorized");
    });

    it("should return 403 if not admin", async () => {
      const auth = await authenticate();
      const response = await auth.agent.delete(DEPARTMENT_ROUTE_TEST.DELETE_DEPARTMENT(departmentId));

      expect(response.status).toBe(403);
      expect(response.body.message).toBe("Forbidden");
    });

    it("should return 404 when department not found", async () => {
      const auth = await authenticate('admin');
      const response = await auth.agent.delete(DEPARTMENT_ROUTE_TEST.DELETE_DEPARTMENT(invalidUuid));

      expect(response.status).toBe(404);
      expect(response.body.message).toBe(DEPARTMENT_NOT_FOUND);
    });

    it("should return 200 and delete department", async () => {
      const auth = await authenticate('admin');
      const response = await auth.agent.delete(DEPARTMENT_ROUTE_TEST.DELETE_DEPARTMENT(departmentId));

      expect(response.status).toBe(200);
      expect(response.body.data).toBeInstanceOf(Object);
      expect(response.body.message).toBe(DEPARTMENT_SUCCESS_MESSAGE.DELETE_DEPARTMENT);
    });
  });
})