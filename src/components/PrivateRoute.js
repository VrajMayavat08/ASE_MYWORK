import React, { useContext, useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { db } from "../firebase-config";
import { doc, getDoc } from "firebase/firestore"; // Get user role from Firestore

const PrivateRoute = ({ allowedRoles }) => {
  const { currentUser } = useContext(AuthContext);
  const [role, setRole] = useState(null); // State to store user role
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserRole = async () => {
      if (currentUser) {
        const userDoc = await getDoc(doc(db, "users", currentUser.uid));
        if (userDoc.exists()) {
          setRole(userDoc.data().role); // Assume role is stored in user document
        }
      }
      setLoading(false);
    };
    
    getUserRole();
  }, [currentUser]);

  if (loading) return <div>Loading...</div>; // Or show a loading spinner

  // If user is not logged in or role doesn't match, redirect
  if (!currentUser || !allowedRoles.includes(role)) {
    return <Navigate to="/" />; // Redirect to login
  }

  return <Outlet />; // This will render the child routes (e.g., the route you're protecting)
};

export default PrivateRoute;
