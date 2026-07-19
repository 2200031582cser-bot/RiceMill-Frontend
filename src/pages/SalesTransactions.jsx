import { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";
import InvoiceModal from "../components/InvoiceModal";
import api from "../api";
function SalesTransactions() {

    const user = JSON.parse(
        localStorage.getItem("user")
    );

    const [salesList, setSalesList] = useState([]);

    const [selectedProduct, setSelectedProduct] =
        useState("ALL");

    const [showInvoiceModal, setShowInvoiceModal] = useState(false);

const [selectedInvoiceId, setSelectedInvoiceId] = useState(null);

const [invoiceMap, setInvoiceMap] = useState({});

    /*
    ==============================
    FETCH SALES
    ==============================
    */

   const fetchSales = async () => {

    try {

        const response = api.get(
            "/sales/user/${user.id}"
        );

        const sales = response.data;

setSalesList(sales);

const map = {};

for (const record of sales) {

    try {

        const invoiceResponse = api.get(

            "/invoice/sale/${record.sale.id}"

        );

        map[record.sale.id] = invoiceResponse.data.id;

    }

    catch {

        map[record.sale.id] = null;

    }

}

        setInvoiceMap(map);

    }

    catch (error) {

        console.log(error);

    }

};

    useEffect(() => {

        fetchSales();

    }, []);

    /*
    ==============================
    GENERATE INVOICE
    ==============================
    */

const generateInvoice = async (saleId) => {

    try {

        let invoiceId;

        if (invoiceMap[saleId]) {

            invoiceId = invoiceMap[saleId];

        }

        else {

            const response = api.post(
                `/invoice/generate/${saleId}`
            );

            invoiceId = response.data.id;

            setInvoiceMap(prev => ({
                ...prev,
                [saleId]: invoiceId
            }));

        }

        setSelectedInvoiceId(invoiceId);

        setShowInvoiceModal(true);

    }

    catch (error) {

        console.log(error);

        alert("Failed to open invoice");

    }

};

    /*
    ==============================
    DELETE SALE
    ==============================
    */

    const deleteSale = async (id) => {

        const confirmDelete =
            window.confirm(
                "Are you sure you want to delete this sale?"
            );

        if (!confirmDelete)
            return;

        try {

            api.delete(

                `/sales/${id}`

            );

            fetchSales();

        }

        catch (error) {

            console.log(error);

        }

    };

    /*
    ==============================
    FILTERS
    ==============================
    */

    const filteredSales =

selectedProduct === "ALL"

?

salesList

:

salesList.filter(record =>

    record.items.some(

        item =>

            item.category === selectedProduct

    )

);

    /*
    ==============================
    SUMMARY
    ==============================
    */

    const totalSales =

        filteredSales.reduce(

            (sum, item) =>

                sum +

                Number(item.sale.totalAmount || 0),

            0

        );

    const totalReceived =

        filteredSales.reduce(

            (sum, item) =>

                sum +

                Number(item.sale.amountReceived || 0),

            0

        );

    const totalDue =

        totalSales -

        totalReceived;

    return (

        <div className="page">

            <Sidebar />

            <div className="page-content">

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

                            📊 Sales Register

                        </h1>

                        <p
                            className="
                            mt-3
                            text-[#8C8179]
                            text-lg
                            "
                        >

                            Track sales and customer payments

                        </p>

                    </div>

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

                    <div className="erp-card">

                        <p className="text-gray-500">

                            Total Sales

                        </p>

                        <h2
                            className="
                            text-3xl
                            font-bold
                            text-[#A0522D]
                            mt-2
                            "
                        >

                            ₹ {totalSales.toLocaleString()}

                        </h2>

                    </div>

                    <div className="erp-card">

                        <p className="text-gray-500">

                            Amount Received

                        </p>

                        <h2
                            className="
                            text-3xl
                            font-bold
                            text-green-600
                            mt-2
                            "
                        >

                            ₹ {totalReceived.toLocaleString()}

                        </h2>

                    </div>

                    <div className="erp-card">

                        <p className="text-gray-500">

                            Outstanding Due

                        </p>

                        <h2
                            className="
                            text-3xl
                            font-bold
                            text-red-600
                            mt-2
                            "
                        >

                            ₹ {totalDue.toLocaleString()}

                        </h2>

                    </div>

                    <div className="erp-card">

                        <p className="text-gray-500">

                            Transactions

                        </p>

                        <h2
                            className="
                            text-3xl
                            font-bold
                            text-blue-600
                            mt-2
                            "
                        >

                            {filteredSales.length}

                        </h2>

                    </div>

                </div>

                                {/* FILTERS */}

                <div
                    className="
                    w-full
                    bg-white
                    border
                    border-[#E8E2DC]
                    rounded-[28px]
                    p-4
                    mb-8
                    shadow-sm
                    "
                >

                    <div
                        className="
                        grid
                        grid-cols-7
                        gap-3
                        "
                    >

                        {[
                            "ALL",
                            "Rice",
                            "Paddy",
                            "Broken Rice",
                            "Husk",
                            "Bran",
                            "Param"
                        ].map((item) => (

                            <button

                                key={item}

                                onClick={() =>
                                    setSelectedProduct(item)
                                }

                                className={`
                                py-4
                                rounded-2xl
                                font-medium
                                transition-all
                                duration-300

                                ${
                                    selectedProduct === item
                                        ? `
                                        bg-[#C86A4A]
                                        text-white
                                        shadow-sm
                                        `
                                        : `
                                        bg-[#F5F2EE]
                                        text-[#655C56]
                                        hover:bg-[#EDE7E1]
                                        `
                                }
                                `}
                            >

                                {item}

                            </button>

                        ))}

                    </div>

                </div>

                {/* SALES TABLE */}

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

                            <tr
                                className="
                                bg-green-600
                                text-white
                                "
                            >

                                <th className="p-4 text-left">Date</th>

<th className="p-4 text-left">Items Sold</th>

<th className="p-4 text-left">Customer</th>

<th className="p-4 text-center">Items</th>

<th className="p-4 text-left">Bill</th>

<th className="p-4 text-left">Received</th>

<th className="p-4 text-left">Due</th>

<th className="p-4 text-center">Actions</th>

                            </tr>

                        </thead>

                        <tbody>

                            {

                                filteredSales.map((item) => {

                                    const due =
                                        Number(item.sale.totalAmount || 0)
                                        -
                                        Number(item.sale.amountReceived || 0);

                                    return (

                                        <tr
                                            key={item.sale.id}
                                            className="
                                            border-b
                                            hover:bg-[#FAF8F6]
                                            transition-all
                                            "
                                        >

                                            <td className="p-4">
                                                {item.sale.saleDate}
                                            </td>

                                            <td className="p-4">

    <div className="space-y-2">

        {

            item.items.map((product,index)=>(

                <div

                    key={index}

                    className="flex items-center gap-2"

                >

                    <span>

                        🌾

                    </span>

                    <span className="font-medium">

                        {product.skuName}

                    </span>

                </div>

            ))

        }

    </div>

</td>

                                            <td className="p-4">
                                                {item.sale.customerName}
                                            </td>

                                            <td className="p-4 text-center">

    <span

        className="
        bg-green-100
        text-green-700
        px-3
        py-1
        rounded-full
        font-semibold
        "

    >

        {item.items.length}

    </span>

</td>

                                            <td className="p-4 font-bold text-blue-700">
                                                ₹ {Number(item.sale.totalAmount).toLocaleString()}
                                            </td>

                                            <td className="p-4 font-bold text-[#A0522D]">
                                                ₹ {Number(item.sale.amountReceived).toLocaleString()}
                                            </td>

                                            <td className="p-4 font-bold text-red-600">
                                                ₹ {due.toLocaleString()}
                                            </td>

                                            <td className="p-4">

                                                <div className="flex justify-center gap-2">

                                                    <button

    onClick={() => generateInvoice(item.sale.id)}

    className={`
        px-4
        py-2
        rounded-xl
        text-white
        transition-all

        ${
            invoiceMap[item.sale.id]

            ?

            "bg-blue-600 hover:bg-blue-700"

            :

            "bg-[#A0522D] hover:bg-[#8B4513]"
        }
    `}

>

    {

        invoiceMap[item.sale.id]

        ?

        "👁 View  "

        :

        "🧾 Generate "

    }

</button>

                                                    <button
                                                        onClick={() =>
                                                            deleteSale(item.sale.id)
                                                        }
                                                        className="
                                                        bg-red-500
                                                        hover:bg-red-600
                                                        text-white
                                                        px-4
                                                        py-2
                                                        rounded-xl
                                                        transition-all
                                                        "
                                                    >
                                                        Delete
                                                    </button>

                                                </div>

                                            </td>

                                        </tr>

                                    );

                                })

                            }

                        </tbody>

                    </table>

                    {

                        filteredSales.length === 0 && (

                            <div className="text-center py-12 text-gray-500">

                                No sales found.

                            </div>

                        )

                    }

                </div>

                {
    showInvoiceModal && (

        <InvoiceModal
            invoiceId={selectedInvoiceId}
            onClose={() => setShowInvoiceModal(false)}
        />

    )
}

            </div>

        </div>

    );

}

export default SalesTransactions;