const faker = require("faker");
const { customer } = require("../models");

// seeder add
async function addCustomers() {
  for (let i = 0; i < 10; i++) {
    let customers = await customer.create({
      name: faker.name.findName(),
    });
  }

  console.log("Customers has been seeded");
}

// seeder remove
async function deleteCustomers() {
  await customer.remove();
  console.log("Customers has been removed");
}

module.exports = {
  addCustomers,
  deleteCustomers,
};
