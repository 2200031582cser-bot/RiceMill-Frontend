import { useEffect, useState } from "react";

import api from "../api";

import Sidebar from "../components/Sidebar";

function EmployeeSalaryTransactions() {

  const [salaryList, setSalaryList] =
    useState([]);

  const [showPayment,setShowPayment] =
useState(false);

const [selectedSalary,setSelectedSalary] =
useState(null);

const [amountPaid,setAmountPaid] =
useState("");

  // FETCH

  const fetchSalary = async () => {

    try {

      const response = await api.get(
  `/salary`
);

      setSalaryList(response.data);

    } catch (error) {

      console.log(error);
    }
  };

  useEffect(() => {

    fetchSalary();

  }, []);

  const openPayment = (item) => {

  setSelectedSalary(item);

  setAmountPaid("");

  setShowPayment(true);

};
  
const paySalary = async () => {

  try {

    await api.put(

      `/salary/pay/${selectedSalary.id}`,

      {

        amountPaid:
          Number(amountPaid)

      }

    );

    alert(
      "Payment Saved"
    );

    setShowPayment(false);

    fetchSalary();

  }

  catch(error){

    console.log(error);

  }

};

const totalSalary = salaryList.reduce(
  (sum, item) =>
    sum + Number(item.finalSalary || 0),
  0
);

const totalPaid = salaryList.reduce(
  (sum, item) =>
    sum + Number(item.amountPaid || 0),
  0
);

const totalBalance = salaryList.reduce(
  (sum, item) =>
    sum + Number(item.balanceAmount || 0),
  0
);

const totalEmployees =
  salaryList.length;

//   
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
        Salary Transactions
      </h1>

      <p
        className="
        mt-3
        text-[#8C8179]
        text-lg
        "
      >
        Manage salary payments and balances
      </p>

    </div>

    {/* KPI CARDS */}

    <div
      className="
      grid
      grid-cols-1
      md:grid-cols-2
      xl:grid-cols-4
      gap-6
      mb-8
      "
    >

      <div className="erp-card">

        <p className="text-gray-500">
          Employees
        </p>

        <h1
          className="
          text-4xl
          font-bold
          text-[#A0522D]
          mt-3
          "
        >
          {totalEmployees}
        </h1>

      </div>

      <div className="erp-card">

        <p className="text-gray-500">
          Total Salary
        </p>

        <h1
          className="
          text-4xl
          font-bold
          text-[#A0522D]
          mt-3
          "
        >
          ₹ {totalSalary.toFixed(0)}
        </h1>

      </div>

      <div className="erp-card">

        <p className="text-gray-500">
          Amount Paid
        </p>

        <h1
          className="
          text-4xl
          font-bold
          text-green-600
          mt-3
          "
        >
          ₹ {totalPaid.toFixed(0)}
        </h1>

      </div>

      <div className="erp-card">

        <p className="text-gray-500">
          Outstanding Balance
        </p>

        <h1
          className="
          text-4xl
          font-bold
          text-red-600
          mt-3
          "
        >
          ₹ {totalBalance.toFixed(0)}
        </h1>

      </div>

    </div>

    {/* TABLE */}

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
          Salary Records
        </h2>

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
          Records: {salaryList.length}
        </div>

      </div>

      <table className="w-full">

        <thead>

          <tr>

            <th>Employee</th>

            <th>Month</th>

            <th>Monthly Fixed</th>

            <th>Daily Wage</th>

            <th>Full Days</th>

            <th>Half Days</th>

            <th>Final Salary</th>

            <th>Attendance Salary</th>

            <th>Amount Paid</th>

            <th>Balance</th>

            <th>Action</th>

          </tr>

        </thead>

        <tbody>

          {

            salaryList.map((item) => (

              <tr key={item.id}>

                <td>{item.employeeName}</td>

                <td>{item.monthName}</td>

                <td>
                  ₹ {item.monthlyFixed}
                </td>

                <td>
                  ₹ {item.dailyWage}
                </td>

                <td>
                  {item.fullDays}
                </td>

                <td>
                  {item.halfDays}
                </td>

                <td
                  className="
                  font-bold
                  text-[#A0522D]
                  "
                >
                  ₹ {item.finalSalary}
                </td>

                <td>

                  ₹ {

                    (
                      item.finalSalary -
                      item.monthlyFixed
                    ).toFixed(2)

                  }

                </td>

                <td
                  className="
                  font-semibold
                  text-green-600
                  "
                >
                  ₹ {item.amountPaid}
                </td>

                <td
                  className="
                  font-bold
                  text-red-600
                  "
                >
                  ₹ {item.balanceAmount}
                </td>

                <td>

                  <button

                    onClick={() =>
                      openPayment(item)
                    }

                    className="
                    bg-[#E35336]
                    hover:bg-[#cf4228]
                    text-white
                    px-4
                    py-2
                    rounded-xl
                    transition-all
                    "

                  >

                    Pay Salary

                  </button>

                </td>

              </tr>

            ))

          }

        </tbody>

      </table>

    </div>

    {/* PAYMENT MODAL */}

    {

      showPayment && (

        <div
          className="
          fixed
          inset-0
          bg-black/40
          flex
          justify-center
          items-center
          z-50
          "
        >

          <div
            className="
            bg-white
            p-8
            rounded-[28px]
            w-[500px]
            "
          >

            <h2
              className="
              text-3xl
              font-bold
              mb-6
              text-[#655C56]
              "
            >
              Salary Payment
            </h2>

            <div className="mb-4">

              Employee:

              <b>
                {" "}
                {selectedSalary.employeeName}
              </b>

            </div>

            <div className="mb-6">

              Balance:

              <b className="text-red-600">

                {" "}
                ₹ {selectedSalary.balanceAmount}

              </b>

            </div>

            <input

              type="number"

              placeholder="Amount Paid"

              value={amountPaid}

              onChange={(e) =>
                setAmountPaid(
                  e.target.value
                )
              }

            />

            <div
              className="
              flex
              gap-4
              mt-6
              "
            >

              <button

                onClick={paySalary}

                className="
                bg-green-600
                hover:bg-green-700
                text-white
                px-6
                py-3
                rounded-xl
                "

              >

                Save Payment

              </button>

              <button

                onClick={() =>
                  setShowPayment(false)
                }

                className="
                bg-red-600
                hover:bg-red-700
                text-white
                px-6
                py-3
                rounded-xl
                "

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

export default EmployeeSalaryTransactions;