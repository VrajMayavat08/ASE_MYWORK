import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase-config";

const SignUpGeneral = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email) => email.endsWith("@uwindsor.ca");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError("Email must end with @uwindsor.ca");
    } else if (password !== confirmPassword) {
      setError("Passwords do not match");
    } else {
      setError("");
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        navigate("/user-dashboard");
      } catch (error) {
        setError(error.message);
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
          Sign Up for General Users
        </h3>
        <form onSubmit={handleSubmit}>
          {/** Input Fields */}
          <InputField
            id="email"
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputField
            id="password"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputField
            id="confirmPassword"
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          {/** Error Message */}
          {error && (
            <div style={{ marginBottom: "1rem", color: "red", fontSize: "0.9rem" }}>
              {error}
            </div>
          )}

          {/** Submit Button */}
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
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

const InputField = ({ id, label, type, value, onChange }) => (
  <div style={{ marginBottom: "1rem" }}>
    <label
      htmlFor={id}
      style={{
        display: "block",
        marginBottom: "0.5rem",
        fontWeight: "bold",
      }}
    >
      {label}
    </label>
    <input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      required
      style={{
        width: "100%",
        padding: "0.5rem",
        border: "1px solid #ddd",
        borderRadius: "5px",
      }}
    />
  </div>
);

export default SignUpGeneral;
