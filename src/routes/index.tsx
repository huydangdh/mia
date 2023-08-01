// src/StepRouter.js
import {
  BrowserRouter as Router,
  Link,
  Outlet,
  Route,
  Routes,
  Navigate,
  RouteProps,
} from "react-router-dom";
import App from "../App";
import Header from "../components/common/Header";
import Login from "../Login";
import { useAuthorization } from "../components/usermanagement/UserAuthorization";
import Dashboard from "../components/dashboard/Dashboard";

interface PrivateRouteProps {
  // You can add any additional props needed for the private route
  component: React.ComponentType,
  path?: string
}


export const PrivateRoute: React.FC<PrivateRouteProps> = ({ component: RouteComponent }) => {

  const { isLoggedIn } = useAuthorization()


  if (isLoggedIn) {
    return <RouteComponent />
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" />
  }

}

const StepRouter = () => {
  return (
    <Router>
      <div>
        <Header />

        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/login" element={<Login />} />
          {/* Add other routes for different steps as needed */}

          <Route
            path="dashboard"
            element={<PrivateRoute component={Dashboard} />}
          />
        </Routes>
      </div>
    </Router>
  );
};


export default StepRouter;
