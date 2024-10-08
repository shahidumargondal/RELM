"use strict";

const jwt = require("jsonwebtoken");

module.exports.generateAccessToken = (userData) => {
  const payLoad = {
    id: userData.id,
    userName: userData.userName,
    email: userData.email,
  };

  return jwt.sign(payLoad, process.env.JWT_SECRET_KEY, { expiresIn: "48h" });
};

module.exports.generateRefreshToken = (userData) => {
  const payLoad = {
    id: userData.id,
    userName: userData.userName,
    email: userData.email,
  };

  return jwt.sign(payLoad, process.env.JWT_SECRET_KEY, { expiresIn: "30d" });
};
