import { createContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage.js";

export const EmployeeContext = createContext();

export const EmployeeProvider = ({ children }) => { 

  const deleteMultipleEmployees = (ids) => {
  setEmployees(employees.filter(emp => !ids.includes(emp.id)));
};
  const [employees, setEmployees] = useLocalStorage("employees", []);
  const [leaveRequests, setLeaveRequests] = useLocalStorage("leaveRequests", []);

  const addEmployee = (newEmp) => setEmployees([...employees, newEmp]);
  const editEmployee = (updatedEmp) =>
    setEmployees(employees.map(emp => emp.id === updatedEmp.id ? updatedEmp : emp));
  const deleteEmployee = (id) =>
    setEmployees(employees.filter(emp => emp.id !== id));

  const addLeaveRequest = (req) =>
    setLeaveRequests([...leaveRequests, { ...req, id: Date.now() }]);
  const updateLeaveStatus = (id, status) =>
    setLeaveRequests(leaveRequests.map(req => req.id === id ? { ...req, status } : req));

  return (
    <EmployeeContext.Provider value={{
      employees, addEmployee, editEmployee, deleteEmployee, deleteMultipleEmployees,
      leaveRequests, addLeaveRequest, updateLeaveStatus
    }}>
      {children}
    </EmployeeContext.Provider>
  );
};
export default EmployeeContext;