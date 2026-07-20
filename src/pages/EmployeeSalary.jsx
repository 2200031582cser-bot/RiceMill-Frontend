import { useEffect, useState } from "react";

import api from "../api";

import Sidebar from "../components/Sidebar";

function EmployeeSalary() {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [employees, setEmployees] =
    useState([]);

  const [selectedEmployee, setSelectedEmployee] =
    useState("");

  const [selectedMonth, setSelectedMonth] =
    useState("");

  const [employeeDetails, setEmployeeDetails] =
    useState(null);

  const [summary, setSummary] =
    useState({
      fullDays: 0,
      halfDays: 0,
      absentDays: 0
    });

    const [salaryData,setSalaryData] =
useState(null);

const [showPayment,setShowPayment] =
useState(false);

const [amountPaid,setAmountPaid] =
useState("");

  // FETCH EMPLOYEES

  const fetchEmployees = async () => {

  try {

    const response = await api.get(

      `/employee/user/${user.id}`

    );

    setEmployees(response.data);

  }

  catch (error) {

    console.log(error);

  }

};

  useEffect(() => {

  if (user?.id) {

    fetchEmployees();

  }

}, []);

useEffect(() => {

  fetchSalaryData();

}, [selectedEmployee, selectedMonth]);

const fetchSalaryData = async () => {

  if(
    selectedEmployee === "" ||
    selectedMonth === ""
  ){
    return;
  }

  try {

    const response = await api.get(
      `/salary`
    );

    const record =
      response.data.find(

        item =>

          item.employeeName === selectedEmployee

          &&

          item.monthName === selectedMonth

      );

    setSalaryData(record || null);

  }

  catch(error){

    console.log(error);

  }

};
  // FETCH ATTENDANCE SUMMARY

  const fetchSummary = async () => {

    if (

      selectedEmployee === ""

      ||

      selectedMonth === ""

    ) {

      return;
    }

    try {

      // FIND EMPLOYEE DETAILS

      const employee = employees.find(

        (emp) =>

          emp.employeeName === selectedEmployee

      );

      setEmployeeDetails(employee);

      // FETCH ATTENDANCE SUMMARY

      const response = await api.get(

        `/attendance/summary/${selectedEmployee}/${selectedMonth}`

      );

      setSummary(response.data);

    }

    catch (error) {

      console.log(error);
    }
  };

  useEffect(() => {

    fetchSummary();

  }, [selectedEmployee, selectedMonth]);

  // DAILY WAGE

  const dailyWage =

    employeeDetails?.dailyWage || 0;

  // FINAL SALARY

  const attendanceSalary =

(
summary.fullDays * dailyWage
)

+

(
summary.halfDays *
(dailyWage / 2)
);

const totalPayable =

attendanceSalary

+

(employeeDetails?.monthlySalary || 0);

const openPayment = () => {

  if(
    selectedEmployee === "" ||
    selectedMonth === ""
  ){
    alert(
      "Select Employee and Month First"
    );
    return;
  }

  setShowPayment(true);

};

const paySalary = async () => {

  try {

    // First payment

    if(!salaryData){

      const response = await api.post(

        "/salary",

        {

          userId: user.id,

          employeeName: selectedEmployee,

          monthName: selectedMonth,

          dailyWage: dailyWage,

          fullDays: summary.fullDays,

          halfDays: summary.halfDays,

          monthlyFixed:
            employeeDetails?.monthlySalary || 0,

          finalSalary:
            totalPayable,

          amountPaid:
            Number(amountPaid),

          balanceAmount:
            totalPayable -
            Number(amountPaid)

        }

      );

      setSalaryData(
        response.data
      );

    }

    // Existing record

    else {

      await api.put(

        `/salary/pay/${salaryData.id}`,

        {

          amountPaid:
            Number(amountPaid)

        }

      );

    }

    alert(
      "Payment Saved"
    );

    setShowPayment(false);

    setAmountPaid("");

    fetchSalaryData();

  }

  catch(error){

    console.log(error);

    alert(
      "Error Saving Payment"
    );

  }

};



  return (

<div className="page">

  <Sidebar />

  <div className="page-content">

    {/* HERO */}

    <div
      className="
      rounded-[36px]
      p-10
      mb-8
      border
      border-[#E8E2DC]
      shadow-sm
      flex
      justify-between
      items-center
      "
      style={{
        background:
          "linear-gradient(135deg,#F3F2F5,#E6D5CB,#D1BDB0)"
      }}
    >

      <div>

        <h1
          className="
          text-5xl
          font-bold
          text-[#655C56]
          "
        >
           Salary Management
        </h1>

        <p
          className="
          mt-3
          text-[#8C8179]
          text-lg
          "
        >
          Calculate salaries and manage payments
        </p>

      </div>

      <button
        onClick={() =>
          window.location.href =
          "/salary-transactions"
        }
        className="
        bg-[#C86A4A]
        hover:bg-[#B85A3A]
        text-white
        px-8
        py-4
        rounded-2xl
        "
      >
        Salary Transactions
      </button>

    </div>

    {/* FILTER */}

    <div
      className="
      bg-white
      rounded-[32px]
      p-8
      shadow-sm
      border
      border-[#E8E2DC]
      mb-8
      "
    >

      <h2
        className="
        text-2xl
        font-bold
        text-[#655C56]
        mb-6
        "
      >
        Salary Calculation
      </h2>

      <div
        className="
        grid
        md:grid-cols-2
        gap-8
        "
      >

        <div>

          <label
            className="
            block
            mb-3
            font-medium
            text-[#655C56]
            "
          >
            Employee
          </label>

          <select
            value={selectedEmployee}
            onChange={(e) =>
              setSelectedEmployee(
                e.target.value
              )
            }
          >

            <option value="">
              Select Employee
            </option>

            {
              employees.map((employee) => (

                <option
                  key={employee.id}
                  value={employee.employeeName}
                >
                  {employee.employeeName}
                </option>

              ))
            }

          </select>

        </div>

        <div>

          <label
            className="
            block
            mb-3
            font-medium
            text-[#655C56]
            "
          >
            Month
          </label>

          <input
            type="month"
            value={selectedMonth}
            onChange={(e) =>
              setSelectedMonth(
                e.target.value
              )
            }
          />

        </div>

      </div>

    </div>

    {/* ATTENDANCE STATS */}

    <div
      className="
      grid
      md:grid-cols-3
      gap-6
      mb-8
      "
    >

      <div className="erp-card">

        <p className="text-gray-500">
          Full Days
        </p>

        <h1
          className="
          text-6xl
          font-bold
          text-[#A0522D]
          mt-3
          "
        >
          {summary.fullDays}
        </h1>

      </div>

      <div className="erp-card">

        <p className="text-gray-500">
          Half Days
        </p>

        <h1
          className="
          text-6xl
          font-bold
          text-yellow-600
          mt-3
          "
        >
          {summary.halfDays}
        </h1>

      </div>

      <div className="erp-card">

        <p className="text-gray-500">
          Absent Days
        </p>

        <h1
          className="
          text-6xl
          font-bold
          text-red-600
          mt-3
          "
        >
          {summary.absentDays}
        </h1>

      </div>

    </div>

    {/* SALARY OVERVIEW */}

    <div
      className="
      bg-white
      rounded-[32px]
      p-8
      shadow-sm
      border
      border-[#E8E2DC]
      "
    >

      <h2
        className="
        text-3xl
        font-bold
        text-[#655C56]
        mb-8
        "
      >
        Salary Overview
      </h2>

      <div
        className="
        grid
        md:grid-cols-3
        gap-6
        "
      >

        <div className="erp-card">

          <p>Monthly Fixed</p>

          <h1 className="text-5xl font-bold text-blue-600 mt-3">

            ₹ {employeeDetails?.monthlySalary || 0}

          </h1>

        </div>

        <div className="erp-card">

          <p>Attendance Salary</p>

          <h1 className="text-5xl font-bold text-yellow-600 mt-3">

            ₹ {attendanceSalary.toFixed(2)}

          </h1>

        </div>

        <div className="erp-card">

          <p>Total Payable</p>

          <h1 className="text-5xl font-bold text-[#A0522D] mt-3">

            ₹ {totalPayable.toFixed(2)}

          </h1>

        </div>

        <div className="erp-card">

          <p>Amount Paid</p>

          <h1 className="text-5xl font-bold text-green-600 mt-3">

            ₹ {
              salaryData
              ? salaryData.amountPaid
              : 0
            }

          </h1>

        </div>

        <div className="erp-card">

          <p>Balance Amount</p>

          <h1 className="text-5xl font-bold text-red-600 mt-3">

            ₹ {
              salaryData
              ? salaryData.balanceAmount
              : totalPayable
            }

          </h1>

        </div>

        <div
          className="
          erp-card
          flex
          items-center
          justify-center
          "
        >

          <button
            onClick={openPayment}
            className="
            bg-green-600
            hover:bg-green-700
            text-white
            px-10
            py-4
            rounded-2xl
            text-xl
            "
          >
            Pay Salary
          </button>

        </div>

      </div>

    </div>

{
showPayment && (

<div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">

  <div className="bg-white p-8 rounded-xl w-[500px]">

    <h2 className="text-3xl font-bold mb-6">

      Salary Payment

    </h2>

    <p className="mb-4">

      Employee:
      <b> {selectedEmployee}</b>

    </p>

    <p className="mb-4">

      Balance:
      <b className="text-red-600">

        ₹ {
          salaryData?.balanceAmount
          ||
          totalPayable
        }

      </b>

    </p>

    <input
      type="number"
      placeholder="Amount Paid"
      value={amountPaid}
      onChange={(e)=>
        setAmountPaid(
          e.target.value
        )
      }
      className="w-full border p-3 rounded mb-6"
    />

    <div className="flex gap-4">

      <button
  onClick={paySalary}
  className="bg-green-600 text-white px-5 py-3 rounded"
>
  Save Payment
</button>

      <button
        onClick={() =>
          setShowPayment(false)
        }
        className="bg-red-600 text-white px-5 py-3 rounded"
      >
        Cancel
      </button>

    </div>

  </div>

</div>

)
}

      </div>

    </div>
  );
}

export default EmployeeSalary;