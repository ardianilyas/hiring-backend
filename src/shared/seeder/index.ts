import { seedDepartments } from "./department.seeder";
import { seedJobOpening } from "./job-opening.seeder";
import { seedUsers } from "./user.seeder";
import { seedApplications } from "./application.seeder";

async function seed() {
  try {
    console.log("Seeding database");

    const departmentIds = await seedDepartments(20);
    const jobOpeningIds = await seedJobOpening(departmentIds, 10);
    const userIds = await seedUsers(15);
    await seedApplications(jobOpeningIds, userIds, 30);

    console.log("Database seeded");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

await seed();