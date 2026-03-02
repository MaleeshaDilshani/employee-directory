import React from "react"
import ReactDOM from "react-dom/client"
import './index.css'
import App from "./App"
import { AuthProvider } from "./context/AuthContext.jsx"
import {EmployeeProvider} from "./context/EmployeeContext.jsx";
import { NewsProvider } from "./context/NewsContext.jsx"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <EmployeeProvider>
        <NewsProvider>
        <App />
        </NewsProvider> 
      </EmployeeProvider>
    </AuthProvider>
  </React.StrictMode>
) 
 