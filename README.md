# Task Management System (TMS)

## Description

TMS a simple RESTful API for managing tasks, built with Node.js, Express, and PostgreSQL using Sequelize ORM. It supports user authentication, task creation, updating, completion tracking, and time-based reporting for completed tasks.

## ✨ Features

- [x] CRUD operations for task and user
- [x] Authentication & Authorization (JWT)
- [x] Input validation (Joi)
- [x] PostgreSQL integration
- [x] Rate limiting and logging

## 🔧 Tech Stack

- **Node.js**
- **TypeScript**
- **Express.js**
- **PostgreSQL** for Database Integration
- **Joi** for input validation
- **Sequelize ORM**

## 🚀 Getting Started

### Prerequisites

- Node.js LTS version
- npm or yarn
- PostgreSQL running locally or via a service

### 1. Clone The Repo

```bash
git clone https://github.com/Kelvin-Teck/task-management-system.git
cd task-management-system
```

### 2. Install the Dependencies

```bash
npm install
```

### 3. Environment Variables

Create a .env file in the root directory with the following:

```env
# App Configurations
PORT=<your_port_number>

# JWT
JWT_SECRET=<somesecrettoken>

# Database Configuration
DB_HOST=<localhost> or <your_remote_database_service>
DB_PORT=<your_database_port>  #if in development - <localhost> in production - <your_remote_databse_host>
DB_USERNAME=<your_database_username>
DB_PASSWORD=<your_database_password>
DB_NAME=task-manager
DB_DIALECT=postgres 

# Optional Settings
DB_LOGGING=false
DB_POOL_MAX=5
DB_POOL_MIN=0
DB_POOL_ACQUIRE=30000
DB_POOL_IDLE=10000
```

Make sure your PostgreSQL server is running and the database `your_database_name` exists. You can create it with:

```sql
CREATE DATABASE <your_database_name>;
```

### 4. Running Database Migrations

```bash
npm run migrate
```

This will set up your tables using Sequelize.

### 5. Start the Development Server

```bash
npm run dev
```

The server should now be running on `http://localhost:<your_specified_port>`

## 💽 Database Design (ER Diagram)

Below is the Entity Relationship (ER) diagram representing the database schema for the Demo-Credit application:

![Demo-Credit ER Diagram](./demo-credit-erd_1.png)

> This diagram illustrates the relationships between users, wallets, transactions, and other core entities in the system.

## 📬 API Reference

You can explore and test all endpoints using our Postman documentation:

👉 [Task Management System API Docs](https://documenter.getpostman.com/view/30059286/2sB2qcE2MH)

## 🗂️ Project Structure

```bash
task-management-system/
├── src/
│   ├── config/            # Database and environment configurations
│   ├── controllers/       # Route handlers for each feature (e.g., auth, wallet)
|   |-- migrations/        # Database migrations files
|   |-- interfaces/        # TypeScript interface definitions
│   ├── middlewares/       # Custom middleware (e.g., auth, error handler)
│   ├── models/            # Knex models and queries
│   ├── routes/            # API route definitions
|   |-- repositories/      # Databae Interactions
|   |-- seeders/           # Generates mock Data For Tables
│   ├── services/          # Business logic and integrations (e.g., blacklist check)
│   ├── utils/             # Helper functions (e.g., formatters, validators)
|   |-- validators/        # Functions For Input Validations
│   ├── types/ 
|   |-- app.ts             # TypeScript type definitions
│   └── index.ts           # Application entry point
│
|
├── .env                   # Environment variable definitions
├── .gitignore             # Git ignored files
├── .sequelizerc           # Sequelize configuration
├── package-lock.json
|-- package.json           # Project metadata and scripts
├── tsconfig.json          # TypeScript compiler configuration
└── README.md              # Project documentation


```

## 🧪 Testing

Ensure you’ve set up your test environment before running tests.

### 🔧 Setup

Install testing dependencies (if you haven’t already):

```bash
npm install --save-dev jest ts-jest @types/jest supertest
```

Add a test script to your package.json:

```json
"scripts": {
  "test": "jest"
}
```

### 🧪 Running Tests

```bash
npm run test
```

Tests are usually placed in a **tests**/ directory and follow this structure:

```
__tests__/
├── userController.spec.ts
├── walletController.spec.ts
├── userService.spec.ts
├── walletService.spec.ts
└── utils/
    └── apiResponse.spec.ts
    └── caseConverter.spec.ts
    └── helpers.spec.ts
    └── validator.spec.ts
```

## 🤝 Contributing

Contributions are welcome and appreciated! Here’s how you can help:

### 🚀 Getting Started

1. Fork the repo

2. Clone the repo

3. Create your feature branch

```bash
git checkout -b feature/your-feature-name
```

4. make your changes and Commit your changes

```bash
git commit -m "Add your feature description"
```

5. Push to the branch

```bash
git push origin feature/your-feature-name
```

6. Open a **Pull Request** with a clear description of your changes

✅ **Guidelines**

- Follow consistent code formatting (TypeScript best practices).

- Add comments and update documentation if needed.

- Write or update tests when adding features or fixing bugs.

## 🪪 License

This project is licensed under the **MIT License**.  
See the [MIT License](https://opensource.org/licenses/MIT) for more information.

## Author / Acknowledgements

👤 **Author**

Eneh Kelvin Chukwuemeka
Developer & Maintainer of Task Management System
[GitHub](https://github.com/Kelvin-Teck)

Built with ❤️ using Node.js, TypeScript, and PostgreSQl.

**🙌 Acknowledgements**

Thanks to the open-source community for the tools and inspiration.
