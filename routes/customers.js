const express = require("express");
const router = express.Router();

// ? import validator
// /////////////////
const { customerValidator } = require("../middlewares/validators/customers");

// ? import controller
// //////////////////
const Customer = require("../controllers/customers");

// ? make routes
// ///////////////
router.get("/", Customer.getAllCustomer);
router.get("/:id", Customer.getOneCustomer);
router.post("/", customerValidator, Customer.createCustomer);
router.put("/:id", customerValidator, Customer.updateCustomer);
router.delete("/:id", Customer.deleteCustomer);

module.exports = router;
