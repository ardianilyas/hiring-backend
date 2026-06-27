import { Router } from "express";
import { DepartmentService } from "./department.service";
import { DepartmentController } from "./department.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";

const router = Router();
const departmentService = new DepartmentService();
const departmentController = new DepartmentController(departmentService);

router.use(authMiddleware);

router.get("/", departmentController.getDepartments);
router.get("/:id", departmentController.getDepartment);
router.post("/", departmentController.createDepartment);
router.put("/:id", departmentController.updateDepartment);
router.delete("/:id", departmentController.deleteDepartment);

export default router;