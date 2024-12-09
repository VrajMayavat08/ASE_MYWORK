import React from "react";

const FoodVendorFilters = ({ filters, setFilters }) => {
  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "2rem",
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          padding: "1.5rem",
          borderRadius: "10px",
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
          width: "400px",
          color: "#333",
        }}
      >
        <h5 style={{ textAlign: "center", marginBottom: "1.5rem" }}>Filters</h5>
        <div style={{ marginBottom: "1rem" }}>
          <label style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <input
              type="checkbox"
              name="vegan"
              checked={filters.vegan}
              onChange={handleChange}
              style={{ cursor: "pointer" }}
            />
            Vegan
          </label>
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <input
              type="checkbox"
              name="vegetarian"
              checked={filters.vegetarian}
              onChange={handleChange}
              style={{ cursor: "pointer" }}
            />
            Vegetarian
          </label>
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <input
              type="checkbox"
              name="halal"
              checked={filters.halal}
              onChange={handleChange}
              style={{ cursor: "pointer" }}
            />
            Halal
          </label>
        </div>
        <div>
          <label style={{ fontWeight: "bold", display: "block", marginBottom: "0.5rem" }}>
            Meal Type
          </label>
          <select
            name="mealType"
            value={filters.mealType}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "0.5rem",
              border: "1px solid #ddd",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            <option value="">All</option>
            <option value="full-course">Full Course</option>
            <option value="snack">Snack</option>
            <option value="drink">Drink</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default FoodVendorFilters;
