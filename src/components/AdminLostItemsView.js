import React, { useState, useEffect } from "react";
import axios from "axios";
import { auth } from "../firebase-config"; // Import auth from your Firebase config
import { onAuthStateChanged } from "firebase/auth";

const AdminLostItemView = () => {
  const [lostItems, setLostItems] = useState([]);
  const [userEmail, setUserEmail] = useState(""); // Logged-in user's email
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch lost items from the backend API
    const fetchLostItems = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/lost-items');
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

  // Handle delete item
  const handleDelete = async (itemId) => {
    try {
      // Send request to delete the item from the backend
      await axios.delete(`http://localhost:5000/api/lost-items/${itemId}`);

      // Remove the deleted item from the state to update UI
      setLostItems(lostItems.filter(item => item._id !== itemId));
      alert("Item deleted successfully!");
    } catch (error) {
      console.error("Error deleting item:", error);
      alert("Failed to delete item. Please try again.");
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
            <div key={item._id} className="col-md-4 mb-4"> {/* Added mb-4 for margin bottom */}
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
                  {/* Delete Button */}
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(item._id)}
                  >
                    Delete
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

export default AdminLostItemView;
