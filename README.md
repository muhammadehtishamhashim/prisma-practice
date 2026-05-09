# Prisma & Express Practice Project

A modern, type-safe backend practice project using Node.js, Express, TypeScript, and Prisma ORM with a PostgreSQL database.

## 🚀 Quick Start Guide

### Prerequisites
- [Node.js](https://nodejs.org/) installed
- [pnpm](https://pnpm.io/) package manager
- A PostgreSQL database URL (e.g., Neon, Supabase, or local)

### 1. Installation
Clone the repository and install the dependencies:
```bash
pnpm install
```

### 2. Environment Setup
Create a `.env` file in the root directory and add your database URL:
```env
DATABASE_URL="postgresql://user:password@host:port/database"
```

### 3. Database Setup
Push your Prisma schema to the database to create the necessary tables, and generate the Prisma Client:
```bash
npx prisma db push
npx prisma generate
```

### 4. Seed the Database
Populate your database with initial dummy data:
```bash
pnpm run seed
```

### 5. Start the Server
Launch the Express development server with hot-reloading:
```bash
pnpm run dev
```
The server will be running at: `http://localhost:3000`

---

## 📚 Documentation & Teacher Notes

For a deep dive into how this project works, including detailed explanations of the code, scripts, system flow, and generated files, check out the `notes/` directory:

- [📝 Project Architecture & Code Explanation](./notes/Explanation.md) - A masterclass explanation of the `index.ts`, `seed.ts`, `package.json` scripts, and the Prisma generated client.
- [🌱 Seeding Explained](./notes/seed.md) - Detailed notes on how the database seeding process works under the hood.
