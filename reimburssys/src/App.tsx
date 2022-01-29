import React, { useEffect, useState } from "react";
import ReimbursementSubmissionPage from "./components/reimbursement-submission-page";
import ReimbursementViewerPage from "./components/reimbursement-viewer-page";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LoginPage from "./components/login-page";
import ManagerHomePage from "./components/manager-homepage";
import EmployeeHomePage from "./components/employee-home-page";
import EmployeePastReimbursementsPage from "./components/employee-past-reimbursements-page";
import { Employee } from "./dtos/dtos";
import ManagerStatsTable from "./components/Manager-stats-table";
import EmployeeReceipt from "./components/Employee-receipt";

export default function App() {
  const [user, setUser] = useState({
    username: sessionStorage.getItem("username"),
    isEmployee: Boolean(sessionStorage.getItem("isEmployee")),
    id: sessionStorage.getItem("id"),
  });

  const [employee, setEmployee] = useState<Employee>({
    id: "0",
    username: "",
    password: "",
    fname: "",
    lname: "",
    isManager: false,
    reimbursements: [],
  });
  // const[employees,updateEmployees] = useState([])
  // const[reimbursements,updateReimbursements] = useState([])

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<LoginPage updateUser={setUser} setEmployee={setEmployee} />}
        />
        <Route
          path="/employees"
          element={<EmployeeHomePage employee={employee} />}
        />
        <Route
          path="/employees/pastreimbs"
          element={<EmployeePastReimbursementsPage />}
        />
        <Route path="/receipt" element={<EmployeeReceipt />} />
        <Route path="/managers/*" element={<ManagerHomePage />} />
        {/* <Route path = "/stats" element = {<ManagerStatsTable reimbursements={reimbursements}/>}/> */}
      </Routes>
    </Router>
  );
}
