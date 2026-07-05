import { Router } from "express";
import { ApplicationService } from "./application.service";
import { ApplicationController } from "./application.controller";
import { authMiddleware } from "../../shared/middlewares/auth.middleware";
import { requireRole } from "../../shared/middlewares/require-role";

const router = Router();

const applicationService = new ApplicationService();
const applicationController = new ApplicationController(applicationService);

router.use(authMiddleware);
router.post("/", applicationController.createApplication);

router.use(requireRole("admin"));
router.get("/", applicationController.getApplications);
router.get("/:id", applicationController.getApplication);

export default router;
