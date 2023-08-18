let mongoose = require("mongoose");

const logger = require("../utils/logger");

mongoose.connect(process.env.URL, {
  useNewUrlParser: true,
});
mongoose.connection.on("connected", () => {
  console.log("Mongoose connected successfully");
  logger.log("info", "mongoose is connected");
});
mongoose.connection.on("error", (err) => {
  console.log("Mongoose Connection Error: ", err);
  logger.log("error", "mongoose connection error");
});
