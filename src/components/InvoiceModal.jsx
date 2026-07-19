import { useEffect, useState } from "react";
import api from "../api";
import InvoicePrint from "./InvoicePrint";
import QRCode from "react-qr-code";
import { numberToIndianWords } from "../utils/numberToIndianWords";

function InvoiceModal({ invoiceId, onClose }) {
    const user = JSON.parse(localStorage.getItem("user"));

    const [loading, setLoading] = useState(true);

    const [printMode, setPrintMode] = useState(false);

    const [sameAsBilling, setSameAsBilling] = useState(true);

    const [company, setCompany] = useState({});

    const [invoice, setInvoice] = useState({});

    const [items, setItems] = useState([]);

    /*
    =====================================
    LOAD DATA
    =====================================
    */

    useEffect(() => {

        loadCompany();

        loadInvoice();

    }, [invoiceId]);

    useEffect(() => {

    if (sameAsBilling) {

        setInvoice(prev => ({

            ...prev,

            shippingAddress: prev.customerAddress || ""

        }));

    }

}, [invoice.customerAddress, sameAsBilling]);

   const loadCompany = async () => {

    try {

        const response = api.get(
            `/company-profile/${user.id}`
        );

        console.log("Company Profile:", response.data);

        setCompany(response.data);

    } catch (error) {

        console.error(error);

    }

};

    const loadInvoice = async () => {

        try {

            const response = api.get(
                `/invoice/${invoiceId}`
            );

            const data = response.data;

            setInvoice(data.invoice);

            setItems(data.items || []);

            setLoading(false);

        } catch (err) {

            console.log(err);

            alert("Unable to load invoice.");

        }

    };

    /*
    =====================================
    BILLING -> SHIPPING
    =====================================
    */


    /*
    =====================================
    FORM HANDLERS
    =====================================
    */

    const handleInvoiceChange = (e) => {

        const { name, value } = e.target;

        setInvoice(prev => ({

            ...prev,

            [name]: value

        }));

    };


    /*
    =====================================
    SAVE
    =====================================
    */

    const saveInvoice = async () => {

        try {

            const payload = {

                invoice,

                items

            };

            api.post(

                "/invoice",

                payload

            );

            alert("Invoice Saved Successfully");

        }

        catch (err) {

            console.log(err);

            alert("Failed to save invoice");

        }

    };

    /*
    =====================================
    PRINT
    =====================================
    */

    const printInvoice = () => {

        setPrintMode(true);

    };

    if (loading) {

        return (

            <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[9999]">

                <div className="bg-white rounded-2xl px-8 py-6">

                    Loading Invoice...

                </div>

            </div>

        );

    }

    /*
    =====================================
    PRINT MODE
    =====================================
    */

    if (printMode) {

        return (

            <InvoicePrint

    company={company}

    invoice={invoice}

    items={items}

    onClose={onClose}

/>

        );

    }

    const totalTaxable = items.reduce(

    (sum, item) =>

        sum + Number(item.taxableValue || 0),

    0

);

const totalGST = items.reduce(

    (sum, item) =>

        sum + Number(item.gstAmount || 0),

    0

);

const grandTotal = items.reduce(

    (sum, item) =>

        sum + Number(item.totalAmount || 0),

    0

);

const cgst = totalGST / 2;

const sgst = totalGST / 2;

const upiLink =
    company.upiId
        ? `upi://pay?pa=${company.upiId}&pn=${encodeURIComponent(company.companyName || "")}&am=${grandTotal + Number(invoice.roundOff || 0)}`
        : "";

const handleItemChange = (index, field, value) => {

    const updatedItems = [...items];

    updatedItems[index][field] = value;

    // Recalculate only when GST changes
    if (field === "gstRate") {

        const taxable =
            Number(updatedItems[index].taxableValue || 0);

        const gstRate =
            Number(updatedItems[index].gstRate || 0);

        updatedItems[index].gstAmount =
            taxable * gstRate / 100;

        updatedItems[index].totalAmount =
            taxable + updatedItems[index].gstAmount;
    }

    setItems(updatedItems);

};

    /*
    =====================================
    FORM UI STARTS HERE
    =====================================
    */

    return (

        <div
            className="
            fixed
            inset-0
            bg-black/50
            backdrop-blur-sm
            z-[9999]
            flex
            justify-center
            items-center
            p-6
            "
        >

            <div
                className="
                bg-white
                w-[1180px]
                h-[92vh]
                rounded-[24px]
                shadow-2xl
                overflow-hidden
                flex
                flex-col
                "
            >

                {/* HEADER */}

                <div
                    className="
                    bg-gradient-to-r
                    from-[#E7DDD5]
                    to-[#D9C8BB]
                    px-8
                    py-5
                    flex
                    justify-between
                    items-center
                    border-b
                    "
                >

                    <div>

                        <h2 className="text-3xl font-bold text-[#6A4A32]">

                            Tax Invoice

                        </h2>

                        <p className="text-sm text-gray-600 mt-1">

                            Complete the details below and print a GST invoice.

                        </p>

                    </div>

                    <button

                        onClick={onClose}

                        className="
                        bg-red-500
                        text-white
                        w-10
                        h-10
                        rounded-full
                        hover:bg-red-600
                        "

                    >

                        ✕

                    </button>

                </div>

                {/* FORM CONTENT STARTS IN PART 2 */}

                <div
                    className="
                    flex-1
                    overflow-y-auto
                    bg-[#F8F6F3]
                    p-8
                    "
                >
                                    {/* COMPANY DETAILS */}

                <div className="bg-white rounded-2xl border border-[#E5DDD6] shadow-sm p-6 mb-6">

                    <h3 className="text-xl font-bold text-[#6A4A32] mb-6">

                        Company Details

                    </h3>

                    <div className="grid grid-cols-[130px_1fr] gap-6">

                        <div className="flex justify-center">

                            {

                                company.logoPath && (

                                    <img

                                        src={`/${company.logoPath}`}

                                        alt="Logo"

                                        className="w-28 h-28 object-contain border rounded-xl"

                                    />

                                )

                            }

                        </div>

                        <div>

                            <h2 className="text-3xl font-bold text-[#6A4A32]">

                                {company.companyName}

                            </h2>

                            <p className="mt-2 text-gray-600">

                                {company.address}, {company.city}, {company.district}

                            </p>

                            <p className="text-gray-600">

                                {company.state} - {company.pincode}

                            </p>

                            <div className="grid grid-cols-2 gap-6 mt-5">

                                <div>

                                    <p><strong>Phone :</strong> {company.phone}</p>

                                    <p><strong>Email :</strong> {company.email}</p>

                                </div>

                                <div>

                                    <p><strong>GSTIN :</strong> {company.gstNumber}</p>

                                    <p><strong>State :</strong> {company.state}</p>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

                {/* BILL TO + INVOICE DETAILS */}

                <div className="grid grid-cols-2 gap-6 mb-6">

                    {/* BILL TO */}

                    <div className="bg-white rounded-2xl border border-[#E5DDD6] shadow-sm p-6">

                        <h3 className="text-lg font-bold text-[#6A4A32] mb-5">

                            Bill To

                        </h3>

                        <div className="space-y-4">

                            <div>

                                <label className="font-medium">

                                    Customer Name

                                </label>

                                <input

                                    name="customerName"

                                    value={invoice.customerName || ""}

                                    onChange={handleInvoiceChange}

                                    className="w-full mt-2 border rounded-xl p-3"

                                />

                            </div>

                            <div>

                                <label className="font-medium">

                                    Customer Phone

                                </label>

                                <input

                                    name="customerPhone"

                                    value={invoice.customerPhone || ""}

                                    onChange={handleInvoiceChange}

                                    className="w-full mt-2 border rounded-xl p-3"

                                />

                            </div>

                            <div>

                                <label className="font-medium">

                                    Customer GST Number

                                </label>

                                <input

                                    name="customerGstNumber"

                                    value={invoice.customerGstNumber || ""}

                                    onChange={handleInvoiceChange}

                                    className="w-full mt-2 border rounded-xl p-3"

                                />

                            </div>

                            <div>

                                <label className="font-medium">

                                    Billing Address

                                </label>

                                <textarea

                                    rows={4}

                                    name="customerAddress"

                                    value={invoice.customerAddress || ""}

                                    onChange={handleInvoiceChange}

                                    className="w-full mt-2 border rounded-xl p-3"

                                />

                            </div>

                        </div>

                    </div>

                    {/* INVOICE DETAILS */}

                    <div className="bg-white rounded-2xl border border-[#E5DDD6] shadow-sm p-6">

                        <h3 className="text-lg font-bold text-[#6A4A32] mb-5">

                            Invoice Details

                        </h3>

                        <div className="space-y-4">

                            <div>

                                <label>Invoice Number</label>

                                <input

                                    readOnly

                                    value={invoice.invoiceNumber || ""}

                                    className="w-full mt-2 border rounded-xl p-3 bg-gray-100"

                                />

                            </div>

                            <div>

                                <label>Invoice Date</label>

                                <input

                                    type="date"

                                    name="invoiceDate"

                                    value={invoice.invoiceDate || ""}

                                    onChange={handleInvoiceChange}

                                    className="w-full mt-2 border rounded-xl p-3"

                                />

                            </div>

                            <div>

                                <label>Place of Supply</label>

                                <input

                                    name="placeOfSupply"

                                    value={invoice.placeOfSupply || ""}

                                    onChange={handleInvoiceChange}

                                    className="w-full mt-2 border rounded-xl p-3"

                                />

                            </div>

                        </div>

                    </div>

                </div>

                {/* SHIPPING + TRANSPORT */}

                <div className="grid grid-cols-2 gap-6 mb-6">

                    <div className="bg-white rounded-2xl border border-[#E5DDD6] shadow-sm p-6">

                        <div className="flex justify-between items-center mb-5">

                            <h3 className="text-lg font-bold text-[#6A4A32]">

                                Shipping Address

                            </h3>

                            <label className="flex items-center gap-2 text-sm">

                                <input
    type="checkbox"
    checked={sameAsBilling}
    onChange={(e) => {

        const checked = e.target.checked;

        setSameAsBilling(checked);

        if (checked) {

            setInvoice(prev => ({
                ...prev,
                shippingAddress: prev.customerAddress || ""
            }));

        } else {

            setInvoice(prev => ({
                ...prev,
                shippingAddress: ""
            }));

        }

    }}
/>

                                Same as Billing

                            </label>

                        </div>

                        <textarea

                            rows={6}

                            name="shippingAddress"

                            disabled={sameAsBilling}

                            value={invoice.shippingAddress || ""}

                            onChange={handleInvoiceChange}

                            className={`

                                w-full

                                border

                                rounded-xl

                                p-3

                                ${sameAsBilling ? "bg-gray-100" : ""}

                            `}

                        />

                    </div>

                    <div className="bg-white rounded-2xl border border-[#E5DDD6] shadow-sm p-6">

                        <h3 className="text-lg font-bold text-[#6A4A32] mb-5">

                            Transport Details

                            <span className="text-gray-500 text-sm font-normal ml-2">

                                (Optional)

                            </span>

                        </h3>

                        <div className="space-y-4">

                            <div>

                                <label>Transport Name</label>

                                <input

                                    name="transportName"

                                    value={invoice.transportName || ""}

                                    onChange={handleInvoiceChange}

                                    className="w-full mt-2 border rounded-xl p-3"

                                />

                            </div>

                            <div>

                                <label>Vehicle Number</label>

                                <input

                                    name="vehicleNumber"

                                    value={invoice.vehicleNumber || ""}

                                    onChange={handleInvoiceChange}

                                    className="w-full mt-2 border rounded-xl p-3"

                                />

                            </div>

                        </div>

                    </div>

                </div>

                                {/* SALE DETAILS */}

                <div className="bg-white rounded-2xl border border-[#E5DDD6] shadow-sm p-6 mb-6">

                    <h3 className="text-xl font-bold text-[#6A4A32] mb-6">

                        Sale Details

                    </h3>

                    <div className="overflow-x-auto">

                        <table className="w-full border border-gray-200">

                            <thead>

                                <tr className="bg-[#A0522D] text-white">

                                    <th className="p-3 border">Item Name</th>

                                    <th className="p-3 border">HSN / SAC</th>

                                    <th className="p-3 border">Qty</th>

                                    <th className="p-3 border">Unit</th>

                                    <th className="p-3 border">Price / Unit</th>

                                    <th className="p-3 border">GST %</th>

                                    <th className="p-3 border">Taxable</th>

                                    <th className="p-3 border">GST Amt</th>

                                    <th className="p-3 border">Amount</th>

                                </tr>

                            </thead>

                            <tbody>

{

items.map((item,index)=>(

<tr

key={index}

className="text-center"

>

<td className="border p-2">

{item.productName}

</td>

<td className="border p-2">

    <input
        type="text"
        value={item.hsnCode || ""}
        onChange={(e) =>
            handleItemChange(index, "hsnCode", e.target.value)
        }
        placeholder="Enter HSN"
        className="
            w-full
            border
            rounded-lg
            px-2
            py-1
            text-center
        "
    />

</td>

<td className="border p-2">

{item.quantity}

</td>

<td className="border p-2">

{item.unit}

</td>

<td className="border p-2">

₹ {Number(item.rate).toLocaleString()}

</td>

<td className="border p-2">

    <select
        value={item.gstRate || 0}
        onChange={(e) => handleItemChange(index, "gstRate", Number(e.target.value))}
        className="border rounded-lg px-2 py-1 w-full"
    >
        <option value={0}>0%</option>
        <option value={5}>5%</option>
        <option value={12}>12%</option>
        <option value={18}>18%</option>
        <option value={28}>28%</option>
    </select>

</td>

<td className="border p-2">

₹ {Number(item.taxableValue || 0).toLocaleString()}

</td>

<td className="border p-2">

₹ {Number(item.gstAmount || 0).toLocaleString()}

</td>

<td className="border p-2 font-semibold">

₹ {Number(item.totalAmount).toLocaleString()}

</td>

</tr>

))

}

</tbody>

                        </table>

                    </div>

                    <div className="mt-4 text-sm text-gray-500">

                        All invoice items are generated automatically from the Sale.
HSN and GST values are preserved for every invoice item.

                    </div>

                </div>

                                {/* SUMMARY SECTION */}

                <div className="grid grid-cols-2 gap-6 mb-6">

                    {/* TAX SUMMARY */}

                    <div className="space-y-4">

    <div className="flex justify-between">

        <span>Total Items</span>

        <strong>{items.length}</strong>

    </div>

    <div className="flex justify-between">

        <span>Taxable Amount</span>

        <strong>

            ₹ {totalTaxable.toFixed(2)}

        </strong>

    </div>

    <div className="flex justify-between">

        <span>CGST</span>

        <strong>

            ₹ {cgst.toFixed(2)}

        </strong>

    </div>

    <div className="flex justify-between">

        <span>SGST</span>

        <strong>

            ₹ {sgst.toFixed(2)}

        </strong>

    </div>

    <hr />

    <div className="flex justify-between text-lg">

        <span>Total GST</span>

        <strong>

            ₹ {totalGST.toFixed(2)}

        </strong>

    </div>

</div>

                    {/* TOTAL SUMMARY */}

                    <div className="bg-white rounded-2xl border border-[#E5DDD6] shadow-sm p-6">

                        <h3 className="text-xl font-bold text-[#6A4A32] mb-5">

                            Invoice Summary

                        </h3>

                        <div className="space-y-4">

                            <div className="flex justify-between items-center">

                                <span>Sub Total</span>

                                <strong>

                                    ₹ {totalTaxable.toFixed(2)}

                                </strong>

                            </div>

                            <div className="flex justify-between items-center">

                                <span>GST Amount</span>

                                <strong>

                                    ₹ {totalGST.toFixed(2)}

                                </strong>

                            </div>

                            <div className="flex justify-between items-center">

                                <span>Round Off</span>

                                <input

                                    type="number"

                                    step="0.01"

                                    name="roundOff"

                                    value={invoice.roundOff || 0}

                                    onChange={handleInvoiceChange}

                                    className="w-28 border rounded-lg p-2 text-right"

                                />

                            </div>

                            <hr />

                            <div className="flex justify-between text-2xl font-bold text-[#A0522D]">

                                <span>Grand Total</span>

                                <span>

                                    ₹ {(grandTotal + Number(invoice.roundOff || 0) || 0).toFixed(2)}

                                </span>

                            </div>

                        </div>

                    </div>

                </div>

                {/* AMOUNT IN WORDS */}

                <div className="bg-white rounded-2xl border border-[#E5DDD6] shadow-sm p-6 mb-6">

                    <h3 className="text-lg font-bold text-[#6A4A32] mb-3">

                        Amount in Words

                    </h3>

                    <textarea

                        rows={2}

                        readOnly

                        value={numberToIndianWords(
    grandTotal + Number(invoice.roundOff || 0)
)}

                        className="w-full border rounded-xl bg-gray-100 p-3"

                    />

                </div>

                {/* THANK YOU */}

                <div className="bg-gradient-to-r from-[#F8EFE8] to-[#FFF9F4] rounded-2xl border border-[#E5DDD6] shadow-sm p-6 mb-6 text-center">

                    <h3 className="text-2xl font-bold text-[#6A4A32]">

                        Thank You!

                    </h3>

                    <p className="text-gray-600 mt-2">

                        Thank you for choosing our Rice Mill. We appreciate your business and look forward to serving you again.

                    </p>

                </div>

                {/* BANK DETAILS */}

                <div className="grid grid-cols-3 gap-6 mb-8">

                    {/* BANK */}

                    <div className="bg-white rounded-2xl border border-[#E5DDD6] shadow-sm p-6">

                        <h3 className="text-lg font-bold text-[#6A4A32] mb-4">

                            Bank Details

                        </h3>

                        <div className="space-y-2 text-sm">

                            <p><strong>Bank :</strong> {company.bankName}</p>

                            <p><strong>Account :</strong> {company.accountNumber}</p>

                            <p><strong>IFSC :</strong> {company.ifsc}</p>

                            <p><strong>Branch :</strong> {company.branch}</p>

                            <p><strong>UPI :</strong> {company.upiId}</p>

                        </div>

                    </div>

                    {/* QR */}
                    

                    <div className="bg-white rounded-2xl border border-[#E5DDD6] shadow-sm p-6 flex flex-col justify-center items-center">

                        <h3 className="text-lg font-bold text-[#6A4A32] mb-4">

                            Scan & Pay

                        </h3>

                        <div className="w-36 h-36 border-2 border-dashed rounded-xl flex items-center justify-center text-gray-400">

                            {
    company.upiId ? (

        <QRCode
            value={upiLink}
            size={130}
        />

    ) : (

        <div className="text-center text-gray-400 text-sm">
            No UPI ID Available
        </div>

    )
}

                        </div>

                        <p className="text-xs mt-3 text-center text-gray-500">

                            QR will be generated from Company UPI ID.

                        </p>

                    </div>

                    {/* SIGNATURE */}

                    <div className="bg-white rounded-2xl border border-[#E5DDD6] shadow-sm p-6 flex flex-col justify-between">

                        <div>

                            <h3 className="text-lg font-bold text-[#6A4A32] mb-5">

                                Authorized Signatory

                            </h3>

                        </div>

                        <div className="text-center">

                            {

                                company.signaturePath && (

                                    <img

                                        src={`/${company.signaturePath}`}

                                        alt="Signature"

                                        className="h-20 mx-auto object-contain"

                                    />

                                )

                            }

                            <p className="mt-3 text-sm text-gray-600">

                                {company.companyName}

                            </p>

                        </div>

                    </div>

                </div>

                {/* ACTION BUTTONS */}

                <div className="sticky bottom-0 bg-[#F8F6F3] border-t pt-5 flex justify-end gap-4">

                    <button

                        onClick={saveInvoice}

                        className="px-8 py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold"

                    >

                        Save

                    </button>

                    <button

                        onClick={printInvoice}

                        className="px-8 py-3 rounded-xl bg-[#A0522D] hover:bg-[#8B4513] text-white font-semibold"

                    >

                        Print Invoice

                    </button>

                    <button

                        onClick={onClose}

                        className="px-8 py-3 rounded-xl bg-gray-500 hover:bg-gray-600 text-white font-semibold"

                    >

                        Close

                    </button>

                        </div>
                </div>

            </div>

        </div>

    );

}

export default InvoiceModal;