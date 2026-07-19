import { useEffect, useState } from "react";

import api from "../api";

import { useNavigate } from "react-router-dom";

import Sidebar from "../components/Sidebar";

function Expenses() {
    const user = JSON.parse(
  localStorage.getItem("user")
);

  const navigate = useNavigate();

  const [expenseName, setExpenseName] =
    useState("");

  const [category, setCategory] =
    useState("");

  const [amount, setAmount] =
    useState("");

  const [expenseDate, setExpenseDate] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [expenses, setExpenses] =
  useState([]);

  const fetchExpenses = async () => {

  try {

    const response =
      api.get(
        "/expense/user/${user.id}"
      );

    setExpenses(response.data);

  }

  catch(error){

    console.log(error);

  }

};

useEffect(() => {

  if(user?.id){

    fetchExpenses();

  }

}, []);
  // SAVE EXPENSE

  const saveExpense = async () => {

    try {

      api.post(
  "/expense",
  {
    expenseName,
    category,
    amount,
    expenseDate,
    description,

    userId: user.id
  }
);

      alert("Expense Saved Successfully");

fetchExpenses();

clearFields();

    }

    catch (error) {

      console.log(error);
    }
  };

  // CLEAR

  const clearFields = () => {

  setExpenseName("");
  setCategory("");
  setAmount("");
  setExpenseDate("");
  setDescription("");

};

// ANALYTICS

const totalExpenses =
  expenses.reduce(

    (sum, item) =>

      sum + Number(item.amount || 0),

    0

  );

const currentMonth =
  new Date().getMonth();

const currentYear =
  new Date().getFullYear();

const thisMonthExpenses =
  expenses

    .filter((item) => {

      const d =
        new Date(item.expenseDate);

      return (

        d.getMonth() === currentMonth

        &&

        d.getFullYear() === currentYear

      );

    })

    .reduce(

      (sum, item) =>

        sum + Number(item.amount || 0),

      0

    );

const totalEntries =
  expenses.length;

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
          💳 Expense Management
        </h1>

        <p
          className="
          mt-3
          text-[#8C8179]
          text-lg
          "
        >
          Track and organize operational expenses
        </p>

      </div>

      <button

        onClick={() =>
          navigate("/expense-transactions")
        }

        className="
        bg-[#C86A4A]
hover:bg-[#B85A3A]
text-white
px-6
py-3
rounded-3xl
transition-all
        "
      >

        View Transactions

      </button>

    </div>

    {/* SUMMARY CARDS */}

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

        <p className="text-gray-500">
          Total Expenses
        </p>

        <h2
          className="
          text-4xl
          font-bold
          text-[#A0522D]
          mt-3
          "
        >
          ₹ {totalExpenses.toLocaleString()}
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

        <p className="text-gray-500">
          This Month
        </p>

        <h2
          className="
          text-4xl
          font-bold
          text-red-600
          mt-3
          "
        >
          ₹ {thisMonthExpenses.toLocaleString()}
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

        <p className="text-gray-500">
          Expense Entries
        </p>

        <h2
          className="
          text-4xl
          font-bold
          text-indigo-600
          mt-3
          "
        >
          {totalEntries}
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
      "
    >

      <div
        className="
        grid
        grid-cols-1
        lg:grid-cols-2
        gap-8
        "
      >

        {/* EXPENSE NAME */}

        <div>

          <label
            className="
            block
            mb-3
            font-medium
            text-[#655C56]
            "
          >
            Expense Name
          </label>

          <input

            type="text"

            value={expenseName}

            onChange={(e) =>
              setExpenseName(e.target.value)
            }

            placeholder="Enter Expense Name"

            className="
            w-full
            border
            border-[#E8E2DC]
            p-4
            rounded-2xl
            "
          />

        </div>

        {/* CATEGORY */}

        <div>

          <label
            className="
            block
            mb-3
            font-medium
            text-[#655C56]
            "
          >
            Category
          </label>

          <select

            value={category}

            onChange={(e) =>
              setCategory(e.target.value)
            }

            className="
            w-full
            border
            border-[#E8E2DC]
            p-4
            rounded-2xl
            "
          >

            <option value="">
              Select Category
            </option>

            <option>
              Utilities
            </option>

            <option>
              Fuel & Transport
            </option>

            <option>
              Employee Welfare
            </option>

            <option>
              Machinery Maintenance
            </option>

            <option>
              Packaging Materials
            </option>

            <option>
              Office Operations
            </option>

            <option>
              Government Charges
            </option>

            <option>
              Cleaning & Housekeeping
            </option>

            <option>
              Marketing
            </option>

            <option>
              Miscellaneous
            </option>

          </select>

        </div>

        {/* AMOUNT */}

        <div>

          <label
            className="
            block
            mb-3
            font-medium
            text-[#655C56]
            "
          >
            Amount
          </label>

          <input

            type="number"

            value={amount}

            onChange={(e) =>
              setAmount(e.target.value)
            }

            placeholder="Enter Amount"

            className="
            w-full
            border
            border-[#E8E2DC]
            p-4
            rounded-2xl
            "
          />

        </div>

        {/* DATE */}

        <div>

          <label
            className="
            block
            mb-3
            font-medium
            text-[#655C56]
            "
          >
            Expense Date
          </label>

          <input

            type="date"

            value={expenseDate}

            onChange={(e) =>
              setExpenseDate(e.target.value)
            }

            className="
            w-full
            border
            border-[#E8E2DC]
            p-4
            rounded-2xl
            "
          />

        </div>

      </div>

      {/* DESCRIPTION */}

      <div className="mt-8">

        <label
          className="
          block
          mb-3
          font-medium
          text-[#655C56]
          "
        >
          Description
        </label>

        <textarea

          rows="4"

          value={description}

          onChange={(e) =>
            setDescription(e.target.value)
          }

          placeholder="Enter Description"

          className="
          w-full
          border
          border-[#E8E2DC]
          p-4
          rounded-2xl
          "
        />

      </div>

      {/* LIVE PREVIEW */}

      <div
        className="
        mt-8
        bg-[#FAF8F6]
        border
        border-[#E8E2DC]
        rounded-2xl
        p-6
        "
      >

        <p className="text-gray-500">
          Expense Amount
        </p>

        <h1
          className="
          text-5xl
          font-bold
          text-red-600
          mt-2
          "
        >
          ₹ {Number(amount || 0).toFixed(2)}
        </h1>

      </div>

      {/* BUTTONS */}

      <div
        className="
        flex
        gap-4
        mt-8
        "
      >

        <button

          onClick={saveExpense}

          className="
          bg-green-600
          hover:bg-green-700
          text-white
          px-10
          py-4
          rounded-2xl
          "
        >

          Save Expense

        </button>

        <button

          onClick={clearFields}

          className="
          bg-red-500
          hover:bg-red-600
          text-white
          px-10
          py-4
          rounded-2xl
          "
        >

          Clear

        </button>

      </div>

    </div>

  </div>

</div>

);
}

export default Expenses;