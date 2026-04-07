import { useAuth } from "../context/AuthContext";
import Login from "../pages/Login";

function ProtectedRoute({ children }) {
  const { user } = useAuth();

  if (!user) return <Login />;

  return children;
}

export default ProtectedRoute;