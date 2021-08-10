const faker = require("faker");
const { supplier } = require("../models");

// seeder add
async function addSuppliers() {
  for (let i = 0; i < 10; i++) {
    await supplier.create({
      name: faker.name.findName(),
    });
  }
  console.log("Suppliers has been seeded");
}

// seeder remove
async function deleteSuppliers() {
  await supplier.remove();
  console.log("Suppliers has been seeded");
}

module.exports = {
  addSuppliers,
  deleteSuppliers,
};
