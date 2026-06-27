import { faker } from "@faker-js/faker";
import { db } from "../db";
import { departments } from "../db/schemas";

export async function seedDepartments(count: number = 0) {
  for (let i = 0; i < count; i++) {
    await db.insert(departments).values({
      name: faker.commerce.department(),
      description: faker.company.buzzPhrase(),
    });
  }

  console.log(`Created ${count} departments`);
}