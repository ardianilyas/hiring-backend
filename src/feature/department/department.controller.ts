import { asyncHandler } from "../../shared/utils/async-handler";
import { sendSuccess } from "../../shared/utils/response";
import { validate } from "../../shared/utils/validate";
import { createDepartmentDto, getDepartmentDto, updateDepartmentDto } from "./department.dto";
import type { DepartmentService } from "./department.service";
import type { Request, Response } from "express";

export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  getDepartments = asyncHandler(async(req: Request, res: Response) => {
    const departments = await this.departmentService.getDepartments();
    return sendSuccess(res, "Departments fetched successfully", departments);
  });

  getDepartment = asyncHandler(async(req: Request, res: Response) => {
    const id = validate(getDepartmentDto, req.params.id);
    const department = await this.departmentService.getDepartment(id);
    return sendSuccess(res, "Department fetched successfully", department);
  });

  createDepartment = asyncHandler(async(req: Request, res: Response) => {
    const data = validate(createDepartmentDto, req.body);
    const department = await this.departmentService.createDepartment(data);
    return sendSuccess(res, "Department created successfully", department);
  });

  updateDepartment = asyncHandler(async(req: Request, res: Response) => {
    const id = validate(getDepartmentDto, req.params.id);
    const data = validate(updateDepartmentDto, req.body);
    const department = await this.departmentService.updateDepartment(id, data);
    return sendSuccess(res, "Department updated successfully", department);
  });

  deleteDepartment = asyncHandler(async(req: Request, res: Response) => {
    const id = validate(getDepartmentDto, req.params.id);
    const department = await this.departmentService.deleteDepartment(id);
    return sendSuccess(res, "Department deleted successfully", department);
  });
}