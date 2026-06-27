import { Router } from "express";
import departmentRoute from "../feature/department/department.route";

const router = Router();

router.use("/departments", departmentRoute);

export default router;
