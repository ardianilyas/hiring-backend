import type { CreateJobOpeningDto } from "../feature/job-opening/job-opening.dto";
import { JobOpeningService } from "../feature/job-opening/job-opening.service";
import { createTestDepartment } from "./department.factory";

export async function createTestJobOpening(overrides: Partial<CreateJobOpeningDto> = {}) {
  const jobOpeningService = new JobOpeningService();

  const department = await createTestDepartment();

  if(!department) {
    throw new Error("Failed to create department");
  }

  const data: CreateJobOpeningDto = {
    title: "Software Engineer",
    description: "Software Engineer",
    departmentId: department.id,
    location: "Sleman",
    employmentType: "full-time",
    isActive: true,
    ...overrides
  }

  return await jobOpeningService.createJobOpening(data);
}