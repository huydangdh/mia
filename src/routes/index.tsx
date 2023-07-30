// src/StepRouter.js
import { BrowserRouter as Router, Route, Link, Routes, Outlet } from 'react-router-dom';
import App from '../App';
import Header from '../components/common/Header';
import Dashboard from '../components/dashboard/Dashboard';

const StepRouter = () => {
  return (
    <Router>
      <div>
        <Header />

        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/dashboard" element={<Dashboard />} />
          {/* Add other routes for different steps as needed */}
        </Routes>
      </div>
    </Router>
  );
};

const Home = () => {
  return <div>Home Page</div>;
};

export default StepRouter;

