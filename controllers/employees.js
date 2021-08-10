const { employee } = require("../models");

class Employee {
	async getAllEmployees(req, res, next) {
		try {
			const data = await employee.find();
			if (data.length === 0) {
				return next({ message: "Employees not found", statusCode: 404 });
			}

			res.status(200).json({ data });
		} catch (error) {
			next(error);
		}
	}

	async getEmployeeById(req, res, next) {
		try {
			const data = await employee.findOne({
				_id: req.params.id,
			});
			if (!data) {
				return next({ message: "Employee not found", statusCode: 404 });
			}

			res.status(200).json({ data });
		} catch (error) {
			next(error);
		}
	}

	async createEmployee(req, res, next) {
		try {
			const newData = await employee.create(req.body);

			const data = await employee.findOne({
				_id: newData._id,
			});

			res.status(201).json({ data });
		} catch (error) {
			next(error);
		}
	}

	async updateEmployee(req, res, next) {
		try {
			const newData = await employee.findOneAndUpdate(
				{ _id: req.params.id },
				req.body,
				{ new: true }
			);

			if (!newData) {
				return next({ statusCode: 404, message: "Employee not found" });
			}

			res.status(201).json({ newData });
		} catch (error) {
			next(error);
		}
	}

	async deleteEmployee(req, res, next) {
		try {
			//   for soft delete
			const data = await employee.deleteById(req.params.id);

			if (data.nModified === 0) {
				return next({ statusCode: 404, message: "Employee not found" });
			}

			res.status(200).json({ message: "Employee successfully deleted" });
		} catch (error) {
			next(error);
		}
	}
}

module.exports = new Employee();
