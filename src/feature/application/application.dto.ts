import z from "zod";
import type { applications } from "../../shared/db/schemas";
import { applicationStatusEnum } from "../../shared/db/schemas/enums.schema";

export type Application = typeof applications.$inferSelect;

export const createApplicationDto = z.object({
  jobOpeningId: z.uuid(),
  coverLetter: z.string().min(1, { error: "Cover letter is required" }),
  resume: z.string().min(1, { error: "Resume is required" }),
});

export const getApplicationDto = z.uuid();

export const updateApplicationDto = createApplicationDto.partial();

export const updateApplicationStatusDto = z.object({
  status: z.enum(applicationStatusEnum.enumValues),
  feedback: z.string().optional(),
});

export type CreateApplicationDto = z.infer<typeof createApplicationDto>;
export type GetApplicationDto = z.infer<typeof getApplicationDto>;
export type UpdateApplicationDto = z.infer<typeof updateApplicationDto>;
export type UpdateApplicationStatusDto = z.infer<typeof updateApplicationStatusDto>;
