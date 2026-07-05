import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { jobOpenings } from "./job-opening.schema";
import { user } from "./users.schema";
import { applicationStatusEnum } from "./enums.schema";

export const applications = pgTable("applications", {
  id: uuid("id").defaultRandom().primaryKey(),
  jobOpeningId: uuid("job_opening_id").references(() => jobOpenings.id).notNull(),
  userId: text("user_id").references(() => user.id).notNull(),
  coverLetter: text("cover_letter").notNull(),
  resume: text("resume").notNull(),
  status: applicationStatusEnum().default("applied"),
  feedback: text("feedback"),
  appliedAt: timestamp("applied_at").defaultNow().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
})