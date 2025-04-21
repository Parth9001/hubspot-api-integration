import express from "express";
import hubspotService from "../services/hubspotService.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const contacts = await hubspotService.fetchContacts();
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch contacts" });
  }
});

export default router;
