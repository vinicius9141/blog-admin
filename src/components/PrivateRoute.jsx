import { Navigate } from "react-router-dom";
import { useAuth } from "../authContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useState, useEffect } from "react";

function PrivateRoute({ children }) {
  const { user } = useAuth();
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserRole = async () => {
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setRole(docSnap.data().role);
        }
      }
      setLoading(false);
    };

    fetchUserRole();
  }, [user]);

  if (loading) {
    return <p>Carregando...</p>; // ou um spinner
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (role !== "author") {
    return <Navigate to="/" />;
  }

  return children;
}

export default PrivateRoute;
