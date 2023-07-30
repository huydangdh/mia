// src/StepRouter.js
import {
  BrowserRouter as Router,
  Link,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import App from "../App";
import Header from "../components/common/Header";
import Dashboard from "../components/dashboard/Dashboard";
import Login from "../Login";

const StepRouter = () => {
  return (
    <Router>
      <div>
        <Header />

        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          {/* Add other routes for different steps as needed */}
        </Routes>
      </div>
    </Router>
  );
};


export default StepRouter;
