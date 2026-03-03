import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import loginImage from "../assets/2.png";
 
function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    const adminUser = {
      id: 1,
      email: "admin@worknest.com",
      password: "1234",
      role: "admin",
      name: "HR Manager",
    };

    const employeeUser = {
      id: 2,
      email: "employee@worknest.com",
      password: "1234",
      role: "employee",
      name: "Employee",
    };

    if (email === adminUser.email && password === adminUser.password) {
      if (confirmPassword !== "1234") {
        setError("Admin confirm password incorrect");
        return;
      }
      login(adminUser);
      navigate("/dashboard");
    } else if (
      email === employeeUser.email &&
      password === employeeUser.password
    ) {
      login(employeeUser);
      navigate("/dashboard");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-yellow-100 to-orange-200">

      {/* Login Card */}
      <div className="bg-white shadow-2xl rounded-3xl p-10 w-100">

        {/* Image */}
        <div className="flex justify-center mb-4">
          <img
            src={loginImage}
            alt="login"
            className="w-24"
          />
        </div>

        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-orange-600">
          Welcome to WorkNest
        </h2>

        {/* Small Tagline */}
        <p className="text-sm text-gray-500 text-center mb-6">
          Smart Employee Management System
        </p>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-orange-400 outline-none mb-4"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-orange-400 outline-none mb-4"
        />

        {email === "admin@worknest.com" && (
          <input
            type="password"
            placeholder="Confirm Password (Admin Only)"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-orange-400 outline-none mb-4"
          />
        )}

        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">
            {error}
          </p>
        )}

        <button
          onClick={handleLogin}
          className="w-full py-3 rounded-xl font-semibold text-white bg-orange-500 hover:bg-orange-600 transition duration-300"
        >
          Login
        </button>

        <p className="text-xs text-center text-gray-600 mt-6">
          Admin: admin@worknest.com / 1234 <br />
          Employee: employee@worknest.com / 1234
        </p>
      </div>
    </div>
  );
}

export default Login;


