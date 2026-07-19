import { useEffect, useState } from "react";
import api from "../api";
import Sidebar from "../components/Sidebar";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
 Tooltip,
  CartesianGrid,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";

function Milling() {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [date, setDate] =
    useState("");

  const [riceType, setRiceType] =
    useState("Thin");

  const [inputPaddy, setInputPaddy] =
    useState("");

  const [outputRice, setOutputRice] =
    useState("");

  const [outputBrokenRice, setOutputBrokenRice] =
    useState("");

  const [remarks, setRemarks] =
    useState("");

  const [records, setRecords] =
    useState([]);

  const [filterRiceType, setFilterRiceType] =
    useState("All");

  const [filterDate, setFilterDate] =
    useState("");

  const [searchSession, setSearchSession] =
    useState("");

  //---------------------------------------
  // FETCH RECORDS
  //---------------------------------------

  const fetchRecords = async () => {

    try {

      const response =
        api.get(

          `/milling/user/${user.id}`

        );

      setRecords(response.data);

    }

    catch(error){

      console.log(error);

    }

  };

  useEffect(()=>{

    fetchRecords();

  },[]);

  //---------------------------------------
  // SAVE SESSION
  //---------------------------------------

  const saveSession = async()=>{

    if(

      date===""

      ||

      inputPaddy===""

      ||

      outputRice===""

    ){

      alert("Please fill all mandatory fields");

      return;

    }

    try{

      api.post(

        "/milling",

        {

          userId:user.id,

          date,

          riceType,

          inputPaddy,

          outputRice,

          outputBrokenRice,

          remarks

        }

      );

      alert("Session Saved");

      setDate("");

      setRiceType("Thin");

      setInputPaddy("");

      setOutputRice("");

      setOutputBrokenRice("");

      setRemarks("");

      fetchRecords();

    }

    catch(error){

      console.log(error);

    }

  };

  //---------------------------------------
  // DELETE
  //---------------------------------------

  const deleteSession = async(id)=>{

    if(!window.confirm("Delete this session?"))

      return;

    try{

      api.delete(

        `/milling/${id}`

      );

      fetchRecords();

    }

    catch(error){

      console.log(error);

    }

  };

  //---------------------------------------
  // FILTERS
  //---------------------------------------

  const filteredRecords =

    records.filter((item)=>{

      const riceFilter=

        filterRiceType==="All"

        ||

        item.riceType===filterRiceType;

      const dateFilter=

        filterDate===""

        ||

        item.date===filterDate;

      const sessionFilter=

        searchSession===""

        ||

        item.sessionNo
        .toString()
        .includes(searchSession);

      return(

        riceFilter

        &&

        dateFilter

        &&

        sessionFilter

      );

    });

  //---------------------------------------
  // SUMMARY
  //---------------------------------------

  const totalSessions=

    filteredRecords.length;

  const totalInput=

    filteredRecords.reduce(

      (sum,item)=>

        sum+

        Number(item.inputPaddy||0),

      0

    );

  const totalRice=

    filteredRecords.reduce(

      (sum,item)=>

        sum+

        Number(item.outputRice||0),

      0

    );

  const totalBroken=

    filteredRecords.reduce(

      (sum,item)=>

        sum+

        Number(item.outputBrokenRice||0),

      0

    );

  const recovery=

    totalInput===0

    ?

    0

    :

    (

      (

        totalRice+

        totalBroken

      )

      /

      totalInput

    )*100;

  //---------------------------------------

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
      border
      border-[#E8E2DC]
      shadow-sm
      p-10
      mb-8
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
        Milling Management
      </h1>

      <p
        className="
        mt-3
        text-lg
        text-[#8C8179]
        "
      >
        Track daily milling sessions and monitor production efficiency
      </p>

    </div>

    {/* SUMMARY */}

    <div
      className="
      grid
      grid-cols-1
      md:grid-cols-2
      xl:grid-cols-5
      gap-6
      mb-8
      "
    >

      <div className="erp-card">

        <p className="text-[#7B7068]">
          Today's Sessions
        </p>

        <h1 className="text-5xl font-bold text-[#A0522D] mt-3">
          {totalSessions}
        </h1>

      </div>

      <div className="erp-card">

        <p className="text-[#7B7068]">
          Input Paddy
        </p>

        <h1 className="text-5xl font-bold text-blue-700 mt-3">
          {totalInput.toFixed(2)}
        </h1>

        <p className="text-gray-500 mt-2">
          Quintals
        </p>

      </div>

      <div className="erp-card">

        <p className="text-[#7B7068]">
          Rice Produced
        </p>

        <h1 className="text-5xl font-bold text-green-700 mt-3">
          {totalRice.toFixed(2)}
        </h1>

        <p className="text-gray-500 mt-2">
          Quintals
        </p>

      </div>

      <div className="erp-card">

        <p className="text-[#7B7068]">
          Broken Rice
        </p>

        <h1 className="text-5xl font-bold text-orange-600 mt-3">
          {totalBroken.toFixed(2)}
        </h1>

        <p className="text-gray-500 mt-2">
          Quintals
        </p>

      </div>

      <div className="erp-card">

        <p className="text-[#7B7068]">
          Recovery
        </p>

        <h1 className="text-5xl font-bold text-[#A0522D] mt-3">
          {recovery.toFixed(2)}%
        </h1>

      </div>

    </div>

    {/* FORM + RECORDS */}

    <div
      className="
      grid
      grid-cols-1
      xl:grid-cols-[380px_1fr]
      gap-8
      "
    >

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

        <h2
          className="
          text-3xl
          font-bold
          text-[#655C56]
          mb-8
          "
        >
          New Milling Session
        </h2>

        <div className="space-y-5">

          <div>

            <label className="block mb-2 font-medium text-[#655C56]">
              Date
            </label>

            <input
              type="date"
              value={date}
              onChange={(e)=>setDate(e.target.value)}
              className="erp-input"
            />

          </div>

          <div>

            <label className="block mb-2 font-medium text-[#655C56]">
              Rice Type
            </label>

            <select
              value={riceType}
              onChange={(e)=>setRiceType(e.target.value)}
              className="erp-input"
            >
              <option>Thin</option>
              <option>Fat</option>
            </select>

          </div>

          <div>

            <label className="block mb-2 font-medium text-[#655C56]">
              Input Paddy (Quintals)
            </label>

            <input
              type="number"
              value={inputPaddy}
              onChange={(e)=>setInputPaddy(e.target.value)}
              className="erp-input"
            />

          </div>

          <div>

            <label className="block mb-2 font-medium text-[#655C56]">
              Rice Produced (Quintals)
            </label>

            <input
              type="number"
              value={outputRice}
              onChange={(e)=>setOutputRice(e.target.value)}
              className="erp-input"
            />

          </div>

          <div>

            <label className="block mb-2 font-medium text-[#655C56]">
              Broken Rice (Quintals)
            </label>

            <input
              type="number"
              value={outputBrokenRice}
              onChange={(e)=>setOutputBrokenRice(e.target.value)}
              className="erp-input"
            />

          </div>

          <div>

            <label className="block mb-2 font-medium text-[#655C56]">
              Remarks
            </label>

            <textarea
              rows={4}
              value={remarks}
              onChange={(e)=>setRemarks(e.target.value)}
              className="erp-input resize-none"
              placeholder="Optional notes..."
            />

          </div>

          <button
            onClick={saveSession}
            className="
            w-full
            bg-[#B7C2B2]
            hover:bg-[#A8B5A3]
            text-white
            py-4
            rounded-2xl
            font-semibold
            transition-all
            duration-300
            "
          >
            Save Milling Session
          </button>

        </div>

      </div>

      {/* RECORDS */}

      <div>

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

          <h2
            className="
            text-3xl
            font-bold
            text-[#655C56]
            mb-6
            "
          >
            Milling Records
          </h2>

          <div
            className="
            grid
            grid-cols-1
            md:grid-cols-3
            gap-5
            "
          >

            <div>

              <label className="block mb-2 font-medium text-[#655C56]">
                Search Session
              </label>

              <input
                type="text"
                placeholder="Session Number"
                value={searchSession}
                onChange={(e)=>setSearchSession(e.target.value)}
                className="erp-input"
              />

            </div>

            <div>

              <label className="block mb-2 font-medium text-[#655C56]">
                Rice Type
              </label>

              <select
                value={filterRiceType}
                onChange={(e)=>setFilterRiceType(e.target.value)}
                className="erp-input"
              >
                <option value="All">All Types</option>
                <option value="Thin">Thin</option>
                <option value="Fat">Fat</option>
              </select>

            </div>

            <div>

              <label className="block mb-2 font-medium text-[#655C56]">
                Filter Date
              </label>

              <input
                type="date"
                value={filterDate}
                onChange={(e)=>setFilterDate(e.target.value)}
                className="erp-input"
              />

            </div>

          </div>

        </div>

        {/* TABLE STARTS HERE */}

        <div
  className="
  bg-white
  border
  border-[#E8E2DC]
  rounded-[32px]
  shadow-sm
  overflow-hidden
  "
>

  <div className="overflow-x-auto">

    <table className="w-full min-w-[1100px]">

      <thead>

        <tr className="bg-[#A0522D] text-white">

          <th className="p-4 text-left">Session</th>

          <th className="p-4 text-left">Date</th>

          <th className="p-4 text-left">Rice Type</th>

          <th className="p-4 text-left">Input Paddy</th>

          <th className="p-4 text-left">Rice</th>

          <th className="p-4 text-left">Broken</th>

          <th className="p-4 text-center">Rice %</th>

          <th className="p-4 text-center">Broken %</th>

          <th className="p-4 text-center">Recovery</th>

          <th className="p-4 text-center">Action</th>

        </tr>

      </thead>

      <tbody>

      {

      filteredRecords.length===0

      ?

      (

      <tr>

      <td
      colSpan="10"
      className="py-20 text-center"
      >

      <div className="text-7xl">

      

      </div>

      <h2
      className="
      mt-4
      text-3xl
      font-bold
      text-[#655C56]
      "
      >

      No Milling Sessions

      </h2>

      <p
      className="
      mt-3
      text-[#8C8179]
      "
      >

      Record today's first milling session.

      </p>

      </td>

      </tr>

      )

      :

      (

      filteredRecords.map((item)=>{

      const ricePercent=

      (
      Number(item.outputRice)
      /
      Number(item.inputPaddy)
      )*100;

      const brokenPercent=

      (
      Number(item.outputBrokenRice)
      /
      Number(item.inputPaddy)
      )*100;

      const recovery=

      (
      (
      Number(item.outputRice)
      +
      Number(item.outputBrokenRice)
      )
      /
      Number(item.inputPaddy)
      )*100;

      return(

      <tr
      key={item.id}
      className="
      border-b
      hover:bg-[#FAF8F6]
      transition
      "
      >

      <td className="p-4 font-bold text-[#A0522D]">

      #{item.sessionNo}

      </td>

      <td className="p-4">

      {item.date}

      </td>

      <td className="p-4">

      <span
      className={`
      px-3
      py-1
      rounded-full
      text-xs
      font-semibold

      ${
      item.riceType==="Thin"

      ?

      "bg-green-100 text-green-700"

      :

      "bg-orange-100 text-orange-700"

      }
      `}
      >

      {item.riceType}

      </span>

      </td>

      <td className="p-4">

      {item.inputPaddy} Qtl

      </td>

      <td className="p-4 font-semibold text-green-700">

      {item.outputRice} Qtl

      </td>

      <td className="p-4 font-semibold text-orange-600">

      {item.outputBrokenRice} Qtl

      </td>

      <td className="p-4 text-center">

      <span
      className="
      bg-green-100
      text-green-700
      px-3
      py-1
      rounded-full
      font-medium
      "
      >

      {ricePercent.toFixed(2)}%

      </span>

      </td>

      <td className="p-4 text-center">

      <span
      className="
      bg-[#F7EFE6]
      text-[#A0522D]
      px-3
      py-1
      rounded-full
      font-medium
      "
      >

      {brokenPercent.toFixed(2)}%

      </span>

      </td>

      <td className="p-4 text-center">

      {

      recovery>=70

      ?

      <span
      className="
      bg-green-100
      text-green-700
      px-4
      py-1
      rounded-full
      font-semibold
      "
      >

      {recovery.toFixed(2)}%

      </span>

      :

      recovery>=65

      ?

      <span
      className="
      bg-yellow-100
      text-yellow-700
      px-4
      py-1
      rounded-full
      font-semibold
      "
      >

      {recovery.toFixed(2)}%

      </span>

      :

      <span
      className="
      bg-red-100
      text-red-700
      px-4
      py-1
      rounded-full
      font-semibold
      "
      >

      {recovery.toFixed(2)}%

      </span>

      }

      </td>

      <td className="p-4 text-center">

      <button

      onClick={()=>deleteSession(item.id)}

      className="
      bg-red-500
      hover:bg-red-600
      text-white
      px-5
      py-2
      rounded-xl
      transition
      "

      >

      Delete

      </button>

      </td>

      </tr>

      );

      })

      )

      }

      </tbody>

    </table>

  </div>

</div>

</div>

</div>

{/* CHARTS */}

<div className="grid lg:grid-cols-2 gap-8 mt-8">

  {/* Recovery Trend */}

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
      Recovery Trend
    </h2>

    <ResponsiveContainer
      width="100%"
      height={320}
    >

      <BarChart data={filteredRecords}>

        <CartesianGrid strokeDasharray="3 3" />

        <XAxis dataKey="sessionNo" />

        <YAxis />

        <Tooltip />

        <Legend />

        <Bar
          dataKey="outputRice"
          fill="#B7C2B2"
          radius={[8,8,0,0]}
        />

        <Bar
          dataKey="outputBrokenRice"
          fill="#C86A4A"
          radius={[8,8,0,0]}
        />

      </BarChart>

    </ResponsiveContainer>

  </div>

  {/* Rice vs Broken */}

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

      Rice Distribution

    </h2>

    <ResponsiveContainer
      width="100%"
      height={320}
    >

      <PieChart>

        <Pie

          data={[

            {

              name:"Rice",

              value:
              filteredRecords.reduce(
              (sum,item)=>
              sum+
              Number(item.outputRice),
              0
              )

            },

            {

              name:"Broken Rice",

              value:
              filteredRecords.reduce(
              (sum,item)=>
              sum+
              Number(item.outputBrokenRice),
              0
              )

            }

          ]}

          dataKey="value"

          outerRadius={110}

          label

        >

          <Cell fill="#B7C2B2" />

          <Cell fill="#C86A4A" />

        </Pie>

        <Tooltip />

        <Legend />

      </PieChart>

    </ResponsiveContainer>

  </div>

</div>

{/* SUMMARY */}

<div
  className="
  mt-8
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

    Milling Performance Summary

  </h2>

  <div
    className="
    grid
    md:grid-cols-3
    gap-6
    "
  >

    <div>

      <p className="text-gray-500">

        Average Recovery

      </p>

      <h1
        className="
        text-4xl
        font-bold
        text-green-700
        mt-2
        "
      >

        {

        filteredRecords.length===0

        ?

        "0%"

        :

        (

        filteredRecords.reduce(

        (sum,item)=>

        sum+

        (

        (

        Number(item.outputRice)+

        Number(item.outputBrokenRice)

        )

        /

        Number(item.inputPaddy)

        )*100

        ,

        0

        )

        /

        filteredRecords.length

        ).toFixed(2)

        }%

      </h1>

    </div>

    <div>

      <p className="text-gray-500">

        Best Session

      </p>

      <h1
        className="
        text-4xl
        font-bold
        text-[#A0522D]
        mt-2
        "
      >

        {

        filteredRecords.length===0

        ?

        "-"

        :

        "#"+

        filteredRecords.reduce(

        (best,current)=>

        (

        (

        current.outputRice+

        current.outputBrokenRice

        )

        /

        current.inputPaddy

        )

        >

        (

        (

        best.outputRice+

        best.outputBrokenRice

        )

        /

        best.inputPaddy

        )

        ?

        current

        :

        best

        ).sessionNo

        }

      </h1>

    </div>

    <div>

      <p className="text-gray-500">

        Total Milling Sessions

      </p>

      <h1
        className="
        text-4xl
        font-bold
        text-indigo-600
        mt-2
        "
      >

        {filteredRecords.length}

      </h1>

    </div>

  </div>

</div>

</div>

</div>

);

}

export default Milling;