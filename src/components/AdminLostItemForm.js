import React, { useState } from "react";
import api from "../api"; // Import the Axios instance
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap is imported

const AdminLostItemForm = () => {
  const [formData, setFormData] = useState({
    itemName: "",
    itemDescription: "",
    location: "",
    imageFile: null, // For image file upload
  });
  const [message, setMessage] = useState(""); // For showing success/error messages

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      imageFile: e.target.files[0], // Store the selected file
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(); // Use FormData to handle file upload
    data.append("itemName", formData.itemName);
    data.append("itemDescription", formData.itemDescription);
    data.append("location", formData.location);
    if (formData.imageFile) {
      data.append("image", formData.imageFile);
    }

    try {
      await api.post("/lost-items", data); // Make the POST request
      setMessage("Lost item added successfully!");
    } catch (error) {
      console.error("Error adding lost item:", error);
      setMessage("Failed to add lost item. Please try again.");
    }
  };

  return (
    <div className="container py-5">
      <div className="container">
        <h2 className="text-center mb-4 font-weight-bold display-4">Add Lost Item</h2>
        
        {/* Success/Error Message */}
        {message && (
          <div className={`alert ${message.includes("successfully") ? "alert-success" : "alert-danger"}`} role="alert">
            {message}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="shadow-lg p-4 rounded bg-white">
          <div className="form-group">
            <label htmlFor="itemName">Item Name</label>
            <input
              type="text"
              className="form-control"
              id="itemName"
              name="itemName"
              value={formData.itemName}
              onChange={handleInputChange}
              placeholder="Enter item name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="itemDescription">Item Description</label>
            <textarea
              className="form-control"
              id="itemDescription"
              name="itemDescription"
              value={formData.itemDescription}
              onChange={handleInputChange}
              placeholder="Enter item description"
              rows="3"
            ></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="location">Location</label>
            <input
              type="text"
              className="form-control"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              placeholder="Enter location"
              required
            />
          </div>

          {/* Custom File Upload Button */}
          <div className="form-group">
            <label htmlFor="imageFile" className="d-block">Upload Image (Optional)</label>
            <div className="custom-file">
              <input
                type="file"
                className="custom-file-input"
                id="imageFile"
                onChange={handleFileChange}
                accept="image/*"
              />
              <label className="custom-file-label" htmlFor="imageFile">
                {formData.imageFile ? formData.imageFile.name : "Choose file"}
              </label>
            </div>
          </div>

          <button type="submit" className="btn btn-success btn-block">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default AdminLostItemForm;
