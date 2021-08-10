const { customer } = require("../models");

class Customer {
  async getAllCustomer(req, res, next) {
    try {
      const data = await customer.find();
      if (data.length === 0) {
        return next({ message: "Customer not found", statusCode: 404 });
      }

      res.status(200).json({ data });
    } catch (error) {
      next(error);
    }
  }

  async getOneCustomer(req, res, next) {
    try {
      const data = await customer.findOne({
        _id: req.params.id,
      });
      if (!data) {
        return next({ message: "Customer not found", statusCode: 404 });
      }

      res.status(200).json({ data });
    } catch (error) {
      next(error);
    }
  }

  async createCustomer(req, res, next) {
    try {
      const newData = await customer.create(req.body);

      const data = await customer.findOne({
        _id: newData._id,
      });

      res.status(201).json({ data });
    } catch (error) {
      next(error);
    }
  }

  async updateCustomer(req, res, next) {
    try {
      const newData = await customer.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true }
      );

      if (!newData) {
        return next({ statusCode: 404, message: "Customer not found" });
      }

      res.status(201).json({ newData });
    } catch (error) {
      next(error);
    }
  }

  async deleteCustomer(req, res, next) {
    try {
      //   for soft delete
      const data = await customer.deleteById(req.params.id);

      if (data.nModified === 0) {
        return next({ statusCode: 404, message: "Customer not found" });
      }

      res.status(200).json({ message: "Customer successfully deleted" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new Customer();
