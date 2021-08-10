const { transaction, supplier } = require("../models");

class Transactions {
  async getAllTransactions(req, res, next) {
    try {
      let data = await transaction.find().populate("customer");

      if (data.length === 0) {
        return next({ message: "Transactions not found", statusCode: 404 });
      }

      for (let i = 0; i < data.length; i++) {
        data[i].good.supplier = await supplier.findOne({
          _id: data[i].good.supplier,
        });
      }

      res.status(200).json({ data });
    } catch (error) {
      next(error);
    }
  }

  async getDetailTransaction(req, res, next) {
    try {
      let data = await transaction
        .findOne({ _id: req.params.id })
        .populate("customer");

      if (!data) {
        return next({ message: "Transaction not found", statusCode: 404 });
      }

      data.good.supplier = await supplier.findOne({ _id: data.good.supplier });

      res.status(200).json({ data });
    } catch (error) {
      next(error);
    }
  }

  async createTransaction(req, res, next) {
    try {
      const newData = await transaction.create(req.body);

      let data = await transaction
        .findOne({ _id: newData._id })
        .populate("customer");

      data.good.supplier = await supplier.findOne({ _id: data.good.supplier });

      res.status(201).json({ data });
    } catch (error) {
      next(error);
    }
  }

  async updateTransaction(req, res, next) {
    try {
      const newData = await transaction.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        {
          new: true,
        }
      );

      if (!newData) {
        return next({ statusCode: 404, message: "Transaction not found" });
      }

      res.status(201).json({ newData });
    } catch (error) {
      next(error);
    }
  }

  async deleteTransaction(req, res, next) {
    try {
      // ? for hard delete
      // const data = await transaction.findOneAndDelete({
      //   _id: req.params.id,
      // });

      // ? for soft delete
      const data = await transaction.deleteById(req.params.id);

      if (data.nModified === 0) {
        return next({ statusCode: 404, message: "Transaction not found" });
      }
      res.status(200).json({ message: "Transaction successfully deleted" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new Transactions();
