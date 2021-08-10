const express = require("express");
const router = express.Router();

// ? import validator
// /////////////////
const {
  createOrUpdateTransactionValidator,
  getDetailTransactionValidator,
} = require("../middlewares/validators/transactions");

// ? import controller
// //////////////////
const {
  createTransaction,
  getAllTransactions,
  getDetailTransaction,
  updateTransaction,
  deleteTransaction,
} = require("../controllers/transactions");

// ? make routes
// ////////////////
router.get("/", getAllTransactions);
router.get("/:id", getDetailTransactionValidator, getDetailTransaction);
router.post("/", createOrUpdateTransactionValidator, createTransaction);
router.put("/:id", createOrUpdateTransactionValidator, updateTransaction);
router.delete("/:id", deleteTransaction);

module.exports = router;
