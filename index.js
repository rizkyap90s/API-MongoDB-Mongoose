//? import dependencies
// ////////////////////
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
}); // Config environment
const express = require("express");
const fileUpload = require("express-fileupload");
const app = express();

// ? import routes
// ///////////////
const customerRouter = require("./routes/customers");
const transactionRouter = require("./routes/transactions");
const employeeRouter = require("./routes/employees");
const goodRouter = require("./routes/goods");

// ? import error handler
// ///////////////
const errorHandler = require("./middlewares/errorHandler/errorHandler");

//? use json and urlencoded
// ///////////////////////
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());

// ? use routes
// ////////////
app.use("/customers", customerRouter);
app.use("/transactions", transactionRouter);
app.use("/employees", employeeRouter);
app.use("/goods", goodRouter);

app.all("*", async (req, res, next) => {
  try {
    next({
      messages: "Not found",
      statusCode: 404,
    });
  } catch (error) {
    next(error);
  }
});

// ? use error handler
// ///////////////
app.use(errorHandler);

//? listen to port
// ////////////////////
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Listening to 3000"));
