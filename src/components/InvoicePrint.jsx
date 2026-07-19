import React, { useRef } from "react";
import QRCode from "react-qr-code";
import "../InvoicePrint.css";
import { numberToIndianWords } from "../utils/numberToIndianWords";

function InvoicePrint({

    invoice,
    items,
    company,
    onClose

}) {

    const printRef = useRef(null);

    const totalQty = items.reduce(
    (sum, item) => sum + Number(item.quantity || 0),
    0
);

const totalTaxable = items.reduce(
    (sum, item) => sum + Number(item.taxableValue || 0),
    0
);

const totalGST = items.reduce(
    (sum, item) => sum + Number(item.gstAmount || 0),
    0
);

const grandTotal = items.reduce(
    (sum, item) => sum + Number(item.totalAmount || 0),
    0
);

const cgst = totalGST / 2;
const sgst = totalGST / 2;

    const handlePrint = () => {

        const printContents = printRef.current.innerHTML;
        const originalContents = document.body.innerHTML;

        document.body.innerHTML = printContents;

        window.print();

        document.body.innerHTML = originalContents;

        window.location.reload();

    };

    const handleItemChange = (index, field, value) => {

    const updatedItems = [...items];

    updatedItems[index][field] = value;

    // Recalculate when GST changes
    if (field === "gstRate") {

        const taxable = Number(updatedItems[index].taxableValue || 0);

        const gstRate = Number(updatedItems[index].gstRate || 0);

        updatedItems[index].gstAmount =
            taxable * gstRate / 100;

        updatedItems[index].totalAmount =
            taxable + updatedItems[index].gstAmount;
    }

    setItems(updatedItems);

};

    return (

        <div className="invoice-overlay">

            <div className="invoice-modal">

                {/* TOP BAR */}

                <div className="invoice-toolbar no-print">

                    <h2>GST Tax Invoice</h2>

                    <div>

                        <button
                            className="print-btn"
                            onClick={handlePrint}
                        >
                            🖨 Print
                        </button>

                        <button
                            className="close-btn"
                            onClick={() => onClose && onClose()}
                        >
                            ✕ Close
                        </button>

                    </div>

                </div>

                {/* PRINT AREA */}

                <div
                    ref={printRef}
                    id="invoice-print"
                    className="invoice-paper"
                >

                    {/* HEADER */}

                    <div className="header">

                        {/* LEFT */}

                        <div className="company-section">

                            <div className="logo-box">

                                {

                                    company.logoPath && (

                                        <img

                                            src={`/${company.logoPath}`}

                                            alt="logo"

                                        />

                                    )

                                }

                            </div>

                            <div className="company-details">

                                <h1>

                                    {company.companyName}

                                </h1>

                                <div>

                                    <strong>Phone :</strong>{" "}

                                    {company.phone || "-"}

                                </div>

                                <div>

                                    <strong>Email :</strong>{" "}

                                    {company.email || "-"}

                                </div>

                                <div>

                                    <strong>GSTIN :</strong>{" "}

                                    {company.gstNumber || "-"}

                                </div>

                                <div>

                                    <strong>State :</strong>{" "}

                                    {company.state || "-"}

                                </div>

                            </div>

                        </div>

                        {/* RIGHT */}

                        <div className="invoice-heading">

                            <h2>

                                TAX INVOICE

                            </h2>

                            <table>

                                <tbody>

                                    <tr>

                                        <td>

                                            Invoice No

                                        </td>

                                        <td>

                                            {invoice.invoiceNumber}

                                        </td>

                                    </tr>

                                    <tr>

                                        <td>

                                            Date

                                        </td>

                                        <td>

                                            {invoice.invoiceDate}

                                        </td>

                                    </tr>

                                </tbody>

                            </table>

                        </div>

                    </div>

                    {/* GOLD STRIP */}

                    <div className="header-strip"></div>

                    {/* CUSTOMER DETAILS */}

                                        {/* CUSTOMER + SHIPMENT */}

                    <div className="customer-wrapper">

                        {/* BILL TO */}

                        <div className="customer-box">

                            <div className="section-title">

                                BILL TO

                            </div>

                            <table className="info-table">

                                <tbody>

                                    <tr>

                                        <td>Name</td>

                                        <td className="value">

                                            {invoice.customerName || "-"}

                                        </td>

                                    </tr>

                                    <tr>

                                        <td>Phone</td>

                                        <td className="value">

                                            {invoice.customerPhone || "-"}

                                        </td>

                                    </tr>

                                    <tr>

                                        <td>GSTIN</td>

                                        <td className="value">

                                            {invoice.customerGstNumber || "-"}

                                        </td>

                                    </tr>

                                </tbody>

                            </table>

                        </div>

                        {/* SHIPMENT */}

                        <div className="customer-box">

                            <div className="section-title">

                                SHIPMENT DETAILS

                            </div>

                            <table className="info-table">

                                <tbody>

                                    <tr>

                                        <td>Place of Supply</td>

                                        <td className="value">

                                            {invoice.placeOfSupply || "-"}

                                        </td>

                                    </tr>

                                    <tr>

                                        <td>Transport</td>

                                        <td className="value">

                                            {invoice.transportName || "-"}

                                        </td>

                                    </tr>

                                    <tr>

                                        <td>Vehicle No</td>

                                        <td className="value">

                                            {invoice.vehicleNumber || "-"}

                                        </td>

                                    </tr>

                                </tbody>

                            </table>

                        </div>

                    </div>

                    {/* ITEM TABLE */}

                    <table className="items-table">

                        <thead>

                            <tr>

                                <th style={{ width: "5%" }}>#</th>

                                <th style={{ width: "30%" }}>

                                    Item Name

                                </th>

                                <th style={{ width: "12%" }}>

                                    HSN/SAC

                                </th>

                                <th style={{ width: "10%" }}>

                                    Qty

                                </th>

                                <th style={{ width: "10%" }}>

                                    Unit

                                </th>

                                <th style={{ width: "13%" }}>

                                    Price/Unit (₹)

                                </th>

                                <th style={{ width: "10%" }}>

                                    GST (₹)

                                </th>

                                <th style={{ width: "15%" }}>

                                    Amount (₹)

                                </th>

                            </tr>

                        </thead>

                        <tbody>

{

items.map((item,index)=>(

<tr key={index}>

<td>

{index+1}

</td>

<td>

{item.productName}

</td>

<td>
    {item.hsnCode || "-"}
</td>
<td>

{Number(item.quantity).toFixed(2)}

</td>

<td>

{item.unit}

</td>

<td className="text-right">

₹ {Number(item.rate).toLocaleString(
"en-IN",
{
minimumFractionDigits:2,
maximumFractionDigits:2
}
)}

</td>

<td className="text-right">

₹ {Number(item.gstAmount).toLocaleString(
"en-IN",
{
minimumFractionDigits:2,
maximumFractionDigits:2
}
)}

</td>

<td className="text-right fw-bold">

₹ {Number(item.totalAmount).toLocaleString(
"en-IN",
{
minimumFractionDigits:2,
maximumFractionDigits:2
}
)}

</td>

</tr>

))

}

<tr className="total-row">

<td colSpan={3} className="text-right">

TOTAL

</td>

<td>

{totalQty.toFixed(2)}

</td>

<td></td>

<td className="text-right fw-bold">
    ₹ {totalTaxable.toLocaleString("en-IN", {
        minimumFractionDigits: 2
    })}
</td>

<td className="text-right">

₹ {totalGST.toLocaleString(
"en-IN",
{
minimumFractionDigits:2
}
)}

</td>

<td className="text-right fw-bold">

₹ {grandTotal.toLocaleString(
"en-IN",
{
minimumFractionDigits:2
}
)}

</td>

</tr>

</tbody>

                    </table>

                    {/* TAX SUMMARY + INVOICE SUMMARY */}

                                        <div className="summary-wrapper">

                        {/* TAX SUMMARY */}

                        <div className="tax-summary">

                            <div className="section-title">

                                TAX SUMMARY

                            </div>

                            <table className="summary-table">

                                <thead>

                                    <tr>

                                        <th>HSN</th>

                                        <th>Taxable (₹)</th>

                                        <th>CGST (₹)</th>

                                        <th>SGST (₹)</th>

                                        <th>Total Tax (₹)</th>

                                    </tr>

                                </thead>

                                <tbody>

{items.map((item,index)=>(

<tr key={index}>

<td>

{item.hsnCode || "-"}

</td>

<td className="text-right">

₹ {Number(item.taxableValue).toLocaleString(
"en-IN",
{
minimumFractionDigits:2
}
)}

</td>

<td className="text-right">

₹ {(Number(item.gstAmount)/2).toLocaleString(
"en-IN",
{
minimumFractionDigits:2
}
)}

</td>

<td className="text-right">

₹ {(Number(item.gstAmount)/2).toLocaleString(
"en-IN",
{
minimumFractionDigits:2
}
)}

</td>

<td className="text-right">

₹ {Number(item.gstAmount).toLocaleString(
"en-IN",
{
minimumFractionDigits:2
}
)}

</td>

</tr>

))}

<tr className="fw-bold">

<td>TOTAL</td>

<td className="text-right">

₹ {totalTaxable.toLocaleString("en-IN")}

</td>

<td className="text-right">

₹ {cgst.toLocaleString("en-IN")}

</td>

<td className="text-right">

₹ {sgst.toLocaleString("en-IN")}

</td>

<td className="text-right">

₹ {totalGST.toLocaleString("en-IN")}

</td>

</tr>

</tbody>

                            </table>

                        </div>

                        {/* INVOICE SUMMARY */}

                        <div className="invoice-summary">

                            <table>

                                <tbody>

                                    <tr>

                                        <td>

                                            Sub Total

                                        </td>

                                        <td>

                                            ₹{" "}

                                            {Number(totalTaxable).toLocaleString(

                                                "en-IN",

                                                {

                                                    minimumFractionDigits: 2

                                                }

                                            )}

                                        </td>

                                    </tr>

                                    <tr>

                                        <td>

                                            Total GST

                                        </td>

                                        <td>

                                            ₹{" "}

                                            {Number(totalGST).toLocaleString(

                                                "en-IN",

                                                {

                                                    minimumFractionDigits: 2

                                                }

                                            )}

                                        </td>

                                    </tr>

                                    <tr>

                                        <td>

                                            Round Off

                                        </td>

                                        <td>

                                            ₹{" "}

                                            {Number(invoice.roundOff || 0).toLocaleString(

                                                "en-IN",

                                                {

                                                    minimumFractionDigits: 2

                                                }

                                            )}

                                        </td>

                                    </tr>

                                </tbody>

                            </table>

                            <div className="grand-total-box">

                                <span>

                                    GRAND TOTAL

                                </span>

                                <span>

                                    ₹{" "}

                                    {Number(
    grandTotal +
    Number(invoice.roundOff || 0)
).toLocaleString(

                                        "en-IN",

                                        {

                                            minimumFractionDigits: 2

                                        }

                                    )}

                                </span>

                            </div>

                        </div>

                    </div>

                    {/* AMOUNT IN WORDS */}

                    <div className="amount-words">

                        <strong>

                            Invoice Amount in Words :

                        </strong>

                        <span>
{
    invoice.amountInWords?.trim()
        ? invoice.amountInWords
        : numberToIndianWords(
    grandTotal +
    Number(invoice.roundOff || 0)
)
}
</span>

                    </div>

                    {/* BANK + SIGNATURE */}

                                        <div className="bottom-wrapper">

                        {/* BANK DETAILS */}

                        <div className="bank-box">

                            <div className="section-title">

                                BANK DETAILS

                            </div>

                            <div className="bank-content">

                                {/* QR */}

                                <div className="qr-section">

                                    {

                                        company.upiId ? (

                                            <QRCode

                                                value={`upi://pay?pa=${company.upiId}&pn=${encodeURIComponent(company.companyName || "")}&am=${grandTotal + Number(invoice.roundOff || 0)}&cu=INR&tn=${invoice.invoiceNumber}`}

                                                size={75}

                                                bgColor="#FFFFFF"

                                                fgColor="#000000"

                                            />

                                        ) : (

                                            <div className="qr-placeholder">

                                                QR

                                            </div>

                                        )

                                    }

                                </div>

                                {/* BANK INFO */}

                                <div className="bank-info">

                                    <table>

                                        <tbody>

                                            <tr>

                                                <td>Bank</td>

                                                <td>{company.bankName || "-"}</td>

                                            </tr>

                                            <tr>

                                                <td>A/C No</td>

                                                <td>{company.accountNumber || "-"}</td>

                                            </tr>

                                            <tr>

                                                <td>IFSC</td>

                                                <td>{company.ifsc || "-"}</td>

                                            </tr>

                                            <tr>

                                                <td>Branch</td>

                                                <td>{company.branch || "-"}</td>

                                            </tr>

                                            <tr>

                                                <td>UPI</td>

                                                <td>{company.upiId || "-"}</td>

                                            </tr>

                                        </tbody>

                                    </table>

                                </div>

                            </div>

                        </div>

                        {/* SIGNATURE */}

                        <div className="signature-box">

                            <div className="section-title">

                                FOR {company.companyName?.toUpperCase()}

                            </div>

                            <div className="signature-content">

                                <div className="signature-image">

                                    {

                                        company.signaturePath && (

                                            <img

                                                src={`/${company.signaturePath}`}

                                                alt="Signature"

                                            />

                                        )

                                    }

                                </div>

                                <div className="seal-image">

                                    {

                                        company.sealPath && (

                                            <img

                                                src={`/${company.sealPath}`}

                                                alt="Seal"

                                            />

                                        )

                                    }

                                </div>

                                <div className="signature-line">

                                    Authorized Signatory

                                </div>

                            </div>

                        </div>

                    </div>

                    {/* TERMS */}

                    <div className="terms-box">

                        <div className="section-title">

                            TERMS & CONDITIONS

                        </div>

                        <div className="terms-content">

                            Thanks for doing business with us.

                        </div>

                    </div>

                    {/* FOOTER */}

                    <div className="invoice-footer">

                        This is a computer generated GST Invoice.

                    </div>

                </div>

            </div>

        </div>

    );

}

export default InvoicePrint;