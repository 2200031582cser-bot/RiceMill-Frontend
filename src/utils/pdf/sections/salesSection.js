import {

    drawHeader,

    drawFooter,

    money,

    qty,

    percent

} from "../pdfHelpers";
import { ensurePageSpace } from "../pdfPageHelper";

import {

    COLORS

} from "../pdfTheme";

import {

    drawKPIGrid

} from "../components/KPIGrid";

import {

    drawMetricGrid

} from "../components/MetricGrid";

import {

    drawSectionDivider

} from "../components/SectionDivider";

import {

    drawInsightBox

} from "../components/InsightBox";

import {

    drawReportTable

} from "../components/ReportTable";

export const drawSalesSection = (

    doc,

    report

) => {

    const {

        summary,

        data

    } = report;

    let y = 30;

    drawHeader(

        doc,

        "Sales Report",

        "Revenue & Customer Analysis"

    );



    /* ==========================================================

       KPI DASHBOARD

    ========================================================== */

    y = drawKPIGrid(

        doc,

        [

            {

                icon:"",

                title:"Revenue",

                value:money(

                    summary.sales.totalRevenue

                ),

                status:"Generated",

                color:COLORS.success

            },

            {

                icon:"",

                title:"Received",

                value:money(

                    summary.sales.received

                ),

                status:"Collected",

                color:COLORS.info

            },

            {

                icon:"",

                title:"Outstanding",

                value:money(

                    summary.sales.outstanding

                ),

                status:"Pending",

                color:COLORS.danger

            },

            {

                icon:"",

                title:"Customers",

                value:String(

                    summary.sales.totalCustomers

                ),

                status:"Active",

                color:COLORS.primary

            }

        ],

        y

    );



    /* ==========================================================

       SALES SUMMARY

    ========================================================== */



y=ensurePageSpace(

doc,

y,

45,

"Sales Report",

"Revenue & Customer Analysis"

);

   y += 10;

drawSectionDivider(

        doc,

        "SALES SUMMARY",

        y

    );




    y=ensurePageSpace(

doc,

y,

70,

"Sales Report",

"Revenue & Customer Analysis"

);
    y += 10;

y = drawMetricGrid(

        doc,

        [

            {

                icon:"",

                title:"Total Sales",

                value:String(

                    summary.sales.totalSales

                )

            },

            {

                icon:"",

                title:"Quantity Sold",

                value:

                    qty(

                        summary.sales.totalQuantity

                    ) + " Qtls"

            },

            {

                icon:"",

                title:"Average Sale",

                value:

                    money(

                        summary.sales.averageSale

                    )

            },

            {

                icon:"",

                title:"Recovery",

                value:

                    percent(

                        summary.sales.recoveryPercentage

                    )

            },

            {

                icon:"",

                title:"Best Product",

                value:

                    summary.sales.bestProduct

            },

            {

                icon:"",

                title:"Best Customer",

                value:

                    summary.sales.bestCustomer

            }

        ],

        y,

        2

    );



    /* ==========================================================

       PAYMENT ANALYSIS

    ========================================================== */



y=ensurePageSpace(

doc,

y,

45,

"Sales Report",

"Revenue & Customer Analysis"

);

   y += 10;

drawSectionDivider(

        doc,

        "PAYMENT ANALYSIS",

        y

    );



    y=ensurePageSpace(

doc,

y,

70,

"Sales Report",

"Revenue & Customer Analysis"

);
    y += 10;

y = drawMetricGrid(

        doc,

        [

            {

                icon:"",

                title:"Paid Sales",

                value:String(

                    summary.sales.paidSales

                )

            },

            {

                icon:"",

                title:"Due Sales",

                value:String(

                    summary.sales.dueSales

                )

            },

            {

                icon:"",

                title:"Discount Sales",

                value:String(

                    summary.sales.discountSales

                )

            },

            {

                icon:"",

                title:"Outstanding",

                value:

                    money(

                        summary.sales.outstanding

                    )

            }

        ],

        y,

        2

    );

        /* ==========================================================

       SALES TRANSACTIONS - PAGE 1

    ========================================================== */

    drawFooter(doc);

    doc.addPage();

    drawHeader(

        doc,

        "Sales Transactions",

        "Operational Details"

    );

    y = 30;

    const salesRowsOne =

        data.sales.map(item => [

            item.saleDate,

            item.customerName,

            item.customerPhone,

            item.productName,

            qty(item.quantity),

            money(item.pricePerQuintal)

        ]);

    y = drawReportTable(

        doc,

        "Sales Records",

        [

            "Date",

            "Customer",

            "Phone",

            "Product",

            "Qty",

            "Rate"

        ],

        salesRowsOne,

        y

    );

    drawFooter(doc);



    /* ==========================================================

       SALES TRANSACTIONS - PAGE 2

    ========================================================== */

    doc.addPage();

    drawHeader(

        doc,

        "Sales Transactions",

        "Financial Details"

    );

    y = 30;

    const salesRowsTwo =

        data.sales.map(item => [

            item.customerName,

            money(item.totalAmount),

            money(item.amountReceived),

            money(

                Number(item.totalAmount || 0)

                -

                Number(item.amountReceived || 0)

            ),

            item.paymentStatus

        ]);

    y = drawReportTable(

        doc,

        "Payment Details",

        [

            "Customer",

            "Bill Amount",

            "Received",

            "Pending",

            "Status"

        ],

        salesRowsTwo,

        y

    );

    drawFooter(doc);



    /* ==========================================================

       SALES INSIGHTS

    ========================================================== */

    doc.addPage();

    drawHeader(

        doc,

        "Sales Insights",

        "Revenue Analysis"

    );

    y = 30;

        y=ensurePageSpace(

doc,

y,

120,

"Sales Insights",

"Revenue Analysis"

);

y = drawInsightBox(

        doc,

        "SALES INSIGHTS",

        [

            `Total Revenue Generated : ${money(summary.sales.totalRevenue)}.`,

            `Total Amount Received : ${money(summary.sales.received)}.`,

            `Outstanding Ledger : ${money(summary.sales.outstanding)}.`,

            `Total Customers Served : ${summary.sales.totalCustomers}.`,

            `Total Quantity Sold : ${qty(summary.sales.totalQuantity)} Quintals.`,

            `Average Sale Value : ${money(summary.sales.averageSale)}.`,

            `Best Selling Product : ${summary.sales.bestProduct}.`,

            `Top Customer : ${summary.sales.bestCustomer}.`,

            `Payment Recovery : ${percent(summary.sales.recoveryPercentage)}.`,

            `Fully Paid Sales : ${summary.sales.paidSales}.`,

            `Due Sales : ${summary.sales.dueSales}.`,

            `Discount Sales : ${summary.sales.discountSales}.`,

            summary.sales.recoveryPercentage >= 90

                ? "Customer payment recovery is excellent."

                : summary.sales.recoveryPercentage >= 75

                ? "Customer payment recovery is satisfactory."

                : "Outstanding collections should be improved.",

            summary.sales.outstanding > 0

                ? "Follow up with customers having pending payments."

                : "There are no pending customer payments.",

            "Increasing repeat customers and improving collection efficiency will strengthen cash flow."

        ],

        y

    );

    drawFooter(doc);

};