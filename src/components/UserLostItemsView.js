import React, { useState, useEffect } from "react";
import axios from "axios";
import { auth } from "../firebase-config";
import { onAuthStateChanged } from "firebase/auth";

const UserLostItemView = () => {
  const [lostItems, setLostItems] = useState([]);
  const [userEmail, setUserEmail] = useState(""); // User's email
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch lost items from the backend API
    const fetchLostItems = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/lost-items");
        setLostItems(response.data); // Set fetched lost items
        setLoading(false);
      } catch (error) {
        console.error("Error fetching lost items:", error);
        setLoading(false);
      }
    };

    fetchLostItems();

    // Listen to the authentication state to get the current user's email
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(user.email); // Set email of the logged-in user
      }
    });
  }, []);

  // Handle claim item
  const handleClaim = async (itemId) => {
    try {
      const response = await axios.post(`http://localhost:5000/api/claim-item/${itemId}`, {
        email: userEmail,
      });
      alert(response.data.message);

      // Update the claimed item in the local state
      setLostItems((prevItems) =>
        prevItems.map((item) =>
          item._id === itemId ? { ...item, claimedBy: userEmail } : item
        )
      );
    } catch (error) {
      console.error("Error claiming the item:", error);
      alert("Failed to claim item. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Lost Items</h2>
      {loading ? (
        <p>Loading...</p>
      ) : lostItems.length === 0 ? (
        <p>No lost items found.</p>
      ) : (
        <div className="row">
          {lostItems.map((item) => (
            <div key={item._id} className="col-md-4 mb-4"> {/* Added mb-4 for margin */}
              <div className="card">
                <img
                  src={`http://localhost:5000${item.imageUrl}`}
                  className="card-img-top"
                  alt={item.itemName}
                  style={{ objectFit: "cover", height: "200px" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{item.itemName}</h5>
                  <p className="card-text">{item.itemDescription}</p>
                  <p className="card-text">
                    <strong>Location:</strong> {item.location}
                  </p>
                  <p className="card-text">
                    <strong>Claimed By:</strong> {item.claimedBy || "Not claimed"}
                  </p>
                  {/* Claim Button */}
                  <button
                    className="btn btn-primary"
                    onClick={() => handleClaim(item._id)}
                    disabled={item.claimedBy} // Disable the button if already claimed
                  >
                    {item.claimedBy ? "Claimed" : "Claim This Item"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserLostItemView;
