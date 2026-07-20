import { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";
import api from "../api";
function GovernmentTransactions() {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

const [ledger,setLedger]
=
useState([]);

const [showEdit,setShowEdit] =
useState(false);

const [selectedRecord,setSelectedRecord] =
useState(null);

const [editSeason,setEditSeason] =
useState("");

const [editYear,setEditYear] =
useState("");

const [editPaddy,setEditPaddy] =
useState("");

const [editRice,setEditRice] =
useState("");

const [editDate,setEditDate] = useState("");

const [editVehicleNumber,setEditVehicleNumber] =
useState("");

  const fetchData = async () => {

    try {

      const response =
  await api.get(
    "/government/user/${user.id}"
  );

setLedger(response.data);

    }

    catch(error){

      console.log(error);

    }

  };

  const openEdit = (item) => {

  setSelectedRecord(item);

  setEditSeason(item.cropSeason);

  setEditYear(item.cropYear);

  setEditPaddy(item.paddyReceived);

  setEditRice(item.riceDelivered);

  setEditDate(item.transactionDate || "");

  setEditVehicleNumber(
    item.vehicleNumber || ""
  );

  setShowEdit(true);

};

const updateRecord = async () => {

  try {

    await api.put(

      `/government/${selectedRecord.id}`,

      {

        cropSeason: editSeason,

        cropYear: editYear,

        transactionDate: editDate,

        vehicleNumber: editVehicleNumber,

        paddyReceived:
          Number(editPaddy),

        riceDelivered:
          Number(editRice)

      }

    );

    alert("Record Updated");

    setShowEdit(false);

    fetchData();

  }

  catch(error){

    console.log(error);

  }

};

  useEffect(() => {

    fetchData();

  }, []);

  const totalPaddy =
ledger.reduce(
  (sum,item)=>
  sum + (item.paddyReceived || 0),
  0
);

const totalRice =
ledger.reduce(
  (sum,item)=>
  sum + (item.riceDelivered || 0),
  0
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
          Government Register
        </h1>

        <p
          className="
          mt-3
          text-[#8C8179]
          text-lg
          "
        >
          Government paddy procurement and rice delivery records
        </p>

      </div>

    </div>

    {/* SUMMARY */}

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
        rounded-[28px]
        border
        border-[#E8E2DC]
        p-6
        shadow-sm
        "
      >

        <p className="text-gray-500">
          Total Paddy Received
        </p>

        <h2
          className="
          text-4xl
          font-bold
          text-[#A0522D]
          mt-3
          "
        >
          {totalPaddy} Qtl
        </h2>

      </div>

      <div
        className="
        bg-white
        rounded-[28px]
        border
        border-[#E8E2DC]
        p-6
        shadow-sm
        "
      >

        <p className="text-gray-500">
          Total Rice Delivered
        </p>

        <h2
          className="
          text-4xl
          font-bold
          text-blue-600
          mt-3
          "
        >
          {totalRice} Qtl
        </h2>

      </div>

      <div
        className="
        bg-white
        rounded-[28px]
        border
        border-[#E8E2DC]
        p-6
        shadow-sm
        "
      >

        <p className="text-gray-500">
          Total Records
        </p>

        <h2
          className="
          text-4xl
          font-bold
          text-green-600
          mt-3
          "
        >
          {ledger.length}
        </h2>

      </div>

    </div>

    {/* TABLE */}

    <div
      className="
      bg-white
      rounded-[32px]
      border
      border-[#E8E2DC]
      shadow-sm
      p-8
      overflow-x-auto
      "
    >

      <table className="w-full">

        <thead>

          <tr className="bg-green-600 text-white">

            <th className="p-4 text-left">
              Date
            </th>

            <th className="p-4 text-left">
              Season
            </th>

            <th className="p-4 text-left">
              Year
            </th>

            <th className="p-4 text-left">
              Vehicle
            </th>

            <th className="p-4 text-left">
              Paddy
            </th>

            <th className="p-4 text-left">
              Rice
            </th>

            <th className="p-4 text-left">
              Balance
            </th>

            <th className="p-4 text-left">
              Action
            </th>

          </tr>

        </thead>

        <tbody>

          {ledger.map((item) => (

            <tr
              key={item.id}
              className="
              border-b
              hover:bg-[#FAF8F6]
              transition-all
              "
            >

              <td className="p-4">
                {item.transactionDate}
              </td>

              <td className="p-4">

                <span
                  className="
                  bg-[#F4EFEA]
                  px-4
                  py-2
                  rounded-full
                  text-[#A0522D]
                  font-semibold
                  "
                >
                  {item.cropSeason}
                </span>

              </td>

              <td className="p-4">
                {item.cropYear}
              </td>

              <td className="p-4">
                {item.vehicleNumber}
              </td>

              <td
                className="
                p-4
                font-bold
                text-[#A0522D]
                "
              >
                {item.paddyReceived} Qtl
              </td>

              <td
                className="
                p-4
                font-bold
                text-blue-600
                "
              >
                {item.riceDelivered} Qtl
              </td>

              <td
                className="
                p-4
                font-bold
                text-green-600
                "
              >
                {(item.paddyReceived || 0) -
                 (item.riceDelivered || 0)} Qtl
              </td>

              <td className="p-4">

                <button

                  onClick={() =>
                    openEdit(item)
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

          ))}

        </tbody>

      </table>

    </div>

    {/* EDIT POPUP */}

    {showEdit && (

      <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

        <div
          className="
          bg-white
          w-[750px]
          rounded-[30px]
          p-8
          shadow-xl
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
            Update Entry
          </h2>

          <div className="grid grid-cols-2 gap-5">

            <input
              type="date"
              value={editDate}
              onChange={(e)=>
                setEditDate(e.target.value)
              }
              className="border p-4 rounded-2xl"
            />

            <input
              type="text"
              value={editVehicleNumber}
              onChange={(e)=>
                setEditVehicleNumber(
                  e.target.value
                )
              }
              placeholder="Vehicle Number"
              className="border p-4 rounded-2xl"
            />

            <select
              value={editSeason}
              onChange={(e)=>
                setEditSeason(
                  e.target.value
                )
              }
              className="border p-4 rounded-2xl"
            >
              <option value="Rabi">
                Rabi
              </option>

              <option value="Kharif">
                Kharif
              </option>
            </select>

            <input
              type="text"
              value={editYear}
              onChange={(e)=>
                setEditYear(
                  e.target.value
                )
              }
              className="border p-4 rounded-2xl"
            />

            <input
              type="number"
              value={editPaddy}
              onChange={(e)=>
                setEditPaddy(
                  e.target.value
                )
              }
              placeholder="Paddy Received"
              className="border p-4 rounded-2xl"
            />

            <input
              type="number"
              value={editRice}
              onChange={(e)=>
                setEditRice(
                  e.target.value
                )
              }
              placeholder="Rice Delivered"
              className="border p-4 rounded-2xl"
            />

          </div>

          <div className="flex gap-4 mt-8">

            <button

              onClick={updateRecord}

              className="
              bg-green-600
              hover:bg-green-700
              text-white
              px-8
              py-3
              rounded-2xl
              "

            >

              Save Changes

            </button>

            <button

              onClick={() =>
                setShowEdit(false)
              }

              className="
              bg-red-500
              hover:bg-red-600
              text-white
              px-8
              py-3
              rounded-2xl
              "

            >

              Cancel

            </button>

          </div>

        </div>

      </div>

    )}

  </div>

</div>

);

}

export default GovernmentTransactions;