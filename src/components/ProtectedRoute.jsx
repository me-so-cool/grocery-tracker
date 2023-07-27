import { Navigate } from 'react-router-dom';

//This function handles the logged in part and redirtects to /login if user is not authenticated
function ProtectedRoute({ children, isLoggedIn, setIsLoggedIn  }) {
    if (!isLoggedIn) {
        return <Navigate to="/Login" />;
      }
      return children;
}

export default ProtectedRoute;