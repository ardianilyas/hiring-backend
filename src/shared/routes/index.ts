import { Router } from "express";
import departmentRoute from "../../feature/department/department.route";
import jobOpeningRoute from "../../feature/job-opening/job-opening.route";

const router = Router();

router.use("/departments", departmentRoute);
router.use("/job-openings", jobOpeningRoute);

export default router;
