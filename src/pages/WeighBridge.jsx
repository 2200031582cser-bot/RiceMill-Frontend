import { useEffect, useState } from "react";
import api from "../api";
import Sidebar from "../components/Sidebar";
import { Link } from "react-router-dom";

function WeighBridge() {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [formData, setFormData] =
    useState({

      entryDate: "",

      customerName: "",

      phoneNumber: "",

      amount: "",

      paymentMode: "Cash",

      description: ""

    });

  const [entries, setEntries] =
    useState([]);

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
      e.target.value

    });

  };

  const fetchEntries = async () => {

    try{

      const response =
      api.get(

`/weighbridge/user/${user.id}`

      );

      setEntries(response.data);

    }

    catch(error){

      console.log(error);

    }

  };

  useEffect(()=>{

    fetchEntries();

  },[]);

  const saveEntry = async () => {

    try{

      api.post(

"/weighbridge",

{

...formData,

amount:Number(formData.amount),

userId:user.id

}

      );

      alert("Entry Saved Successfully");

      setFormData({

        entryDate:"",

        customerName:"",

        phoneNumber:"",

        amount:"",

        paymentMode:"Cash",

        description:""

      });

      fetchEntries();

    }

    catch(error){

      console.log(error);

    }

  };

  const today = new Date().toISOString().split("T")[0];

  const todaysIncome =

entries

.filter(

item=>item.entryDate===today

)

.reduce(

(sum,item)=>

sum+Number(item.amount),

0

);

  const month =

new Date().getMonth();

const year =

new Date().getFullYear();

const monthlyIncome =

entries

.filter(item=>{

const d=new Date(item.entryDate);

return(

d.getMonth()===month &&

d.getFullYear()===year

);

})

.reduce(

(sum,item)=>

sum+Number(item.amount),

0

);

const totalIncome=

entries.reduce(

(sum,item)=>

sum+Number(item.amount),

0

);

const customerCount=

new Set(

entries.map(

item=>item.customerName

)

).size;

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
      w-full
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

           Weigh Bridge

        </h1>

        <p
          className="
          mt-3
          text-[#8C8179]
          text-lg
          "
        >

          Record weigh bridge collections and manage customer entries.

        </p>

      </div>

      <Link to="/weighbridge-transactions">

        <button
          className="
          bg-[#C9774D]
          hover:bg-[#B96942]
          text-white
          px-7
          py-4
          rounded-2xl
          transition-all
          "
        >

          View Ledger →

        </button>

      </Link>

    </div>

    {/* SUMMARY */}

    <div
      className="
      grid
      grid-cols-1
      md:grid-cols-2
      xl:grid-cols-4
      gap-6
      w-full
      "
    >

      <div className="bg-white border border-[#E8E2DC] rounded-[28px] p-6 shadow-sm">

        <p className="text-gray-500">

          Today's Collection

        </p>

        <h2 className="text-4xl font-bold text-green-600 mt-3">

          ₹ {todaysIncome.toFixed(2)}

        </h2>

      </div>

      <div className="bg-white border border-[#E8E2DC] rounded-[28px] p-6 shadow-sm">

        <p className="text-gray-500">

          This Month

        </p>

        <h2 className="text-4xl font-bold text-[#A0522D] mt-3">

          ₹ {monthlyIncome.toFixed(2)}

        </h2>

      </div>

      <div className="bg-white border border-[#E8E2DC] rounded-[28px] p-6 shadow-sm">

        <p className="text-gray-500">

          Total Income

        </p>

        <h2 className="text-4xl font-bold text-blue-600 mt-3">

          ₹ {totalIncome.toFixed(2)}

        </h2>

      </div>

      <div className="bg-white border border-[#E8E2DC] rounded-[28px] p-6 shadow-sm">

        <p className="text-gray-500">

          Customers

        </p>

        <h2 className="text-4xl font-bold text-indigo-600 mt-3">

          {customerCount}

        </h2>

      </div>

    </div>

    <br />

    {/* CONTENT */}

    <div
      className="
      grid
      grid-cols-1
      xl:grid-cols-3
      gap-8
      w-full
      "
    >

      {/* ENTRY FORM */}

      <div
        className="
        xl:col-span-1
        bg-white
        border
        border-[#E8E2DC]
        rounded-[30px]
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

          New Entry

        </h2>

        <div className="space-y-5">

          <input
            type="date"
            name="entryDate"
            value={formData.entryDate}
            onChange={handleChange}
            className="w-full border border-[#E8E2DC] p-4 rounded-2xl"
          />

          <input
            type="text"
            name="customerName"
            placeholder="Customer Name"
            value={formData.customerName}
            onChange={handleChange}
            className="w-full border border-[#E8E2DC] p-4 rounded-2xl"
          />

          <input
            type="text"
            name="phoneNumber"
            placeholder="Phone Number"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="w-full border border-[#E8E2DC] p-4 rounded-2xl"
          />


          <input
            type="number"
            name="amount"
            placeholder="Amount"
            value={formData.amount}
            onChange={handleChange}
            className="w-full border border-[#E8E2DC] p-4 rounded-2xl"
          />

          <select
            name="paymentMode"
            value={formData.paymentMode}
            onChange={handleChange}
            className="w-full border border-[#E8E2DC] p-4 rounded-2xl"
          >

            <option>Cash</option>
            <option>UPI</option>
            <option>Bank Transfer</option>
            <option>Monthly Credit</option>

          </select>

          <textarea
            rows="4"
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border border-[#E8E2DC] p-4 rounded-2xl"
          />

          <button
            onClick={saveEntry}
            className="
            w-full
            bg-[#B7C2B2]
            hover:bg-[#A5B09F]
            text-white
            py-4
            rounded-2xl
            font-semibold
            transition-all
            "
          >

            Save Entry

          </button>

        </div>

      </div>

      {/* RECENT TRANSACTIONS */}

      <div
        className="
        xl:col-span-2
        bg-white
        border
        border-[#E8E2DC]
        rounded-[30px]
        p-8
        shadow-sm
        "
      >

        <div className="flex justify-between items-center mb-6">

          <h2
            className="
            text-3xl
            font-bold
            text-[#655C56]
            "
          >

            Recent Transactions

          </h2>

          <span
            className="
            bg-[#FAF8F6]
            px-4
            py-2
            rounded-xl
            "
          >

            {entries.length} Entries

          </span>

        </div>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>

              <tr className="bg-[#C9774D]">

                <th className="p-4 text-left">Date</th>
                <th className="p-4 text-left">Customer</th>
                <th className="p-4 text-left">Amount</th>

              </tr>

            </thead>

            <tbody>

              {entries
                .slice()
                .reverse()
                .slice(0,10)
                .map((item)=>(

                  <tr
                    key={item.id}
                    className="border-b hover:bg-[#FAF8F6]"
                  >

                    <td className="p-4">

                      {item.entryDate}

                    </td>

                    <td className="p-4">

                      {item.customerName}

                    </td>

                    <td
                      className="
                      p-4
                      font-bold
                      text-[#A0522D]
                      "
                    >

                      ₹ {Number(item.amount).toFixed(2)}

                    </td>

                  </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>

  </div>

</div>

  );

}

export default WeighBridge;