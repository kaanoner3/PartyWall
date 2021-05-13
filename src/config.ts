require("dotenv").config();

export const config = {
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT || 5432,
  database: process.env.POSTGRES_DB || "database_test",
  host: process.env.POSTGRES_HOST || "localhost",
  dialect: "postgres",
  logging: false,
};
