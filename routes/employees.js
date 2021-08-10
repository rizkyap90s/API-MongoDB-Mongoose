const express = require("express");
const router = express.Router();

// ? import validator
// /////////////////
const { employeeValidator } = require("../middlewares/validators/employees");

// ? import controller
// //////////////////
const {
	getAllEmployees,
	getEmployeeById,
	createEmployee,
	updateEmployee,
	deleteEmployee,
} = require("../controllers/employees");

// ? make routes
// ///////////////
router.get("/", getAllEmployees);
router.get("/:id", getEmployeeById);
router.post("/", employeeValidator, createEmployee);
router.put("/:id", employeeValidator, updateEmployee);
router.delete("/:id", deleteEmployee);

module.exports = router;
