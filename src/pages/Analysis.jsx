import { useEffect, useState } from "react";

import api from "../api";

import Sidebar from "../components/Sidebar";


import {

  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend

} from "recharts";

function Analysis() {

    const user = JSON.parse(
  localStorage.getItem("user")
);

  const [sales, setSales] =
    useState([]);

  const [paddy, setPaddy] =
    useState([]);

  const [brokenRice, setBrokenRice] =
    useState([]);

  const [expenses, setExpenses] =
    useState([]);

  const [employees, setEmployees] =
    useState([]);

  const [attendance, setAttendance] =
    useState([]);

  const [fromDate, setFromDate] =
    useState("");

  const [toDate, setToDate] =
    useState("");

    const [government, setGovernment] =
  useState([]);

const [salaryData, setSalaryData] =
  useState([]);

  const [weighBridge, setWeighBridge] =
useState([]);


  // FETCH ALL DATA

  const fetchData = async () => {

    try {

      const salesResponse =
          api.get("/sales");

      const paddyResponse =
        api.get(
          "/paddy/user/${user.id}"
        );

      const brokenRiceResponse =
        api.get(
          "/brokenrice/user/${user.id}"
        );

      const expenseResponse =
        api.get(
          "/expense/user/${user.id}"
        );

      const employeeResponse =
        api.get(
          "/employee/user/${user.id}"
        );

      const attendanceResponse =
        api.get(
          "/attendance/user/${user.id}"
        );

      const governmentResponse =
  api.get(
    "/government/user/${user.id}"
  );

const salaryResponse =
  api.get(
    "/salary/user/${user.id}"
  );

  const weighBridgeResponse =
api.get(
"/weighbridge/user/${user.id}"
);

setWeighBridge(
weighBridgeResponse.data
);

      setSales(salesResponse.data);

      setPaddy(paddyResponse.data);

      setBrokenRice(
        brokenRiceResponse.data
      );

      setExpenses(expenseResponse.data);

      setEmployees(employeeResponse.data);

      setAttendance(
        attendanceResponse.data
      );

      setGovernment(
  governmentResponse.data
);

setSalaryData(
  salaryResponse.data
);

    }

    catch (error) {

      console.log(error);
    }
  };

  useEffect(() => {

    fetchData();

  }, []);

  // DATE FILTER

  const filterByDate = (
    list,
    dateField
  ) => {

    if (
      fromDate === ""
      ||
      toDate === ""
    ) {

      return list;
    }

    return list.filter((item) => {

      const itemDate =
        item[dateField];

      return (
        itemDate >= fromDate
        &&
        itemDate <= toDate
      );
    });
  };

  // FILTERED DATA

  const filteredSales =
    filterByDate(
      sales,
      "saleDate"
    );

  const filteredPaddy =
    filterByDate(
      paddy,
      "date"
    );

  const filteredBrokenRice =
    filterByDate(
      brokenRice,
      "date"
    );

  const filteredExpenses =
    filterByDate(
      expenses,
      "expenseDate"
    );

    // SALES REVENUE (Filtered)

const totalSalesRevenue =

filteredSales.reduce(

(sum,item)=>

sum +

Number(item.amountReceived || 0),

0

);

// WEIGH BRIDGE REVENUE (Filtered)

const filteredWeighBridge =
filterByDate(
weighBridge,
"date"
);

const totalWeighBridgeIncome =

filteredWeighBridge.reduce(

(sum,item)=>

sum +

Number(item.amount || 0),

0

);

// TOTAL REVENUE

const totalRevenue =

totalSalesRevenue +

totalWeighBridgeIncome;

  // PROCUREMENT

  const totalPaddyExpense =

    filteredPaddy.reduce(

      (total, item) =>

        total +
        Number(
          item.finalAmount || 0
        ),

      0
    );

  const totalBrokenRiceExpense =

filteredBrokenRice.reduce(

(sum,item)=>

sum +

(

Number(item.quantity || 0)

*

Number(item.price || 0)

),

0

);

  // MISC EXPENSE

  const totalMiscExpense =

    filteredExpenses.reduce(

      (total, item) =>

        total +
        Number(item.amount || 0),

      0
    );

  // SALARY CALCULATION

  const filteredSalary =

salaryData.filter((item)=>{

if(fromDate==="" || toDate==="")
return true;

const month =
item.monthName;

const fromMonth =
fromDate.substring(0,7);

const toMonth =
toDate.substring(0,7);

return month>=fromMonth && month<=toMonth;

});

const totalSalaryExpense =

filteredSalary.reduce(

(sum,item)=>

sum +

Number(item.finalSalary || 0),

0

);

    

  // TOTAL EXPENSE

  const totalExpense =

    totalPaddyExpense

    +

    totalBrokenRiceExpense

    +

    totalMiscExpense

    +

    totalSalaryExpense;

  // NET PROFIT

  const netProfit =

    totalRevenue - totalExpense;

  // PRODUCT SALES

  const riceSales =
    filteredSales
      .filter(
        (item) =>
          item.productName ===
          "Rice"
      )
      .reduce(
        (total, item) =>
          total +
          Number(
            item.amountReceived || 0
          ),
        0
      );

  const brokenRiceSales =
    filteredSales
      .filter(
        (item) =>
          item.productName ===
          "Broken Rice"
      )
      .reduce(
        (total, item) =>
          total +
          Number(
            item.amountReceived || 0
          ),
        0
      );

  const huskSales =
    filteredSales
      .filter(
        (item) =>
          item.productName ===
          "Husk"
      )
      .reduce(
        (total, item) =>
          total +
          Number(
            item.amountReceived || 0
          ),
        0
      );

  const branSales =
    filteredSales
      .filter(
        (item) =>
          item.productName ===
          "Bran"
      )
      .reduce(
        (total, item) =>
          total +
          Number(
            item.amountReceived || 0
          ),
        0
      );

  const paramSales =
    filteredSales
      .filter(
        (item) =>
          item.productName ===
          "Param"
      )
      .reduce(
        (total, item) =>
          total +
          Number(
            item.amountReceived || 0
          ),
        0
      );

  // CHART DATA

  const revenueExpenseData = [

    {
      name: "Revenue",
      amount: totalRevenue
    },

    {
      name: "Expense",
      amount: totalExpense
    },

    {
      name: "Profit",
      amount: netProfit
    }

  ];

  const salesPieData = [

    {
      name: "Rice",
      value: riceSales
    },

    {
      name: "Broken Rice",
      value: brokenRiceSales
    },

    {
      name: "Husk",
      value: huskSales
    },

    {
      name: "Bran",
      value: branSales
    },

    {
      name: "Param",
      value: paramSales
    }

  ];

  const productRevenueData = [

    {
      product: "Rice",
      amount: riceSales
    },

    {
      product: "Broken Rice",
      amount: brokenRiceSales
    },

    {
      product: "Husk",
      amount: huskSales
    },

    {
      product: "Bran",
      amount: branSales
    },

    {
      product: "Param",
      amount: paramSales
    }

  ];

  const expenseCategoryData = [

    {
      name: "Paddy",
      value: totalPaddyExpense
    },

    {
      name: "Broken Rice",
      value: totalBrokenRiceExpense
    },

    {
      name: "Salary",
      value: totalSalaryExpense
    },

    {
      name: "Misc",
      value: totalMiscExpense
    }

  ];

  const COLORS = [

"#A0522D",
"#E35336",
"#F4A460",
"#CD853F",
"#8B4513"

];

  const totalHamali =
filteredPaddy.reduce(
  (sum,item)=>
    sum + Number(item.hamaliCharges || 0),
  0
);

const totalWeighBridge =
filteredPaddy.reduce(
  (sum,item)=>
    sum + Number(item.weighBridgeCharges || 0),
  0
);

const totalMoistureCutting =
filteredPaddy.reduce(
  (sum,item)=>
    sum + Number(item.moistureCutting || 0),
  0
);

const totalCashCutting =
filteredPaddy.reduce(
  (sum,item)=>
    sum + Number(item.cashCutting || 0),
  0
);

const totalPaddyQuantity =
filteredPaddy.reduce(
  (sum,item)=>
    sum + Number(item.quantity || 0),
  0
);

const totalPaddyReceived =
government.reduce(
  (sum,item)=>
    sum + Number(item.paddyReceived || 0),
  0
);

const totalRiceDelivered =
government.reduce(
  (sum,item)=>
    sum + Number(item.riceDelivered || 0),
  0
);

const pendingRice =
totalPaddyReceived -
totalRiceDelivered;

const totalSalaryGenerated =
salaryData.reduce(
  (sum,item)=>
    sum + Number(item.finalSalary || 0),
  0
);

const totalSalaryPaid =
salaryData.reduce(
  (sum,item)=>
    sum + Number(item.amountPaid || 0),
  0
);

const totalSalaryPending =
salaryData.reduce(
  (sum,item)=>
    sum + Number(item.balanceAmount || 0),
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
"
style={{
width: "calc(100vw - 288px)"
}}
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
background:"linear-gradient(135deg,#F3F2F5,#E6D5CB,#D1BDB0)"
}}
>

