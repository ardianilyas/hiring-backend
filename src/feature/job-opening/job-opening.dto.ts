import z from "zod";
import { employmentTypeEnum, jobOpenings } from "../../db/schemas";

export const JobOpening = jobOpenings.$inferSelect;

export const createJobOpeningDto = z.object({
  departmentId: z.uuid({ error: "Department id is required" }),
  title: z.string().min(1, { error: "Title is required" }),
  description: z.string().min(1, { error: "Description is required" }),
  location: z.string().min(1, { error: "Location is required" }),
  employmentType: z.enum(employmentTypeEnum.enumValues, { error: "Please select a valid employment type" }),
  isActive: z.boolean({ error: "Is active is required" }).default(true),
});

export const getJobOpeningDto = z.uuid({ error: "Id should be uuid" });
export const updateJobOpeningDto = createJobOpeningDto.partial();

export type CreateJobOpeningDto = z.infer<typeof createJobOpeningDto>;
export type GetJobOpeningDto = z.infer<typeof getJobOpeningDto>;
export type UpdateJobOpeningDto = z.infer<typeof updateJobOpeningDto>;