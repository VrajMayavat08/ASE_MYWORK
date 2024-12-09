import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase-config";

const LoginAdmin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email) => {
    return email.endsWith("@uwindsor.ca");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Email must end with @uwindsor.ca");
    } else {
      setError("");
      try {
        await signInWithEmailAndPassword(auth, email, password);
        navigate("/admin-dashboard");
      } catch (error) {
        setError("Login failed. Please check your credentials.");
      }
    }
  };

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
          Admin Login
        </h3>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "1rem" }}>
            <label
              htmlFor="email"
              style={{
                display: "block",
                marginBottom: "0.5rem",
                fontWeight: "bold",
              }}
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "0.5rem",
                border: "1px solid #ddd",
                borderRadius: "5px",
              }}
            />
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <label
              htmlFor="password"
              style={{
                display: "block",
                marginBottom: "0.5rem",
                fontWeight: "bold",
              }}
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "0.5rem",
                border: "1px solid #ddd",
                borderRadius: "5px",
              }}
            />
          </div>
          {error && (
            <div
              style={{
                marginBottom: "1rem",
                color: "red",
                fontSize: "0.9rem",
              }}
            >
              {error}
            </div>
          )}
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "0.7rem",
              backgroundColor: "#28a745",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              fontSize: "1rem",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginAdmin;
