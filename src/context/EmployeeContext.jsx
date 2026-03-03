import { createContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage.js";

export const EmployeeContext = createContext();

export const EmployeeProvider = ({ children }) => {

  /* ⭐ Dummy Employees */
  const dummyEmployees = [
    {
      id: 1,
      name: "Lakshmi Kumari",
      department: "HR",
      email: "lakshmi@gmail.com",
      contact: "0785336575"
    },
    {
      id: 2,
      name: "Sadeepa Dilshan",
      department: "Finance",
      email: "sad@gmail.com",
      contact: "0785336575"
    }
  ];

  const [employees, setEmployees] =
    useLocalStorage("employees", dummyEmployees);

  const [leaveRequests, setLeaveRequests] =
    useLocalStorage("leaveRequests", []);

  /* Employee Functions */
  const addEmployee = (emp) =>
    setEmployees(prev => [...prev, { ...emp, id: Date.now() }]);

  const editEmployee = (updated) =>
    setEmployees(prev =>
      prev.map(emp =>
        emp.id === updated.id ? updated : emp
      )
    );

  const deleteEmployee = (id) =>
    setEmployees(prev =>
      prev.filter(emp => emp.id !== id)
    );

  /* Leave */
  const addLeaveRequest = (req) =>
    setLeaveRequests(prev => [
      ...prev,
      { ...req, id: Date.now(), status: "Pending" }
    ]);

  const updateLeaveStatus = (id, status) =>
    setLeaveRequests(prev =>
      prev.map(req =>
        req.id === id ? { ...req, status } : req
      )
    );

  return (
    <EmployeeContext.Provider value={{
      employees,
      addEmployee,
      editEmployee,
      deleteEmployee,

      leaveRequests,
      addLeaveRequest,
      updateLeaveStatus
    }}>
      {children}
    </EmployeeContext.Provider>
  );
};

export default EmployeeContext;