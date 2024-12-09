const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const lostItemRoutes = require("./routes/lostItems");
const path = require("path");
const LostItem = require("./models/LostItem"); // Your LostItem model

const app = express();

// Middleware to handle CORS
app.use(cors({
  origin: "http://localhost:3000", // Allow requests from frontend
}));

// Middleware to parse JSON
app.use(express.json());

// Serve static files from the 'uploads' folder
app.use("/backend", express.static(path.join(__dirname, "uploads")));

// Database Connection
connectDB();

// Routes
app.use("/api/lost-items", lostItemRoutes);

app.delete("/api/lost-items/:itemId", async (req, res) => {
  const { itemId } = req.params;

  try {
    const item = await LostItem.findByIdAndDelete(itemId);
    if (!item) {
      return res.status(404).send({ message: "Item not found" });
    }

    res.status(200).send({ message: "Item deleted successfully" });
  } catch (error) {
    console.error("Error deleting item:", error);
    res.status(500).send({ message: "Error deleting item" });
  }
});


// Route to get all lost items (for the admin)
app.get("/api/lost-items", async (req, res) => {
  try {
    const lostItems = await LostItem.find();
    res.status(200).json(lostItems); // Include the claimedBy field
  } catch (error) {
    console.error("Error fetching lost items:", error);
    res.status(500).send({ message: "Error fetching lost items" });
  }
});


// Claim an item by ID
app.post("/api/claim-item/:itemId", async (req, res) => {
  const { itemId } = req.params;
  const { email } = req.body;

  try {
    const item = await LostItem.findById(itemId);
    if (!item) {
      return res.status(404).send({ message: "Item not found" });
    }

    if (item.claimedBy) {
      return res.status(400).send({ message: "Item already claimed" });
    }

    item.claimedBy = email; // Assign the user claiming the item
    await item.save();

    res.status(200).send({ message: "Item claimed successfully!" });
  } catch (error) {
    console.error("Error claiming item:", error);
    res.status(500).send({ message: "Error claiming item" });
  }
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
