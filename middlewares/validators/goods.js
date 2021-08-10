const mongoose = require("mongoose");
const validator = require("validator");
const { promisify } = require("util");
const { supplier } = require("../../models");

exports.getGoodByIdValidator = async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return next({ messages: "id not Valid", statusCode: 400 });
    }
    next();
  } catch (error) {
    next(error);
  }
};

exports.createOrUpdateGoodsValidator = async (req, res, next) => {
  try {
    const errorMessages = [];
    if (!validator.isInt(req.body.price)) {
      errorMessages.push("Price must be a number");
    }
    if (!mongoose.Types.ObjectId.isValid(req.body.id_supplier)) {
      errorMessages.push("id_supplier is not valid");
    }
    if (req.files) {
      const file = req.files.photo;

      if (!file.mimetype.startsWith("image")) {
        errorMessages.push("File must be an image");
      }
      if (file.size > 1000000) {
        errorMessages.push("Image must be less than 1MB");
      }

      file.name = new Date().getTime() + "_" + file.name;
      const move = promisify(file.mv);
      await move(`./public/images/goods/${file.name}`);
      req.body.photo = file.name;
    }
    if (errorMessages.length > 0) {
      return next({ statusCode: 404, messages: errorMessages });
    }

    const findSupplier = await supplier.findOne({ _id: req.body.id_supplier });
    if (!findSupplier) {
      return next({ statusCode: 400, message: "supplier not found" });
    }

    req.body.supplier = req.body.id_supplier;
    next();
  } catch (error) {
    next(error);
  }
};
