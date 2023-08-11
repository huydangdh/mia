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
import { EPermissions } from "../PermissionsUtil";
import { Alert, Container, Row } from "react-bootstrap";
import AbstractUserAuthService from "../services/interface/AbstractUserAuthService";
import { useEffect, useState } from "react";

interface PrivateRouteProps {
  // You can add any additional props needed for the private route
  component: React.ComponentType;
  permissions?: EPermissions[];
  path?: string;
  authProvider: AbstractUserAuthService;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({
  component: RouteComponent,
  permissions,
  authProvider,
}) => {
  const { isLoggedIn, userData, hasPermission } =
    useAuthorization(authProvider);

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  if (permissions && !hasPermission(permissions)) {
    return (
      <Container className="mt-5">
        <Row className="justify-content-center">
          <Alert variant="danger">
            Bạn không có quyền truy cập vào trang này.
            <br />
            Yêu cầu các quyền sau: {permissions.toString()}
          </Alert>
        </Row>
      </Container>
    );
  }

  return <RouteComponent />;
};

const MainRouter = () => {
  const [selectedProvider, setSelectedProvider] =
    useState<AbstractUserAuthService | null>(null); // State to store selected provider
  const { loading } = useAuthorization(selectedProvider);

  useEffect(() => {
    // Check if selectedProvider is already set in localStorage when component mounts
    const storedProvider = localStorage.getItem("selectedProvider");
    if (storedProvider) {
      // Set the selectedProvider state with the stored provider instance
      setSelectedProvider(JSON.parse(storedProvider));
    }
  }, []);

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
            element={
              <PrivateRoute
                component={Dashboard}
                authProvider={selectedProvider}
              />
            }
          />

          <Route
            path="/ClockRecord"
            element={
              <PrivateRoute
                component={AttendanceApp}
                permissions={[EPermissions.VIEW_CLOCKRECORD]}
                authProvider={selectedProvider}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default MainRouter;
