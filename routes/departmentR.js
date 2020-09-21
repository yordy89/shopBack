import express from "express";
import Department from "../controller/departmentC";

const router = express.Router();

router.post("/department", Department.addDepartment);
router.get("/departments", Department.getDepartments);
router.delete("/department/:id", Department.deleteDepartment);
router.put("/department/:id", Department.updateDepartment);
router.post("/department/:id", Department.getDepartmentById);

module.exports = router;
