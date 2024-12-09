import React from "react";

const RestaurantCard = ({ restaurant }) => {
  return (
    <div
      style={{
        backgroundColor: "#fff",
        borderRadius: "10px",
        boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
        padding: "1.5rem",
        marginBottom: "1.5rem",
        color: "#333",
        width: "100%",
        maxWidth: "400px",
        margin: "0 auto",
      }}
    >
      <h5
        style={{
          fontWeight: "bold",
          marginBottom: "1rem",
          textAlign: "center",
        }}
      >
        {restaurant.name}
      </h5>
      <p style={{ marginBottom: "0.5rem" }}>
        <strong>Menu:</strong> {restaurant.menu}
      </p>
      <p style={{ marginBottom: "0.5rem" }}>
        <strong>Price Range:</strong> {restaurant.priceRange}
      </p>
      <p style={{ marginBottom: "0.5rem" }}>
        <strong>Review:</strong> {restaurant.review}
      </p>
      <p style={{ marginBottom: "0.5rem" }}>
        <strong>Opening Time:</strong> {restaurant.openingTime}
      </p>
      <p style={{ marginBottom: "0.5rem" }}>
        <strong>Closing Time:</strong> {restaurant.closingTime}
      </p>
      <p style={{ marginBottom: "0.5rem" }}>
        <strong>Vegan:</strong> {restaurant.vegan ? "Yes" : "No"}
      </p>
      <p style={{ marginBottom: "0.5rem" }}>
        <strong>Vegetarian:</strong> {restaurant.vegetarian ? "Yes" : "No"}
      </p>
      <p style={{ marginBottom: "0.5rem" }}>
        <strong>Halal:</strong> {restaurant.halal ? "Yes" : "No"}
      </p>
      <p style={{ marginBottom: "0.5rem" }}>
        <strong>Meal Type:</strong> {restaurant.mealType}
      </p>
    </div>
  );
};

export default RestaurantCard;
