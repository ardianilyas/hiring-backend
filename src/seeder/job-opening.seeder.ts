import { faker } from "@faker-js/faker";
import { db } from "../db";
import { jobOpenings } from "../db/schemas";
import type { CreateJobOpeningDto } from "../feature/job-opening/job-opening.dto";

export async function seedJobOpening(departmentIds: string[], count: number = 0, ) {
  if(departmentIds.length <= 0) throw new Error("Department ids empty");

  const data: CreateJobOpeningDto[] = Array.from({ length: count }, () => ({
    title: faker.lorem.sentence(),
    description: faker.lorem.sentence(),
    employmentType: faker.helpers.arrayElement(['full-time', 'part-time', 'contract', 'internship']),
    departmentId: faker.helpers.arrayElement(departmentIds),
    location: faker.location.city(),
    isActive: true,
  })) 

  await db.insert(jobOpenings).values(data);

  console.log(`Created ${count} job openings`);
}