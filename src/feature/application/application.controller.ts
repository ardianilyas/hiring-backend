import { asyncHandler } from "../../shared/utils/async-handler";
import { sendSuccess } from "../../shared/utils/response";
import { validate } from "../../shared/utils/validate";
import { APPLICATION_SUCCESS_MESSAGE } from "./application.constant";
import { createApplicationDto, getApplicationDto, getApplicationsQueryDto, updateApplicationStatusDto } from "./application.dto";
import type { ApplicationService } from "./application.service";
import { ApplicationPolicy } from "./application.policy";
import type { Request, Response } from "express";
import type { AuthenticatedRequest } from "../../shared/types";
import { authorize } from "../../shared/utils/authorize";

export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  getApplications = asyncHandler(async(req: Request, res: Response) => {
    const query = validate(getApplicationsQueryDto, req.query);
    const baseUrl = `${req.protocol}://${req.get("host")}${req.baseUrl}${req.path}`;
    const applications = await this.applicationService.getApplications(query, baseUrl);
    
    return sendSuccess(res, APPLICATION_SUCCESS_MESSAGE, applications.data, applications.meta);
  });

  getApplication = asyncHandler(async(req: AuthenticatedRequest, res: Response) => {
    const id = validate(getApplicationDto, req.params.id);
    const application = await this.applicationService.getApplication(id);

    const policy = new ApplicationPolicy();
    authorize(policy.view(req.auth.user, application));

    return sendSuccess(res, APPLICATION_SUCCESS_MESSAGE, application);
  });

  createApplication = asyncHandler(async(req: AuthenticatedRequest, res: Response) => {
    const data = validate(createApplicationDto, req.body);
    const application = await this.applicationService.createApplication(req.auth.user.id, data);
    return sendSuccess(res, APPLICATION_SUCCESS_MESSAGE, application);
  });

  getMyApplications = asyncHandler(async(req: AuthenticatedRequest, res: Response) => {
    const applications = await this.applicationService.getMyApplications(req.auth.user.id);
    return sendSuccess(res, APPLICATION_SUCCESS_MESSAGE, applications);
  });

  updateApplicationStatus = asyncHandler(async(req: Request, res: Response) => {
    const id = validate(getApplicationDto, req.params.id);
    const data = validate(updateApplicationStatusDto, req.body);
    const application = await this.applicationService.updateApplicationStatus(id, data);
    return sendSuccess(res, APPLICATION_SUCCESS_MESSAGE, application);
  });
}