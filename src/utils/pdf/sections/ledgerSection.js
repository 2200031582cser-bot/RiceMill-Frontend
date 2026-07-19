import {

    drawHeader,

    drawFooter,

    money,

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

export const drawLedgerSection = (

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

        "Customer Ledger Report",

        "Outstanding & Collection Analysis"

    );



    /* ==========================================================

       KPI DASHBOARD

    ========================================================== */

    y = drawKPIGrid(

        doc,

        [

            {

                icon:"",

                title:"Total Billing",

                value:

                    money(

                        summary.ledger.totalBill

                    ),

                status:"Generated",

                color:COLORS.primary

            },

            {

                icon:"",

                title:"Received",

                value:

                    money(

                        summary.ledger.totalReceived

                    ),

                status:"Collected",

                color:COLORS.success

            },

            {

                icon:"",

                title:"Outstanding",

                value:

                    money(

                        summary.ledger.totalDue

                    ),

                status:"Pending",

                color:COLORS.danger

            },

            {

                icon:"",

                title:"Recovery",

                value:

                    percent(

                        summary.ledger.recovery

                    ),

                status:"Collection",

                color:COLORS.info

            }

        ],

        y

    );



    /* ==========================================================

       CUSTOMER SUMMARY

    ========================================================== */



y=ensurePageSpace(

doc,

y,

45,

"Customer Ledger Report",
"Outstanding & Collection Analysis"

);
    y += 10;
drawSectionDivider(

        doc,

        "CUSTOMER SUMMARY",

        y

    );






    y=ensurePageSpace(

doc,

y,

70,

"Customer Ledger Report",
"Outstanding & Collection Analysis"

);

    y += 10;
y = drawMetricGrid(

        doc,

        [

            {

                icon:"",

                title:"Ledger Records",

                value:

                    String(

                        summary.ledger.records

                    )

            },

            {

                icon:"",

                title:"Pending Customers",

                value:

                    String(

                        summary.ledger.pendingCustomers

                    )

            },

            {

                icon:"",

                title:"Cleared Customers",

                value:

                    String(

                        summary.ledger.clearedCustomers

                    )

            },

            {

                icon:"",

                title:"Recovery",

                value:

                    percent(

                        summary.ledger.recovery

                    )

            }

        ],

        y,

        2

    );



    /* ==========================================================

       COLLECTION OVERVIEW

    ========================================================== */


y=ensurePageSpace(

doc,

y,

45,

"Customer Ledger Report",
"Outstanding & Collection Analysis"
);

    y += 10;
drawSectionDivider(

        doc,

        "COLLECTION OVERVIEW",

        y

    );







    y=ensurePageSpace(

doc,

y,

70,

"Customer Ledger Report",
"Outstanding & Collection Analysis"

);
    y += 10;
y = drawMetricGrid(

        doc,

        [

            {

                icon:"",

                title:"Total Billing",

                value:

                    money(

                        summary.ledger.totalBill

                    )

            },

            {

                icon:"",

                title:"Collected",

                value:

                    money(

                        summary.ledger.totalReceived

                    )

            },

            {

                icon:"",

                title:"Outstanding",

                value:

                    money(

                        summary.ledger.totalDue

                    )

            },

            {

                icon:"",

                title:"Collection Rate",

                value:

                    percent(

                        summary.ledger.recovery

                    )

            }

        ],

        y,

        2

    );

        /* ==========================================================

       CUSTOMER LEDGER REGISTER

    ========================================================== */

    drawFooter(doc);

    doc.addPage();

    drawHeader(

        doc,

        "Customer Ledger Register",

        "Customer Outstanding Details"

    );

    y = 30;

    const ledgerRows =

        (data.ledger || []).map(item => [

            item.customerName,

            item.phoneNumber,

            money(item.billAmount),

            money(item.amountReceived),

            money(item.dueAmount),

            item.status

        ]);

    y = drawReportTable(

        doc,

        "Customer Ledger",

        [

            "Customer",

            "Phone",

            "Bill Amount",

            "Received",

            "Due",

            "Status"

        ],

        ledgerRows,

        y

    );

    drawFooter(doc);



    /* ==========================================================

       COLLECTION STATISTICS

    ========================================================== */

    doc.addPage();

    drawHeader(

        doc,

        "Collection Statistics",

        "Ledger Performance Analysis"

    );

    y = 30;

    const statisticsRows = [

        [

            "Total Ledger Records",

            String(summary.ledger.records)

        ],

        [

            "Total Billing",

            money(summary.ledger.totalBill)

        ],

        [

            "Amount Collected",

            money(summary.ledger.totalReceived)

        ],

        [

            "Outstanding Amount",

            money(summary.ledger.totalDue)

        ],

        [

            "Collection Efficiency",

            percent(summary.ledger.recovery)

        ],

        [

            "Pending Customers",

            String(summary.ledger.pendingCustomers)

        ],

        [

            "Cleared Customers",

            String(summary.ledger.clearedCustomers)

        ]

    ];

    y = drawReportTable(

        doc,

        "Collection Summary",

        [

            "Metric",

            "Value"

        ],

        statisticsRows,

        y

    );



   y += 12;

y=ensurePageSpace(

doc,

y,

45,

"Customer Ledger Report",
"Outstanding & Collection Analysis"

);

drawSectionDivider(

        doc,

        "LEDGER OVERVIEW",

        y

    );






    y=ensurePageSpace(

doc,

y,

70,

"Customer Ledger Report",
"Outstanding & Collection Analysis"

);

    y += 10;

y = drawMetricGrid(
        doc,

        [

            {

                icon:"",

                title:"Records",

                value:String(

                    summary.ledger.records

                )

            },

            {

                icon:"",

                title:"Outstanding",

                value:money(

                    summary.ledger.totalDue

                )

            },

            {

                icon:"",

                title:"Collected",

                value:money(

                    summary.ledger.totalReceived

                )

            },

            {

                icon:"",

                title:"Recovery",

                value:percent(

                    summary.ledger.recovery

                )

            }

        ],

        y,

        2

    );



    drawFooter(doc);



    /* ==========================================================

       LEDGER INSIGHTS

    ========================================================== */

    doc.addPage();

    drawHeader(

        doc,

        "Ledger Insights",

        "Receivables & Collection Performance"

    );

    y = 30;

        y=ensurePageSpace(

doc,

y,

120,

"Customer Ledger Report",
"Outstanding & Collection Analysis"

);

y = drawInsightBox(

        doc,

        "LEDGER INSIGHTS",

        [

            `Total Customer Billing : ${money(summary.ledger.totalBill)}.`,

            `Total Amount Collected : ${money(summary.ledger.totalReceived)}.`,

            `Outstanding Amount : ${money(summary.ledger.totalDue)}.`,

            `Collection Efficiency : ${percent(summary.ledger.recovery)}.`,

            `Total Ledger Records : ${summary.ledger.records}.`,

            `Pending Customers : ${summary.ledger.pendingCustomers}.`,

            `Cleared Customers : ${summary.ledger.clearedCustomers}.`,

            summary.ledger.recovery >= 95

                ? "Outstanding collection performance with excellent recovery."

                : summary.ledger.recovery >= 85

                ? "Collection performance is healthy with minimal outstanding dues."

                : summary.ledger.recovery >= 70

                ? "Collection performance is satisfactory but there is room for improvement."

                : "Recovery percentage is low. Customer follow-up should be prioritized.",

            summary.ledger.totalDue > (summary.ledger.totalBill * 0.25)

                ? "Outstanding receivables exceed 25% of total billing. Consider strengthening credit control."

                : "Outstanding receivables are within an acceptable range.",

            summary.ledger.pendingCustomers > summary.ledger.clearedCustomers

                ? "More customers have pending balances than cleared accounts."

                : "Most customers have cleared their outstanding balances.",

            "Review ageing receivables regularly to improve cash flow.",

            "Prioritize follow-up with high-value outstanding customers.",

            "Encourage digital or advance payments to reduce outstanding balances.",

            "Generate customer-wise ageing reports periodically for better financial control."

        ],

        y

    );



    drawFooter(

        doc

    );

};