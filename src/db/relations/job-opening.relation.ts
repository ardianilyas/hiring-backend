import { relations } from "drizzle-orm";
import { departments } from "../schemas";
import { jobOpenings } from "../schemas/job-opening.schema";

export const departmentRelations = relations(
  departments,
  ({ many }) => ({
    jobOpenings: many(jobOpenings)
  })
);
