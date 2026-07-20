import { useEffect, useState } from "react";



import { Link } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import api from "../api";
function BrokenRice() {
    const user = JSON.parse(
  localStorage.getItem("user")
);

  const emptyForm = {

    date: "",
    quantity: "",
    price: ""

  };

  const [brokenRice, setBrokenRice] =
    useState(emptyForm);

  const [brokenRiceList, setBrokenRiceList] =
    useState([]);

  // HANDLE CHANGE

  const handleChange = (e) => {

    setBrokenRice({

      ...brokenRice,

      [e.target.name]: e.target.value

    });
  };

  // FETCH DATA

  const fetchBrokenRice = async () => {

    try {

      const response = await api.get(

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

  // SAVE DATA

  const saveBrokenRice = async () => {

  try {

    await api.post(

      "/brokenrice",

      {

        ...brokenRice,

        userId: user.id

      }

    );

    alert("Broken Rice Saved");

    fetchBrokenRice();

    setBrokenRice(emptyForm);

  }

  catch (error) {

    console.log(error);

    alert("Error saving");

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
        Number(item.quantity || 0) *
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

const highestPrice =
  brokenRiceList.length > 0
    ? Math.max(
        ...brokenRiceList.map(
          item => Number(item.price || 0)
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

      <div className="flex justify-between items-center flex-wrap gap-4">

        <div>

          <h1
            className="
            text-5xl
            font-bold
            text-[#655C56]
            "
          >

            Broken Rice Procurement

          </h1>

          <p
            className="
            mt-3
            text-[#8C8179]
            text-lg
            "
          >

            Manage broken rice purchase records and costs

          </p>

        </div>

        <Link
          to="/brokenrice-transactions"
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

          View Transactions

        </Link>

      </div>

    </div>

    {/* MAIN GRID */}

    <div
      className="
      grid
      grid-cols-1
      xl:grid-cols-[420px_1fr]
      gap-8
      "
    >

      {/* LEFT FORM */}

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

        <h2
          className="
          text-2xl
          font-bold
          text-[#655C56]
          mb-6
          "
        >

          Add Procurement

        </h2>

        <div className="flex flex-col gap-6">

          <div>

            <label
              className="
              block
              mb-2
              font-medium
              text-[#655C56]
              "
            >

              Date

            </label>

            <input
              type="date"
              name="date"
              value={brokenRice.date}
              onChange={handleChange}
            />

          </div>

          <div>

            <label
              className="
              block
              mb-2
              font-medium
              text-[#655C56]
              "
            >

              Quantity Procured

            </label>

            <input
              type="number"
              name="quantity"
              value={brokenRice.quantity}
              placeholder="Enter Quantity"
              onChange={handleChange}
            />

          </div>

          <div>

            <label
              className="
              block
              mb-2
              font-medium
              text-[#655C56]
              "
            >

              Price Per Unit

            </label>

            <input
              type="number"
              name="price"
              value={brokenRice.price}
              placeholder="Enter Price"
              onChange={handleChange}
            />

          </div>

        </div>

        <div
          className="
          mt-8
          p-5
          rounded-2xl
          bg-[#FAF8F6]
          border
          border-[#E8E2DC]
          "
        >

          <p className="text-[#8C8179]">

            Total Amount

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

              (
                Number(brokenRice.quantity || 0)
                *
                Number(brokenRice.price || 0)
              ).toFixed(2)

            }

          </h2>

        </div>

        <div className="flex gap-4 mt-8">

          <button
            onClick={saveBrokenRice}
            className="
            flex-1
            bg-[#B7C2B2]
            hover:bg-[#A5B09F]
            text-white
            py-4
            rounded-2xl
            "
          >

            Save

          </button>

          <button
            onClick={() =>
              setBrokenRice(emptyForm)
            }
            className="
            flex-1
            bg-[#E6D5CB]
            hover:bg-[#D8C4B8]
            text-[#655C56]
            py-4
            rounded-2xl
            "
          >

            Clear

          </button>

        </div>

      </div>

      {/* RIGHT SUMMARY */}

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

        <h2
          className="
          text-3xl
          font-bold
          text-[#655C56]
          mb-8
          "
        >

          Procurement Summary

        </h2>

        <div
          className="
          grid
          grid-cols-1
          md:grid-cols-3
          gap-6
          "
        >

          <div
            className="
            bg-[#FAF8F6]
            rounded-2xl
            p-6
            border
            border-[#E8E2DC]
            "
          >

            <p className="text-[#8C8179]">

              Records

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
            bg-[#FAF8F6]
            rounded-2xl
            p-6
            border
            border-[#E8E2DC]
            "
          >

            <p className="text-[#8C8179]">

              Total Quantity

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
            bg-[#FAF8F6]
            rounded-2xl
            p-6
            border
            border-[#E8E2DC]
            "
          >

            <p className="text-[#8C8179]">

              Estimated Value

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

                brokenRiceList.reduce(
                  (sum, item) =>
                    sum +
                    (
                      Number(item.quantity || 0)
                      *
                      Number(item.price || 0)
                    ),
                  0
                ).toFixed(0)

              }

            </h2>

          </div>

        </div>

        <div className="mt-10">

  <h3
    className="
    text-2xl
    font-bold
    text-[#655C56]
    mb-6
    "
  >

    Procurement Analytics

  </h3>

  <div
    className="
    grid
    grid-cols-1
    md:grid-cols-2
    gap-6
    "
  >

    <div
      className="
      bg-[#FAF8F6]
      border
      border-[#E8E2DC]
      rounded-2xl
      p-6
      "
    >

      <p className="text-[#8C8179]">
        Average Price
      </p>

      <h2
        className="
        text-3xl
        font-bold
        text-[#655C56]
        mt-2
        "
      >
        ₹ {averagePrice}
      </h2>

    </div>

    <div
      className="
      bg-[#FAF8F6]
      border
      border-[#E8E2DC]
      rounded-2xl
      p-6
      "
    >

      <p className="text-[#8C8179]">
        Highest Price
      </p>

      <h2
        className="
        text-3xl
        font-bold
        text-[#655C56]
        mt-2
        "
      >
        ₹ {highestPrice}
      </h2>

    </div>

    <div
      className="
      bg-[#FAF8F6]
      border
      border-[#E8E2DC]
      rounded-2xl
      p-6
      "
    >

      <p className="text-[#8C8179]">
        Total Quantity
      </p>

      <h2
        className="
        text-3xl
        font-bold
        text-[#655C56]
        mt-2
        "
      >
        {totalQuantity}
      </h2>

    </div>

    <div
      className="
      bg-[#FAF8F6]
      border
      border-[#E8E2DC]
      rounded-2xl
      p-6
      "
    >

      <p className="text-[#8C8179]">
        Procurement Value
      </p>

      <h2
        className="
        text-3xl
        font-bold
        text-[#655C56]
        mt-2
        "
      >
        ₹ {totalValue.toFixed(0)}
      </h2>

    </div>

  </div>

</div>

      </div>

    </div>

  </div>

</div>

);
}

export default BrokenRice;