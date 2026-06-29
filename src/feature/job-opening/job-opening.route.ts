import { Router } from "express";
import { JobOpeningService } from "./job-opening.service";
import { JobOpeningController } from "./job-opening.controller";

const router = Router();
const jobOpeningService = new JobOpeningService();
const jobOpeningController = new JobOpeningController(jobOpeningService);

router.get("/", jobOpeningController.getJobOpenings);
router.get("/:id", jobOpeningController.getJobOpening);
router.post("/", jobOpeningController.createJobOpening);
router.put("/:id", jobOpeningController.updateJobOpening);
router.delete("/:id", jobOpeningController.deleteJobOpening);

export default router;
