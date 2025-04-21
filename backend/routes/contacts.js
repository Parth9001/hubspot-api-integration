const express = require("express");
const router = express.Router();
const { fetchContacts } = require("../services/hubspotService");

router.get("/", async (req, res) => {
  try {
    const contacts = await fetchContacts();
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch contacts" });
  }
});

module.exports = router;
