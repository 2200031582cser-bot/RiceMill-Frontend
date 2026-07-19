import { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";
import api from "../api";
function EmployeeRegister() {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [employees,setEmployees] =
    useState([]);

  const [showEdit,setShowEdit] =
    useState(false);

  const [selectedEmployee,setSelectedEmployee] =
    useState(null);

  const [employeeName,setEmployeeName] =
    useState("");

  const [phoneNumber,setPhoneNumber] =
    useState("");

  const [joiningDate,setJoiningDate] =
    useState("");

  const [monthlySalary,setMonthlySalary] =
    useState("");

  const [dailyWage,setDailyWage] =
    useState("");

  const fetchEmployees = async () => {

    try {

      const response =
        api.get(
          "/employee/user/${user.id}"
        );

      setEmployees(
        response.data
      );

    }

    catch(error){

      console.log(error);

    }

  };

  useEffect(() => {

    fetchEmployees();

  }, []);

  const openEdit = (employee) => {

    setSelectedEmployee(employee);

    setEmployeeName(
      employee.employeeName
    );

    setPhoneNumber(
      employee.phoneNumber
    );

    setJoiningDate(
      employee.joiningDate
    );

    setMonthlySalary(
      employee.monthlySalary
    );

    setDailyWage(
      employee.dailyWage
    );

    setShowEdit(true);

  };

  const updateEmployee = async () => {

    try {

      api.put(

        `/employee/${selectedEmployee.id}`,

        {

          employeeName,

          phoneNumber,

          joiningDate,

          monthlySalary:
            Number(monthlySalary),

          dailyWage:
            Number(dailyWage)

        }

      );

      alert(
        "Employee Updated Successfully"
      );

      setShowEdit(false);

      fetchEmployees();

    }

    catch(error){

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
  "
  style={{
    background:
      "linear-gradient(135deg,#F3F2F5,#E6D5CB,#D1BDB0)"
  }}
>

  <h1
    className="
    text-5xl
    font-bold
    text-[#655C56]
    "
  >
    👥 Employee Register
  </h1>

  <p
    className="
    mt-3
    text-[#8C8179]
    text-lg
    "
  >
    Manage employee details and salary information
  </p>

</div>

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
      text-3xl
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
      text-3xl
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
      text-3xl
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

    <div
  className="
  bg-white
  border
  border-[#E8E2DC]
  rounded-[32px]
  p-8
  shadow-sm
  overflow-x-auto
  "
>

      <table className="w-full">

        <thead>

          <tr className="bg-[#D1BDB0] text-white">

            <th className="p-4">ID</th>

            <th className="p-4">Name</th>

            <th className="p-4">Phone</th>

            <th className="p-4">Joining Date</th>

            <th className="p-4">Monthly Salary</th>

            <th className="p-4">Daily Wage</th>

            <th className="p-4">Action</th>

          </tr>

        </thead>

        <tbody>

          {

            employees.map((employee)=>(

              <tr
                key={employee.id}
                className="border-b"
              >

                <td className="p-4">
                  {employee.id}
                </td>

                <td className="p-4">
                  {employee.employeeName}
                </td>

                <td className="p-4">
                  {employee.phoneNumber}
                </td>

                <td className="p-4">
                  {employee.joiningDate}
                </td>

                <td className="p-4">
                  ₹ {employee.monthlySalary}
                </td>

                <td className="p-4">
                  ₹ {employee.dailyWage}
                </td>

                <td className="p-4">

                  <button

                    onClick={() =>
                      openEdit(employee)
                    }

                    className="
bg-[#C86A4A]
hover:bg-[#B85A3A]
text-white
px-5
py-2
rounded-xl
transition-all
"

                  >

                    Update

                  </button>

                </td>

              </tr>

            ))

          }

        </tbody>

      </table>

    </div>

    {
      showEdit && (

      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">

        <div
  className="
  bg-white
  p-8
  rounded-[32px]
  w-[700px]
  border
  border-[#E8E2DC]
  shadow-xl
  "
>

          <h2
  className="
  text-3xl
  font-bold
  text-[#655C56]
  mb-6
  "
>

            Update Employee

          </h2>

          <div className="grid grid-cols-2 gap-4">

            <input
              type="text"
              value={employeeName}
              onChange={(e)=>
                setEmployeeName(
                  e.target.value
                )
              }
              placeholder="Employee Name"
              className="border p-3 rounded"
            />

            <input
              type="text"
              value={phoneNumber}
              onChange={(e)=>
                setPhoneNumber(
                  e.target.value
                )
              }
              placeholder="Phone Number"
              className="border p-3 rounded"
            />

            <input
              type="date"
              value={joiningDate}
              onChange={(e)=>
                setJoiningDate(
                  e.target.value
                )
              }
              className="border p-3 rounded"
            />

            <input
              type="number"
              value={monthlySalary}
              onChange={(e)=>
                setMonthlySalary(
                  e.target.value
                )
              }
              placeholder="Monthly Salary"
              className="border p-3 rounded"
            />

            <input
              type="number"
              value={dailyWage}
              onChange={(e)=>
                setDailyWage(
                  e.target.value
                )
              }
              placeholder="Daily Wage"
              className="border p-3 rounded"
            />

          </div>

          <div className="flex gap-4 mt-6">

            <button

              onClick={updateEmployee}

              className="
              bg-green-600
              text-white
              px-5
              py-3
              rounded"

            >

              Save

            </button>

            <button

              onClick={() =>
                setShowEdit(false)
              }

              className="
              bg-red-600
              text-white
              px-5
              py-3
              rounded"

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

export default EmployeeRegister;