import { Router } from "express";
import departmentRoute from "../../feature/department/department.route";
import jobOpeningRoute from "../../feature/job-opening/job-opening.route";
import applicationRoute from "../../feature/application/application.route";

const router = Router();

router.use("/departments", departmentRoute);
router.use("/job-openings", jobOpeningRoute);
router.use("/applications", applicationRoute);

export default router;
