require("dotenv").config();
const express = require("express");
const contactsRouter = require("./routes/contacts");

const app = express();
const PORT = process.env.PORT || 5000;

app.use("/api/contacts", contactsRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
