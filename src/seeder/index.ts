import { seedDepartments } from "./department.seeder";

async function seed() {
  try {
    console.log("Seeding database");

    await seedDepartments(20);

    console.log("Database seeded");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

await seed();