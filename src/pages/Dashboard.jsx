import { FaUsers, FaBuilding, FaClock, FaCheckCircle } from "react-icons/fa";
import { useContext } from "react";
import { EmployeeContext } from "../context/EmployeeContext.jsx";

function Dashboard() { 


  const user = JSON.parse(localStorage.getItem("user"));
  const { employees, leaveRequests } = useContext(EmployeeContext);

  // Dynamic counts
  const totalEmployees = employees.length;
  const totalDepartments = [...new Set(employees.map(emp => emp.department))].length;
  const pendingRequests = leaveRequests.filter(r => r.status === "Pending").length;
  const approvedLeaves = leaveRequests.filter(r => r.status === "Approved").length;

  // Recent data
  const recentHires = employees.slice(-5).reverse();
  const recentLeaves = leaveRequests.slice(-5).reverse();

  return (
    <div>
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-orange-500">
          Welcome back, {user?.name} 👋
        </h1>
        <p className="text-gray-500 mt-1">
          Here's an overview of your organization today.
        </p>
      </div> 

      {/* Admin Dashboard Cards */}
      {user.role === "admin" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {/* Total Employees */}
          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500">Total Employees</p>
                <h2 className="text-3xl font-bold mt-2">{totalEmployees}</h2>
              </div>
              <FaUsers className="text-orange-500 text-3xl" />
            </div>
          </div>

          {/* Departments */}
          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500">Departments</p>
                <h2 className="text-3xl font-bold mt-2">{totalDepartments}</h2>
              </div>
              <FaBuilding className="text-blue-500 text-3xl" />
            </div>
          </div>

          {/* Pending Requests */}
          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500">Pending Requests</p>
                <h2 className="text-3xl font-bold mt-2">{pendingRequests}</h2>
              </div>
              <FaClock className="text-yellow-500 text-3xl" />
            </div>
          </div>

          {/* Approved Leaves */}
          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500">Approved Leaves</p>
                <h2 className="text-3xl font-bold mt-2">{approvedLeaves}</h2>
              </div>
              <FaCheckCircle className="text-green-500 text-3xl" />
            </div>
          </div>
        </div>
      )}

      {/* Extra Dashboard Sections */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* By Department */}
        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
          <h3 className="text-lg font-semibold mb-4 text-orange-500">Employees By Department</h3>
          {[...new Set(employees.map(emp => emp.department))].map((dept, index) => (
            <div key={index} className="flex justify-between mb-3">
              <span>{dept}</span>
              <span className="font-bold">
                {employees.filter(emp => emp.department === dept).length}
              </span>
            </div>
          ))}
        </div>

        {/* Recent Hires */}
        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
          <h3 className="text-lg font-semibold mb-4 text-orange-500">Recent Hires</h3>
          {recentHires.length === 0 && <p>No hires yet.</p>}
          {recentHires.map((emp) => (
            <div key={emp.id} className="flex justify-between mb-3">
              <span>{emp.name}</span>
              <span className="text-gray-500">{emp.department}</span>
            </div>
          ))}
        </div>

        {/* Recent Leave Requests */}
        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
          <h3 className="text-lg font-semibold mb-4 text-orange-500">Recent Leave Requests</h3>
          {recentLeaves.length === 0 && <p>No leave requests yet.</p>}
          {recentLeaves.map((leave) => (
            <div key={leave.id} className="flex justify-between mb-3">
              <span>{leave.name}</span>
              <span className={`px-3 py-1 rounded text-sm ${
                leave.status === "Approved" ? "bg-green-100 text-green-600" :
                leave.status === "Rejected" ? "bg-red-100 text-red-600" :
                "bg-yellow-100 text-yellow-600"
              }`}>
                {leave.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Employee Simple View */}
      {user.role === "employee" && (
        <div className="bg-white p-6 rounded-2xl shadow mt-6">
          <p className="text-gray-600">
            You can manage your leave requests and view team information from the sidebar.
          </p>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
