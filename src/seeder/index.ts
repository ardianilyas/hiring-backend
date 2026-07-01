import { seedDepartments } from "./department.seeder";
import { seedJobOpening } from "./job-opening.seeder";

async function seed() {
  try {
    console.log("Seeding database");

    const departmentIds = await seedDepartments(20);
    await seedJobOpening(departmentIds, 10);

    console.log("Database seeded");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

await seed();