# Express TS Better-auth starter kit

A modern backend boilerplate using **Express.js**, **TypeScript**, **Better Auth**, and **Drizzle ORM** with PostgreSQL.

## 🌟 Features

- **Authentication & Authorization**: Secure email/password login, session management, and role-based access control (Admin/User) powered by Better Auth.
- **Departments Management**: Organize job postings by creating and managing different company departments.
- **Job Openings**: Seamlessly manage job postings, defining roles, requirements, and statuses linked to specific departments.
- **Applications Processing**: Allow users to submit applications (cover letters, resumes) to job openings, with robust foreign-key validation and error handling.
- **Database Seeding**: Easily populate your local environment with dummy departments, job openings, users, and applications using a single command.
- **Automated Testing**: Comprehensive feature and unit test coverage utilizing Vitest and Supertest.

## 🛠️ Tech Stack

- **Framework**: [Express.js](https://expressjs.com/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Authentication**: [Better Auth](https://better-auth.com/)
- **Database ORM**: [Drizzle ORM](https://orm.drizzle.team/)
- **Testing**: [Vitest](https://vitest.dev/) & [Supertest](https://github.com/ladjs/supertest)
- **Runtime**: [Bun](https://bun.sh/)

## 📂 Project Structure

```text
.
├── drizzle/            # Generated database migrations
├── src/                # Application source code
│   ├── feature/        # Feature modules (application, department, job-opening)
│   ├── shared/         # Shared utilities, constants, database schemas, and seeders
│   └── server.ts       # Express application setup
├── tests/              # E2E and integration tests using Vitest
│   ├── helpers/        # Test utilities (db cleaner, auth helper)
│   └── setup.ts        # Global test setup
├── drizzle.config.ts   # Drizzle ORM configuration
├── vitest.config.ts    # Vitest configuration
└── package.json        # Dependencies and scripts
```

## 🚀 Installation & Walkthrough

Follow these steps to set up and run the backend locally:

1. **Install Dependencies**
   Use Bun to install project dependencies.
   ```bash
   bun install
   ```

2. **Environment Variables**
   Copy the example environment file and fill in your PostgreSQL connection string and other required details:
   ```bash
   cp .env.example .env
   ```

3. **Database Setup**
   Generate the Drizzle schema and push it to your connected PostgreSQL database:
   ```bash
   bunx drizzle-kit generate
   bunx drizzle-kit push
   ```

4. **Seed the Database**
   Populate your database with realistic dummy data (users, departments, job openings, applications) to test the APIs right away:
   ```bash
   bun run seed
   ```

5. **Run the Development Server**
   Start the application in development mode with hot-reload:
   ```bash
   bun run dev
   ```

6. **Run Tests**
   Execute the automated test suite to ensure everything is working correctly:
   ```bash
   bun run test
   ```

## 🔐 Auth Routes (Better Auth)

By default, Better Auth exposes the following endpoints under `/api/auth`:

- **Sign In**: `POST /api/auth/sign-in/email`
- **Sign Up**: `POST /api/auth/sign-up/email`
- **Sign Out**: `POST /api/auth/sign-out`
- **Get Session**: `GET /api/auth/get-session`