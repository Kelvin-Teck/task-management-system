import { QueryInterface } from "sequelize";
import * as helper from "../utils/helpers";

("use strict");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface) {
    const now = new Date();

    const usersData = [
      {
        id: 1,
        name: "Alice Johnson",
        email: "alice@example.com",
        password: "hashed_password_1",
      },
      {
        id: 2,
        name: "Bob Smith",
        email: "bob@example.com",
        password: "hashed_password_2",
      },
      {
        id: 3,
        name: "Charlie Brown",
        email: "charlie@example.com",
        password: "hashed_password_3",
      },
      {
        id: 4,
        name: "Diana Prince",
        email: "diana@example.com",
        password: "hashed_password_4",
      },
      {
        id: 5,
        name: "Ethan Hunt",
        email: "ethan@example.com",
        password: "hashed_password_5",
      },
      {
        id: 6,
        name: "Fiona Gallagher",
        email: "fiona@example.com",
        password: "hashed_password_6",
      },
      {
        id: 7,
        name: "George Wilson",
        email: "george@example.com",
        password: "hashed_password_7",
      },
      {
        id: 8,
        name: "Hannah Montana",
        email: "hannah@example.com",
        password: "hashed_password_8",
      },
      {
        id: 9,
        name: "Isaac Newton",
        email: "isaac@example.com",
        password: "hashed_password_9",
      },
      {
        id: 10,
        name: "Jenny Lee",
        email: "jenny@example.com",
        password: "hashed_password_10",
      },
    ];

    const users = await Promise.all(
      usersData.map(async (user) => ({
        ...user,
        password: await helper.hashPassword(user.password),
        createdAt: now,
        updatedAt: now,
      }))
    );

    await queryInterface.bulkInsert("users", users, {});
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.bulkDelete("users", {}, {});
  },
};
