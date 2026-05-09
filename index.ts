import express from "express";
import { PrismaClient } from "./generated/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import * as dotenv from "dotenv";

dotenv.config();

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const app = express();
const port = 3000;

app.use(express.json());

// Basic route to test the server
app.get("/", (req, res) => {
  res.send("Hello from your Express server!");
});

app.get("/user", async (req, res) => {
  const user = await prisma.user.findMany();
  res.json(user);
});

app.listen(port, () => {
  console.log(`Server started on port http://localhost:${port}`);
});
