import dotenv from "dotenv";
dotenv.config();

import express from "express";
import contactsRouter from "./routes/contacts.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use("/api/contacts", contactsRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
