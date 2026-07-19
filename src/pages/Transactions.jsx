import { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import api from "../api";

function Transactions() {
    const user = JSON.parse(
  localStorage.getItem("user")
);

  const [paddyList, setPaddyList] = useState([]);

  // FILTER STATES

  const [search, setSearch] = useState("");

  const [seasonFilter, setSeasonFilter] =
    useState("");

  const [riceTypeFilter, setRiceTypeFilter] =
    useState("");

  const [fromDate, setFromDate] =
  useState("");

const [toDate, setToDate] =
  useState("");

  const [sortOption, setSortOption] =
    useState("");

  // FETCH DATA

  const fetchPaddy = async () => {

    try {

      const response = api.get(

  `/paddy/user/${user.id}`

);
      setPaddyList(response.data);

    } catch (error) {

      console.log(error);

      alert("Error fetching transactions");
    }
  };

  // DELETE

  const deletePaddy = async (id) => {

    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete?"
      );

    if (!confirmDelete) {

      return;
    }

    try {

      api.delete(
        `/paddy/${id}`
      );

      alert("Transaction Deleted");

      fetchPaddy();

    } catch (error) {

      console.log(error);

      alert("Error deleting");
    }
  };

  useEffect(() => {

    fetchPaddy();

  }, []);

  // FILTER + SORT LOGIC

  const filteredData = [...paddyList]

    // SEARCH FARMER

    .filter((item) =>
      item.farmerName
        ?.toLowerCase()
        .includes(search.toLowerCase())
    )

    // FILTER SEASON

    .filter((item) =>
      seasonFilter
        ? item.seasonType === seasonFilter
        : true
    )

    // FILTER RICE TYPE

    .filter((item) =>
      riceTypeFilter
        ? item.riceType === riceTypeFilter
        : true
    )

    // FILTER DATE

    .filter((item) => {

  if (!fromDate && !toDate)
    return true;

  const txnDate =
    new Date(item.date);

  const start =
    fromDate
      ? new Date(fromDate)
      : null;

  const end =
    toDate
      ? new Date(toDate)
      : null;

  if (start && txnDate < start)
    return false;

  if (end && txnDate > end)
    return false;

  return true;

})

    // SORTING

    .sort((a, b) => {

      if (sortOption === "latest") {

        return new Date(b.date) -
               new Date(a.date);
      }

      if (sortOption === "oldest") {

        return new Date(a.date) -
               new Date(b.date);
      }

      if (sortOption === "highAmount") {

        return b.finalAmount -
               a.finalAmount;
      }

      if (sortOption === "lowAmount") {

        return a.finalAmount -
               b.finalAmount;
      }

      return 0;
    });

    const totalQuantity =
filteredData.reduce(
  (sum,item)=>
    sum + Number(item.quantity || 0),
  0
);

const totalAmount =
filteredData.reduce(
  (sum,item)=>
    sum + Number(item.finalAmount || 0),
  0
);

const totalFarmers =
new Set(
  filteredData.map(
    item => item.farmerName
  )
).size;

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

      <div className="flex justify-between items-center">

        <div>

          <h1
            className="
            text-5xl
            font-bold
            text-[#655C56]
            "
          >
             Paddy Register
          </h1>

          <p
            className="
            mt-3
            text-lg
            text-[#8C8179]
            "
          >
            View and manage procurement transactions
          </p>

        </div>

        <Link to="/procurement">

          <button
            className="
            bg-[#C86A4A]
            hover:bg-[#B95A3A]
            text-white
            px-8
            py-4
            rounded-2xl
            "
          >
            Back To Procurement
          </button>

        </Link>

      </div>

    </div>

    {/* SUMMARY */}

    <div
      className="
      grid
      md:grid-cols-4
      gap-6
      mb-8
      "
    >

      <div className="erp-card">

        <p className="text-gray-500">
          Total Paddy
        </p>

        <h2
          className="
          text-3xl
          font-bold
          text-[#A0522D]
          mt-2
          "
        >
          {totalQuantity} Qtl
        </h2>

      </div>

      <div className="erp-card">

        <p className="text-gray-500">
          Amount Paid
        </p>

        <h2
          className="
          text-3xl
          font-bold
          text-green-600
          mt-2
          "
        >
          ₹ {totalAmount.toLocaleString()}
        </h2>

      </div>

      <div className="erp-card">

        <p className="text-gray-500">
          Farmers
        </p>

        <h2
          className="
          text-3xl
          font-bold
          text-blue-600
          mt-2
          "
        >
          {totalFarmers}
        </h2>

      </div>

      <div className="erp-card">

        <p className="text-gray-500">
          Transactions
        </p>

        <h2
          className="
          text-3xl
          font-bold
          text-[#655C56]
          mt-2
          "
        >
          {filteredData.length}
        </h2>

      </div>

    </div>

    {/* FILTERS */}

    <div
      className="
      bg-white
      border
      border-[#E8E2DC]
      rounded-[32px]
      p-6
      mb-8
      shadow-sm
      "
    >

      <div className="grid md:grid-cols-7 gap-4">

        <input
          type="text"
          placeholder="Search Farmer"
          value={search}
          onChange={(e)=>
            setSearch(e.target.value)
          }
          className="
          border
          p-4
          rounded-xl
          "
        />

        <select
          value={seasonFilter}
          onChange={(e)=>
            setSeasonFilter(
              e.target.value
            )
          }
          className="
          border
          p-4
          rounded-xl
          "
        >
          <option value="">
            All Seasons
          </option>
          <option value="Rabi">
            Rabi
          </option>
          <option value="Khariff">
            Khariff
          </option>
        </select>

        <select
          value={riceTypeFilter}
          onChange={(e)=>
            setRiceTypeFilter(
              e.target.value
            )
          }
          className="
          border
          p-4
          rounded-xl
          "
        >
          <option value="">
            All Rice Types
          </option>
          <option value="Thin">
            Thin
          </option>
          <option value="Fat">
            Fat
          </option>
        </select>

        <div>

  <label
    className="
    block
    text-sm
    font-medium
    mb-2
    text-[#655C56]
    "
  >
    From Date
  </label>

  <input
    type="date"
    value={fromDate}
    onChange={(e)=>
      setFromDate(
        e.target.value
      )
    }
    className="
    w-full
    border
    p-4
    rounded-xl
    "
  />

</div>

<div>

  <label
    className="
    block
    text-sm
    font-medium
    mb-2
    text-[#655C56]
    "
  >
    To Date
  </label>

  <input
    type="date"
    value={toDate}
    onChange={(e)=>
      setToDate(
        e.target.value
      )
    }
    className="
    w-full
    border
    p-4
    rounded-xl
    "
  />

</div>

        <select
          value={sortOption}
          onChange={(e)=>
            setSortOption(
              e.target.value
            )
          }
          className="
          border
          p-4
          rounded-xl
          "
        >

          <option value="">
            Sort By
          </option>

          <option value="latest">
            Latest
          </option>

          <option value="oldest">
            Oldest
          </option>

          <option value="highAmount">
            Highest Amount
          </option>

          <option value="lowAmount">
            Lowest Amount
          </option>

        </select>

        <button
          onClick={() => {

            setSearch("");
            setSeasonFilter("");
            setRiceTypeFilter("");
            setFromDate("");
setToDate("");
            setSortOption("");

          }}
          className="
          bg-[#C86A4A]
          text-white
          rounded-xl
          "
        >
          Reset
        </button>

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

      <table className="w-full min-w-max">

        <thead>

          <tr
            className="
            bg-green-600
            text-white
            "
          >

            <th className="p-4 text-left">Date</th>
            <th className="p-4 text-left">Farmer</th>
            <th className="p-4 text-left">Season</th>
            <th className="p-4 text-left">Rice Type</th>
            <th className="p-4 text-left">Qty</th>
            <th className="p-4 text-left">Bags</th>
            <th className="p-4 text-left">Price</th>
            <th className="p-4 text-left">Moisture</th>
            <th className="p-4 text-left">Net Weight</th>
            <th className="p-4 text-left">Final Amount</th>
            <th className="p-4 text-left">Action</th>

          </tr>

        </thead>

        <tbody>

          {filteredData.map((item) => (

            <tr
              key={item.id}
              className="
              border-b
              hover:bg-[#FAF8F6]
              "
            >

              <td className="p-4">
                {item.date}
              </td>

              <td className="p-4">
                {item.farmerName}
              </td>

              <td className="p-4">
                {item.seasonType}
              </td>

              <td className="p-4">
                {item.riceType}
              </td>

              <td className="p-4">
                {item.quantity}
              </td>

              <td className="p-4">
                {item.numberOfBags}
              </td>

              <td className="p-4">
                ₹ {item.pricePerQuintal}
              </td>

              <td className="p-4">
                {item.moistureCutting}
              </td>

              <td className="p-4">
                {item.netWeight}
              </td>

              <td
                className="
                p-4
                font-bold
                text-[#A0522D]
                "
              >
                ₹ {item.finalAmount}
              </td>

              <td className="p-4">

                <button
                  onClick={() =>
                    deletePaddy(item.id)
                  }
                  className="
                  bg-red-500
                  hover:bg-red-600
                  text-white
                  px-4
                  py-2
                  rounded-xl
                  "
                >
                  Delete
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  </div>

</div>

);
}

export default Transactions;