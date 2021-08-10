const { addCustomers, deleteCustomers } = require("./customers");
const { addSuppliers, deleteSuppliers } = require("./suppliers");
const { addGoods, deleteGoods } = require("./goods");
const { addEmployees, deleteEmployees } = require("./employees");
const { transaction } = require("../models");

async function add() {
	await Promise.all([addCustomers(), addSuppliers(), addEmployees()]);
	await addGoods();
}

async function remove() {
	await Promise.all([
		deleteCustomers(),
		deleteSuppliers(),
		deleteGoods(),
		deleteEmployees,
	]);
}

if (process.argv[2] === "add") {
	add().then(() => console.log("Seeders successful"));
	// process.exit(0);
} else if (process.argv[2] === "remove") {
	remove().then(() => console.log("Remove successful"));
	// process.exit(0);
}
