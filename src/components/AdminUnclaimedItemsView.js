import React, { useEffect, useState } from "react";
import { db } from "../firebase-config";
import { collection, getDocs } from "firebase/firestore";

const AdminUnclaimedItemsView = () => {
  const [unclaimedItems, setUnclaimedItems] = useState([]);

  useEffect(() => {
    const fetchUnclaimedItems = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "lostItems"));
        const items = [];

        for (const docSnap of querySnapshot.docs) {
          const lostItemData = docSnap.data();
          const itemId = docSnap.id;

          const claimersSnapshot = await getDocs(
            collection(db, `lostItems/${itemId}/claimers`)
          );
          const claimers = claimersSnapshot.docs.map((doc) => doc.data().email);

          if (claimers.length === 0) {
            items.push({
              id: itemId,
              ...lostItemData,
              claimers,
            });
          }
        }

        setUnclaimedItems(items);
      } catch (error) {
        console.error("Error fetching unclaimed items: ", error);
      }
    };

    fetchUnclaimedItems();
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
          Unclaimed Lost Items
        </h2>

        {unclaimedItems.length === 0 ? (
          <p
            style={{
              textAlign: "center",
              fontSize: "1.2rem",
              color: "#888",
            }}
          >
            No unclaimed lost items available.
          </p>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "20px",
            }}
          >
            {unclaimedItems.map((item) => (
              <div
                key={item.id}
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "10px",
                  padding: "1.5rem",
                  backgroundColor: "#f8f9fa",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  textAlign: "center",
                  transition: "transform 0.3s ease-in-out",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
              >
                <h4 style={{ marginBottom: "0.5rem", color: "#333" }}>
                  {item.itemName}
                </h4>
                <p style={{ marginBottom: "0.5rem" }}>
                  <strong>Location:</strong> {item.itemLocation}
                </p>
                <p style={{ marginBottom: "0.5rem" }}>
                  <strong>Description:</strong>{" "}
                  {item.itemDescription || "No description provided"}
                </p>
                {item.itemImageUrl && (
                  <img
                    src={item.itemImageUrl}
                    alt={item.itemName}
                    style={{
                      maxWidth: "100%",
                      height: "auto",
                      borderRadius: "5px",
                      marginTop: "1rem",
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminUnclaimedItemsView;
