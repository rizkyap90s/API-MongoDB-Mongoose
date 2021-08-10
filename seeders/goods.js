const faker = require("faker");
const { good, supplier } = require("../models");

// seeder add
async function addGoods() {
  const suppliers = await supplier.find();
  for (let i = 0; i < 10; i++) {
    await good.create({
      name: faker.commerce.productName(),
      price: faker.commerce.price() * 14000,
      photo: faker.image.imageUrl(),
      supplier: suppliers[Math.floor(Math.random() * suppliers.length)]._id,
    });
  }
  console.log("Goods has been seeded");
}

// seeder remove
async function deleteGoods() {
  await good.remove();
  console.log("Goods has been removed");
}

module.exports = {
  addGoods,
  deleteGoods,
};
