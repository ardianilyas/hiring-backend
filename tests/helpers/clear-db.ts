import { sql } from "drizzle-orm";
import { db } from "../../src/db";

export async function clearDb() {
  await db.execute(
    sql.raw(`
      TRUNCATE TABLE
        departments,
        job_openings
      RESTART IDENTITY
      CASCADE;
    `)
  );
}
