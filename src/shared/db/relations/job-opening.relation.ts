import { relations } from "drizzle-orm";
import { jobOpenings } from "../schemas/job-opening.schema";
import { applications, departments } from "../schemas";

export const jobOpeningsRelations = relations(jobOpenings, ({ one, many }) => ({
    department: one(departments, {
      fields: [jobOpenings.departmentId],
      references: [departments.id],
    }),
    applications: many(applications),
  })
);
