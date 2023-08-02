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
import { AttendanceApp } from "../components/attendance";
import NavigationBar from "../components/common/NavigationBar";

interface PrivateRouteProps {
  // You can add any additional props needed for the private route
  component: React.ComponentType;
  path?: string;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({
  component: RouteComponent,
}) => {
  const { isLoggedIn } = useAuthorization();
  if (isLoggedIn) {
    return <RouteComponent />;
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }
};

const StepRouter = () => {
  const { loading } = useAuthorization();

  // Kiểm tra trạng thái đang tải
  if (loading) {
    // Nếu đang tải, hiển thị placeholder Loading
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <div>
        
        <Header />
        <NavigationBar /> {/* Include the NavigationBar component */}
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/login" element={<Login />} />
          {/* Add other routes for different steps as needed */}

          <Route
            path="/dashboard"
            element={<PrivateRoute component={Dashboard} />}
          />
          <Route
            path="/ClockRecord"
            element={<PrivateRoute component={AttendanceApp} />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default StepRouter;
