import { desc, eq } from "drizzle-orm";
import { db } from "../../shared/db";
import { departments } from "../../shared/db/schemas";
import { NotFoundError } from "../../shared/errors/not-found";
import type { CreateDepartmentDto, UpdateDepartmentDto } from "./department.dto";
import { DEPARTMENT_NOT_FOUND } from "./department.constant";

export class DepartmentService {
  async getDepartments() {
    return await db.select().from(departments).orderBy(desc(departments.createdAt));
  }

  async getDepartment(id: string) {
    const [department] = await db.select().from(departments).where(eq(departments.id, id));

    if (!department) {
      throw new NotFoundError(DEPARTMENT_NOT_FOUND);
    }

    return department;
  }

  async createDepartment(data: CreateDepartmentDto) {
    const [department] = await db.insert(departments).values(data).returning();

    return department;
  }

  async updateDepartment(id: string, data: UpdateDepartmentDto) {
    const [department] = await db
      .update(departments)
      .set(data)
      .where(eq(departments.id, id))
      .returning();

    if (!department) {
      throw new NotFoundError(DEPARTMENT_NOT_FOUND);
    }

    return department;
  }

  async deleteDepartment(id: string) {
    const [department] = await db.delete(departments).where(eq(departments.id, id)).returning();

    if (!department) {
      throw new NotFoundError(DEPARTMENT_NOT_FOUND);
    }

    return department;
  }
}