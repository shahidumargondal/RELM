"use-strict";
const env = process.env;
module.exports = {
  development: {
    username: env.DB_USER || "postgres",
    password: env.DB_PASSWORD || "123",
    database: env.DB_NAME || "car",
    host: env.DB_HOST || "127.0.0.1",
    port: env.DB_PORT || 5432,
    dialect: "postgres",
    define: {
      timestamps: false,
    },
  },
  test: {
    username: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,
    host: env.DB_HOST,
    port: env.DB_PORT,
    dialect: "postgres",
    define: {
      timestamps: false,
    },
  },
  production: {
    username: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,
    host: env.DB_HOST,
    port: env.DB_PORT,
    dialect: "postgres",
    define: {
      timestamps: false,
    },
  },
};
