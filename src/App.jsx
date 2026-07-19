import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoutes";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Procurement from "./pages/Procurement";
import Transactions from "./pages/Transactions";
import Sales from "./pages/Sales";
import SalesTransactions from "./pages/SalesTransactions";
import Analysis from "./pages/Analysis";
import BrokenRice from "./pages/BrokenRice";
import BrokenRiceTransactions from "./pages/BrokenRiceTransactions";
import EmployeeSalary from "./pages/EmployeeSalary";
import EmployeeSalaryTransactions from "./pages/EmployeeSalaryTransactions";
import Attendance from "./pages/Attendance";
import Employees from "./pages/Employees";
import EmployeeRegister from "./pages/EmployeeRegister";
import Expenses from "./pages/Expenses";
import ExpenseTransactions from "./pages/ExpenseTransactions";
import Ledger from "./pages/Ledger";
import Government from "./pages/Government";
import GovernmentTransactions from "./pages/GovernmentTransactions";
import Milling from "./pages/Milling";
import WeighBridge from "./pages/WeighBridge";
import WeighBridgeTransactions from "./pages/WeighBridgeTransactions";
import CompanyProfile from "./pages/CompanyProfile";
import SkuMaster from "./pages/SkuMaster";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* Redirect root to login */}

        <Route
          path="/"
          element={<Navigate to="/login" replace />}
        />

        {/* Authentication */}

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />

        {/* Protected Routes */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/procurement"
          element={
            <ProtectedRoute>
              <Procurement />
            </ProtectedRoute>
          }
        />

        <Route
          path="/transactions"
          element={
            <ProtectedRoute>
              <Transactions />
            </ProtectedRoute>
          }
        />

        <Route
          path="/sales"
          element={
            <ProtectedRoute>
              <Sales />
            </ProtectedRoute>
          }
        />

        <Route
          path="/sales-transactions"
          element={
            <ProtectedRoute>
              <SalesTransactions />
            </ProtectedRoute>
          }
        />

        <Route
          path="/analysis"
          element={
            <ProtectedRoute>
              <Analysis />
            </ProtectedRoute>
          }
        />

        <Route
          path="/brokenrice"
          element={
            <ProtectedRoute>
              <BrokenRice />
            </ProtectedRoute>
          }
        />

        <Route
          path="/brokenrice-transactions"
          element={
            <ProtectedRoute>
              <BrokenRiceTransactions />
            </ProtectedRoute>
          }
        />

        <Route
          path="/salary"
          element={
            <ProtectedRoute>
              <EmployeeSalary />
            </ProtectedRoute>
          }
        />

        <Route
          path="/salary-transactions"
          element={
            <ProtectedRoute>
              <EmployeeSalaryTransactions />
            </ProtectedRoute>
          }
        />

        <Route
          path="/attendance"
          element={
            <ProtectedRoute>
              <Attendance />
            </ProtectedRoute>
          }
        />

        <Route
          path="/employees"
          element={
            <ProtectedRoute>
              <Employees />
            </ProtectedRoute>
          }
        />

        <Route
          path="/employee-register"
          element={
            <ProtectedRoute>
              <EmployeeRegister />
            </ProtectedRoute>
          }
        />

        <Route
          path="/expenses"
          element={
            <ProtectedRoute>
              <Expenses />
            </ProtectedRoute>
          }
        />

        <Route
          path="/expense-transactions"
          element={
            <ProtectedRoute>
              <ExpenseTransactions />
            </ProtectedRoute>
          }
        />

        <Route
          path="/ledger"
          element={
            <ProtectedRoute>
              <Ledger />
            </ProtectedRoute>
          }
        />

        <Route
          path="/government"
          element={
            <ProtectedRoute>
              <Government />
            </ProtectedRoute>
          }
        />

        <Route
          path="/government-transactions"
          element={
            <ProtectedRoute>
              <GovernmentTransactions />
            </ProtectedRoute>
          }
        />

        <Route
          path="/milling"
          element={
            <ProtectedRoute>
              <Milling />
            </ProtectedRoute>
          }
        />

        <Route
          path="/weighbridge"
          element={
            <ProtectedRoute>
              <WeighBridge />
            </ProtectedRoute>
          }
        />

        <Route
          path="/weighbridge-transactions"
          element={
            <ProtectedRoute>
              <WeighBridgeTransactions />
            </ProtectedRoute>
          }
        />

        <Route
          path="/company-profile"
          element={
            <ProtectedRoute>
              <CompanyProfile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/sku"
          element={
            <ProtectedRoute>
              <SkuMaster />
            </ProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>

  );
}

export default App;