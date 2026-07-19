import { useEffect, useState } from "react";



import Sidebar from "../components/Sidebar";
import api from "../api";
function Attendance() {
    const user = JSON.parse(
        localStorage.getItem("user")
    );

  const [employees, setEmployees] =
    useState([]);

  const [attendanceList, setAttendanceList] =
    useState([]);

  const [employeeFilter, setEmployeeFilter] =
  useState("");

  const [attendanceDate, setAttendanceDate] =
useState(
  new Date().toISOString().split("T")[0]
);

const [bulkAttendance, setBulkAttendance] =
useState([]);

  // FETCH EMPLOYEES

  const fetchEmployees = async () => {

    try {

      const response = api.get(
  "/employee/user/${user.id}"
);

      setEmployees(response.data);

    } catch (error) {

      console.log(error);
    }
  };

  // FETCH ATTENDANCE

  const fetchAttendance = async () => {

  try {

    const response = api.get(
      "/attendance/user/${user.id}"
    );

    setAttendanceList(response.data);

  } catch (error) {

    console.log(error);

  }
};

 useEffect(() => {

  if (user?.id) {

    fetchEmployees();

    fetchAttendance();

  }

}, []);

useEffect(() => {

  if (employees.length > 0) {

    setBulkAttendance(

      employees.map(employee => ({

        userId: user.id,

        employeeName: employee.employeeName,

        attendanceDate,

        status: "FULL_DAY"

      }))

    );

  }

}, [employees, attendanceDate]);

  // HANDLE CHANGE



  // SAVE ATTENDANCE

const updateAttendanceStatus = (

  employeeName,

  status

) => {

  setBulkAttendance(

    bulkAttendance.map(item =>

      item.employeeName === employeeName

        ? {

            ...item,

            status

          }

        : item

    )

  );

};

const markAllPresent = () => {

  setBulkAttendance(

    bulkAttendance.map(item => ({

      ...item,

      status: "FULL_DAY"

    }))

  );

};

const markAllAbsent = () => {

  setBulkAttendance(

    bulkAttendance.map(item => ({

      ...item,

      status: "ABSENT"

    }))

  );

};

const saveAttendance = async () => {

  try {

    api.post(

      "/attendance/bulk",

      bulkAttendance

    );

    alert("Attendance Saved Successfully");

    fetchAttendance();

  }

  catch(error){

    console.log(error);

  }

};

const filteredAttendance =
  attendanceList

    .filter((item) =>

      employeeFilter
        ? item.employeeName === employeeFilter
        : true

    )

    .sort((a, b) =>

      new Date(b.attendanceDate) -
      new Date(a.attendanceDate)

    );

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
      w-full
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

        📅 Employee Attendance

      </h1>

      <p
        className="
        mt-3
        text-[#8C8179]
        text-lg
        "
      >

        Track daily attendance records of employees

      </p>

    </div>

    <div
className="
grid
grid-cols-1
xl:grid-cols-[520px_1fr]
gap-8
"
>

    {/* BULK ATTENDANCE */}

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
    text-2xl
    font-bold
    text-[#655C56]
    mb-6
    "
  >
    👥 Bulk Attendance
  </h2>

  {/* DATE */}

  <div className="mb-6">

    <label className="block mb-2 font-medium text-[#655C56]">
      Attendance Date
    </label>

    <input
      type="date"
      value={attendanceDate}
      onChange={(e)=>setAttendanceDate(e.target.value)}
      className="
      w-full
      border
      border-[#E8E2DC]
      rounded-xl
      px-4
      py-3
      "
    />

  </div>

  {/* QUICK ACTIONS */}

  <div className="flex gap-3 mb-6">

    <button

      onClick={markAllPresent}

      className="
      flex-1
      bg-[#B7C2B2]
      hover:bg-[#A5B09F]
      text-white
      rounded-xl
      py-2
      "

    >

      ✓ All Present

    </button>

    <button

      onClick={markAllAbsent}

      className="
      flex-1
      bg-[#D8B4A0]
      hover:bg-[#C49A85]
      text-white
      rounded-xl
      py-2
      "

    >

      ✗ All Absent

    </button>

  </div>

  {/* EMPLOYEE LIST */}

  <div
    className="
    max-h-[500px]
    overflow-y-auto
    border
    border-[#E8E2DC]
    rounded-2xl
    "
  >

    {bulkAttendance.map((employee)=>(

      <div
    key={employee.employeeName}
    className="
    flex
    justify-between
    items-center
    border-b
    border-[#F2ECE7]
    px-4
    py-3
    "
>

    {/* Employee Name */}

    <div
        className="
        font-semibold
        text-[#655C56]
        min-w-[120px]
        "
    >
        {employee.employeeName}
    </div>

    {/* Radio Buttons */}

    <div className="flex gap-5">

        {[
            {
                label:"P",
                value:"FULL_DAY"
            },
            {
                label:"FH",
                value:"FIRST_HALF"
            },
            {
                label:"SH",
                value:"SECOND_HALF"
            },
            {
                label:"A",
                value:"ABSENT"
            }

        ].map(option=>(

            <label
                key={option.value}
                className="
                flex
                items-center
                gap-1
                cursor-pointer
                text-sm
                text-[#655C56]
                "
            >

                <input

                    type="radio"

                    name={employee.employeeName}

                    value={option.value}

                    checked={
                        employee.status===option.value
                    }

                    onChange={()=>

                        updateAttendanceStatus(

                            employee.employeeName,

                            option.value

                        )

                    }

                    className="
                    accent-[#655C56]
                    cursor-pointer
                    "
                />

                {option.label}

            </label>

        ))}

    </div>

</div>

    ))}

  </div>

  {/* SAVE */}

  <button

    onClick={saveAttendance}

    className="
    mt-6
    w-full
    bg-[#655C56]
    hover:bg-[#544A45]
    text-white
    rounded-2xl
    py-4
    font-semibold
    transition
    "

  >

    💾 Save Attendance

  </button>

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

      <div
        className="
        flex
        justify-between
        items-center
        mb-6
        "
      >

        <h2
          className="
          text-3xl
          font-bold
          text-[#655C56]
          "
        >

          Attendance Records

        </h2>

        <div
  className="
  flex
  gap-4
  items-center
  "
>

  <select

    value={employeeFilter}

    onChange={(e) =>
      setEmployeeFilter(
        e.target.value
      )
    }

    className="
    border
    border-[#E8E2DC]
    px-4
    py-3
    rounded-xl
    min-w-[220px]
    "
  >

    <option value="">
      All Employees
    </option>

    {employees.map((employee) => (

      <option
        key={employee.id}
        value={employee.employeeName}
      >
        {employee.employeeName}
      </option>

    ))}

  </select>

</div>

        <div
          className="
          bg-[#FAF8F6]
          border
          border-[#E8E2DC]
          px-4
          py-2
          rounded-xl
          text-[#655C56]
          "
        >

          Total Records:
          {" "}
          {filteredAttendance.length}

        </div>

      </div>
      

      <table>

        <thead>

          <tr>

            <th>ID</th>

            <th>Employee</th>

            <th>Date</th>

            <th>Status</th>

          </tr>

        </thead>

        <tbody>

          {
            filteredAttendance.map((item) => (

              <tr key={item.id}>

                <td>{item.id}</td>

                <td>{item.employeeName}</td>

                <td>{item.attendanceDate}</td>

                <td>

                  {
                    item.status === "FULL_DAY"

                      ? "✅ Full Day"

                      : item.status === "FIRST_HALF"

                      ? "🟡 First Half"

                      : item.status === "SECOND_HALF"

                      ? "🟠 Second Half"

                      : "❌ Absent"
                  }

                </td>

              </tr>

            ))
          }

        </tbody>

      </table>

    </div>
    </div>

  </div>

</div>

);
}

export default Attendance;