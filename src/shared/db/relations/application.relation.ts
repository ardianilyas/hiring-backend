import { relations } from "drizzle-orm";
import { applications, jobOpenings, user } from "../schemas";

export const applicationsRelations = relations(applications, ({ one }) => ({
  jobOpening: one(jobOpenings, {
    fields: [applications.jobOpeningId],
    references: [jobOpenings.id],
  }),
  user: one(user, {
    fields: [applications.userId],
    references: [user.id],
  })
}));
