import z from "zod";
import type { departments } from "../../db/schemas";

export type Department = typeof departments.$inferSelect;

export const createDepartmentDto = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  isActive: z.boolean().default(true),
});

export const updateDepartmentDto = createDepartmentDto.partial();

export const getDepartmentDto = z.uuid({ error: "Invalid department id" });

export type CreateDepartmentDto = z.infer<typeof createDepartmentDto>;
export type UpdateDepartmentDto = z.infer<typeof updateDepartmentDto>;
export type GetDepartmentDto = z.infer<typeof getDepartmentDto>;