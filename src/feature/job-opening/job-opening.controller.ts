import type { Request, Response } from "express";
import type { JobOpeningService } from "./job-opening.service";
import { asyncHandler } from "../../shared/utils/async-handler";
import { validate } from "../../shared/utils/validate";
import { createJobOpeningDto, getJobOpeningDto, updateJobOpeningDto } from "./job-opening.dto";
import { sendSuccess } from "../../shared/utils/response";

export class JobOpeningController {
  constructor(private readonly jobOpeningService: JobOpeningService) {}

  getJobOpenings = asyncHandler(async(req: Request, res: Response) => {
    const jobOpenings = await this.jobOpeningService.getJobOpenings();
    return sendSuccess(res, "Job openings fetched", jobOpenings);
  });

  getJobOpening = asyncHandler(async(req: Request, res: Response) => {
    const id = validate(getJobOpeningDto, req.params.id);
    const jobOpening = await this.jobOpeningService.getJobOpening(id);
    return sendSuccess(res, "Job opening fetched", jobOpening);
  });

  createJobOpening = asyncHandler(async(req: Request, res: Response) => {
    const data = validate(createJobOpeningDto, req.body);
    const jobOpening = await this.jobOpeningService.createJobOpening(data);
    return sendSuccess(res, "Job opening created", jobOpening);
  });

  updateJobOpening = asyncHandler(async(req: Request, res: Response) => {
    const id = validate(getJobOpeningDto, req.params.id);
    const data = validate(updateJobOpeningDto, req.body);
    const jobOpening = await this.jobOpeningService.updateJobOpening(id, data);
    return sendSuccess(res, "Job opening updated", jobOpening);
  });

  deleteJobOpening = asyncHandler(async(req: Request, res: Response) => {
    const id = validate(getJobOpeningDto, req.params.id);
    const jobOpening = await this.jobOpeningService.deleteJobOpening(id);
    return sendSuccess(res, "Job opening deleted", jobOpening);
  });
}