<h1
className="
text-5xl
font-bold
text-[#655C56]
mb-3
"
>

📊 Analytics Overview

</h1>

<p
className="
text-xl
text-[#8C8179]
"
>

Revenue • Procurement • Salary • Government Milling

</p>

</div>

{/* DATE FILTER */}

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

<h3
className="
text-xl
font-semibold
text-[#655C56]
mb-4
"
>

Filter Analysis

</h3>

<div className="flex gap-4">

<input
type="date"
value={fromDate}
onChange={(e)=>setFromDate(e.target.value)}
/>

<input
type="date"
value={toDate}
onChange={(e)=>setToDate(e.target.value)}
/>

</div>

</div>

{/* TOP KPI */}

<div
className="
grid
grid-cols-1
md:grid-cols-3
gap-6
mb-10
"
>

<div
className="
bg-white
border
border-[#E8E2DC]
rounded-[28px]
p-8
shadow-sm
"
>

<p className="text-[#9A8E85]">

Revenue

</p>

<h1
className="
text-4xl
font-bold
text-[#655C56]
mt-2
"
>

₹ {totalRevenue.toFixed(2)}

</h1>

</div>

<div
className="
bg-white
border
border-[#E8E2DC]
rounded-[28px]
p-8
shadow-sm
"
>

<p className="text-[#9A8E85]">

Expense

</p>

<h1
className="
text-4xl
font-bold
text-[#655C56]
mt-2
"
>

₹ {totalExpense.toFixed(2)}

</h1>

</div>

<div
className="
bg-white
border
border-[#E8E2DC]
rounded-[28px]
p-8
shadow-sm
"
>

<p className="text-[#9A8E85]">

Net Profit

</p>

<h1
className="
text-4xl
font-bold
text-[#655C56]
mt-2
"
>

₹ {netProfit.toFixed(2)}

</h1>

</div>

</div>

{/* PROCUREMENT */}

<div className="mb-10">

<h2
className="
text-3xl
font-bold
text-[#655C56]
mb-6
"
>

Paddy Procurement Analysis

</h2>

<div
className="
grid
grid-cols-1
md:grid-cols-2
xl:grid-cols-5
gap-6
"
>

<div className="erp-card">

<h3 className="text-[#9A8E85]">

Total Paddy

</h3>

<h1
className="
text-3xl
font-bold
text-[#655C56]
mt-2
"
>

{totalPaddyQuantity.toFixed(2)} Qtl

</h1>

</div>

<div className="erp-card">

<h3 className="text-[#9A8E85]">

Hamali

</h3>

<h1
className="
text-3xl
font-bold
text-[#655C56]
mt-2
"
>

₹ {totalHamali.toFixed(2)}

</h1>

</div>

<div className="erp-card">

<h3 className="text-[#9A8E85]">

Weigh Bridge

</h3>

<h1
className="
text-3xl
font-bold
text-[#655C56]
mt-2
"
>

₹ {totalWeighBridge.toFixed(2)}

</h1>

</div>

<div className="erp-card">

<h3 className="text-[#9A8E85]">

Moisture Cut

</h3>

<h1
className="
text-3xl
font-bold
text-[#655C56]
mt-2
"
>

₹ {totalMoistureCutting.toFixed(2)}

</h1>

</div>

<div className="erp-card">

<h3 className="text-[#9A8E85]">

Cash Cut

</h3>

<h1
className="
text-3xl
font-bold
text-[#655C56]
mt-2
"
>

₹ {totalCashCutting.toFixed(2)}

</h1>

</div>

</div>

</div>

<div
className="
bg-white
border
border-[#E8E2DC]
rounded-[32px]
p-8
mb-10
shadow-sm
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

Procurement Cost Breakdown

</h2>

<ResponsiveContainer
width="100%"
height={350}
>

<BarChart
data={[
{
name:"Hamali",
amount:totalHamali
},
{
name:"Weigh Bridge",
amount:totalWeighBridge
},
{
name:"Moisture",
amount:totalMoistureCutting
},
{
name:"Cash Cut",
amount:totalCashCutting
}
]}
>

<CartesianGrid strokeDasharray="3 3"/>

<XAxis dataKey="name"/>

<YAxis/>

<Tooltip/>

<Bar
dataKey="amount"
fill="#B7C2B2"
radius={[12,12,0,0]}
/>

</BarChart>

</ResponsiveContainer>

</div>

{/* GOVERNMENT */}

<h2
className="
text-3xl
font-bold
text-[#655C56]
mb-6
"
>

Government Milling

</h2>

<div
className="
grid
grid-cols-1
md:grid-cols-3
gap-6
mb-10
"
>

<div className="erp-card">

<h3 className="text-[#9A8E85]">

Paddy Received

</h3>

<h1
className="
text-4xl
font-bold
text-[#655C56]
"
>

{totalPaddyReceived}

</h1>

</div>

<div className="erp-card">

<h3 className="text-[#9A8E85]">

Rice Delivered

</h3>

<h1
className="
text-4xl
font-bold
text-[#655C56]
"
>

{totalRiceDelivered}

</h1>

</div>

<div className="erp-card">

<h3 className="text-[#9A8E85]">

Recovery %

</h3>

<h1
className="
text-4xl
font-bold
text-[#B7C2B2]
"
>

{
totalPaddyReceived > 0
?
(
(totalRiceDelivered /
totalPaddyReceived)
*100
).toFixed(2)
:
0
}
%

</h1>

</div>

</div>

{/* SALARY */}

<h2
className="
text-3xl
font-bold
text-[#655C56]
mb-6
"
>

Salary Analysis

</h2>

<div
className="
grid
grid-cols-1
md:grid-cols-2
xl:grid-cols-4
gap-6
mb-10
"
>

<div className="erp-card">
<h3>Generated</h3>
<h1 className="text-4xl font-bold text-[#655C56]">
₹ {totalSalaryGenerated.toFixed(2)}
</h1>
</div>

<div className="erp-card">
<h3>Paid</h3>
<h1 className="text-4xl font-bold text-[#655C56]">
₹ {totalSalaryPaid.toFixed(2)}
</h1>
</div>

<div className="erp-card">
<h3>Pending</h3>
<h1 className="text-4xl font-bold text-[#655C56]">
₹ {totalSalaryPending.toFixed(2)}
</h1>
</div>

<div className="erp-card">

<h3>Completion %</h3>

<h1
className="
text-4xl
font-bold
text-[#B7C2B2]
"
>

{
totalSalaryGenerated > 0
?
(
(totalSalaryPaid /
totalSalaryGenerated)
*100
).toFixed(1)
:
0
}
%

</h1>

</div>

</div>

        {/* MAIN CHARTS */}

<div
className="
grid
grid-cols-1
xl:grid-cols-2
gap-8
mb-10
"
>

{/* REVENUE VS EXPENSE */}

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

Revenue vs Expense

</h2>

<ResponsiveContainer
width="100%"
height={350}
>

<BarChart
data={[
{
name:"Revenue",
amount:totalRevenue
},
{
name:"Expense",
amount:totalExpense
},
{
name:"Profit",
amount:netProfit
}
]}
>

<CartesianGrid strokeDasharray="3 3"/>

<XAxis dataKey="name"/>

<YAxis/>

<Tooltip/>

<Bar
dataKey="amount"
fill="#B7C2B2"
radius={[12,12,0,0]}
/>

</BarChart>

</ResponsiveContainer>

</div>

{/* GOVERNMENT PERFORMANCE */}

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

Government Milling Performance

</h2>

<ResponsiveContainer
width="100%"
height={350}
>

<PieChart>

<Pie
data={[
{
name:"Rice Delivered",
value:totalRiceDelivered
},
{
name:"Remaining",
value:
Math.max(
totalPaddyReceived -
totalRiceDelivered,
0
)
}
]}
dataKey="value"
outerRadius={120}
label
>

<Cell fill="#B7C2B2"/>

<Cell fill="#E6D5CB"/>

</Pie>

<Tooltip/>

</PieChart>

</ResponsiveContainer>

</div>

</div>

{/* BUSINESS SUMMARY */}

<div
className="
bg-white
border
border-[#E8E2DC]
rounded-[32px]
p-8
shadow-sm
mb-10
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

Business Summary

</h2>

<div
className="
grid
grid-cols-1
md:grid-cols-2
xl:grid-cols-4
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

<p className="text-[#9A8E85]">

Sales Records

</p>

<h1
className="
text-3xl
font-bold
text-[#655C56]
mt-2
"
>

{sales.length}

</h1>

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

<p className="text-[#9A8E85]">

Employees

</p>

<h1
className="
text-3xl
font-bold
text-[#655C56]
mt-2
"
>

{employees.length}

</h1>

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

<p className="text-[#9A8E85]">

Salary Records

</p>

<h1
className="
text-3xl
font-bold
text-[#655C56]
mt-2
"
>

{salaryData.length}

</h1>

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

<p className="text-[#9A8E85]">

Expense Records

</p>

<h1
className="
text-3xl
font-bold
text-[#655C56]
mt-2
"
>

{expenses.length}

</h1>

</div>

</div>

</div>

</div>
</div>
);
}

export default Analysis;