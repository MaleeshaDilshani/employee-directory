import { useContext, useState } from "react";
import { EmployeeContext } from "../context/EmployeeContext.jsx";

function LeaveRequests({ user }) {
  const { leaveRequests, addLeaveRequest, updateLeaveStatus } =
    useContext(EmployeeContext);

  const [newLeave, setNewLeave] = useState({
    startDate: "",
    endDate: "",
    reason: "",
  });

  const handleSubmit = () => {
    if (!newLeave.startDate || !newLeave.endDate || !newLeave.reason) return;

    const today = new Date().toISOString().split("T")[0];

    if (newLeave.startDate < today) {
      alert("Start Date cannot be in the past");
      return;
    }

    addLeaveRequest({
      ...newLeave,
      employeeId: user.id,
      name: user.name,
      status: "Pending",
      submittedOn: today,
    });

    setNewLeave({ startDate: "", endDate: "", reason: "" });
  };

  // Admin sees all, employee sees only their own
  const displayedRequests =
    user.role === "admin"
      ? leaveRequests
      : leaveRequests.filter((req) => req.employeeId === user.id);

  return (
    <div className="p-6 space-y-6">

      {/* All Leave Requests */}
      <h1 className="text-2xl font-bold text-orange-500 mb-4">
        Leave Requests
      </h1>

      <div className="bg-white p-6 rounded-2xl shadow overflow-x-auto">
  <table className="w-full">
    <thead>
      <tr className="border-b">
        <th className="text-left p-2">Employee</th>
        <th className="text-left p-2 min-w-30">Start Date</th>
        <th className="text-left p-2 min-w-30">End Date</th>
        <th className="text-left p-2">Reason</th>
        <th className="text-left p-2">Status</th>
        {user.role === "admin" && (
          <th className="text-left p-2 min-w-35">Actions</th>
        )}
      </tr>
    </thead>

    <tbody>
      {displayedRequests.length === 0 && (
        <tr>
          <td
            colSpan={user.role === "admin" ? 6 : 5}
            className="text-center p-4 text-gray-500"
          >
            No leave requests found.
          </td>
        </tr>
      )}

      {displayedRequests.map((req) => (
        <tr key={req.id} className="border-b border-black hover:bg-orange-50 transition">
          <td className="p-2">{req.name}</td>
          <td className="p-2">{req.startDate}</td>
          <td className="p-2">{req.endDate}</td>
          <td className="p-2">{req.reason}</td>

          <td className="p-2">
            <span
              className={`px-2 py-1 rounded text-xs ${
                req.status === "Approved"
                  ? "bg-green-100 text-green-600"
                  : req.status === "Rejected"
                  ? "bg-red-100 text-red-600"
                  : "bg-yellow-100 text-yellow-600"
              }`}
            >
              {req.status}
            </span>
          </td>

          {user.role === "admin" && (
            <td className="p-2">
              <div className="flex gap-2">
                <button
                  onClick={() => updateLeaveStatus(req.id, "Approved")}
                  className="bg-green-500 text-white px-3 py-1 rounded text-xs hover:bg-green-600"
                >
                  Approve
                </button>

                <button
                  onClick={() => updateLeaveStatus(req.id, "Rejected")}
                  className="bg-red-500 text-white px-3 py-1 rounded text-xs hover:bg-red-600"
                >
                  Reject
                </button>
              </div>
            </td>
          )}
        </tr>
      ))}
    </tbody>
  </table>
</div>

      {/* Employee Submit Form */}
      {user.role === "employee" && (
        <div>
          <h2 className="text-xl font-bold text-orange-500 mt-6">
            Request Time Off
          </h2>

          <p className="text-sm text-gray-500 mb-3">
            Submit a new leave request for approval
          </p>

          <div className="bg-white p-6 rounded-2xl shadow max-w-md flex flex-col gap-3">

            <label className="font-semibold text-gray-700">
              Start Date
            </label>
            <input
              type="date"
              value={newLeave.startDate}
              onChange={(e) =>
                setNewLeave({ ...newLeave, startDate: e.target.value })
              }
              className="border p-2 rounded"
            />

            <label className="font-semibold text-gray-700">
              End Date
            </label>
            <input
              type="date"
              value={newLeave.endDate}
              onChange={(e) =>
                setNewLeave({ ...newLeave, endDate: e.target.value })
              }
              className="border p-2 rounded"
            />

            <label className="font-semibold text-gray-700">
              Reason
            </label>
            <textarea
              placeholder="Briefly describe the reason for your leave..."
              value={newLeave.reason}
              onChange={(e) =>
                setNewLeave({ ...newLeave, reason: e.target.value })
              }
              className="border p-2 rounded"
            />

            <button
              onClick={handleSubmit}
              className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition"
            >
              Submit Request
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default LeaveRequests;


