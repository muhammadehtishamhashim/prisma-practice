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
  await prisma.user.deleteMany();
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
      {
        email: "alice.smith@example.com",
        name: "Alice Smith",
        age: 28,
        isMarried: true,
        nationality: "American",
      },
      {
        email: "bob.johnson@example.com",
        name: "Bob Johnson",
        age: 32,
        isMarried: false,
        nationality: "Canadian",
      },
      {
        email: "charlie.brown@example.com",
        name: "Charlie Brown",
        age: 22,
        isMarried: false,
        nationality: "British",
      },
      {
        email: "diana.prince@example.com",
        name: "Diana Prince",
        age: 30,
        isMarried: true,
        nationality: "Brazilian",
      },
      {
        email: "edward.norton@example.com",
        name: "Edward Norton",
        age: 45,
        isMarried: true,
        nationality: "Australian",
      },
      {
        email: "fiona.gallagher@example.com",
        name: "Fiona Gallagher",
        age: 27,
        isMarried: false,
        nationality: "Irish",
      },
      {
        email: "george.miller@example.com",
        name: "George Miller",
        age: 35,
        isMarried: true,
        nationality: "German",
      },
      {
        email: "hannah.montana@example.com",
        name: "Hannah Montana",
        age: 20,
        isMarried: false,
        nationality: "French",
      },
      {
        email: "ian.wright@example.com",
        name: "Ian Wright",
        age: 50,
        isMarried: true,
        nationality: "South African",
      },
      {
        email: "julia.roberts@example.com",
        name: "Julia Roberts",
        age: 40,
        isMarried: false,
        nationality: "Italian",
      },
    ],
  });
}

seed().then(() => prisma.$disconnect());
