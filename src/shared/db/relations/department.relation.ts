import { relations } from "drizzle-orm";
import { jobOpenings } from "../schemas/job-opening.schema";
import { departments } from "../schemas";

export const jobOpeningRelations = relations(
  jobOpenings, 
  ({ one }) => ({
    department: one(departments, {
      fields: [jobOpenings.departmentId],
      references: [departments.id]
    }),
  })
);
