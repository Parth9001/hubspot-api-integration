import dotenv from "dotenv";
dotenv.config();

import express from "express";
import contactsRouter from "./routes/contacts.js";
import cors from "cors";

const app = express();
const PORT = 3000;

app.use(express.json());

app.use(
  cors({
    origin: "*",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use("/api/contacts", contactsRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
