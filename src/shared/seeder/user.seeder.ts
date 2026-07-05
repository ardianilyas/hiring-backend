import { faker } from "@faker-js/faker";
import { db } from "../db";
import { user } from "../db/schemas";

export async function seedUsers(count: number = 0) {
  const data = Array.from({ length: count }, () => ({
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    role: faker.helpers.arrayElement(["admin", "user"] as const),
    emailVerified: faker.datatype.boolean(),
  }));

  const result = await db.insert(user).values(data).returning({ id: user.id });

  console.log(`Created ${count} users`);

  return result.map(item => item.id);
}
