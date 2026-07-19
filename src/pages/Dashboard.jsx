import { useEffect, useState } from "react";
import api from "../api";
import Sidebar from "../components/Sidebar";

import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { generateBusinessReport } from "../utils/pdf/pdfGenerator";
import GenerateReportModal from "../components/GenerateReportModal";
import {
  FaMoneyBillWave,
  FaUsers,
  FaChartLine,
  FaWallet
} from "react-icons/fa";

function Dashboard() {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [sales, setSales] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [salary, setSalary] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [paddy, setPaddy] = useState([]);
  const [brokenRice, setBrokenRice] = useState([]);
  const [weighBridge, setWeighBridge] =
useState([]);

const [milling, setMilling] =
useState([]);

const [government, setGovernment] =
useState([]);

const [ledger, setLedger] =
useState([]);

  const [calendarDate, setCalendarDate] =
    useState(new Date());

  const [selectedDate, setSelectedDate] =
    useState(
      new Date().toISOString().split("T")[0]
    );

  const [showReportModal, setShowReportModal] =
useState(false);

  const fetchDashboardData = async () => {

    try {

      const salesResponse =
        api.get(
          `/sales/user/${user.id}`
        );

      const expenseResponse =
        api.get(
          `/expense/user/${user.id}`
        );

      const employeeResponse =
        api.get(
          `/employee/user/${user.id}`
        );

      const salaryResponse =
        api.get(
          `/salary/user/${user.id}`
        );

      const attendanceResponse =
        api.get(
          `/attendance/user/${user.id}`
        );

      const paddyResponse =
  api.get(
    `/paddy/user/${user.id}`
  );

const brokenRiceResponse =
  api.get(
    `/brokenrice/user/${user.id}`
  );

  const weighBridgeResponse =
api.get(
`/weighbridge/user/${user.id}`
);

const millingResponse =
api.get(
`/milling/user/${user.id}`
);

const governmentResponse =
api.get(
`/government/user/${user.id}`
);

const ledgerResponse =
api.get(
`/ledger/user/${user.id}`
);

setWeighBridge(
weighBridgeResponse.data
);

setMilling(
millingResponse.data
);

setGovernment(
governmentResponse.data
);

setLedger(
ledgerResponse.data
);



setPaddy(paddyResponse.data);
setBrokenRice(brokenRiceResponse.data);

      setSales(salesResponse.data);
      setExpenses(expenseResponse.data);
      setEmployees(employeeResponse.data);
      setSalary(salaryResponse.data);
      setAttendance(attendanceResponse.data);

    } catch (error) {

      console.log(error);

    }
  };

  useEffect(() => {

    fetchDashboardData();

  }, []);

  const handleDateClick = (date) => {

  setCalendarDate(date);

  const year =
    date.getFullYear();

  const month =
    String(
      date.getMonth() + 1
    ).padStart(2, "0");

  const day =
    String(
      date.getDate()
    ).padStart(2, "0");

  setSelectedDate(
    `${year}-${month}-${day}`
  );

};

const totalWeighBridgeIncome =

weighBridge.reduce(

(sum,item)=>

sum +

Number(item.amount || 0),

0

);

  const totalSalesRevenue =

sales.reduce(

(sum,item)=>

sum +

Number(item.amountReceived || 0),

0

);

const totalRevenue =

totalSalesRevenue +

totalWeighBridgeIncome;


  const totalExpenseOnly =
  expenses.reduce(
    (sum, item) =>
      sum + Number(item.amount || 0),
    0
  );

const totalSalaryExpense =
  salary.reduce(
    (sum, item) =>
      sum + Number(item.finalSalary || 0),
    0
  );

const totalPaddyExpense =
  paddy.reduce(
    (sum, item) =>
      sum + Number(item.finalAmount || 0),
    0
  );

const totalBrokenRiceExpense =
  brokenRice.reduce(
    (sum, item) =>
      sum +
      (
        Number(item.quantity || 0) *
        Number(item.price || 0)
      ),
    0
  );

const totalExpense =
  totalExpenseOnly +
  totalSalaryExpense +
  totalPaddyExpense +
  totalBrokenRiceExpense;

  const netProfit =
    totalRevenue -
    totalExpense;

  const selectedSales =
    sales.filter(
      (item) =>
        item.saleDate === selectedDate
    );

  const selectedExpenses =
    expenses.filter(
      (item) =>
        item.expenseDate === selectedDate
    );

  const selectedAttendance =
    attendance.filter(
      (item) =>
        item.attendanceDate === selectedDate
    );

    const selectedPaddy =
  paddy.filter(
    (item) =>
      item.date === selectedDate
  );

const selectedBrokenRice =
  brokenRice.filter(
    (item) =>
      item.date === selectedDate
  );

  const selectedWeighBridge =
  weighBridge.filter(
    (item) =>
      item.entryDate === selectedDate
  );

  const selectedSalary =
    salary.filter(
      (item) =>
        item.monthName ===
        selectedDate.substring(0, 7)
    );

  const handleGenerateReport = (options)=>{
generateBusinessReport({

user,

options:{

fromDate:options.fromDate,

toDate:options.toDate,

sections:options.sections

},
data:{

sales,

procurement:paddy,

brokenRice,

expenses,

salary,

attendance,

government,

milling,

weighBridge,

employees,

ledger

}

});
setShowReportModal(false);

};

  return (

<div className="page">

<Sidebar />

<div
className="
ml-20
lg:ml-72
px-10
py-8
min-h-screen
max-w-[1800px]
mx-auto
"
>

{/* HERO SECTION */}

<div
className="
rounded-[36px]
p-8
mb-8
border
border-[#E8E2DC]
shadow-sm
overflow-hidden
relative
max-h-[200px]
"
style={{
background:
"linear-gradient(135deg,#F3F2F5,#E6D5CB,#D1BDB0)"
}}
>

<div className="relative z-10">

<h1
className="
text-4xl
font-bold
text-[#655C56]
"
>

👋 Welcome Back,

<br />

{user.millName}

</h1>

<p
className="
text-[#8C8179]
mt-4
text-xl
"
>

Business Overview Dashboard

</p>

<p
className="
text-[#8C8179]
mt-2
"
>

{new Date().toLocaleDateString()}

</p>

</div>

</div>

{/* KPI CARDS */}

<div
className="
grid
grid-cols-1
md:grid-cols-2
xl:grid-cols-4
gap-6
mb-8
"
>

{/* REVENUE */}

<div
className="
bg-white
border
border-[#E8E2DC]
rounded-[28px]
p-6
shadow-sm
hover:shadow-lg
transition-all
duration-300
hover:-translate-y-1
"
>

<div className="flex justify-between items-start">

<div>

<h2 className="text-[#9A8E85]">

Revenue

</h2>

<h1
className="
text-3xl
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
w-14
h-14
rounded-2xl
bg-[#EEF2EC]
flex
items-center
justify-center
"
>

<FaMoneyBillWave
size={22}
className="text-[#B7C2B2]"
/>

</div>

</div>

</div>

{/* EXPENSES */}

<div
className="
bg-white
border
border-[#E8E2DC]
rounded-[28px]
p-6
shadow-sm
hover:shadow-lg
transition-all
duration-300
hover:-translate-y-1
"
>

<div className="flex justify-between items-start">

<div>

<h2 className="text-[#9A8E85]">

Expenses

</h2>

<h1
className="
text-3xl
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
w-14
h-14
rounded-2xl
bg-[#F8EFEC]
flex
items-center
justify-center
"
>

<FaWallet
size={22}
className="text-[#D1BDB0]"
/>

</div>

</div>

</div>

{/* PROFIT */}

<div
className="
bg-white
border
border-[#E8E2DC]
rounded-[28px]
p-6
shadow-sm
hover:shadow-lg
transition-all
duration-300
hover:-translate-y-1
"
>

<div className="flex justify-between items-start">

<div>

<h2 className="text-[#9A8E85]">

Net Profit

</h2>

<h1
className="
text-3xl
font-bold
text-[#655C56]
mt-2
"
>

₹ {netProfit.toFixed(2)}

</h1>

</div>

<div
className="
w-14
h-14
rounded-2xl
bg-[#EEF2EC]
flex
items-center
justify-center
"
>

<FaChartLine
size={22}
className="text-[#B7C2B2]"
/>

</div>

</div>

</div>

{/* EMPLOYEES */}

<div
className="
bg-white
border
border-[#E8E2DC]
rounded-[28px]
p-6
shadow-sm
hover:shadow-lg
transition-all
duration-300
hover:-translate-y-1
"
>

<div className="flex justify-between items-start">

<div>

<h2 className="text-[#9A8E85]">

Employees

</h2>

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
w-14
h-14
rounded-2xl
bg-[#EEF2EC]
flex
items-center
justify-center
"
>

<FaUsers
size={22}
className="text-[#B7C2B2]"
/>

</div>

</div>

</div>

</div>

{/* SECONDARY STATS */}

<div
className="
grid
grid-cols-2
xl:grid-cols-4
gap-6
mb-8
"
>

<div
className="
bg-white
border
border-[#E8E2DC]
rounded-[24px]
p-6
shadow-sm
"
>

<h3 className="text-[#9A8E85]">

Sales Entries

</h3>

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
bg-white
border
border-[#E8E2DC]
rounded-[24px]
p-6
shadow-sm
"
>

<h3 className="text-[#9A8E85]">

Expense Entries

</h3>

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

<div
className="
bg-white
border
border-[#E8E2DC]
rounded-[24px]
p-6
shadow-sm
"
>

<h3 className="text-[#9A8E85]">

Paddy Records

</h3>

<h1
className="
text-3xl
font-bold
text-[#655C56]
mt-2
"
>

{paddy.length}

</h1>

</div>

<div
className="
bg-white
border
border-[#E8E2DC]
rounded-[24px]
p-6
shadow-sm
"
>

<h3 className="text-[#9A8E85]">

Salary Records

</h3>

<h1
className="
text-3xl
font-bold
text-[#655C56]
mt-2
"
>

{salary.length}

</h1>

</div>

</div>

        {/* CALENDAR + ACTIVITIES */}

<div
className="
grid
grid-cols-1
xl:grid-cols-3
gap-8
"
>

{/* CALENDAR */}

<div
className="
bg-white
border
border-[#E8E2DC]
rounded-[32px]
shadow-sm
p-6
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

Calendar

</h2>

<Calendar
value={calendarDate}
onChange={handleDateClick}
/>

</div>

{/* ACTIVITIES */}

<div
className="
xl:col-span-2
bg-white
border
border-[#E8E2DC]
rounded-[32px]
shadow-sm
p-6
"
>

<h2
className="
text-2xl
font-bold
text-[#655C56]
mb-8
"
>

Activities On {selectedDate}

</h2>

{/* SALES */}

<div className="mb-8">

<h3
className="
text-lg
font-semibold
text-[#655C56]
mb-4
"
>

Sales

</h3>

{
selectedSales.length === 0 ?

<p className="text-[#9A8E85]">

No Sales

</p>

:

selectedSales.map((item) => (

<div
key={item.id}
className="
bg-[#FAF8F6]
border
border-[#E8E2DC]
rounded-2xl
p-4
mb-3
transition-all
hover:bg-white
"
>

<div className="font-medium text-[#655C56]">

{item.productName}

</div>

<div className="text-[#8C8179]">

{item.customerName}

</div>

<div
className="
mt-2
font-semibold
text-[#655C56]
"
>

₹ {item.amountReceived}

</div>

</div>

))
}

</div>

{/* EXPENSES */}

<div className="mb-8">

<h3
className="
text-lg
font-semibold
text-[#655C56]
mb-4
"
>

Expenses

</h3>

{
selectedExpenses.map((item) => (

<div
key={`expense-${item.id}`}
className="
bg-[#FAF8F6]
border
border-[#E8E2DC]
rounded-2xl
p-4
mb-3
"
>

{item.expenseName}

{" - ₹"}

{item.amount}

</div>

))
}

{
selectedPaddy.map((item) => (

<div
key={`paddy-${item.id}`}
className="
bg-[#FAF8F6]
border
border-[#E8E2DC]
rounded-2xl
p-4
mb-3
"
>

Paddy Procurement

{" - "}

{item.farmerName}

{" - ₹"}

{item.finalAmount}

</div>

))
}

{
selectedBrokenRice.map((item) => (

<div
key={`broken-${item.id}`}
className="
bg-[#FAF8F6]
border
border-[#E8E2DC]
rounded-2xl
p-4
mb-3
"
>

Broken Rice Procurement

{" - ₹"}

{
(
Number(item.quantity || 0)
*
Number(item.price || 0)
).toFixed(2)
}

</div>

))
}

{
selectedSalary.map((item) => (

<div
key={`salary-${item.id}`}
className="
bg-[#FAF8F6]
border
border-[#E8E2DC]
rounded-2xl
p-4
mb-3
"
>

Salary

{" - "}

{item.employeeName}

{" - ₹"}

{item.finalSalary}

</div>

))
}

{
selectedExpenses.length === 0 &&
selectedPaddy.length === 0 &&
selectedBrokenRice.length === 0 &&
selectedSalary.length === 0 &&

<p className="text-[#9A8E85]">

No Expenses

</p>
}

</div>

{/* WEIGH BRIDGE */}

<div className="mb-8">

<h3
className="
text-lg
font-semibold
text-[#655C56]
mb-4
"
>

Weigh Bridge

</h3>

{
selectedWeighBridge.length === 0 ?

<p className="text-[#9A8E85]">

No Weigh Bridge Entries

</p>

:

selectedWeighBridge.map((item)=>(

<div
key={item.id}
className="
bg-[#FAF8F6]
border
border-[#E8E2DC]
rounded-2xl
p-4
mb-3
"
>

<div className="font-medium text-[#655C56]">

{item.customerName}

</div>

<div className="text-[#8C8179]">

🚚 {item.vehicleNumber}

</div>

<div className="text-[#8C8179]">

{item.paymentMode}

</div>

<div
className="
mt-2
font-semibold
text-[#655C56]
"
>

₹ {Number(item.amount).toFixed(2)}

</div>

</div>

))

}

</div>

{/* ATTENDANCE */}

<div>

<h3
className="
text-lg
font-semibold
text-[#655C56]
mb-4
"
>

Attendance

</h3>

{
selectedAttendance.length === 0 ?

<p className="text-[#9A8E85]">

No Attendance

</p>

:

selectedAttendance.map((item) => (

<div
key={item.id}
className="
bg-[#FAF8F6]
border
border-[#E8E2DC]
rounded-2xl
p-4
mb-3
"
>

<div className="font-medium text-[#655C56]">

{item.employeeName}

</div>

<div className="text-[#8C8179]">

{item.status}

</div>

</div>

))
}

</div>
<div className="fixed bottom-8 right-8">

<button

onClick={()=>

setShowReportModal(true)

}

className="
bg-[#E35336]
text-white
px-8
py-4
rounded-2xl
shadow-xl
hover:bg-[#A0522D]
transition
"

>

📄 Generate Business Report

</button>

</div>
<GenerateReportModal

isOpen={showReportModal}

onClose={()=>

setShowReportModal(false)

}

onGenerate={handleGenerateReport}

/>

</div>

</div>

</div>

</div>


);
}

export default Dashboard;

