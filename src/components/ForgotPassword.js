import React, { useState } from "react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const validateEmail = (email) => {
    return email.endsWith("@uwindsor.ca");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError("Use your university email");
    } else {
      setError("");
      alert("Password reset instructions have been sent to your email.");
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
          Forgot Password
        </h3>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "1rem" }}>
            <label
              htmlFor="email"
              style={{
                display: "block",
                marginBottom: "0.5rem",
                fontWeight: "bold",
                color: "#555",
              }}
            >
              Enter your email address
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
            {error && (
              <div
                style={{
                  marginTop: "0.5rem",
                  color: "red",
                  fontSize: "0.9rem",
                }}
              >
                {error}
              </div>
            )}
          </div>
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "0.7rem",
              backgroundColor: "#ffc107",
              color: "#333",
              border: "none",
              borderRadius: "5px",
              fontSize: "1rem",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Reset Password
          </button>
          <div style={{ marginTop: "1rem", textAlign: "center" }}>
            <a
              href="/login"
              style={{
                textDecoration: "none",
                color: "#007bff",
                fontWeight: "bold",
              }}
            >
              Back to Login
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
