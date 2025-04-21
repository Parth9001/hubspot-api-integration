import dotenv from "dotenv";
dotenv.config();

import express from "express";
import contactsRouter from "./routes/contacts.js";
import cors from "cors";

const app = express();
const PORT = 6000;

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000", // Change this to your frontend's origin
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allow required methods
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use("/api/contacts", contactsRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
