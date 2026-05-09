import { PrismaClient } from "../generated/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import * as dotenv from "dotenv";

dotenv.config();

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function seed() {
  await prisma.user.createMany({
    data: [
      {
        email: "johndoe@gmail.com",
        name: "John Doe",
        age: 25,
        isMarried: false,
        nationality: "Indian",
      },
      {
        email: "janedoe@gmail.com",
        name: "Jane Doe",
        age: 25,
        isMarried: false,
        nationality: "Indian",
      },
    ],
  });
}

seed().then(() => prisma.$disconnect());
