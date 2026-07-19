import { useEffect, useState } from "react";


import Sidebar from "../components/Sidebar";
import api from "../api";
function ExpenseTransactions() {
    const user = JSON.parse(
  localStorage.getItem("user")
);

  const [expenses, setExpenses] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [categoryFilter, setCategoryFilter] =
    useState("");

  // FETCH

  const fetchExpenses = async () => {

  try {

    console.log("USER =", user);

    const response = api.get(
      "/expense/user/${user.id}"
    );

    console.log("DATA =", response.data);

    setExpenses(response.data);

  }

  catch (error) {

    console.log(error);
  }
};

  useEffect(() => {

    fetchExpenses();

  }, []);

  // DELETE

  const deleteExpense = async (id) => {

    const confirmDelete =
      window.confirm(
        "Delete this expense?"
      );

    if (!confirmDelete) {

      return;
    }

    try {

      await api.delete(

        "/expense/${id}"

      );

      fetchExpenses();

    }

    catch (error) {

      console.log(error);
    }
  };

  // FILTER

  const filteredExpenses =
    expenses.filter((item) => {

      const matchesSearch =

        item.expenseName
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const matchesCategory =

        categoryFilter === ""

        ||

        item.category === categoryFilter;

      return (
        matchesSearch &&
        matchesCategory
      );
    });

  // TOTAL

  const totalExpense =
    filteredExpenses.reduce(

      (total, item) =>

        total + Number(item.amount || 0),

      0
    );


    const transactionCount =
  filteredExpenses.length;

const uniqueCategories =
  new Set(
    filteredExpenses.map(
      (e) => e.category
    )
  ).size;

const highestExpense =
  filteredExpenses.length > 0
    ? Math.max(
        ...filteredExpenses.map(
          (e) => Number(e.amount)
        )
      )
    : 0;

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
        💸 Expense Transactions
      </h1>

      <p
        className="
        mt-3
        text-[#8C8179]
        text-lg
        "
      >
        Monitor and manage all business expenses
      </p>

    </div>

    {/* ANALYTICS */}

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
          Total Expense
        </p>

        <h1
          className="
          text-4xl
          font-bold
          text-red-600
          mt-3
          "
        >
          ₹ {totalExpense.toFixed(2)}
        </h1>

      </div>

      <div className="erp-card">

        <p className="text-gray-500">
          Transactions
        </p>

        <h1
          className="
          text-4xl
          font-bold
          text-[#A0522D]
          mt-3
          "
        >
          {transactionCount}
        </h1>

      </div>

      <div className="erp-card">

        <p className="text-gray-500">
          Categories
        </p>

        <h1
          className="
          text-4xl
          font-bold
          text-indigo-600
          mt-3
          "
        >
          {uniqueCategories}
        </h1>

      </div>

      <div className="erp-card">

        <p className="text-gray-500">
          Highest Expense
        </p>

        <h1
          className="
          text-4xl
          font-bold
          text-orange-600
          mt-3
          "
        >
          ₹ {highestExpense.toFixed(2)}
        </h1>

      </div>

    </div>

    {/* FILTERS */}

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

      <div
        className="
        grid
        grid-cols-1
        md:grid-cols-2
        gap-6
        "
      >

        <input

          type="text"

          placeholder="Search Expense"

          value={search}

          onChange={(e) =>
            setSearch(e.target.value)
          }

          className="
          border
          border-[#E8E2DC]
          p-4
          rounded-2xl
          "
        />

        <select

          value={categoryFilter}

          onChange={(e) =>
            setCategoryFilter(
              e.target.value
            )
          }

          className="
          border
          border-[#E8E2DC]
          p-4
          rounded-2xl
          "
        >

          <option value="">
            All Categories
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

      <table className="w-full">

        <thead>

          <tr
            className="
            bg-[#4FA64A]
            text-white
            "
          >

            <th className="p-5 rounded-l-2xl">
              Date
            </th>

            <th className="p-5">
              Expense
            </th>

            <th className="p-5">
              Category
            </th>

            <th className="p-5">
              Amount
            </th>

            <th className="p-5">
              Description
            </th>

            <th className="p-5 rounded-r-2xl">
              Action
            </th>

          </tr>

        </thead>

        <tbody>

          {

            filteredExpenses.map((item) => (

              <tr
                key={item.id}
                className="
                border-b
                hover:bg-[#FAF8F6]
                transition-all
                "
              >

                <td className="p-5">
                  {item.expenseDate}
                </td>

                <td className="p-5 font-medium">
                  {item.expenseName}
                </td>

                <td className="p-5">
                  {item.category}
                </td>

                <td
                  className="
                  p-5
                  font-bold
                  text-red-600
                  "
                >
                  ₹ {item.amount}
                </td>

                <td className="p-5">
                  {item.description}
                </td>

                <td className="p-5">

                  <button

                    onClick={() =>
                      deleteExpense(item.id)
                    }

                    className="
                    bg-red-500
                    hover:bg-red-600
                    text-white
                    px-5
                    py-2
                    rounded-xl
                    transition-all
                    "
                  >

                    Delete

                  </button>

                </td>

              </tr>

            ))

          }

          {

            filteredExpenses.length === 0 && (

              <tr>

                <td
                  colSpan="6"
                  className="
                  text-center
                  py-12
                  text-gray-400
                  "
                >

                  No expense records found

                </td>

              </tr>

            )

          }

        </tbody>

      </table>

    </div>

  </div>

</div>

);
}

export default ExpenseTransactions;