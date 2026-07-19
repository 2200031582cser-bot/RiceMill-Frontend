import { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";
import { Link } from "react-router-dom";
import api from "../api";
function Sales() {

    const user = JSON.parse(
        localStorage.getItem("user")
    );

    /* ---------------- SALE DETAILS ---------------- */

    const [sale, setSale] = useState({

        saleDate: "",

        customerName: "",

        customerPhone: "",

        paymentStatus: "PAID",

        amountReceived: ""

    });

    /* ---------------- SKU LIST ---------------- */

    const [skus, setSkus] = useState([]);

    /* ---------------- ITEMS ---------------- */

    const [items, setItems] = useState([

        {

            skuId: "",

            skuName: "",

            category: "",

            unit: "",

            quantity: "",

            rate: "",

            gst: "0",

            amount: 0

        }

    ]);

    /* ---------------- LOAD SKUS ---------------- */

    const fetchSkus = async () => {

        try {

            const response = api.get(

                "/sku/user/${user.id}"

            );

            setSkus(response.data);

        }

        catch (error) {

            console.log(error);

        }

    };

    useEffect(() => {

        fetchSkus();

    }, []);

    /* ---------------- SALE INPUT ---------------- */

    const handleSaleChange = (e) => {

        setSale({

            ...sale,

            [e.target.name]: e.target.value

        });

    };

    /* ---------------- ITEM INPUT ---------------- */

    const handleItemChange = (

        index,

        field,

        value

    ) => {

        const updated = [...items];

        updated[index][field] = value;

        if (field === "skuId") {

            const selectedSku =

                skus.find(

                    sku =>

                        sku.id === Number(value)

                );

            if (selectedSku) {

                updated[index].skuId =
                    selectedSku.id;

                updated[index].skuName =
                    selectedSku.skuName;

                updated[index].category =
                    selectedSku.category;

                updated[index].unit =
                    selectedSku.unit;

            }

        }

        updated[index].amount =

            Number(

                updated[index].quantity || 0

            )

            *

            Number(

                updated[index].rate || 0

            );

        setItems(updated);

    };

    /* ---------------- ADD ITEM ---------------- */

    const addItem = () => {

        setItems([

            ...items,

            {

                skuId: "",

                skuName: "",

                category: "",

                unit: "",

                quantity: "",

                rate: "",

                gst: "0",

                amount: 0

            }

        ]);

    };

    /* ---------------- REMOVE ITEM ---------------- */

    const removeItem = (index) => {

        if (items.length === 1)

            return;

        const updated = [...items];

        updated.splice(index, 1);

        setItems(updated);

    };

    /* ---------------- TOTAL ---------------- */

    const totalAmount =

        items.reduce(

            (sum, item) =>

                sum +

                Number(item.amount || 0),

            0

        );

    const difference =

        totalAmount

        -

        Number(

            sale.amountReceived || 0

        );

    /* ---------------- SAVE SALE ---------------- */

    const saveSale = async () => {

        try {

            const request = {

                sale: {

                    saleDate:
                        sale.saleDate,

                    customerName:
                        sale.customerName,

                    customerPhone:
                        sale.customerPhone,

                    paymentStatus:
                        sale.paymentStatus,

                    totalAmount:
                        totalAmount,

                    amountReceived:
                        Number(
                            sale.amountReceived || 0
                        ),

                    userId:
                        user.id

                },

                items

            };

            console.log(request);

            api.post(

                "/sales",

                request

            );

            alert("Sale Saved Successfully");

            setSale({

                saleDate: "",

                customerName: "",

                customerPhone: "",

                paymentStatus: "PAID",

                amountReceived: ""

            });

            setItems([

                {

                    skuId: "",

                    skuName: "",

                    category: "",

                    unit: "",

                    quantity: "",

                    rate: "",

                    gst: "0",

                    amount: 0

                }

            ]);

        }

        catch (error) {

            console.log(error);

            alert("Failed To Save Sale");

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
    ">

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
            flex-wrap
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

                    🧾 Sales Management

                </h1>

                <p

                    className="
                    mt-3
                    text-[#8C8179]
                    text-lg
                "

                >

                    Create invoices with multiple products

                </p>

            </div>

            <Link to="/sales-transactions">

                <button

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

                </button>

            </Link>

        </div>

        {/* CUSTOMER DETAILS */}

        <div

            className="
            bg-white
            rounded-[32px]
            border
            border-[#E8E2DC]
            shadow-sm
            p-8
            mb-8
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

                Customer Information

            </h2>

            <div

                className="
                grid
                grid-cols-1
                md:grid-cols-2
                lg:grid-cols-5
                gap-6
            "

            >

                {/* DATE */}

                <div>

                    <label className="block mb-2 font-medium text-[#655C56]">

                        Sale Date

                    </label>

                    <input

                        type="date"

                        name="saleDate"

                        value={sale.saleDate}

                        onChange={handleSaleChange}

                        className="
                        w-full
                        border
                        border-[#E8E2DC]
                        rounded-2xl
                        p-4
                    "

                    />

                </div>

                {/* CUSTOMER */}

                <div>

                    <label className="block mb-2 font-medium text-[#655C56]">

                        Customer Name

                    </label>

                    <input

                        type="text"

                        name="customerName"

                        value={sale.customerName}

                        onChange={handleSaleChange}

                        placeholder="Customer Name"

                        className="
                        w-full
                        border
                        border-[#E8E2DC]
                        rounded-2xl
                        p-4
                    "

                    />

                </div>

                {/* PHONE */}

                <div>

                    <label className="block mb-2 font-medium text-[#655C56]">

                        Phone Number

                    </label>

                    <input

                        type="text"

                        name="customerPhone"

                        value={sale.customerPhone}

                        onChange={handleSaleChange}

                        placeholder="Phone Number"

                        className="
                        w-full
                        border
                        border-[#E8E2DC]
                        rounded-2xl
                        p-4
                    "

                    />

                </div>

                {/* PAYMENT */}

                <div>

                    <label className="block mb-2 font-medium text-[#655C56]">

                        Payment Status

                    </label>

                    <select

                        name="paymentStatus"

                        value={sale.paymentStatus}

                        onChange={handleSaleChange}

                        className="
                        w-full
                        border
                        border-[#E8E2DC]
                        rounded-2xl
                        p-4
                    "

                    >

                        <option value="PAID">

                            Fully Paid

                        </option>

                        <option value="DUE">

                            Due

                        </option>

                        <option value="DISCOUNT">

                            Discount

                        </option>

                    </select>

                </div>

                {/* RECEIVED */}

                <div>

                    <label className="block mb-2 font-medium text-[#655C56]">

                        Amount Received

                    </label>

                    <input

                        type="number"

                        name="amountReceived"

                        value={sale.amountReceived}

                        onChange={handleSaleChange}

                        className="
                        w-full
                        border
                        border-[#E8E2DC]
                        rounded-2xl
                        p-4
                    "

                    />

                </div>

            </div>

        </div>

        {/* ITEMS SECTION */}

        <div

            className="
            bg-white
            rounded-[32px]
            border
            border-[#E8E2DC]
            shadow-sm
            p-8
            mb-8
        "

        >

            <div className="flex justify-between items-center mb-8">

                <h2

                    className="
                    text-2xl
                    font-bold
                    text-[#655C56]
                "

                >

                    Sale Items

                </h2>

                <button

                    onClick={addItem}

                    className="
                    bg-green-600
                    hover:bg-green-700
                    text-white
                    px-6
                    py-3
                    rounded-xl
                "

                >

                    + Add Item

                </button>

            </div>

            <div className="overflow-x-auto">

    <table className="w-full border-collapse">

        <thead>

            <tr className="bg-[#F7F4F2] text-[#655C56]">

                <th className="p-4 text-left rounded-l-xl">SKU</th>

                <th className="p-4 text-left">Category</th>

                <th className="p-4 text-left">Unit</th>

                <th className="p-4 text-left">Qty</th>

                <th className="p-4 text-left">Rate</th>

                <th className="p-4 text-left">GST %</th>

                <th className="p-4 text-left">Amount</th>

                <th className="p-4 text-center rounded-r-xl">
                    Action
                </th>

            </tr>

        </thead>

        <tbody>

            {

                items.map((item,index)=>(

                    <tr

                        key={index}

                        className="border-b border-[#ECE7E2]"

                    >

                        {/* SKU */}

                        <td className="p-3">

                            <select

                                value={item.skuId}

                                onChange={(e)=>

                                    handleItemChange(

                                        index,

                                        "skuId",

                                        e.target.value

                                    )

                                }

                                className="
                                w-full
                                border
                                border-[#E8E2DC]
                                rounded-xl
                                p-3
                                "

                            >

                                <option value="">

                                    Select SKU

                                </option>

                                {

                                    skus.map((sku)=>(

                                        <option

                                            key={sku.id}

                                            value={sku.id}

                                        >

                                            {sku.skuName}

                                        </option>

                                    ))

                                }

                            </select>

                        </td>

                        {/* CATEGORY */}

                        <td className="p-3">

                            <input

                                value={item.category}

                                readOnly

                                className="
                                w-full
                                bg-[#F8F8F8]
                                border
                                border-[#E8E2DC]
                                rounded-xl
                                p-3
                                "

                            />

                        </td>

                        {/* UNIT */}

                        <td className="p-3">

                            <input

                                value={item.unit}

                                readOnly

                                className="
                                w-full
                                bg-[#F8F8F8]
                                border
                                border-[#E8E2DC]
                                rounded-xl
                                p-3
                                "

                            />

                        </td>

                        {/* QUANTITY */}

                        <td className="p-3">

                            <input

                                type="number"

                                value={item.quantity}

                                onChange={(e)=>

                                    handleItemChange(

                                        index,

                                        "quantity",

                                        e.target.value

                                    )

                                }

                                className="
                                w-full
                                border
                                border-[#E8E2DC]
                                rounded-xl
                                p-3
                                "

                            />

                        </td>

                        {/* RATE */}

                        <td className="p-3">

                            <input

                                type="number"

                                value={item.rate}

                                onChange={(e)=>

                                    handleItemChange(

                                        index,

                                        "rate",

                                        e.target.value

                                    )

                                }

                                className="
                                w-full
                                border
                                border-[#E8E2DC]
                                rounded-xl
                                p-3
                                "

                            />

                        </td>

                        {/* GST */}

                        <td className="p-3">

                            <select

                                value={item.gst}

                                onChange={(e)=>

                                    handleItemChange(

                                        index,

                                        "gst",

                                        e.target.value

                                    )

                                }

                                className="
                                w-full
                                border
                                border-[#E8E2DC]
                                rounded-xl
                                p-3
                                "

                            >

                                <option value="0">

                                    0%

                                </option>

                                <option value="5">

                                    5%

                                </option>

                                <option value="12">

                                    12%

                                </option>

                                <option value="18">

                                    18%

                                </option>

                                <option value="28">

                                    28%

                                </option>

                            </select>

                        </td>

                        {/* AMOUNT */}

                        <td className="p-3">

                            <input

                                value={item.amount.toFixed(2)}

                                readOnly

                                className="
                                w-full
                                bg-[#F8F8F8]
                                border
                                border-[#E8E2DC]
                                rounded-xl
                                p-3
                                font-semibold
                                "

                            />

                        </td>

                        {/* DELETE */}

                        <td className="p-3 text-center">

                            <button

                                onClick={()=>

                                    removeItem(index)

                                }

                                className="
                                bg-red-500
                                hover:bg-red-600
                                text-white
                                px-4
                                py-2
                                rounded-xl
                                "

                            >

                                ✕

                            </button>

                        </td>

                    </tr>

                ))

            }

        </tbody>

    </table>

</div>

        {/* TOTALS */}

        <div
            className="
            grid
            grid-cols-1
            lg:grid-cols-2
            gap-6
            mt-10
        "
        >

            <div
                className="
                bg-[#FAF8F6]
                border
                border-[#E8E2DC]
                rounded-3xl
                p-8
            "
            >

                <p className="text-gray-500 text-lg">

                    Total Invoice Amount

                </p>

                <h1
                    className="
                    text-5xl
                    font-bold
                    text-[#A0522D]
                    mt-3
                "
                >

                    ₹ {totalAmount.toFixed(2)}

                </h1>

            </div>

            <div
                className="
                bg-[#FAF8F6]
                border
                border-[#E8E2DC]
                rounded-3xl
                p-8
            "
            >

                <p className="text-gray-500 text-lg">

                    Balance Amount

                </p>

                <h1
                    className={`
                    text-5xl
                    font-bold
                    mt-3
                    ${
                        difference > 0
                            ? "text-red-600"
                            : "text-green-600"
                    }
                `}
                >

                    ₹ {difference.toFixed(2)}

                </h1>

            </div>

        </div>

        {/* BUTTONS */}

        <div
            className="
            flex
            flex-wrap
            gap-5
            mt-10
        "
        >

            <button

                onClick={saveSale}

                className="
                bg-green-600
                hover:bg-green-700
                text-white
                px-10
                py-4
                rounded-2xl
                text-lg
                font-semibold
                transition-all
            "

            >

                Save Sale

            </button>

            <button

                onClick={() => {

                    setSale({

                        saleDate: "",

                        customerName: "",

                        customerPhone: "",

                        paymentStatus: "PAID",

                        amountReceived: ""

                    });

                    setItems([

                        {

                            skuId: "",

                            skuName: "",

                            category: "",

                            unit: "",

                            quantity: "",

                            rate: "",

                            gst: "0",

                            amount: 0

                        }

                    ]);

                }}

                className="
                bg-red-500
                hover:bg-red-600
                text-white
                px-10
                py-4
                rounded-2xl
                text-lg
                font-semibold
                transition-all
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

export default Sales;