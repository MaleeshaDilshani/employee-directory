import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Directory from "./pages/Directory";
import LeaveRequests from "./pages/LeaveRequests";
import CompanyNews from "./pages/CompanyNews";
import MainLayout from "./layouts/MainLayout";
import ProtectedRoute from "./components/ProtectedRoute";

function App() { 

  const { user } = useContext(AuthContext); 

  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Login />} />

        <Route
          element={
            <ProtectedRoute>
              <MainLayout user={user} />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/directory" element={<Directory />} />
          <Route path="/leave" element={<LeaveRequests user={user} />} />
          <Route path="/news" element={<CompanyNews />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
