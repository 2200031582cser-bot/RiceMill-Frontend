import { useState } from "react";
import {
    FaFilePdf,
    FaCalendarAlt,
    FaCheckCircle,
    FaChartPie,
    FaShoppingCart,
    FaIndustry,
    FaWarehouse,
    FaMoneyBillWave,
    FaBook,
    FaBalanceScale,
    FaUniversity,
    FaReceipt,
    FaUsers
} from "react-icons/fa";

import {
    startOfWeek,
    startOfMonth,
    startOfYear,
    format
} from "date-fns";

function GenerateReportModal({

    isOpen,

    onClose,

    onGenerate

}) {

    const user = JSON.parse(
        localStorage.getItem("user")
    );

    const [fromDate, setFromDate] = useState("");

    const [toDate, setToDate] = useState("");

    const [activeFilter, setActiveFilter] = useState("");

    const [sections, setSections] = useState({

        summary: true,

        procurement: true,

        brokenRice: true,

        milling: true,

        sales: true,

        ledger: true,

        weighBridge: true,

        government: true,

        expenses: true,

        salary: true,

        attendance: true

    });

    if (!isOpen) return null;

    const handleCheckbox = (key) => {

        setSections({

            ...sections,

            [key]: !sections[key]

        });

    };

    const handleQuickFilter = (type) => {

    setActiveFilter(type);

    const today = new Date();

    let from;
    let to = today;

    switch(type){

        case "today":
            from = today;
            break;

        case "week":
            from = startOfWeek(today,{weekStartsOn:1});
            break;

        case "month":
            from = startOfMonth(today);
            break;

        case "year":
            from = startOfYear(today);
            break;

        default:
            return;
    }

    setFromDate(format(from,"yyyy-MM-dd"));
    setToDate(format(to,"yyyy-MM-dd"));
};

    const reportSections = [

    {
        key: "summary",
        title: "Executive Summary",
        description: "Business overview & KPIs",
        icon: <FaChartPie />
    },

    {
        key: "procurement",
        title: "Paddy Procurement",
        description: "Farmer purchases",
        icon: <FaShoppingCart />
    },

    {
        key: "milling",
        title: "Milling",
        description: "Production & Recovery",
        icon: <FaIndustry />
    },

    {
        key: "brokenRice",
        title: "Broken Rice",
        description: "Stock & Purchases",
        icon: <FaWarehouse />
    },

    {
        key: "sales",
        title: "Sales",
        description: "Sales Analysis",
        icon: <FaMoneyBillWave />
    },

    {
        key: "ledger",
        title: "Customer Ledger",
        description: "Outstanding Balances",
        icon: <FaBook />
    },

    {
        key: "weighBridge",
        title: "Weigh Bridge",
        description: "Collections & Income",
        icon: <FaBalanceScale />
    },

    {
        key: "government",
        title: "Government",
        description: "Civil Supplies",
        icon: <FaUniversity />
    },

    {
        key: "expenses",
        title: "Expenses",
        description: "Business Expenses",
        icon: <FaReceipt />
    },

    {
        key: "salary",
        title: "Salary",
        description: "Employee Salary",
        icon: <FaMoneyBillWave />
    },

    {
        key: "attendance",
        title: "Attendance",
        description: "Employee Attendance",
        icon: <FaUsers />
    }

];

    return (

        <div
            className="
            fixed
            inset-0
            bg-black/50
            backdrop-blur-sm
            flex
            items-center
            justify-center
            z-50
            p-6
            "
        >

            <div
                className="
                bg-white
                w-full
                max-w-4xl
                max-h-[90vh]
                rounded-[32px]
                shadow-2xl
                overflow-y-auto
                "
            >

                {/* HEADER */}

                <div
                    className="
                    px-6
                    py-4    

                    bg-gradient-to-r

                    from-[#F7F2EC]

                    to-[#EFE4D9]

                    border-b
                    border-[#E8DDD3]
                    "
                >

                    <div
                        className="
                        flex
                        items-center
                        gap-4
                        "
                    >

                        <div
                            className="
                            h-14
                            w-14

                            rounded-2xl

                            bg-[#A0522D]/10

                            flex
                            items-center
                            justify-center
                            "
                        >

                            <FaFilePdf
                                className="
                                text-[#A0522D]
                                text-2xl
                                "
                            />

                        </div>

                        <div>

                            <h1
                                className="
                                text-2xl
                                font-bold
                                text-[#6F4328]
                                "
                            >

                                Generate Business Report

                            </h1>

                            <p
                                className="
                                text-gray-500
                                mt-2
                                "
                            >

                                Generate a detailed business performance report for{" "}

                                <span className="font-semibold">

                                    {user?.millName}

                                </span>

                            </p>

                        </div>

                    </div>

                </div>

                {/* BODY */}

                <div className="p-5">

                    {/* ============================
    REPORTING PERIOD
============================ */}

<div className="grid grid-cols-2 gap-8">

    <div>

        <label
            className="
            flex
            items-center
            gap-2
            text-xs
            font-semibold
            text-[#6F4328]
            mb-3
            "
        >

            <FaCalendarAlt />

            From Date

        </label>

        <input

            type="date"

            value={fromDate}

            onChange={(e)=>{

    setFromDate(e.target.value);

    setActiveFilter("");

}}

            className="
            w-full

            rounded-2xl

            border
            border-[#E6DDD5]

            bg-[#FAF8F6]

            px-5
            py-4

            focus:outline-none

            focus:ring-2

            focus:ring-[#A0522D]

            transition
            "

        />

    </div>

    <div>

        <label
            className="
            flex
            items-center
            gap-2
            text-xs
            font-semibold
            text-[#6F4328]
            mb-3
            "
        >

            <FaCalendarAlt />

            To Date

        </label>

        <input

            type="date"

            value={toDate}

            onChange={(e)=>{

    setToDate(e.target.value);

    setActiveFilter("");

}}

            className="
            w-full

            rounded-2xl

            border
            border-[#E6DDD5]

            bg-[#FAF8F6]

            px-5
            py-4

            focus:outline-none

            focus:ring-2

            focus:ring-[#A0522D]

            transition
            "

        />

    </div>

</div>
<div className="flex gap-5 mt-5 mb-4 overflow-x-auto whitespace-nowrap">

    <button
        type="button"
        onClick={() => handleQuickFilter("today")}
        className={`
px-5
py-2
rounded-xl
transition-all
duration-300
${
    activeFilter === "today"

    ? "bg-[#A0522D] text-white shadow-md"

    : "bg-[#F5EFEA] text-[#A0522D] hover:bg-[#E8DDD3]"
}
`}
    >
        Today
    </button>

    <button
        type="button"
        onClick={() => handleQuickFilter("week")}
        className={`
px-5
py-2
rounded-xl
transition-all
duration-300
${
    activeFilter === "week"

    ? "bg-[#A0522D] text-white shadow-md"

    : "bg-[#F5EFEA] text-[#A0522D] hover:bg-[#E8DDD3]"
}
`}
    >
        This Week
    </button>

    <button
        type="button"
        onClick={() => handleQuickFilter("month")}
        className={`
px-5
py-2
rounded-xl
transition-all
duration-300
${
    activeFilter === "month"

    ? "bg-[#A0522D] text-white shadow-md"

    : "bg-[#F5EFEA] text-[#A0522D] hover:bg-[#E8DDD3]"
}
`}
    >
        This Month
    </button>

    <button
        type="button"
        onClick={() => handleQuickFilter("year")}
        className={`
px-5
py-2
rounded-xl
transition-all
duration-300
${
    activeFilter === "year"

    ? "bg-[#A0522D] text-white shadow-md"

    : "bg-[#F5EFEA] text-[#A0522D] hover:bg-[#E8DDD3]"
}
`}
    >
        This Year
    </button>

</div>

{/* ============================
    MODULES
============================ */}

<div className="mt-3">

    <div className="flex items-center justify-between">

        <div>

            <h2
                className="
                text-2xl
                font-bold
                text-[#6F4328]
                "
            >

                Report Modules

            </h2>

            <p
                className="
                text-gray-500
                mt-1
                "
            >

                Select the sections you want to include in the PDF.

            </p>

        </div>

        <span
            className="
            px-4
            py-2

            rounded-xl

            bg-[#F5EFEA]

            text-[#A0522D]

            font-semibold

            text-xs
            "
        >

            {

                Object.values(sections)

                .filter(Boolean)

                .length

            } Selected

        </span>

    </div>

    <div
        className="
        grid
        grid-cols-2
        gap-3
        mt-4
        "
    >

        {

            reportSections.map((section)=>(

                <button

                    key={section.key}

                    type="button"

                    onClick={()=>handleCheckbox(section.key)}

                    className={

                        `

                        p-3

                        rounded-2xl

                        border-2

                        text-left

                        transition-all

                        duration-300

                        hover:shadow-lg

                        hover:-translate-y-1

                        ${

                            sections[section.key]

                            ?

                            `

                            border-[#A0522D]

                            bg-[#FFF8F3]

                            `

                            :

                            `

                            border-[#ECE7E2]

                            bg-white

                            hover:border-[#D6C5B8]

                            `

                        }

                        `

                    }

                >

                    <div
                        className="
                        flex
                        justify-between
                        items-start
                        "
                    >

                        <div className="flex gap-4 items-start">

    <div
        className="
        h-9
        w-9
        rounded-xl
        bg-[#F8EFE8]
        text-[#A0522D]
        flex
        items-center
        justify-center
        text-lg
        "
    >
        {section.icon}
    </div>

    <div>

        <h3
            className="
            font-bold
            text-sm
            text-[#6F4328]
            "
        >
            {section.title}
        </h3>

        <p
            className="
            text-[11px]
            text-gray-500
            mt-0.5
            "
        >
            {section.description}
        </p>

    </div>

</div>

                        <div
                            className={

                                `

                                h-7

                                w-7

                                rounded-full

                                flex

                                items-center

                                justify-center

                                transition

                                ${

                                    sections[section.key]

                                    ?

                                    "bg-[#A0522D] text-white"

                                    :

                                    "bg-gray-200 text-transparent"

                                }

                                `

                            }

                        >

                            <FaCheckCircle
                                size={15}
                            />

                        </div>

                    </div>

                </button>

            ))

        }

    </div>

</div>

{/* =====================================
    FOOTER
===================================== */}

<div
    className="
    mt-4

    pt-4

    border-t

    border-[#EEE7E2]

    flex

    items-center

    justify-between
    "
>

    {/* LEFT ACTIONS */}

    <div className="flex gap-3">

        <button

            type="button"

            onClick={() => {

                const all = {};

                reportSections.forEach(section => {

                    all[section.key] = true;

                });

                setSections(all);

            }}

            className="
            px-5

            py-3

            rounded-xl

            bg-[#F7F2EC]

            text-[#A0522D]

            font-semibold

            hover:bg-[#EFE3D7]

            transition
            "

        >

            Select All

        </button>

        <button

            type="button"

            onClick={() => {

                const none = {};

                reportSections.forEach(section => {

                    none[section.key] = false;

                });

                setSections(none);

            }}

            className="
            px-5

            py-3

            rounded-xl

            bg-gray-100

            text-gray-600

            hover:bg-gray-200

            transition
            "

        >

            Clear All

        </button>

    </div>

    {/* RIGHT ACTIONS */}

    <div className="flex gap-4">

        <button

            type="button"

            onClick={onClose}

            className="
            px-7

            py-3

            rounded-2xl

            bg-gray-200

            text-gray-700

            font-semibold

            hover:bg-gray-300

            transition
            "

        >

            Cancel

        </button>

        <button

            type="button"

            disabled={!fromDate || !toDate}

            onClick={() => {

    if (!fromDate || !toDate) {

        alert("Please select both dates.");

        return;

    }

    onGenerate({

        fromDate,

        toDate,

        sections

    });

}}

            className="
            flex

            items-center

            gap-3

            px-8

            py-3

            rounded-2xl

            bg-[#C96B43]

            text-white

            font-semibold

            shadow-lg

            hover:bg-[#B85A33]

            hover:scale-[1.02]

            transition-all

            disabled:opacity-50

disabled:cursor-not-allowed
            "

        >

            <FaFilePdf />

            Generate PDF Report

        </button>

    </div>

</div>

</div>

</div>

</div>

)}

export default GenerateReportModal;