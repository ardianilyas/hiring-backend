import z from "zod";
import { employmentTypeEnum, jobOpenings } from "../../db/schemas";
import { JOB_OPENING_DTO_VALIDATION_MESSAGE } from "./job-opening.constant";

export type JobOpening = typeof jobOpenings.$inferSelect;

export const createJobOpeningDto = z.object({
  departmentId: z.uuid({ error: JOB_OPENING_DTO_VALIDATION_MESSAGE.CREATE_JOB_OPENING.departmentId.required }),
  title: z.string().min(1, { error: JOB_OPENING_DTO_VALIDATION_MESSAGE.CREATE_JOB_OPENING.title.required }),
  description: z.string().min(1, { error: JOB_OPENING_DTO_VALIDATION_MESSAGE.CREATE_JOB_OPENING.description.required }),
  location: z.string().min(1, { error: JOB_OPENING_DTO_VALIDATION_MESSAGE.CREATE_JOB_OPENING.location.required }),
  employmentType: z.enum(employmentTypeEnum.enumValues, { error: JOB_OPENING_DTO_VALIDATION_MESSAGE.CREATE_JOB_OPENING.employmentType.enum }),
  isActive: z.boolean({ error: JOB_OPENING_DTO_VALIDATION_MESSAGE.CREATE_JOB_OPENING.isActive.boolean }).default(true),
});

export const getJobOpeningDto = z.uuid({ error: JOB_OPENING_DTO_VALIDATION_MESSAGE.GET_JOB_OPENING.id.uuid });
export const updateJobOpeningDto = createJobOpeningDto.partial();

export type CreateJobOpeningDto = z.infer<typeof createJobOpeningDto>;
export type GetJobOpeningDto = z.infer<typeof getJobOpeningDto>;
export type UpdateJobOpeningDto = z.infer<typeof updateJobOpeningDto>;