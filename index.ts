import express from "express";
import * as dotenv from "dotenv";

const app = express();
const port = 3000;

app.use(express.json());

// Basic route to test the server
app.get("/", (req, res) => {
  res.send("Hello from your Express server!");
});

app.listen(port, () => {
  console.log(`Server started on port http://localhost:${port}`);
});
