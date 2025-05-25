import dotenv from "dotenv";
dotenv.config();
import app from "./app";

const PORT = process.env.PORT || 2000;

import sequelize from "./config/database";
// import User  from "./models/user.model";

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

const startApp = async () => {
  app.listen(PORT, () => {
    testConnection()
    console.log(`Server is running on http://localhost:${PORT}`);
  });
};

startApp();
