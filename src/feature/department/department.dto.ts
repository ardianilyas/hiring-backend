import z from "zod";
import type { departments } from "../../shared/db/schemas";
import { DEPARTMENT_DTO_VALIDATION_MESSAGE } from "./department.constant";

export type Department = typeof departments.$inferSelect;

export const createDepartmentDto = z.object({
  name: z.string().min(1, { error: DEPARTMENT_DTO_VALIDATION_MESSAGE.CREATE_DEPARTMENT.name.required }),
  description: z.string().min(1, { error: DEPARTMENT_DTO_VALIDATION_MESSAGE.CREATE_DEPARTMENT.description.required }),
  isActive: z.boolean({ error: DEPARTMENT_DTO_VALIDATION_MESSAGE.CREATE_DEPARTMENT.isActive.boolean }).default(true),
});

export const updateDepartmentDto = createDepartmentDto.partial();

export const getDepartmentDto = z.uuid({ error: DEPARTMENT_DTO_VALIDATION_MESSAGE.GET_DEPARTMENT.id.uuid });

export type CreateDepartmentDto = z.infer<typeof createDepartmentDto>;
export type UpdateDepartmentDto = z.infer<typeof updateDepartmentDto>;
export type GetDepartmentDto = z.infer<typeof getDepartmentDto>;