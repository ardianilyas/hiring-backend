import { Router } from "express";
import { DepartmentService } from "./department.service";
import { DepartmentController } from "./department.controller";
import { authMiddleware } from "../../shared/middlewares/auth.middleware";
import { DEPARTMENT_ROUTE } from "./department.constant";
import { requireRole } from "../../shared/middlewares/require-role";

const router = Router();
const departmentService = new DepartmentService();
const departmentController = new DepartmentController(departmentService);


router.use(authMiddleware);
router.get(DEPARTMENT_ROUTE.GET_DEPARTMENTS, departmentController.getDepartments);
router.get(DEPARTMENT_ROUTE.GET_DEPARTMENT, departmentController.getDepartment);

// Admin middlware
router.use(requireRole("admin"));
router.post(DEPARTMENT_ROUTE.CREATE_DEPARTMENT, departmentController.createDepartment);
router.put(DEPARTMENT_ROUTE.UPDATE_DEPARTMENT, departmentController.updateDepartment);
router.delete(DEPARTMENT_ROUTE.DELETE_DEPARTMENT, departmentController.deleteDepartment);

export default router;