import { faker } from "@faker-js/faker";
import { db } from "../db";
import { applications } from "../db/schemas";

export async function seedApplications(jobOpeningIds: string[], userIds: string[], count: number = 0) {
  if (jobOpeningIds.length <= 0) throw new Error("Job opening ids empty");
  if (userIds.length <= 0) throw new Error("User ids empty");

  const data = Array.from({ length: count }, () => ({
    jobOpeningId: faker.helpers.arrayElement(jobOpeningIds),
    userId: faker.helpers.arrayElement(userIds),
    coverLetter: faker.lorem.paragraphs(),
    resume: faker.internet.url(),
    status: faker.helpers.arrayElement(["applied", "reviewing", "interview", "rejected", "accepted"] as const),
    feedback: faker.helpers.maybe(() => faker.lorem.sentence()),
  }));

  await db.insert(applications).values(data);

  console.log(`Created ${count} applications`);
}
