const express = require("express");
const multer = require("multer");
const LostItem = require("../models/LostItem");

const router = express.Router();

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "src/backend/uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// POST: Add a new lost item
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { itemName, itemDescription, location } = req.body;
    const imageUrl = req.file ? `/backend/uploads/${req.file.filename}` : null;

    const newLostItem = new LostItem({
      itemName,
      itemDescription,
      location,
      imageUrl,
    });

    await newLostItem.save();
    res.status(201).json({ message: "Lost item added successfully", newLostItem });
  } catch (error) {
    res.status(500).json({ message: "Error adding lost item", error });
  }
});

// GET: Fetch all lost items
router.get("/", async (req, res) => {
  try {
    const lostItems = await LostItem.find();
    res.status(200).json(lostItems);
  } catch (error) {
    res.status(500).json({ message: "Error fetching lost items", error });
  }
});

module.exports = router;
