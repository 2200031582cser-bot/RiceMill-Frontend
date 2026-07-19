import { useEffect, useState } from "react";

import api from "../api";
import Sidebar from "../components/Sidebar";

function BrokenRiceTransactions() {
    const user = JSON.parse(
  localStorage.getItem("user")
);

  const [brokenRiceList, setBrokenRiceList] =
    useState([]);

  // FETCH DATA

  const fetchBrokenRice = async () => {

    try {

      const response = api.get(

  "/brokenrice/user/${user.id}"

);

      setBrokenRiceList(response.data);

    } catch (error) {

      console.log(error);
    }
  };

  useEffect(() => {

  if (user?.id) {

    fetchBrokenRice();

  }

}, []);

  // DELETE

  const deleteData = async (id) => {

    const confirmDelete =
      window.confirm(
        "Delete this transaction?"
      );

    if (!confirmDelete) return;

    try {

      api.delete(
        `/brokenrice/${id}`
      );

      fetchBrokenRice();

    } catch (error) {

      console.log(error);
    }
  };

const totalQuantity =
  brokenRiceList.reduce(
    (sum, item) =>
      sum + Number(item.quantity || 0),
    0
  );

const totalValue =
  brokenRiceList.reduce(
    (sum, item) =>
      sum +
      (
        Number(item.quantity || 0)
        *
        Number(item.price || 0)
      ),
    0
  );

const averagePrice =
  brokenRiceList.length > 0
    ? (
        brokenRiceList.reduce(
          (sum, item) =>
            sum + Number(item.price || 0),
          0
        ) / brokenRiceList.length
      ).toFixed(2)
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
        📋 Broken Rice Transactions
      </h1>

      <p
        className="
        mt-3
        text-[#8C8179]
        text-lg
        "
      >
        View and manage procurement records
      </p>

    </div>

    {/* KPI SECTION */}

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
          Total Records
        </p>

        <h2
          className="
          text-3xl
          font-bold
          text-[#655C56]
          mt-2
          "
        >
          {brokenRiceList.length}
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
          Quantity Procured
        </p>

        <h2
          className="
          text-3xl
          font-bold
          text-[#655C56]
          mt-2
          "
        >

          {
            brokenRiceList.reduce(
              (sum, item) =>
                sum +
                Number(item.quantity || 0),
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
          Total Value
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
            brokenRiceList
              .reduce(
                (sum, item) =>
                  sum +
                  (
                    Number(item.quantity || 0)
                    *
                    Number(item.price || 0)
                  ),
                0
              )
              .toFixed(0)
          }

        </h2>

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
        mb-8
        "
      >

        <h2
          className="
          text-3xl
          font-bold
          text-[#655C56]
          "
        >
          Procurement Records
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

          Avg Price ₹ {

            brokenRiceList.length > 0

              ? (

                  brokenRiceList.reduce(
                    (sum, item) =>
                      sum +
                      Number(item.price || 0),
                    0
                  ) /
                  brokenRiceList.length

                ).toFixed(2)

              : "0.00"

          }

        </div>

      </div>

      <table>

        <thead>

          <tr className="bg-[#D1BDB0] text-white">

            <th>Date</th>

            <th>Quantity</th>

            <th>Price</th>

            <th>Total</th>

            <th>Action</th>

          </tr>

        </thead>

        <tbody>

          {

            brokenRiceList.map((item) => (

              <tr
                key={item.id}
              >

                <td>
                  {item.date}
                </td>

                <td>
                  {item.quantity}
                </td>

                <td>
                  ₹ {item.price}
                </td>

                <td
                  className="
                  font-semibold
                  text-[#655C56]
                  "
                >

                  ₹ {

                    (
                      Number(item.quantity || 0)
                      *
                      Number(item.price || 0)
                    ).toFixed(2)

                  }

                </td>

                <td>

                  <button
                    onClick={() =>
                      deleteData(item.id)
                    }
                    className="
                    bg-[#C86A4A]
                    hover:bg-[#B85A3A]
                    text-white
                    px-4
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

        </tbody>

      </table>

    </div>

  </div>

</div>

);
}

export default BrokenRiceTransactions;