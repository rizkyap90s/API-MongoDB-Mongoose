const faker = require("faker");
const { employee } = require("../models");

// seeder add
async function addEmployees() {
	for (let i = 0; i < 10; i++) {
		let employees = await employee.create({
			name: faker.name.findName(),
		});
	}

	console.log("Employees has been seeded");
}

// seeder remove
async function deleteEmployees() {
	await employee.remove();
	console.log("Employees has been removed");
}

module.exports = {
	addEmployees,
	deleteEmployees,
};
