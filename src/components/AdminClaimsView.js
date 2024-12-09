import React, { useState, useEffect } from "react";
import { db } from "../firebase-config";
import { collection, getDocs } from "firebase/firestore";

const AdminClaimsView = () => {
  const [lostItems, setLostItems] = useState([]);

  useEffect(() => {
    const fetchLostItems = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "lostItems"));
        const items = [];

        // Fetch all lost items
        for (const docSnap of querySnapshot.docs) {
          const lostItemData = docSnap.data();
          const itemId = docSnap.id;

          // Fetch claimers for each lost item
          const claimersSnapshot = await getDocs(
            collection(db, `lostItems/${itemId}/claimers`)
          );
          const claimers = claimersSnapshot.docs.map((doc) => doc.data().email);

          // Add the item with claimers info
          items.push({
            id: itemId,
            ...lostItemData,
            claimers,
          });
        }

        setLostItems(items);
      } catch (error) {
        console.error("Error fetching lost items: ", error);
      }
    };

    fetchLostItems(); // Fetch items on initial render
  }, []);

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
          Admin Claims View
        </h2>
        {lostItems.length === 0 ? (
          <p style={{ textAlign: "center", fontSize: "1.2rem" }}>
            No claimed items available.
          </p>
        ) : (
          <ul style={{ listStyleType: "none", padding: 0 }}>
            {lostItems.map((item) => (
              <li
                key={item.id}
                style={{
                  marginBottom: "1.5rem",
                  padding: "1rem",
                  backgroundColor: "#f8f9fa",
                  borderRadius: "8px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                }}
              >
                <h4 style={{ marginBottom: "0.5rem" }}>{item.itemName}</h4>
                <p style={{ marginBottom: "0.5rem" }}>
                  <strong>Location:</strong> {item.itemLocation}
                </p>
                <p style={{ marginBottom: "0.5rem" }}>
                  <strong>Description:</strong>{" "}
                  {item.itemDescription || "No description provided"}
                </p>
                <p style={{ marginBottom: "0.5rem" }}>
                  <strong>Claimed By:</strong>{" "}
                  {item.claimers.length
                    ? item.claimers.join(", ")
                    : "No claims"}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AdminClaimsView;
