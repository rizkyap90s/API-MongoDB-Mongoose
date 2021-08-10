const express = require("express");
const router = express.Router();
const {
  getGoodByIdValidator,
  createOrUpdateGoodsValidator,
} = require("../middlewares/validators/goods");

const {
  getAllGoodsData,
  getGoodById,
  createGood,
  updateGood,
  deleteGood,
} = require("../controllers/goods");

router.get("/", getAllGoodsData);
router.get("/:id", getGoodByIdValidator, getGoodById);
router.post("/", createOrUpdateGoodsValidator, createGood);
router.put("/:id", createOrUpdateGoodsValidator, updateGood);
router.delete("/:id", deleteGood);

module.exports = router;
