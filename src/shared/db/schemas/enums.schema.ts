import { pgEnum } from "drizzle-orm/pg-core";

export const roleEnum = pgEnum("role", 
  ["admin", "user"]
);

export const employmentTypeEnum = pgEnum("employment_type", 
  ["full-time", "part-time", "contract", "internship"]
);
