import React from "react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
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
          maxWidth: "900px",
          margin: "0 auto",
          padding: "2rem",
          backgroundColor: "#fff",
          borderRadius: "10px",
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
          color: "#333",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "1.5rem" }}>
          Admin Dashboard
        </h2>

        {/* Lost and Found Section */}
        <div style={{ marginBottom: "2rem" }}>
          <h4 style={{ marginBottom: "1rem" }}>Lost and Found</h4>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
            <Link to="/admin-lost-item-form">
              <button
                style={{
                  padding: "0.7rem 1.5rem",
                  backgroundColor: "#007bff",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  fontSize: "1rem",
                  fontWeight: "bold",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => (e.target.style.backgroundColor = "#0056b3")}
                onMouseLeave={(e) => (e.target.style.backgroundColor = "#007bff")}
              >
                Add Lost Item
              </button>
            </Link>
            <Link to="/admin-lost-items-view">
              <button
                style={{
                  padding: "0.7rem 1.5rem",
                  backgroundColor: "#007bff",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  fontSize: "1rem",
                  fontWeight: "bold",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => (e.target.style.backgroundColor = "#0056b3")}
                onMouseLeave={(e) => (e.target.style.backgroundColor = "#007bff")}
              >
                View Lost Items
              </button>
            </Link>
            <Link to="/admin-claims-view">
              <button
                style={{
                  padding: "0.7rem 1.5rem",
                  backgroundColor: "#007bff",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  fontSize: "1rem",
                  fontWeight: "bold",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => (e.target.style.backgroundColor = "#0056b3")}
                onMouseLeave={(e) => (e.target.style.backgroundColor = "#007bff")}
              >
                Claims
              </button>
            </Link>
            <Link to="/admin-unclaimed-items-view">
              <button
                style={{
                  padding: "0.7rem 1.5rem",
                  backgroundColor: "#007bff",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  fontSize: "1rem",
                  fontWeight: "bold",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => (e.target.style.backgroundColor = "#0056b3")}
                onMouseLeave={(e) => (e.target.style.backgroundColor = "#007bff")}
              >
                Unclaimed Items
              </button>
            </Link>
          </div>
        </div>

        {/* Food Vendor Section */}
        <div>
          <h4 style={{ marginBottom: "1rem" }}>Food Vendor</h4>
          <div style={{ display: "flex", gap: "1rem" }}>
            <Link to="/admin-food-form">
              <button
                style={{
                  padding: "0.7rem 1.5rem",
                  backgroundColor: "#28a745",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  fontSize: "1rem",
                  fontWeight: "bold",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => (e.target.style.backgroundColor = "#218838")}
                onMouseLeave={(e) => (e.target.style.backgroundColor = "#28a745")}
              >
                Add Restaurant
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
