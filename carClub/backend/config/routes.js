"use-strict";
module.exports = (app) => {
  app.use("/api/auth", require("../controllers/authController"));
  app.use("/api/car", require("../controllers/carController"));
};
