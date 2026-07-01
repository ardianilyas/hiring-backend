import type { CreateDepartmentDto } from "../feature/department/department.dto";
import { DepartmentService } from "../feature/department/department.service";

export async function createTestDepartment(overrides: Partial<CreateDepartmentDto> = {}) {
  const departmentService = new DepartmentService();

  return await departmentService.createDepartment({
    name: "Finance",
    description: "Finance department",
    isActive: true,
    ...overrides
  })
}