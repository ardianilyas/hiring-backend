import { asyncHandler } from "../../shared/utils/async-handler";
import { sendSuccess } from "../../shared/utils/response";
import { validate } from "../../shared/utils/validate";
import { DEPARTMENT_SUCCESS_MESSAGE } from "./department.constant";
import { createDepartmentDto, getDepartmentDto, updateDepartmentDto } from "./department.dto";
import type { DepartmentService } from "./department.service";
import type { Request, Response } from "express";

export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  getDepartments = asyncHandler(async(req: Request, res: Response) => {
    const departments = await this.departmentService.getDepartments();
    return sendSuccess(res, DEPARTMENT_SUCCESS_MESSAGE.GET_DEPARTMENTS, departments);
  });

  getDepartment = asyncHandler(async(req: Request, res: Response) => {
    const id = validate(getDepartmentDto, req.params.id);
    const department = await this.departmentService.getDepartment(id);
    return sendSuccess(res, DEPARTMENT_SUCCESS_MESSAGE.GET_DEPARTMENT, department);
  });

  createDepartment = asyncHandler(async(req: Request, res: Response) => {
    const data = validate(createDepartmentDto, req.body);
    const department = await this.departmentService.createDepartment(data);
    return sendSuccess(res, DEPARTMENT_SUCCESS_MESSAGE.CREATE_DEPARTMENT, department);
  });

  updateDepartment = asyncHandler(async(req: Request, res: Response) => {
    const id = validate(getDepartmentDto, req.params.id);
    const data = validate(updateDepartmentDto, req.body);
    const department = await this.departmentService.updateDepartment(id, data);
    return sendSuccess(res, DEPARTMENT_SUCCESS_MESSAGE.UPDATE_DEPARTMENT, department);
  });

  deleteDepartment = asyncHandler(async(req: Request, res: Response) => {
    const id = validate(getDepartmentDto, req.params.id);
    const department = await this.departmentService.deleteDepartment(id);
    return sendSuccess(res, DEPARTMENT_SUCCESS_MESSAGE.DELETE_DEPARTMENT, department);
  });
}