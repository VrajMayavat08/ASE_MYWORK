import React, { useState } from "react";
import { db } from "../../firebase-config";
import { collection, addDoc } from "firebase/firestore";

const AdminFoodForm = () => {
  const [formData, setFormData] = useState({
    restaurantName: "",
    location: "",
    restaurantType: "Cafe", // Default type
    priceRange: { min: "", max: "" },
    menu: [], // Array of menu items with names and prices
    foodTypes: {
      Veg: false,
      NonVeg: false,
      Halal: false,
      Alcohol: false,
    },
  });

  const [menuItem, setMenuItem] = useState({ name: "", price: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleMenuItemChange = (e) => {
    const { name, value } = e.target;
    setMenuItem((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddMenuItem = () => {
    if (menuItem.name.trim() !== "" && menuItem.price.trim() !== "") {
      setFormData((prev) => ({
        ...prev,
        menu: [...prev.menu, { name: menuItem.name, price: menuItem.price }],
      }));
      setMenuItem({ name: "", price: "" }); // Clear input after adding
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "restaurants"), formData);
      alert("Restaurant added successfully!");
      setFormData({
        restaurantName: "",
        location: "",
        restaurantType: "Cafe",
        priceRange: { min: "", max: "" },
        menu: [],
        foodTypes: {
          Veg: false,
          NonVeg: false,
          Halal: false,
          Alcohol: false,
        },
      });
    } catch (error) {
      console.error("Error adding restaurant: ", error);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
        padding: "2rem 0",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          padding: "2rem",
          borderRadius: "10px",
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
          width: "600px",
          color: "#333",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "1.5rem" }}>
          Add Restaurant
        </h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "1rem" }}>
            <label style={{ fontWeight: "bold" }}>Restaurant Name:</label>
            <input
              type="text"
              name="restaurantName"
              value={formData.restaurantName}
              onChange={handleInputChange}
              required
              style={{
                width: "100%",
                padding: "0.5rem",
                border: "1px solid #ddd",
                borderRadius: "5px",
                marginTop: "0.5rem",
              }}
            />
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <label style={{ fontWeight: "bold" }}>Location:</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              required
              style={{
                width: "100%",
                padding: "0.5rem",
                border: "1px solid #ddd",
                borderRadius: "5px",
                marginTop: "0.5rem",
              }}
            />
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <label style={{ fontWeight: "bold" }}>Type of Restaurant:</label>
            <select
              name="restaurantType"
              value={formData.restaurantType}
              onChange={handleInputChange}
              style={{
                width: "100%",
                padding: "0.5rem",
                border: "1px solid #ddd",
                borderRadius: "5px",
                marginTop: "0.5rem",
              }}
            >
              <option value="Cafe">Cafe</option>
              <option value="Family Restaurant">Family Restaurant</option>
              <option value="Diner">Diner</option>
            </select>
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <label style={{ fontWeight: "bold" }}>Price Range:</label>
            <div style={{ display: "flex", gap: "10px", marginTop: "0.5rem" }}>
              <input
                type="number"
                name="min"
                placeholder="Min"
                value={formData.priceRange.min}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    priceRange: { ...prev.priceRange, min: e.target.value },
                  }))
                }
                style={{
                  flex: 1,
                  padding: "0.5rem",
                  border: "1px solid #ddd",
                  borderRadius: "5px",
                }}
              />
              <input
                type="number"
                name="max"
                placeholder="Max"
                value={formData.priceRange.max}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    priceRange: { ...prev.priceRange, max: e.target.value },
                  }))
                }
                style={{
                  flex: 1,
                  padding: "0.5rem",
                  border: "1px solid #ddd",
                  borderRadius: "5px",
                }}
              />
            </div>
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <label style={{ fontWeight: "bold" }}>Menu Item:</label>
            <div style={{ display: "flex", gap: "10px", marginTop: "0.5rem" }}>
              <input
                type="text"
                name="name"
                value={menuItem.name}
                onChange={handleMenuItemChange}
                placeholder="Item Name"
                style={{
                  flex: 1,
                  padding: "0.5rem",
                  border: "1px solid #ddd",
                  borderRadius: "5px",
                }}
              />
              <input
                type="number"
                name="price"
                value={menuItem.price}
                onChange={handleMenuItemChange}
                placeholder="Item Price"
                style={{
                  flex: 1,
                  padding: "0.5rem",
                  border: "1px solid #ddd",
                  borderRadius: "5px",
                }}
              />
              <button
                type="button"
                onClick={handleAddMenuItem}
                style={{
                  padding: "0.5rem 1rem",
                  backgroundColor: "#28a745",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Add
              </button>
            </div>
          </div>
          <ul>
            {formData.menu.map((item, index) => (
              <li key={index} style={{ marginBottom: "0.5rem" }}>
                {item.name} - ${item.price}
              </li>
            ))}
          </ul>
          <div style={{ marginBottom: "1rem" }}>
            <label style={{ fontWeight: "bold" }}>Food Types:</label>
            <div style={{ display: "flex", gap: "10px", marginTop: "0.5rem" }}>
              {Object.keys(formData.foodTypes).map((type) => (
                <label key={type} style={{ display: "flex", alignItems: "center" }}>
                  <input
                    type="checkbox"
                    name={type}
                    checked={formData.foodTypes[type]}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        foodTypes: {
                          ...prev.foodTypes,
                          [type]: e.target.checked,
                        },
                      }))
                    }
                  />
                  <span style={{ marginLeft: "5px" }}>{type}</span>
                </label>
              ))}
            </div>
          </div>
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "0.7rem",
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              fontSize: "1rem",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Add Restaurant
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminFoodForm;
