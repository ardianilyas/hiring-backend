import type { Request, Response } from "express";
import type { JobOpeningService } from "./job-opening.service";
import { asyncHandler } from "../../shared/utils/async-handler";
import { validate } from "../../shared/utils/validate";
import { createJobOpeningDto, getJobOpeningDto, updateJobOpeningDto } from "./job-opening.dto";
import { sendSuccess } from "../../shared/utils/response";
import { JOB_OPENING_SUCCESS_MESSAGE } from "./job-opening.constant";

export class JobOpeningController {
  constructor(private readonly jobOpeningService: JobOpeningService) {}

  getJobOpenings = asyncHandler(async(req: Request, res: Response) => {
    const jobOpenings = await this.jobOpeningService.getJobOpenings();
    return sendSuccess(res, JOB_OPENING_SUCCESS_MESSAGE.GET_JOB_OPENINGS, jobOpenings);
  });

  getJobOpening = asyncHandler(async(req: Request, res: Response) => {
    const id = validate(getJobOpeningDto, req.params.id);
    const jobOpening = await this.jobOpeningService.getJobOpening(id);
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
    const jobOpening = await this.jobOpeningService.deleteJobOpening(id);
    return sendSuccess(res, JOB_OPENING_SUCCESS_MESSAGE.DELETE_JOB_OPENING, jobOpening);
  });
}