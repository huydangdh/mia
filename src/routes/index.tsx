// src/StepRouter.js
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import App from "../App";
import Header from "../components/common/Header";
import Login from "../Login";
import { useAuthorization } from "../components/usermanagement/UserAuthorization";
import Dashboard from "../components/dashboard/Dashboard";
import { AttendanceApp } from "../components/attendance";
import {
  PERMISSION_CREATE_CLOCKRECORD,
  PERMISSION_READ_CLOCKRECORD,
} from "../PermissionsUtil";

interface PrivateRouteProps {
  // You can add any additional props needed for the private route
  component: React.ComponentType;
  permissions?: string | string[];
  path?: string;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({
  component: RouteComponent,
  permissions,
}) => {
  const { isLoggedIn, userData, hasPermission } = useAuthorization();

  if (permissions && isLoggedIn) {
    if (!hasPermission(permissions)) {
      alert("Not permissions!!!");
      return "<>_+_<>";
    }
  }
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
            element={
              <PrivateRoute
                component={AttendanceApp}
                permissions={[
                  PERMISSION_READ_CLOCKRECORD,
                  PERMISSION_CREATE_CLOCKRECORD,
                ]}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default StepRouter;
