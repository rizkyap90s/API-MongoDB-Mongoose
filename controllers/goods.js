const { good, supplier } = require("../models");
class Goods {
  async getAllGoodsData(req, res, next) {
    try {
      const data = await good.find().populate("supplier");
      if (!data) {
        return next({ message: "Goods not found" });
      }
      res.status(200).json({ data });
    } catch (error) {
      next(error);
    }
  }
  async getGoodById(req, res, next) {
    try {
      const data = await await good
        .findOne({ _id: req.params.id })
        .populate("supplier");

      res.status(200).json({ data });
    } catch (error) {
      next(error);
    }
  }

  async createGood(req, res, next) {
    try {
      const newData = await good.create(req.body);
      const data = await good.findOne({ _id: newData.id }).populate("supplier");

      res.status(201).json({ data });
    } catch (error) {
      next(error);
    }
  }

  async updateGood(req, res, next) {
    try {
      const data = await good.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        {
          new: true,
        }
      );

      if (!data) {
        return next({ statusCode: 404, message: "Good not found" });
      }

      data.supplier = await supplier.findOne({
        _id: req.body.id_supplier,
      });
      res.status(201).json({ data });
    } catch (error) {
      next(error);
    }
  }

  async deleteGood(req, res, next) {
    try {
      const data = await good.deleteById(req.params.id);

      if (data.nModified === 0) {
        return next({ statusCode: "good not found" });
      }
      res.status(200).json({ message: `Good ${req.params.id} has deleted` });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new Goods();
