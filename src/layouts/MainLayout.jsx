import { Outlet, Navigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

function MainLayout() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex min-h-screen bg-orange-50">
      <Sidebar />
      <div className="flex-1 p-6">
        <Outlet />
      </div>
    </div>
  );
}

export default MainLayout;
