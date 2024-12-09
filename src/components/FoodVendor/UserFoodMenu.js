import React, { useEffect, useState } from "react";
import { db } from "../../firebase-config";
import { collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const UserFoodMenu = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [filters, setFilters] = useState({
    foodTypes: [],
    priceRange: "0-100",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "restaurants"));
        const fetchedRestaurants = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setRestaurants(fetchedRestaurants);
      } catch (error) {
        console.error("Error fetching restaurants: ", error);
      }
    };

    fetchRestaurants();
  }, []);

  const handleMenuClick = (restaurantId) => {
    navigate(`/menu-detail/${restaurantId}`);
  };

  const handleFilterChange = (e) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      setFilters((prev) => ({
        ...prev,
        foodTypes: prev.foodTypes.includes(value)
          ? prev.foodTypes.filter((type) => type !== value)
          : [...prev.foodTypes, value],
      }));
    } else {
      setFilters((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const filteredRestaurants = restaurants.filter((restaurant) => {
    const selectedPriceRange = filters.priceRange.split("-");
    const minPrice = restaurant.priceRange?.min || 0;
    const maxPrice = restaurant.priceRange?.max || 100;

    const matchesPrice =
      minPrice >= parseInt(selectedPriceRange[0]) &&
      maxPrice <= parseInt(selectedPriceRange[1]);

    const matchesFoodTypes =
      filters.foodTypes.length === 0 ||
      filters.foodTypes.every((type) => restaurant.foodTypes[type]);

    return matchesPrice && matchesFoodTypes;
  });

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
        padding: "2rem 0",
        color: "#fff",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "2rem",
          backgroundColor: "#fff",
          borderRadius: "10px",
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
          color: "#333",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "1.5rem" }}>
          Explore Food Vendors
        </h2>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            marginBottom: "2rem",
          }}
        >
          <div>
            <label style={{ fontWeight: "bold" }}>Price Range:</label>
            <select
              name="priceRange"
              value={filters.priceRange}
              onChange={handleFilterChange}
              style={{
                padding: "0.5rem",
                marginLeft: "10px",
                border: "1px solid #ddd",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              <option value="0-100">$0 - $100</option>
              <option value="0-50">$0 - $50</option>
              <option value="50-100">$50 - $100</option>
              <option value="100-200">$100 - $200</option>
            </select>
          </div>

          <div>
            <label style={{ fontWeight: "bold" }}>Food Types:</label>
            <div style={{ display: "flex", gap: "10px", marginTop: "0.5rem" }}>
              {["veg", "nonVeg", "halal", "alcohol"].map((type) => (
                <label key={type} style={{ display: "flex", alignItems: "center" }}>
                  <input
                    type="checkbox"
                    value={type}
                    onChange={handleFilterChange}
                    checked={filters.foodTypes.includes(type)}
                    style={{ marginRight: "5px" }}
                  />
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </label>
              ))}
            </div>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "20px",
          }}
        >
          {filteredRestaurants.length > 0 ? (
            filteredRestaurants.map((restaurant) => (
              <div
                key={restaurant.id}
                style={{
                  backgroundColor: "#f8f9fa",
                  borderRadius: "10px",
                  padding: "1rem",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  textAlign: "center",
                  cursor: "pointer",
                  transition: "transform 0.3s",
                }}
                onClick={() => handleMenuClick(restaurant.id)}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
              >
                <h3 style={{ marginBottom: "0.5rem" }}>{restaurant.restaurantName}</h3>
                <p>
                  <strong>Location:</strong> {restaurant.location || "N/A"}
                </p>
                <p>
                  <strong>Price Range:</strong> $
                  {restaurant.priceRange?.min || "N/A"} - $
                  {restaurant.priceRange?.max || "N/A"}
                </p>
                <p>
                  <strong>Type:</strong> {restaurant.restaurantType || "N/A"}
                </p>
              </div>
            ))
          ) : (
            <p style={{ textAlign: "center", gridColumn: "1 / -1" }}>
              No restaurants match your filters.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserFoodMenu;
