import { useEffect, useMemo, useState } from "react";

import Sidebar from "../components/Sidebar";
import { Link } from "react-router-dom";
import api from "../api";
function WeighBridgeTransactions() {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  /* ---------------- STATES ---------------- */

  const [entries, setEntries] =
    useState([]);

  const [payments, setPayments] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("ALL");

  const [fromDate, setFromDate] =
    useState("");

  const [toDate, setToDate] =
    useState("");

  const [selectedCustomer, setSelectedCustomer] =
    useState(null);

  const [showReceivePopup, setShowReceivePopup] =
    useState(false);

  const [showHistoryPopup, setShowHistoryPopup] =
    useState(false);

  const [paymentAmount, setPaymentAmount] =
    useState("");

  const [paymentMode, setPaymentMode] =
    useState("Cash");

  const [remarks, setRemarks] =
    useState("");

  /* ---------------- FETCH ENTRIES ---------------- */

  const fetchEntries = async () => {

    try {

      const response = await api.get(

        "/weighbridge/user/${user.id}"

      );

      setEntries(response.data);

    }

    catch(error){

      console.log(error);

    }

  };

  /* ---------------- FETCH PAYMENTS ---------------- */

  const fetchPayments = async () => {

    try{

      const response = await api.get(

        "/weighbridge/payment/user/${user.id}"

      );

      setPayments(response.data);

    }

    catch(error){

      console.log(error);

    }

  };

  useEffect(()=>{

    if(user?.id){

      fetchEntries();

      fetchPayments();

    }

  },[]);

  /* ---------------- GROUP CUSTOMER ---------------- */

  const customers = useMemo(()=>{

    const grouped = {};

    entries.forEach((entry) => {

  // ONLY Monthly Credit entries should appear in ledger
  if (entry.paymentMode !== "Monthly Credit") {

    return;

  }

  if (!grouped[entry.customerName]) {

    grouped[entry.customerName] = {

      customerName: entry.customerName,

      phoneNumber: entry.phoneNumber,

      entries: [],

      totalIncome: 0,

      totalPaid: 0

    };

  }

  grouped[entry.customerName].entries.push(entry);

  grouped[entry.customerName].totalIncome +=
    Number(entry.amount);

});

    payments.forEach(payment=>{

      if(grouped[payment.customerName]){

        grouped[payment.customerName].totalPaid +=

        Number(payment.amountPaid);

      }

    });

    return Object.values(grouped);

  },[entries,payments]);

  /* ---------------- FILTER ---------------- */

  const filteredCustomers = customers.filter(customer=>{

    const matchesSearch =

      customer.customerName

      .toLowerCase()

      .includes(search.toLowerCase());

    const balance =

      customer.totalIncome -

      customer.totalPaid;

    let matchesStatus = true;

    if(statusFilter==="DUE"){

      matchesStatus = balance>0;

    }

    if(statusFilter==="PAID"){

      matchesStatus = balance<=0;

    }

    let matchesDate = true;

    if(fromDate){

      matchesDate = customer.entries.some(

        e=>e.entryDate>=fromDate

      );

    }

    if(toDate){

      matchesDate =

      matchesDate &&

      customer.entries.some(

        e=>e.entryDate<=toDate

      );

    }

    return matchesSearch &&

    matchesStatus &&

    matchesDate;

  });

  /* ---------------- STATS ---------------- */

  const totalIncome = customers.reduce(

    (sum,c)=>sum+c.totalIncome,

    0

  );

  const totalPaid = customers.reduce(

    (sum,c)=>sum+c.totalPaid,

    0

  );

  const outstanding =

    totalIncome-totalPaid;

  const totalCustomers =

    customers.length;

  /* ---------------- RECEIVE PAYMENT ---------------- */

  const receivePayment = async()=>{

    try{

      await api.post(

"/weighbridge/payment",

{

userId:user.id,

customerName:

selectedCustomer.customerName,

paymentDate:

new Date()

.toISOString()

.split("T")[0],

amountPaid:

Number(paymentAmount),

paymentMode,

remarks

}

      );

      alert("Payment Saved");

      setShowReceivePopup(false);

      setPaymentAmount("");

      setPaymentMode("Cash");

      setRemarks("");

      fetchPayments();

    }

    catch(error){

      console.log(error);

    }

  };

    /* ---------------- UI ---------------- */

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
          w-full
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

              📒 Weigh Bridge Ledger

            </h1>

            <p
              className="
              mt-3
              text-[#8C8179]
              text-lg
              "
            >

              Manage customer balances and monthly settlements.

            </p>

          </div>

          <Link to="/weighbridge">

            <button
              className="
              bg-[#C9774D]
              hover:bg-[#B96942]
              text-white
              px-8
              py-4
              rounded-2xl
              transition-all
              "
            >

              ← Back to Entries

            </button>

          </Link>

        </div>

        {/* STATS */}

        <div
          className="
          grid
          grid-cols-1
          sm:grid-cols-2
          xl:grid-cols-4
          gap-6
          mb-8
          "
        >

          <div className="bg-white rounded-[28px] border border-[#E8E2DC] p-6 shadow-sm">

            <p className="text-gray-500">

              Customers

            </p>

            <h2 className="text-4xl font-bold text-indigo-600 mt-3">

              {totalCustomers}

            </h2>

          </div>

          <div className="bg-white rounded-[28px] border border-[#E8E2DC] p-6 shadow-sm">

            <p className="text-gray-500">

              Total Income

            </p>

            <h2 className="text-4xl font-bold text-[#A0522D] mt-3">

              ₹ {totalIncome.toFixed(2)}

            </h2>

          </div>

          <div className="bg-white rounded-[28px] border border-[#E8E2DC] p-6 shadow-sm">

            <p className="text-gray-500">

              Total Received

            </p>

            <h2 className="text-4xl font-bold text-green-600 mt-3">

              ₹ {totalPaid.toFixed(2)}

            </h2>

          </div>

          <div className="bg-white rounded-[28px] border border-[#E8E2DC] p-6 shadow-sm">

            <p className="text-gray-500">

              Outstanding

            </p>

            <h2 className="text-4xl font-bold text-red-600 mt-3">

              ₹ {outstanding.toFixed(2)}

            </h2>

          </div>

        </div>

        {/* FILTER CARD */}

        <div
          className="
          bg-white
          border
          border-[#E8E2DC]
          rounded-[30px]
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
            xl:grid-cols-4
            gap-5
            "
          >

            {/* SEARCH */}

            <input

              type="text"

              placeholder="Search Customer..."

              value={search}

              onChange={(e)=>
                setSearch(e.target.value)
              }

              className="
              border
              border-[#E8E2DC]
              rounded-2xl
              p-4
              outline-none
              focus:ring-2
              focus:ring-[#B7C2B2]
              "

            />

            {/* STATUS */}

            <select

              value={statusFilter}

              onChange={(e)=>
                setStatusFilter(e.target.value)
              }

              className="
              border
              border-[#E8E2DC]
              rounded-2xl
              p-4
              "

            >

              <option value="ALL">

                All Customers

              </option>

              <option value="DUE">

                Outstanding Only

              </option>

              <option value="PAID">

                Fully Paid

              </option>

            </select>

            {/* FROM */}

            <input

              type="date"

              value={fromDate}

              onChange={(e)=>
                setFromDate(e.target.value)
              }

              className="
              border
              border-[#E8E2DC]
              rounded-2xl
              p-4
              "

            />

            {/* TO */}

            <input

              type="date"

              value={toDate}

              onChange={(e)=>
                setToDate(e.target.value)
              }

              className="
              border
              border-[#E8E2DC]
              rounded-2xl
              p-4
              "

            />

          </div>

        </div>

                {/* CUSTOMER LEDGER */}

        <div
          className="
          bg-white
          border
          border-[#E8E2DC]
          rounded-[30px]
          shadow-sm
          overflow-hidden
          "
        >

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead>

                <tr className="bg-[#C9774D]">

                  <th className="p-5 text-left">
                    Customer
                  </th>

                  <th className="p-5 text-left">
                    Phone
                  </th>

                  <th className="p-5 text-right">
                    Total Income
                  </th>

                  <th className="p-5 text-right">
                    Received
                  </th>

                  <th className="p-5 text-right">
                    Outstanding
                  </th>

                  <th className="p-5 text-center">
                    Actions
                  </th>

                </tr>

              </thead>

              <tbody>

                {

                  filteredCustomers.length===0 ?

                  (

                    <tr>

                      <td
                        colSpan="5"
                        className="
                        text-center
                        py-12
                        text-gray-500
                        "
                      >

                        No Customers Found

                      </td>

                    </tr>

                  )

                  :

                  filteredCustomers.map(customer=>{

                    const balance =

                    customer.totalIncome -

                    customer.totalPaid;

                    return(

                      <tr

                        key={customer.customerName}

                        className="
                        border-b
                        hover:bg-[#FAF8F6]
                        transition
                        "

                      >

                        <td className="p-5">

                          <div>

                            <p
                              className="
                              font-semibold
                              text-[#655C56]
                              "
                            >

                              {customer.customerName}

                            </p>

                          </div>

                        </td>

                        <td className="p-5">

                          {customer.phoneNumber}

                        </td>


                        <td
                          className="
                          p-5
                          text-right
                          font-bold
                          text-[#A0522D]
                          "
                        >

                          ₹ {customer.totalIncome.toFixed(2)}

                        </td>

                        <td
                          className="
                          p-5
                          text-right
                          font-bold
                          text-green-600
                          "
                        >

                          ₹ {customer.totalPaid.toFixed(2)}

                        </td>

                        <td
                          className="
                          p-5
                          text-right
                          font-bold
                          "

                        >

                          <span
                            className={

                              balance>0

                              ?

                              "text-red-600"

                              :

                              "text-green-600"

                            }

                          >

                            ₹ {balance.toFixed(2)}

                          </span>

                        </td>

                        <td className="p-5">

                          <div
                            className="
                            flex
                            justify-center
                            gap-3
                            "
                          >

                            <button

                              onClick={()=>{

                                setSelectedCustomer({

                                  ...customer,

                                  balance

                                });

                                setShowReceivePopup(true);

                              }}

                              className="
                              bg-[#B7C2B2]
                              hover:bg-[#A5B09F]
                              text-white
                              px-5
                              py-2
                              rounded-xl
                              transition
                              "

                            >

                              Receive Payment

                            </button>

                            <button

                              onClick={()=>{

                                setSelectedCustomer({

                                  ...customer,

                                  balance

                                });

                                setShowHistoryPopup(true);

                              }}

                              className="
                              bg-[#C9774D]
                              hover:bg-[#B96942]
                              text-white
                              px-5
                              py-2
                              rounded-xl
                              transition
                              "

                            >

                              View History

                            </button>

                          </div>

                        </td>

                      </tr>

                    );

                  })

                }

              </tbody>

            </table>

          </div>

        </div>

                {/* RECEIVE PAYMENT POPUP */}

        {
          showReceivePopup && selectedCustomer && (

            <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

              <div
                className="
                bg-white
                rounded-[32px]
                p-8
                w-[550px]
                border
                border-[#E8E2DC]
                shadow-xl
                "
              >

                <h2 className="text-3xl font-bold text-[#655C56] mb-8">

                  Receive Payment

                </h2>

                <div className="space-y-5">

                  <div>

                    <label className="block mb-2 font-medium text-[#655C56]">

                      Customer

                    </label>

                    <input

                      disabled

                      value={selectedCustomer.customerName}

                      className="w-full border border-[#E8E2DC] rounded-2xl p-4 bg-[#FAF8F6]"

                    />

                  </div>

                  <div>

                    <label className="block mb-2 font-medium text-[#655C56]">

                      Outstanding

                    </label>

                    <div className="text-4xl font-bold text-red-600">

                      ₹ {selectedCustomer.balance.toFixed(2)}

                    </div>

                  </div>

                  <input

                    type="number"

                    placeholder="Amount Received"

                    value={paymentAmount}

                    onChange={(e)=>setPaymentAmount(e.target.value)}

                    className="w-full border border-[#E8E2DC] rounded-2xl p-4"

                  />

                  <select

                    value={paymentMode}

                    onChange={(e)=>setPaymentMode(e.target.value)}

                    className="w-full border border-[#E8E2DC] rounded-2xl p-4"

                  >

                    <option>Cash</option>

                    <option>UPI</option>

                    <option>Bank Transfer</option>

                  </select>

                  <textarea

                    rows="3"

                    placeholder="Remarks"

                    value={remarks}

                    onChange={(e)=>setRemarks(e.target.value)}

                    className="w-full border border-[#E8E2DC] rounded-2xl p-4"

                  />

                </div>

                <div className="flex gap-4 mt-8">

                  <button

                    onClick={receivePayment}

                    className="flex-1 bg-[#B7C2B2] hover:bg-[#A5B09F] text-white py-4 rounded-2xl"

                  >

                    Save Payment

                  </button>

                  <button

                    onClick={()=>{

                      setShowReceivePopup(false);

                      setPaymentAmount("");

                      setPaymentMode("Cash");

                      setRemarks("");

                    }}

                    className="flex-1 bg-[#E35336] hover:bg-[#D3472C] text-white py-4 rounded-2xl"

                  >

                    Cancel

                  </button>

                </div>

              </div>

            </div>

          )

        }

        {/* HISTORY POPUP */}

        {

          showHistoryPopup &&

          selectedCustomer && (

            <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

              <div
                className="
                bg-white
                w-[1000px]
                max-h-[90vh]
                overflow-auto
                rounded-[32px]
                p-8
                border
                border-[#E8E2DC]
                shadow-xl
                "
              >

                <div className="flex justify-between items-center mb-8">

                  <div>

                    <h2 className="text-3xl font-bold text-[#655C56]">

                      Customer History

                    </h2>

                    <p className="text-gray-500 mt-2">

                      {selectedCustomer.customerName}

                    </p>

                  </div>

                  <button

                    onClick={()=>setShowHistoryPopup(false)}

                    className="bg-[#E35336] hover:bg-[#D3472C] text-white px-6 py-3 rounded-2xl"

                  >

                    Close

                  </button>

                </div>

                {/* ENTRIES */}

                <h3 className="text-2xl font-semibold text-[#655C56] mb-4">

                  Weigh Bridge Entries

                </h3>

                <table className="w-full mb-8">

                  <thead>

                    <tr className="bg-[#F8F5F2]">

                      <th className="p-4 text-left">Date</th>

                      <th className="p-4 text-left">Vehicle</th>

                      <th className="p-4 text-left">Description</th>

                      <th className="p-4 text-right">Amount</th>

                    </tr>

                  </thead>

                  <tbody>

                    {

                      selectedCustomer.entries.map(entry=>(

                        <tr key={entry.id} className="border-b">

                          <td className="p-4">

                            {entry.entryDate}

                          </td>

                          <td className="p-4">

                            {entry.vehicleNumber}

                          </td>

                          <td className="p-4">

                            {entry.description}

                          </td>

                          <td className="p-4 text-right font-bold text-[#A0522D]">

                            ₹ {Number(entry.amount).toFixed(2)}

                          </td>

                        </tr>

                      ))

                    }

                  </tbody>

                </table>

                {/* PAYMENTS */}

                <h3 className="text-2xl font-semibold text-[#655C56] mb-4">

                  Payments Received

                </h3>

                <table className="w-full">

                  <thead>

                    <tr className="bg-[#F8F5F2]">

                      <th className="p-4 text-left">Date</th>

                      <th className="p-4 text-left">Mode</th>

                      <th className="p-4 text-left">Remarks</th>

                      <th className="p-4 text-right">Amount</th>

                    </tr>

                  </thead>

                  <tbody>

                    {

                      payments

                        .filter(

                          payment=>

                          payment.customerName===selectedCustomer.customerName

                        )

                        .map(payment=>(

                          <tr key={payment.id} className="border-b">

                            <td className="p-4">

                              {payment.paymentDate}

                            </td>

                            <td className="p-4">

                              {payment.paymentMode}

                            </td>

                            <td className="p-4">

                              {payment.remarks}

                            </td>

                            <td className="p-4 text-right font-bold text-green-600">

                              ₹ {Number(payment.amountPaid).toFixed(2)}

                            </td>

                          </tr>

                        ))

                    }

                  </tbody>

                </table>

                <div className="mt-8 bg-[#FAF8F6] rounded-2xl border border-[#E8E2DC] p-6">

                  <div className="flex justify-between text-xl">

                    <span>Total Charges</span>

                    <strong>

                      ₹ {selectedCustomer.totalIncome.toFixed(2)}

                    </strong>

                  </div>

                  <div className="flex justify-between text-xl mt-4">

                    <span>Total Payments</span>

                    <strong className="text-green-600">

                      ₹ {selectedCustomer.totalPaid.toFixed(2)}

                    </strong>

                  </div>

                  <div className="flex justify-between text-3xl font-bold mt-6 text-red-600">

                    <span>Outstanding</span>

                    <span>

                      ₹ {selectedCustomer.balance.toFixed(2)}

                    </span>

                  </div>

                </div>

              </div>

            </div>

          )

        }

      </div>

    </div>

  );

}

export default WeighBridgeTransactions;