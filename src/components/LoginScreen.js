import React from "react";
import { Link } from "react-router-dom";

const LoginScreen = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "#fff",
      }}
    >
      <div
        style={{
          width: "22rem",
          padding: "2rem",
          backgroundColor: "#fff",
          borderRadius: "10px",
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
          color: "#333",
        }}
      >
        <h3 style={{ textAlign: "center", marginBottom: "1.5rem" }}>
          Select Login Type
        </h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <Link
            to="/login-general"
            style={{
              padding: "0.7rem",
              backgroundColor: "#007bff",
              color: "#fff",
              textAlign: "center",
              borderRadius: "5px",
              fontWeight: "bold",
              textDecoration: "none",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#0056b3")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#007bff")}
          >
            General User Login
          </Link>
          <Link
            to="/login-admin"
            style={{
              padding: "0.7rem",
              backgroundColor: "#28a745",
              color: "#fff",
              textAlign: "center",
              borderRadius: "5px",
              fontWeight: "bold",
              textDecoration: "none",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#218838")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#28a745")}
          >
            Admin Login
          </Link>
          <Link
            to="/signup-general"
            style={{
              padding: "0.7rem",
              backgroundColor: "#17a2b8",
              color: "#fff",
              textAlign: "center",
              borderRadius: "5px",
              fontWeight: "bold",
              textDecoration: "none",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#117a8b")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#17a2b8")}
          >
            Sign Up (General User)
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
