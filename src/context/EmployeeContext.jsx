import { createContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage.js";

/* ⭐ Dummy Seed Employees */
const seedEmployees = [
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
  },
  {
    id: 4,
    name: "Nipun Lakshitha",
    email: "nipun@gmail.com",
    department: "Marketing",
    contact: "0783340064"
  },
  {
    id: 5,
    name: "Gayani Hansika",
    email: "gayani@gmail.com",
    department: "Engineering",
    contact: "0785336577"
  }
];

/* ⭐ Dummy Leave Requests */
const seedLeaves = [
  {
    id: 1,
    employeeId: 1,
    name: "Lakshmi Kumari",
    startDate: "2026-02-23",
    endDate: "2026-02-26",
    reason: "University placement letter",
    status: "Pending"
  },
  {
    id: 2,
    employeeId: 2,
    name: "Sadeepa Dilshan",
    startDate: "2026-02-25",
    endDate: "2026-02-27",
    reason: "Office document signing",
    status: "Approved"
  },
  {
    id: 3,
    employeeId: 3,
    name: "Nimal Wickramathilaka",
    startDate: "2026-02-26",
    endDate: "2026-02-27",
    reason: "Family vacation",
    status: "Pending"
  }
];

export const EmployeeContext = createContext();

export const EmployeeProvider = ({ children }) => {

  /* ⭐ LocalStorage With Seed Fallback */
  const [employees, setEmployees] = useLocalStorage(
    "employees",
    seedEmployees
  );

  const [leaveRequests, setLeaveRequests] = useLocalStorage(
    "leaveRequests",
    seedLeaves
  );

  /* ⭐ Employee Actions */
  const addEmployee = (newEmp) =>
    setEmployees(prev => [
      ...prev,
      { ...newEmp, id: Date.now() }
    ]);

  const editEmployee = (updatedEmp) =>
    setEmployees(prev =>
      prev.map(emp =>
        emp.id === updatedEmp.id ? updatedEmp : emp
      )
    );

  const deleteEmployee = (id) =>
    setEmployees(prev =>
      prev.filter(emp => emp.id !== id)
    );

  const deleteMultipleEmployees = (ids) =>
    setEmployees(prev =>
      prev.filter(emp => !ids.includes(emp.id))
    );

  /* ⭐ Leave Actions */
  const addLeaveRequest = (req) =>
    setLeaveRequests(prev => [
      ...prev,
      {
        ...req,
        id: Date.now(),
        status: "Pending"
      }
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
      deleteMultipleEmployees,
      leaveRequests,
      addLeaveRequest,
      updateLeaveStatus
    }}>
      {children}
    </EmployeeContext.Provider>
  );
};

export default EmployeeContext;