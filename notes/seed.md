# How Prisma Seeding Works (Under the Hood)

This document explains how the `seed.ts` script interacts with the database and why it is different from using tools like Postman.

## 1. The Core Difference
*   **Postman:** Communicates with your **Server** (Express) via HTTP requests.
*   **Seed Script:** Communicates **Directly with the Database** (Postgres) via a Database Driver.

## 2. Step-by-Step Execution Flow

### Step A: Loading Environment Variables
The script starts by calling `dotenv.config()`. This reads your `.env` file and puts the `DATABASE_URL` into `process.env`. Without this, Prisma wouldn't know where your database is hosted (e.g., Neon).

### Step B: Establishing the Connection (The "Pipe")
```typescript
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });
```
1.  **The Pool (`pg`):** This opens a physical network connection to your database. It's like dialing a phone number and staying on the line.
2.  **The Adapter (`@prisma/adapter-pg`):** This is the bridge. Prisma is designed to be database-agnostic, so it needs this adapter to know exactly how to "talk" to PostgreSQL.
3.  **The Client:** This is your primary interface for writing queries.

### Step C: Translation (ORM Magic)
When you write:
```typescript
await prisma.user.createMany({ data: [...] });
```
Prisma (the **ORM - Object-Relational Mapper**) translates your TypeScript objects into **SQL (Structured Query Language)**. 

**Example Translation:**
*   **TypeScript:** `{ name: "John", age: 25 }`
*   **SQL:** `INSERT INTO "User" ("name", "age") VALUES ('John', 25);`

### Step D: Direct Execution
The generated SQL is sent directly through the connection pool to the database. The database executes the command and stores the data in its physical tables.

---

## 3. Comparison: Postman vs. Seed Script

| Feature | Postman | Seed Script |
| :--- | :--- | :--- |
| **Target** | Your Express API Routes | The Database directly |
| **Middleman** | Express Server | None (Direct connection) |
| **Protocol** | HTTP (Web) | TCP/IP (Database Protocol) |
| **Best Use Case** | Testing API Logic & Endpoints | Populating initial/dummy data |

## 4. Why your `seed.ts` is now "Idempotent"
We added `await prisma.user.deleteMany()` at the start of the script. 
*   **Why?** This ensures that every time you run `pnpm run seed`, the database is wiped clean before the new data is added. 
*   **Benefit:** This prevents "Unique Constraint" errors (like trying to add the same email twice).
