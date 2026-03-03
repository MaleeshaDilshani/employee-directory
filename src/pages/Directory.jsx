import { useContext, useState } from "react";
import { EmployeeContext } from "../context/EmployeeContext";
import { AuthContext } from "../context/AuthContext";
/* ⭐ Dummy Data (Only UI Display Backup) */
const dummyEmployees = [
  {
    id: 1,
    name: "Lakshmi Kumari",
    email: "lakshmi@gmail.com",
    department: "HR",
    contact: "0785336575"
  },
  {
    id: 2,
    name: "Sadeepa Dilshan",
    email: "sadeepa@gmail.com",
    department: "Finance",
    contact: "0785336575"
  },
  {
    id: 3,
    name: "Nimal Wickramathilaka",
    email: "nimal@gmail.com",
    department: "Marketing",
    contact: "0724673773"
  }
];

function Directory() {  
  

  const { employees, addEmployee, deleteEmployee, editEmployee } =
    useContext(EmployeeContext);

  const { user } = useContext(AuthContext);
  const isAdmin = user?.role === "admin";
/* ⭐ Fallback Data Logic */
  const [localEmployees, setLocalEmployees] = useState([]);

  useEffect(() => {

    if (employees && employees.length > 0) {
      setLocalEmployees(employees);
    } else {
      setLocalEmployees(dummyEmployees);
    }

  }, [employees]);
  const [search, setSearch] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const [currentEmployee, setCurrentEmployee] = useState({
    id: null,
    name: "",
    email: "",
    department: "",
    contact: "",
  });

  /* Bulk Delete */
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [showBulkDelete, setShowBulkDelete] = useState(false);

  /* Delete Modal */
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);

  /* Filter Employees */
  const filteredEmployees = employees.filter(
    (emp) =>
      emp.name.toLowerCase().includes(search.toLowerCase()) &&
      (departmentFilter === "" || emp.department === departmentFilter)
  );

  /* Open Add Form */
  const handleOpenForm = () => {
    setEditMode(false);
    setCurrentEmployee({
      id: null,
      name: "",
      email: "",
      department: "",
      contact: "",
    });
    setShowForm(true);
  };

  /* Edit Employee */
  const handleEdit = (emp) => {
    setEditMode(true);
    setCurrentEmployee({ ...emp });
    setShowForm(true);
  };

  /* Submit Add / Edit */
  const handleSubmit = () => {
    if (!currentEmployee.name || !currentEmployee.email) return;

    if (editMode) {
      editEmployee(currentEmployee);
    } else {
      addEmployee({ ...currentEmployee, id: Date.now() });
    }

    setShowForm(false);
    setEditMode(false);
  };

  /* Cancel Form */
  const handleCancelForm = () => {
    setShowForm(false);
    setEditMode(false);
    setCurrentEmployee({
      id: null,
      name: "",
      email: "",
      department: "",
      contact: "",
    });
  };

  /* Delete */
  const confirmDelete = (emp) => {
    setEmployeeToDelete(emp);
    setShowDeleteModal(true);
  };

  const handleDelete = () => {
    deleteEmployee(employeeToDelete.id);
    setShowDeleteModal(false);
  };

  /* Bulk Delete */
  const handleBulkDelete = () => {
    selectedEmployees.forEach(id => deleteEmployee(id));
    setSelectedEmployees([]);
    setShowBulkDelete(false);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6">

      {/* LEFT TABLE */}
      <div className="flex-1">

        <h1 className="text-2xl font-bold text-orange-500 mb-4">
          Employee Directory
        </h1>

        {/* Search + Filter */}
        <div className="flex flex-col md:flex-row md:justify-between mb-4 gap-3">

          <input
            type="text"
            placeholder="Search by name..."
            className="border p-2 rounded flex-1"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="border p-2 rounded"
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
          >
            <option value="">All Departments</option>
            <option value="Engineering">Engineering</option>
            <option value="Marketing">Marketing</option>
            <option value="HR">HR</option>
            <option value="Finance">Finance</option>
          </select>
          {isAdmin && (
            <button
              onClick={handleOpenForm}
              className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
            >
              + Add Employee
            </button>
          )}

        </div>

        {/* Bulk Delete Button */}
        {isAdmin && selectedEmployees.length > 0 && (
          <button
            onClick={() => setShowBulkDelete(true)}
            className="bg-red-600 text-white px-4 py-2 rounded mb-3"
          >
            Remove {selectedEmployees.length} Employees
          </button>
        )}

        {/* Table */}
        <div className="bg-white p-6 rounded-2xl shadow overflow-x-auto">

          <table className="w-full">

            <thead>
              <tr className="border-b">

                {isAdmin && (
                  <th className="p-2">
                    <input
                      type="checkbox"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedEmployees(
                            filteredEmployees.map(emp => emp.id)
                          );
                        } else {
                          setSelectedEmployees([]);
                        }
                      }}
                    />
                  </th>
                )}

                <th className="text-left p-2">Name</th>
                <th className="text-left p-2">Department</th>
                <th className="text-left p-2">Email</th>
                <th className="text-left p-2">Contact</th>

                {isAdmin && <th className="text-left p-2">Actions</th>}
              </tr>
            </thead>

            <tbody>
              {filteredEmployees.map(emp => (
                <tr key={emp.id} className="border-b hover:bg-orange-50">

                  {isAdmin && (
                    <td className="p-2">
                      <input
                        type="checkbox"
                        checked={selectedEmployees.includes(emp.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedEmployees([...selectedEmployees, emp.id]);
                          } else {
                            setSelectedEmployees(
                              selectedEmployees.filter(id => id !== emp.id)
                            );
                          }
                        }}
                      />
                    </td>
                  )}

                  <td className="p-2">{emp.name}</td>
                  <td className="p-2">{emp.department}</td>
                  <td className="p-2">{emp.email}</td>
                  <td className="p-2">{emp.contact}</td>

                  {isAdmin && (
                    <td className="p-2 flex gap-2">
                      <button
                        onClick={() => handleEdit(emp)}
                        className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => confirmDelete(emp)}
                        className="bg-red-500 text-white px-3 py-1 rounded text-sm"
                      >
                        Delete
                      </button>
                    </td>
                  )}

                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>

      {/* FORM */}
      {isAdmin && showForm && (
        <div className="w-full lg:w-96 bg-white p-6 rounded-2xl shadow flex flex-col gap-3">

          <h3 className="text-lg font-semibold text-orange-500">
            {editMode ? "Edit Employee" : "Add Employee"}
          </h3>

          <input
            placeholder="Name"
            className="border p-2 rounded"
            value={currentEmployee.name}
            onChange={(e) => setCurrentEmployee({ ...currentEmployee, name: e.target.value })}
          />

          <input
            placeholder="Email"
            className="border p-2 rounded"
            value={currentEmployee.email}
            onChange={(e) => setCurrentEmployee({ ...currentEmployee, email: e.target.value })}
          />

          <input
            placeholder="Contact"
            className="border p-2 rounded"
            value={currentEmployee.contact}
            onChange={(e) => setCurrentEmployee({ ...currentEmployee, contact: e.target.value })}
          />

          <select
            className="border p-2 rounded"
            value={currentEmployee.department}
            onChange={(e) => setCurrentEmployee({ ...currentEmployee, department: e.target.value })}
          >
            <option value="">Select Department</option>
            <option value="Engineering">Engineering</option>
            <option value="Marketing">Marketing</option>
            <option value="HR">HR</option>
            <option value="Finance">Finance</option>
          </select>

          <div className="flex gap-2">
            <button
              onClick={handleSubmit}
              className="bg-orange-500 text-white px-4 py-2 rounded w-full"
            >
              {editMode ? "Update" : "Add"}
            </button>

            <button
              onClick={handleCancelForm}
              className="border px-4 py-2 rounded w-full"
            >
              Cancel
            </button>
          </div>

        </div>
      )}

      {/* BULK DELETE MODAL */}
      {isAdmin && showBulkDelete && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/20 z-50">

          <div className="bg-white p-6 rounded-2xl w-96">

            <h3 className="text-xl font-semibold text-orange-500 mb-4">
              Remove {selectedEmployees.length} Employees
            </h3>

            <p className="mb-4">
              You are about to remove {selectedEmployees.length} employees.
              This action cannot be undone.
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowBulkDelete(false)}
                className="border px-4 py-2 rounded"
              >
                Cancel
              </button>

              <button
                onClick={handleBulkDelete}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Remove
              </button>
            </div>

          </div>
        </div>
      )}

      {/* SINGLE DELETE MODAL */}
      {isAdmin && showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/20 z-50">

          <div className="bg-white p-6 rounded-2xl w-96">

            <h3 className="text-xl font-semibold text-orange-500 mb-4">
              Offboard Employee
            </h3>

            <p>
              Remove <b>{employeeToDelete?.name}</b> ?
            </p>

            <div className="flex justify-end gap-3 mt-4">

              <button
                onClick={() => setShowDeleteModal(false)}
                className="border px-4 py-2 rounded"
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Remove
              </button>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}

export default Directory;