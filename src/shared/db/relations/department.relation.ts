import { relations } from "drizzle-orm";
import { jobOpenings } from "../schemas/job-opening.schema";
import { departments } from "../schemas";

export const departmentsRelations = relations(departments, ({ many }) => ({
    jobOpenings: many(jobOpenings),
  })
);
