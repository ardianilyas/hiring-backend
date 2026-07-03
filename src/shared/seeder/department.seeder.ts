import { faker } from "@faker-js/faker";
import { db } from "../db";
import { departments } from "../db/schemas";
import type { CreateDepartmentDto } from "../../feature/department/department.dto";

export async function seedDepartments(count: number = 0) {
  
  const data: CreateDepartmentDto[] = Array.from({ length: count }, () => ({
    name: faker.commerce.department(),
    description: faker.company.buzzPhrase(),
    isActive: faker.datatype.boolean(),
  }));

  const result = await db.insert(departments).values(data).returning({ id: departments.id });

  console.log(`Created ${count} departments`);

  return result.map((item) => item.id);
}