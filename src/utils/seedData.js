// ================= EMPLOYEE SEED DATA =================
export const defaultEmployees = [
  {
    id: 1,
    name: "Lakshmi Kumari",
    department: "HR",
    email: "lakshmi@gmail.com",
    contact: "0785336575"
  }
];

// ================= COMPANY NEWS SEED DATA =================
export const newsSeedData = [
  {
    id: 1,
    category: "Company",
    title: "Welcome New Marketing Director",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfHfSl9dGFUAighktQi7Bk88WyDp8LiqFQdg&s",
    description: "Welcome our new Marketing Director.",
    date: "2026-02-25"
  }
];

// ================= LEAVE REQUEST SEED DATA =================
export const leaveSeedData = [
  {
    id: 1,
    employeeId: 1,
    name: "Lakshmi Kumari",
    startDate: "2026-02-23",
    endDate: "2026-02-26",
    reason: "University work",
    status: "Pending",
    submittedOn: "2026-02-20"
  }
];