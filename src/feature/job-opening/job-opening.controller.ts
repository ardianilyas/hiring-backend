import type { Request, Response } from "express";
import type { JobOpeningService } from "./job-opening.service";
import { asyncHandler } from "../../shared/utils/async-handler";
import { validate } from "../../shared/utils/validate";
import { createJobOpeningDto, getJobOpeningDto, getJobOpeningsQueryDto, updateJobOpeningDto } from "./job-opening.dto";
import { sendSuccess } from "../../shared/utils/response";
import { auth } from "../../shared/lib/auth";
import { fromNodeHeaders } from "better-auth/node";
import { JOB_OPENING_SUCCESS_MESSAGE } from "./job-opening.constant";

export class JobOpeningController {
  constructor(private readonly jobOpeningService: JobOpeningService) {}

  getJobOpenings = asyncHandler(async(req: Request, res: Response) => {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });
    const isAdmin = session?.user?.role === "admin";

    const query = validate(getJobOpeningsQueryDto, req.query);
    const baseUrl = `${req.protocol}://${req.get("host")}${req.originalUrl.split("?")[0]}`;
    const paginatedResult = await this.jobOpeningService.getJobOpenings(query, baseUrl, isAdmin);
    
    return sendSuccess(res, JOB_OPENING_SUCCESS_MESSAGE.GET_JOB_OPENINGS, paginatedResult.data, paginatedResult.meta);
  });

  getJobOpening = asyncHandler(async(req: Request, res: Response) => {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });
    const isAdmin = session?.user?.role === "admin";

    const id = validate(getJobOpeningDto, req.params.id);
    const jobOpening = await this.jobOpeningService.getJobOpening(id, isAdmin);
    return sendSuccess(res, JOB_OPENING_SUCCESS_MESSAGE.GET_JOB_OPENING, jobOpening);
  });

  createJobOpening = asyncHandler(async(req: Request, res: Response) => {
    const data = validate(createJobOpeningDto, req.body);
    const jobOpening = await this.jobOpeningService.createJobOpening(data);
    return sendSuccess(res, JOB_OPENING_SUCCESS_MESSAGE.CREATE_JOB_OPENING, jobOpening);
  });

  updateJobOpening = asyncHandler(async(req: Request, res: Response) => {
    const id = validate(getJobOpeningDto, req.params.id);
    const data = validate(updateJobOpeningDto, req.body);
    const jobOpening = await this.jobOpeningService.updateJobOpening(id, data);
    return sendSuccess(res, JOB_OPENING_SUCCESS_MESSAGE.UPDATE_JOB_OPENING, jobOpening);
  });

  deleteJobOpening = asyncHandler(async(req: Request, res: Response) => {
    const id = validate(getJobOpeningDto, req.params.id);
    await this.jobOpeningService.deleteJobOpening(id);
    return sendSuccess(res, JOB_OPENING_SUCCESS_MESSAGE.DELETE_JOB_OPENING);
  });
}