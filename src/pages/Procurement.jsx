import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import api from "../api";
function Procurement() {

  const user = JSON.parse(
  localStorage.getItem("user")
);

  const emptyForm = {

    date: "",

    farmerName: "",
    seasonType: "",
    riceType: "",

    quantity: "",
    numberOfBags: "",
    pricePerQuintal: "",

    moistureCutting: "",

    hamaliCharges: "",
    weighBridgeCharges: "",
    cashCutting: "",

    netWeight: "",
    finalAmount: ""
  };

  const [paddy, setPaddy] = useState(emptyForm);

  const [paddyList, setPaddyList] = useState([]);

  // HANDLE INPUT CHANGE

  const handleChange = (e) => {

    setPaddy({
      ...paddy,
      [e.target.name]: e.target.value
    });
  };

  // CALCULATE NET WEIGHT

  const calculateNetWeight = () => {

    const quantity =
      Number(paddy.quantity || 0);

    const moistureKg =
      Number(paddy.moistureCutting || 0);

    const moistureQuintal =
      moistureKg / 100;

    const netWeight =
      quantity - moistureQuintal;

    return netWeight.toFixed(2);
  };

  // CALCULATE FINAL AMOUNT

  const calculateFinalAmount = () => {

    const netWeight =
      Number(calculateNetWeight() || 0);

    const price =
      Number(paddy.pricePerQuintal || 0);

    const hamali =
      Number(paddy.hamaliCharges || 0);

    const weighBridge =
      Number(paddy.weighBridgeCharges || 0);

    const cashCutting =
      Number(paddy.cashCutting || 0);

    const grossAmount =
      netWeight * price;

    const final =
      grossAmount -
      hamali -
      weighBridge -
      cashCutting;

    return final.toFixed(2);
  };

  // FETCH DATA

  const fetchPaddy = async () => {

    const response = await api.get(

  "/paddy/user/${user.id}"

);

    setPaddyList(response.data);
  };

  useEffect(() => {

    fetchPaddy();

  }, []);

  // SAVE DATA

  const savePaddy = async () => {

    try {

      await api.post(
  "/paddy",
  {
    ...paddy,

    procurementYear:
    paddy.procurementYear,

    netWeight: calculateNetWeight(),

    finalAmount: calculateFinalAmount(),

    userId: user.id
  }
);

      alert("Paddy Saved Successfully");

      fetchPaddy();

      setPaddy(emptyForm);

    } catch (error) {

      console.log(error);

      alert("Error saving data");
    }
  };

  const currentYear = new Date().getFullYear();

const yearRanges = [];

for(
  let year = currentYear - 5;
  year <= currentYear + 10;
  year++
){

  yearRanges.push(
    `${year}-${year + 1}`
  );

}

  return (

<div className="page">

  <Sidebar />

  <div className="page-content">

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
  flex
  flex-col
  lg:flex-row
  justify-between
  items-start
  lg:items-center
  gap-6
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

          Paddy Procurement

        </h1>

        <p
          className="
          mt-3
          text-[#8C8179]
          text-lg
          "
        >

          Record paddy purchases and
          calculate farmer payments

        </p>

      </div>

      <Link

        to="/transactions"

        className="
        bg-[#C86A4A]
        hover:bg-[#B85A3A]
        text-white
        px-8
        py-4
        rounded-2xl
        transition-all
        "

      >

        View Transactions

      </Link>

    </div>

    {/* FORM */}

    <div
      className="
      w-full
      bg-white
      border
      border-[#E8E2DC]
      rounded-[32px]
      p-10
      shadow-sm
      "
    >

      <div
  className="
  grid
  grid-cols-1
  md:grid-cols-2
  xl:grid-cols-3
  gap-6
  "
>

        {/* DATE */}

        <div>

          <label className="block mb-2 font-medium text-[#655C56]">

            Date

          </label>

          <input

            type="date"

            name="date"

            value={paddy.date}

            onChange={handleChange}

            className="
            w-full
            border
            border-[#E8E2DC]
            p-4
            rounded-2xl
            "

          />

        </div>

        {/* FARMER */}

        <div>

          <label className="block mb-2 font-medium text-[#655C56]">

            Farmer Name

          </label>

          <input

            type="text"

            name="farmerName"

            value={paddy.farmerName}

            onChange={handleChange}

            placeholder="Farmer Name"

            className="
            w-full
            border
            border-[#E8E2DC]
            p-4
            rounded-2xl
            "

          />

        </div>

        {/* YEAR */}

        <div>

          <label className="block mb-2 font-medium text-[#655C56]">

            Procurement Year

          </label>

          <select

            name="procurementYear"

            value={paddy.procurementYear}

            onChange={handleChange}

            className="
            w-full
            border
            border-[#E8E2DC]
            p-4
            rounded-2xl
            "

          >

            <option value="">
              Select Year
            </option>

            {yearRanges.map((year)=>(

              <option
                key={year}
                value={year}
              >

                {year}

              </option>

            ))}

          </select>

        </div>

        {/* SEASON */}

        <div>

          <label className="block mb-2 font-medium text-[#655C56]">

            Season

          </label>

          <select

            name="seasonType"

            value={paddy.seasonType}

            onChange={handleChange}

            className="
            w-full
            border
            border-[#E8E2DC]
            p-4
            rounded-2xl
            "

          >

            <option value="">
              Select Season
            </option>

            <option value="Rabi">
              Rabi
            </option>

            <option value="Kharif">
              Kharif
            </option>

          </select>

        </div>

        {/* RICE */}

        <div>

          <label className="block mb-2 font-medium text-[#655C56]">

            Rice Type

          </label>

          <select

            name="riceType"

            value={paddy.riceType}

            onChange={handleChange}

            className="
            w-full
            border
            border-[#E8E2DC]
            p-4
            rounded-2xl
            "

          >

            <option value="">
              Select Type
            </option>

            <option value="Thin">
              Thin
            </option>

            <option value="Fat">
              Fat
            </option>

          </select>

        </div>

        {/* QUANTITY */}

        <div>

          <label className="block mb-2 font-medium text-[#655C56]">

            Quantity (Qtl)

          </label>

          <input

            type="number"

            name="quantity"

            value={paddy.quantity}

            onChange={handleChange}

            className="
            w-full
            border
            border-[#E8E2DC]
            p-4
            rounded-2xl
            "

          />

        </div>

        {/* BAGS */}

        <div>

          <label className="block mb-2 font-medium text-[#655C56]">

            Number Of Bags

          </label>

          <input

            type="number"

            name="numberOfBags"

            value={paddy.numberOfBags}

            onChange={handleChange}

            className="
            w-full
            border
            border-[#E8E2DC]
            p-4
            rounded-2xl
            "

          />

        </div>

        {/* PRICE */}

        <div>

          <label className="block mb-2 font-medium text-[#655C56]">

            Price / Quintal

          </label>

          <input

            type="number"

            name="pricePerQuintal"

            value={paddy.pricePerQuintal}

            onChange={handleChange}

            className="
            w-full
            border
            border-[#E8E2DC]
            p-4
            rounded-2xl
            "

          />

        </div>

        {/* MOISTURE */}

        <div>

          <label className="block mb-2 font-medium text-[#655C56]">

            Moisture Cutting (Kg)

          </label>

          <input

            type="number"

            name="moistureCutting"

            value={paddy.moistureCutting}

            onChange={handleChange}

            className="
            w-full
            border
            border-[#E8E2DC]
            p-4
            rounded-2xl
            "

          />

        </div>

        {/* HAMALI */}

        <div>

          <label className="block mb-2 font-medium text-[#655C56]">

            Hamali Charges

          </label>

          <input

            type="number"

            name="hamaliCharges"

            value={paddy.hamaliCharges}

            onChange={handleChange}

            className="
            w-full
            border
            border-[#E8E2DC]
            p-4
            rounded-2xl
            "

          />

        </div>

        {/* WEIGH BRIDGE */}

        <div>

          <label className="block mb-2 font-medium text-[#655C56]">

            Weigh Bridge

          </label>

          <input

            type="number"

            name="weighBridgeCharges"

            value={paddy.weighBridgeCharges}

            onChange={handleChange}

            className="
            w-full
            border
            border-[#E8E2DC]
            p-4
            rounded-2xl
            "

          />

        </div>

        {/* CASH CUTTING */}

        <div>

          <label className="block mb-2 font-medium text-[#655C56]">

            Cash Cutting

          </label>

          <input

            type="number"

            name="cashCutting"

            value={paddy.cashCutting}

            onChange={handleChange}

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

      {/* RESULT CARDS */}

      <div
        className="
        grid
        grid-cols-1
        lg:grid-cols-2
        gap-6
        mt-8
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

          <p className="text-gray-500">

            Net Weight

          </p>

          <h2
            className="
            text-4xl
            font-bold
            text-blue-600
            mt-2
            "
          >

            {calculateNetWeight()} Qtl

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

          <p className="text-gray-500">

            Final Amount

          </p>

          <h2
            className="
            text-4xl
            font-bold
            text-[#A0522D]
            mt-2
            "
          >

            ₹ {calculateFinalAmount()}

          </h2>

        </div>

      </div>

      {/* BUTTONS */}

      <div className="flex gap-4 mt-8">

        <button

          onClick={savePaddy}

          className="
          bg-green-600
          hover:bg-green-700
          text-white
          px-8
          py-4
          rounded-2xl
          "

        >

          Save Paddy

        </button>

        <button

          onClick={() =>
            setPaddy(emptyForm)
          }

          className="
          bg-red-500
          hover:bg-red-600
          text-white
          px-8
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

export default Procurement;