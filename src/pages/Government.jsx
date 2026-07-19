import { useEffect, useState } from "react";
import api from "../api";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";

function Government() {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [ledger, setLedger] =
    useState([]);

    const [cropSeason,setCropSeason] =
useState("");

const [cropYear,setCropYear] =
useState("");

const [deliverySeason,setDeliverySeason] =
useState("");

const [deliveryYear,setDeliveryYear] =
useState("");

  const [paddyReceived, setPaddyReceived] =
    useState("");

const [riceDelivered,setRiceDelivered] =
  useState("");

  const [receiveDate,setReceiveDate] =
useState("");

const [receiveVehicle,setReceiveVehicle] =
useState("");

const [deliveryDate,setDeliveryDate] =
useState("");

const [deliveryVehicle,setDeliveryVehicle] =
useState("");

const yearRanges = [];

const currentYear =
  new Date().getFullYear();

for (
  let year = currentYear + 1;
  year >= 2020;
  year--
) {

  yearRanges.push(
    `${year - 1}-${year}`
  );

}

  const saveRiceDelivery = async () => {

  try {

    api.put(
  "/government/deliver-rice",
  {
    userId:user.id,
    cropSeason:deliverySeason,
    cropYear:deliveryYear,
    deliveryDate,
    vehicleNumber:deliveryVehicle,
    riceDelivered:Number(riceDelivered)
  }
);

    alert(
      "Rice Delivery Saved"
    );

    setDeliverySeason("");
    
    setDeliveryYear("");

    setRiceDelivered("");

    fetchData();

  }

  catch(error){

    console.log(error);

  }

};

  const fetchData = async () => {

    try {

      const response =
        api.get(
          `/government/user/${user.id}`
        );

      setLedger(
        response.data
      );

    }

    catch(error){

      console.log(error);

    }

  };

  useEffect(() => {

    fetchData();

  }, []);

  const savePaddy = async () => {

    try {

      api.post(
  "/government/receive-paddy",
  {
    userId:user.id,
    cropSeason,
    cropYear,
    receiveDate,
    vehicleNumber:receiveVehicle,
    paddyReceived:Number(paddyReceived)
  }
);

      alert(
        "Paddy Entry Saved"
      );

      setCropSeason("");
setCropYear("");
setPaddyReceived("");

      fetchData();

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
          🏛️ Government Paddy Ledger
        </h1>

        <p
          className="
          mt-3
          text-[#8C8179]
          text-lg
          "
        >
          Track government paddy receipts and rice deliveries
        </p>

      </div>

      <button
        onClick={() =>
          window.location.href = "/government-transactions"
        }
        className="
        bg-green-700
        hover:bg-green-800
        text-white
        px-6
        py-3
        rounded-2xl
        "
      >
        View Register
      </button>

    </div>

    {/* ANALYTICS */}

    <div
      className="
      grid
      grid-cols-1
      md:grid-cols-2
      xl:grid-cols-3
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
          {
            ledger.reduce(
              (sum,item)=>
              sum + Number(item.paddyReceived || 0),
              0
            )
          }
          {" "}
          Qtl
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
          Rice Delivered
        </p>

        <h2
          className="
          text-4xl
          font-bold
          text-indigo-600
          mt-3
          "
        >
          {
            ledger.reduce(
              (sum,item)=>
              sum + Number(item.riceDelivered || 0),
              0
            )
          }
          {" "}
          Qtl
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
          Transactions
        </p>

        <h2
          className="
          text-4xl
          font-bold
          text-orange-500
          mt-3
          "
        >
          {ledger.length}
        </h2>

      </div>

    </div>

    {/* RECEIVE PADDY */}

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
         Receive Paddy
      </h2>

      <div
        className="
        grid
        grid-cols-1
        md:grid-cols-2
        xl:grid-cols-5
        gap-4
        "
      >

        <select
          value={cropSeason}
          onChange={(e)=>
            setCropSeason(e.target.value)
          }
          className="
          border
          border-[#E8E2DC]
          p-4
          rounded-2xl
          "
        >

          <option value="">
            Season
          </option>

          <option value="Rabi">
            Rabi
          </option>

          <option value="Kharif">
            Kharif
          </option>

        </select>

        <select
  value={cropYear}
  onChange={(e)=>
    setCropYear(e.target.value)
  }
  className="
  border
  border-[#E8E2DC]
  p-4
  rounded-2xl
  "
>

  <option value="">
    Select Year
  </option>

  {
    yearRanges.map((year) => (

      <option
        key={year}
        value={year}
      >
        {year}
      </option>

    ))
  }

</select>

        <input
          type="date"
          value={receiveDate}
          onChange={(e)=>
            setReceiveDate(e.target.value)
          }
          className="
          border
          border-[#E8E2DC]
          p-4
          rounded-2xl
          "
        />

        <input
          type="text"
          placeholder="Vehicle Number"
          value={receiveVehicle}
          onChange={(e)=>
            setReceiveVehicle(e.target.value)
          }
          className="
          border
          border-[#E8E2DC]
          p-4
          rounded-2xl
          "
        />

        <input
          type="number"
          placeholder="Paddy (Qtl)"
          value={paddyReceived}
          onChange={(e)=>
            setPaddyReceived(e.target.value)
          }
          className="
          border
          border-[#E8E2DC]
          p-4
          rounded-2xl
          "
        />

      </div>

      <button
        onClick={savePaddy}
        className="
        mt-6
        bg-green-600
        hover:bg-green-700
        text-white
        px-8
        py-4
        rounded-2xl
        "
      >
        Save Paddy Entry
      </button>

    </div>

    {/* DELIVER RICE */}

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
        🍚 Deliver Rice
      </h2>

      <div
        className="
        grid
        grid-cols-1
        md:grid-cols-2
        xl:grid-cols-5
        gap-4
        "
      >

        <select
          value={deliverySeason}
          onChange={(e)=>
            setDeliverySeason(e.target.value)
          }
          className="
          border
          border-[#E8E2DC]
          p-4
          rounded-2xl
          "
        >

          <option value="">
            Season
          </option>

          <option value="Rabi">
            Rabi
          </option>

          <option value="Kharif">
            Kharif
          </option>

        </select>

        <select
  value={deliveryYear}
  onChange={(e)=>
    setDeliveryYear(e.target.value)
  }
  className="
  border
  border-[#E8E2DC]
  p-4
  rounded-2xl
  "
>

  <option value="">
    Select Year
  </option>

  {
    yearRanges.map((year) => (

      <option
        key={year}
        value={year}
      >
        {year}
      </option>

    ))
  }

</select>
        <input
          type="date"
          value={deliveryDate}
          onChange={(e)=>
            setDeliveryDate(e.target.value)
          }
          className="
          border
          border-[#E8E2DC]
          p-4
          rounded-2xl
          "
        />

        <input
          type="text"
          placeholder="Vehicle Number"
          value={deliveryVehicle}
          onChange={(e)=>
            setDeliveryVehicle(e.target.value)
          }
          className="
          border
          border-[#E8E2DC]
          p-4
          rounded-2xl
          "
        />

        <input
          type="number"
          placeholder="Rice (Qtl)"
          value={riceDelivered}
          onChange={(e)=>
            setRiceDelivered(e.target.value)
          }
          className="
          border
          border-[#E8E2DC]
          p-4
          rounded-2xl
          "
        />

      </div>

      <button
        onClick={saveRiceDelivery}
        className="
        mt-6
        bg-[#E35336]
        hover:bg-[#D44B2D]
        text-white
        px-8
        py-4
        rounded-2xl
        "
      >
        Save Rice Delivery
      </button>

    </div>

  </div>

</div>

);

}

export default Government;