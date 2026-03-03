import { createContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage.js";


export const EmployeeContext = createContext();

export const EmployeeProvider = ({ children }) => {

 
  const [employees, setEmployees] = useLocalStorage("employees", defaultEmployees);
  const [leaveRequests, setLeaveRequests] = useLocalStorage("leaveRequests", leaveSeedData);
  const [news, setNews] = useLocalStorage("news", newsSeedData);

  // ---------------- EMPLOYEE FUNCTIONS ----------------
  const addEmployee = (newEmp) =>
    setEmployees(prev => [...prev, newEmp]);

  const editEmployee = (updatedEmp) =>
    setEmployees(prev =>
      prev.map(emp => emp.id === updatedEmp.id ? updatedEmp : emp)
    );

  const deleteEmployee = (id) =>
    setEmployees(prev =>
      prev.filter(emp => emp.id !== id)
    );

  const deleteMultipleEmployees = (ids) =>
    setEmployees(prev =>
      prev.filter(emp => !ids.includes(emp.id))
    );

  // ---------------- LEAVE FUNCTIONS ----------------
  const addLeaveRequest = (req) =>
    setLeaveRequests(prev => [
      ...prev,
      { ...req, id: Date.now(), status: "Pending" }
    ]);

  const updateLeaveStatus = (id, status) =>
    setLeaveRequests(prev =>
      prev.map(req => req.id === id ? { ...req, status } : req)
    );

  // ---------------- NEWS FUNCTIONS ----------------
  const addNews = (item) =>
    setNews(prev => [...prev, { ...item, id: Date.now() }]);

  const deleteNews = (id) =>
    setNews(prev => prev.filter(item => item.id !== id));

  return (
    <EmployeeContext.Provider
      value={{
        employees,
        addEmployee,
        editEmployee,
        deleteEmployee,
        deleteMultipleEmployees,
        leaveRequests,
        addLeaveRequest,
        updateLeaveStatus,
        news,
        addNews,
        deleteNews
      }}
    >
      {children}
    </EmployeeContext.Provider>
  );
};

export default EmployeeContext;