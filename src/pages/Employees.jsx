import { useEffect, useState } from "react";

import api from "../api";

import Sidebar from "../components/Sidebar";

function Employees() {
    const user = JSON.parse(
  localStorage.getItem("user")
);

  const [employees, setEmployees] =
    useState([]);

  const [formData, setFormData] =
    useState({

      employeeName: "",

      phoneNumber: "",

      joiningDate: "",

      monthlySalary: "",

      dailyWage: ""

    });

  // HANDLE INPUT

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value

    });
  };

  // FETCH EMPLOYEES

  const fetchEmployees = async () => {

    try {

      const response = api.get(
  `/employee/user/${user.id}`
);

      console.log(response.data);

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

  // SAVE EMPLOYEE

  const saveEmployee = async () => {

    try {

      api.post(
  "/employee",
  {

    ...formData,

    userId: user.id

  }
);
      alert("Employee Added");

      fetchEmployees();

      setFormData({

        employeeName: "",

        phoneNumber: "",

        joiningDate: "",

        monthlySalary: "",

        dailyWage: ""

      });

    }

    catch (error) {

      console.log(error);
    }
  };

  // DELETE

  const deleteEmployee = async (id) => {

    try {

      api.delete(

        `/employee/${id}`

      );

      fetchEmployees();

    }

    catch (error) {

      console.log(error);
    }
  };

  return (

<div className="page">

  <Sidebar />

  <div
    className="
    ml-20
    lg:ml-72
    px-8
    py-8
    min-h-screen
    w-full
    "
  >

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
          👥 Employee Management
        </h1>

        <p
          className="
          mt-3
          text-[#8C8179]
          text-lg
          "
        >
          Manage employee information and salary structure
        </p>

      </div>

      <button
        onClick={() =>
          window.location.href =
          "/employee-register"
        }
        className="
        bg-[#C86A4A]
        hover:bg-[#B85A3A]
        text-white
        px-6
        py-4
        rounded-2xl
        transition-all
        "
      >
        Employee Register
      </button>

    </div>

    {/* KPI CARDS */}

    <div
      className="
      grid
      grid-cols-1
      md:grid-cols-3
      gap-6
      mb-8
      "
    >

      <div
        className="
        bg-white
        border
        border-[#E8E2DC]
        rounded-[28px]
        p-6
        shadow-sm
        "
      >

        <p className="text-[#8C8179]">
          Total Employees
        </p>

        <h2
          className="
          text-4xl
          font-bold
          text-[#655C56]
          mt-2
          "
        >
          {employees.length}
        </h2>

      </div>

      <div
        className="
        bg-white
        border
        border-[#E8E2DC]
        rounded-[28px]
        p-6
        shadow-sm
        "
      >

        <p className="text-[#8C8179]">
          Monthly Salary Cost
        </p>

        <h2
          className="
          text-4xl
          font-bold
          text-[#655C56]
          mt-2
          "
        >

          ₹ {

            employees.reduce(
              (sum, emp) =>
                sum +
                Number(emp.monthlySalary || 0),
              0
            )

          }

        </h2>

      </div>

      <div
        className="
        bg-white
        border
        border-[#E8E2DC]
        rounded-[28px]
        p-6
        shadow-sm
        "
      >

        <p className="text-[#8C8179]">
          Average Daily Wage
        </p>

        <h2
          className="
          text-4xl
          font-bold
          text-[#655C56]
          mt-2
          "
        >

          ₹ {

            employees.length

              ? (
                  employees.reduce(
                    (sum, emp) =>
                      sum +
                      Number(emp.dailyWage || 0),
                    0
                  ) /
                  employees.length
                ).toFixed(0)

              : 0

          }

        </h2>

      </div>

    </div>

    {/* FORM */}

    <div
      className="
      bg-white
      border
      border-[#E8E2DC]
      rounded-[32px]
      p-8
      shadow-sm
      mb-8
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
        Add New Employee
      </h2>

      <div
        className="
        grid
        grid-cols-1
        md:grid-cols-2
        gap-6
        "
      >

        <div>

          <label className="block mb-2 font-medium text-[#655C56]">
            Employee Name
          </label>

          <input
            type="text"
            name="employeeName"
            value={formData.employeeName}
            onChange={handleChange}
          />

        </div>

        <div>

          <label className="block mb-2 font-medium text-[#655C56]">
            Phone Number
          </label>

          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
          />

        </div>

        <div>

          <label className="block mb-2 font-medium text-[#655C56]">
            Joining Date
          </label>

          <input
            type="date"
            name="joiningDate"
            value={formData.joiningDate}
            onChange={handleChange}
          />

        </div>

        <div>

          <label className="block mb-2 font-medium text-[#655C56]">
            Monthly Salary
          </label>

          <input
            type="number"
            name="monthlySalary"
            value={formData.monthlySalary}
            onChange={handleChange}
          />

        </div>

        <div>

          <label className="block mb-2 font-medium text-[#655C56]">
            Daily Wage
          </label>

          <input
            type="number"
            name="dailyWage"
            value={formData.dailyWage}
            onChange={handleChange}
          />

        </div>

      </div>

      <button
        onClick={saveEmployee}
        className="
        mt-8
        bg-[#B7C2B2]
        hover:bg-[#A5B09F]
        text-white
        px-8
        py-4
        rounded-2xl
        transition-all
        "
      >
        Save Employee
      </button>

    </div>

  </div>

</div>

);
}

export default Employees;