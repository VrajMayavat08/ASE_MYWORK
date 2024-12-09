const mongoose = require("mongoose");

const lostItemSchema = new mongoose.Schema({
  itemName: { type: String, required: true },
  itemDescription: { type: String },
  location: { type: String, required: true },
  imageUrl: { type: String }, // URL for the uploaded image
  claimedBy: {
    type: String,
    default: null, // If the item is not claimed, this is null
  },
});

module.exports = mongoose.model("LostItem", lostItemSchema);
