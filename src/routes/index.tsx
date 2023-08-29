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
import { useMMAuthentication } from "../components/usermanagement/useMMAuthentication";
import Dashboard from "../components/dashboard/Dashboard";
import { AttendanceApp } from "../components/attendance";
import { EPermissions } from "../PermissionsUtil";
import { Alert, Container, Row } from "react-bootstrap";
import ChineseDictApp from "../components/chinesedict/ChineseDictApp";

interface PrivateRouteProps {
  // You can add any additional props needed for the private route
  component: React.ComponentType;
  permissions?: EPermissions[];
  path?: string;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({
  component: RouteComponent,
  permissions
}) => {
  const { userAuthInfo } =
    useMMAuthentication();
  console.log("LS -> src/routes/index.tsx:30 -> userAuthInfo: ", userAuthInfo)
  if (!userAuthInfo.isAuthed || userAuthInfo === null) return <Navigate to="/login" />
  if (permissions && !(userAuthInfo.data.user.permissions)) {
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
  const { userAuthInfo, isLoading } = useMMAuthentication(); // Use the hook function


  // Destructure userAuthInfo
  if (isLoading) return <>Loading...</>
  console.log("LS -> src/routes/index.tsx:54 -> isLoading: ", isLoading)

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
              />
            }
          />

          <Route
            path="/ClockRecord"
            element={
              <PrivateRoute
                component={AttendanceApp}
                permissions={[EPermissions.VIEW_CLOCKRECORD]}
              />
            }
          />
           <Route
            path="/ChineseDict"
            element={
              <PrivateRoute
                component={ChineseDictApp}
                permissions={[EPermissions.VIEW_CLOCKRECORD]}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default MainRouter;
