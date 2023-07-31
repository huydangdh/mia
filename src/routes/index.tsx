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

interface PrivateRouteProps extends RouteProps {
  // You can add any additional props needed for the private route
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element, ...rest }) => {
  const { isLoggedIn } = useAuthorization();

  return isLoggedIn ? <Route {...rest} element={element} /> : <Navigate to="/login" />;
};
const StepRouter = () => {
  return (
    <Router>
      <div>
        <Header />

        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/login" element={<Login />} />
          {/* Add other routes for different steps as needed */}
          <PrivateRoute path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
};


export default StepRouter;
