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

// app.get("/user", async (req, res) => {
//   const user = await prisma.user.findMany();
//   res.json(user);
// });

app.get("/users", async (_, res) => {
  const users = await prisma.user.findMany({
    where: {
      nationality: {
        in: ["Canadian", "Australian", "Irish"],
      },
    },
  });
  res.json(users);
});

app.put("/user", async (req, res) => {
  const updateUser = await prisma.user.updateMany({
    where: {
      age: {
        in: [25],
      },
    },
    data: {
      age: 26,
    },
  });
  res.json(updateUser);
});

app.delete("/user", async (_, res) => {
  const deletedUsers = await prisma.user.deleteMany({
    where: { age: { gt: 30 } },
  });
  res.json(deletedUsers);
});

app.listen(port, () => {
  console.log(`Server started on port http://localhost:${port}`);
});
