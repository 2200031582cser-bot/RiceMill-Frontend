import { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";

import api from "../api";
function Ledger() {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [ledger, setLedger] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [selectedLedger, setSelectedLedger] = useState(null);
  const [transactions, setTransactions] = useState([]);

  const [showPayment, setShowPayment] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState("");

  const openPayment = (ledger) => {
    setSelectedLedger(ledger);
    setShowPayment(true);
  };

  const openHistory = async (ledger) => {

    try {

      const response = await api.get(
        "/ledger-transaction/${ledger.id}"
      );

      setTransactions(response.data);
      setSelectedLedger(ledger);
      setShowHistory(true);

    } catch (error) {

      console.log(error);

    }

  };

  const receivePayment = async () => {

    try {

      await api.put(
        "/ledger/receive-payment/${selectedLedger.id}",
        {
          paymentAmount: Number(paymentAmount)
        }
      );

      alert("Payment Received Successfully");

      setShowPayment(false);
      setPaymentAmount("");

      fetchLedger();

    } catch (error) {

      console.log(error);

    }

  };

  const fetchLedger = async () => {

    try {

      const response = await api.get(
        "/ledger/user/${user.id}"
      );

      setLedger(response.data);

    } catch (error) {

      console.log(error);

    }

  };

  useEffect(() => {
    fetchLedger();
  }, []);

  const totalBill = ledger.reduce(
  (sum, item) => sum + (item.billAmount || 0),
  0
);

const totalReceived = ledger.reduce(
  (sum, item) => sum + (item.amountReceived || 0),
  0
);

const totalDue = ledger.reduce(
  (sum, item) => sum + (item.dueAmount || 0),
  0
);

const pendingCustomers = ledger.filter(
  (item) => item.dueAmount > 0
).length;

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
      📒 Customer Ledger
    </h1>

    <p
      className="
      mt-3
      text-[#8C8179]
      text-lg
      "
    >
      Track customer dues and payment history
    </p>

  </div>

  {/* SUMMARY */}

  <div
    className="
    grid
    grid-cols-1
    md:grid-cols-4
    gap-6
    mb-8
    "
  >

    <div className="bg-white border border-[#E8E2DC] rounded-[28px] p-6 shadow-sm">

      <p className="text-gray-500">
        Total Billing
      </p>

      <h2 className="text-4xl font-bold text-[#A0522D] mt-3">

        ₹ {totalBill.toLocaleString()}

      </h2>

    </div>

    <div className="bg-white border border-[#E8E2DC] rounded-[28px] p-6 shadow-sm">

      <p className="text-gray-500">
        Amount Received
      </p>

      <h2 className="text-4xl font-bold text-green-600 mt-3">

        ₹ {totalReceived.toLocaleString()}

      </h2>

    </div>

    <div className="bg-white border border-[#E8E2DC] rounded-[28px] p-6 shadow-sm">

      <p className="text-gray-500">
        Outstanding
      </p>

      <h2 className="text-4xl font-bold text-red-600 mt-3">

        ₹ {totalDue.toLocaleString()}

      </h2>

    </div>

    <div className="bg-white border border-[#E8E2DC] rounded-[28px] p-6 shadow-sm">

      <p className="text-gray-500">
        Pending Customers
      </p>

      <h2 className="text-4xl font-bold text-indigo-600 mt-3">

        {pendingCustomers}

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

    <table className="w-full">

      <thead>

        <tr className="bg-green-600 text-white">

          <th className="p-4 text-left">
            Customer
          </th>

          <th className="p-4 text-left">
            Phone
          </th>

          <th className="p-4 text-left">
            Bill
          </th>

          <th className="p-4 text-left">
            Received
          </th>

          <th className="p-4 text-left">
            Due
          </th>

          <th className="p-4 text-left">
            Date
          </th>

          <th className="p-4 text-left">
            Status
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

            <td className="p-4 font-medium">

              {item.customerName}

            </td>

            <td className="p-4">

              {item.phoneNumber}

            </td>

            <td className="p-4 font-semibold">

              ₹ {item.billAmount}

            </td>

            <td className="p-4 text-green-600 font-semibold">

              ₹ {item.amountReceived}

            </td>

            <td className="p-4 text-red-600 font-bold">

              ₹ {item.dueAmount}

            </td>

            <td className="p-4">

              {item.ledgerDate}

            </td>

            <td className="p-4">

              <span
                className={`
                  px-4
                  py-2
                  rounded-full
                  text-white
                  text-sm
                  ${
                    item.status === "CLEARED"
                    ? "bg-green-600"
                    : "bg-red-500"
                  }
                `}
              >

                {item.status}

              </span>

            </td>

            <td className="p-4 flex gap-3">

              <button

                onClick={() =>
                  openHistory(item)
                }

                className="
                bg-[#C86A4A]
                hover:bg-[#B85A3A]
                text-white
                px-4
                py-2
                rounded-xl
                "

              >

                History

              </button>

              <button

                onClick={() =>
                  openPayment(item)
                }

                className="
                bg-green-600
                hover:bg-green-700
                text-white
                px-4
                py-2
                rounded-xl
                "

              >

                Payment

              </button>

            </td>

          </tr>

        ))}

      </tbody>

    </table>

  </div>

</div>



      {/* HISTORY POPUP */}

      {showHistory && (

        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">

          <div
  className="
  bg-white
  w-[90%]
  max-w-[1500px]
  p-8
  rounded-[30px]
  shadow-xl
  "
>

            <div className="flex justify-between items-center mb-6">

              <h2 className="text-3xl font-bold">
                Ledger History
              </h2>

              <button
                onClick={() => setShowHistory(false)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Close
              </button>

            </div>

            <h3 className="text-xl mb-6">
              Customer : {selectedLedger?.customerName}
            </h3>

            <table className="w-full">

              <thead>

                <tr className="bg-green-600 text-white">

                  <th className="p-3">S.No</th>
                  <th className="p-3">Date</th>
                  <th className="p-3">Particulars</th>
                  <th className="p-3">Debit</th>
                  <th className="p-3">Credit</th>
                  <th className="p-3">Balance</th>

                </tr>

              </thead>

              <tbody>

                {transactions.map((txn, index) => (

                  <tr
                    key={txn.id}
                    className="border-b"
                  >

                    <td className="p-3">
                      {index + 1}
                    </td>

                    <td className="p-3">
                      {txn.transactionDate}
                    </td>

                    <td className="p-3">
                      {txn.particulars}
                    </td>

                    <td className="p-3 text-red-600">
                      ₹ {txn.debitAmount}
                    </td>

                    <td className="p-3 text-green-600">
                      ₹ {txn.creditAmount}
                    </td>

                    <td className="p-3 font-bold">
                      ₹ {txn.balanceAmount}
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

            <div className="mt-6 text-right">

              <h2 className="text-3xl font-bold text-red-600">
                Current Outstanding Balance :
                ₹ {selectedLedger?.dueAmount}
              </h2>

            </div>

          </div>

        </div>

      )}

      {/* PAYMENT POPUP */}

      {showPayment && (

        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">

          <div
  className="
  bg-white
  p-8
  rounded-[28px]
  w-[550px]
  shadow-xl
  "
>

            <h2 className="text-3xl font-bold mb-6">
              Receive Payment
            </h2>

            <p className="mb-3">
              Customer :
              <b> {selectedLedger?.customerName}</b>
            </p>

            <p className="mb-6 text-red-600 font-bold">
              Current Due :
              ₹ {selectedLedger?.dueAmount}
            </p>

            <input
              type="number"
              value={paymentAmount}
              onChange={(e) =>
                setPaymentAmount(e.target.value)
              }
              placeholder="Enter Amount Received"
              className="w-full border p-3 rounded mb-6"
            />

            <div className="flex gap-3">

              <button
                onClick={receivePayment}
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                Save Payment
              </button>

              <button
                onClick={() => setShowPayment(false)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>

            </div>

          </div>

        </div>

      )}

    </div>

  );

}

export default Ledger;