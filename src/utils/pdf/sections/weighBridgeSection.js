import {

    drawHeader,

    drawFooter,

    money

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

export const drawWeighBridgeSection = (

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

        "Weigh Bridge Report",

        "Income & Customer Analysis"

    );



    /* ==========================================================

       KPI DASHBOARD

    ========================================================== */

    y = drawKPIGrid(

        doc,

        [

            {

                icon:"",

                title:"Total Income",

                value:money(

                    summary.weighBridge.totalIncome

                ),

                status:"Collected",

                color:COLORS.success

            },

            {

                icon:"",

                title:"Customers",

                value:String(

                    summary.weighBridge.customers

                ),

                status:"Served",

                color:COLORS.primary

            },

            {

                icon:"",

                title:"Cash",

                value:money(

                    summary.weighBridge.cashIncome

                ),

                status:"Cash",

                color:COLORS.warning

            },

            {

                icon:"",

                title:"UPI",

                value:money(

                    summary.weighBridge.upiIncome

                ),

                status:"Digital",

                color:COLORS.info

            }

        ],

        y

    );



    /* ==========================================================

       PAYMENT SUMMARY

    ========================================================== */



y=ensurePageSpace(

doc,

y,

45,

"Weigh Bridge Report",
"Income & Customer Analysis"

);
    y += 10;

drawSectionDivider(

        doc,

        "PAYMENT SUMMARY",

        y

    );







    y=ensurePageSpace(

doc,

y,

70,

"Weigh Bridge Report",
"Income & Customer Analysis"


);
    y += 10;

y = drawMetricGrid(

        doc,

        [

            {

                icon:"",

                title:"Cash Collection",

                value:

                    money(

                        summary.weighBridge.cashIncome

                    )

            },

            {

                icon:"",

                title:"UPI Collection",

                value:

                    money(

                        summary.weighBridge.upiIncome

                    )

            },

            {

                icon:"",

                title:"Credit Collection",

                value:

                    money(

                        summary.weighBridge.creditIncome

                    )

            },

            {

                icon:"",

                title:"Total Income",

                value:

                    money(

                        summary.weighBridge.totalIncome

                    )

            },

            {

                icon:"",

                title:"Customers",

                value:

                    String(

                        summary.weighBridge.customers

                    )

            },

            {

                icon:"",

                title:"Transactions",

                value:

                    String(

                        summary.weighBridge.records

                    )

            }

        ],

        y,

        2

    );

        /* ==========================================================

       WEIGH BRIDGE LEDGER

    ========================================================== */

    drawFooter(doc);

    doc.addPage();

    drawHeader(

        doc,

        "Weigh Bridge Ledger",

        "Customer Transaction Register"

    );

    y = 30;

    const ledgerRows =

        (data.weighBridge || []).map(item => [

            item.entryDate,

            item.customerName,

            item.phoneNumber,

            item.vehicleNumber,

            money(item.amount),

            item.paymentMode

        ]);

    y = drawReportTable(

        doc,

        "Transaction Register",

        [

            "Date",

            "Customer",

            "Phone",

            "Vehicle",

            "Amount",

            "Payment"

        ],

        ledgerRows,

        y

    );

    drawFooter(doc);



    /* ==========================================================

       PAYMENT MODE ANALYSIS

    ========================================================== */

    doc.addPage();

    drawHeader(

        doc,

        "Payment Analysis",

        "Mode Wise Collection"

    );

    y = 30;

    const paymentRows = [

        [

            "Cash",

            money(summary.weighBridge.cashIncome)

        ],

        [

            "UPI",

            money(summary.weighBridge.upiIncome)

        ],

        [

            "Monthly Credit",

            money(summary.weighBridge.creditIncome)

        ],

        [

            "Total Collection",

            money(summary.weighBridge.totalIncome)

        ]

    ];



    y = drawReportTable(

        doc,

        "Payment Summary",

        [

            "Payment Mode",

            "Amount"

        ],

        paymentRows,

        y

    );



    y += 12;

y=ensurePageSpace(

doc,

y,

45,

"Weigh Bridge Report",
"Income & Customer Analysis"


);

drawSectionDivider(

        doc,

        "CUSTOMER SUMMARY",

        y

    );







   y=ensurePageSpace(

doc,

y,

70,

"Weigh Bridge Report",
"Income & Customer Analysis"


);
    y += 10;
y = drawMetricGrid(

        doc,

        [

            {

                icon:"",

                title:"Customers",

                value:

                    String(

                        summary.weighBridge.customers

                    )

            },

            {

                icon:"",

                title:"Transactions",

                value:

                    String(

                        summary.weighBridge.records

                    )

            },

            {

                icon:"",

                title:"Average Income",

                value:

                    money(

                        summary.weighBridge.records === 0

                        ? 0

                        :

                        summary.weighBridge.totalIncome /

                        summary.weighBridge.records

                    )

            },

            {

                icon:"",

                title:"Average Customer",

                value:

                    money(

                        summary.weighBridge.customers === 0

                        ? 0

                        :

                        summary.weighBridge.totalIncome /

                        summary.weighBridge.customers

                    )

            }

        ],

        y,

        2

    );



    drawFooter(doc);



    /* ==========================================================

       WEIGH BRIDGE INSIGHTS

    ========================================================== */

    doc.addPage();

    drawHeader(

        doc,

        "Weigh Bridge Insights",

        "Collection Performance"

    );

    y = 30;

        y=ensurePageSpace(

doc,

y,

120,

"Weigh Bridge Report",
"Income & Customer Analysis"

);

y = drawInsightBox(

        doc,

        "WEIGH BRIDGE INSIGHTS",

        [

            `Total Weigh Bridge Income : ${money(summary.weighBridge.totalIncome)}.`,

            `Total Customers Served : ${summary.weighBridge.customers}.`,

            `Total Transactions : ${summary.weighBridge.records}.`,

            `Cash Collection : ${money(summary.weighBridge.cashIncome)}.`,

            `UPI Collection : ${money(summary.weighBridge.upiIncome)}.`,

            `Monthly Credit Collection : ${money(summary.weighBridge.creditIncome)}.`,

            `Average Income Per Transaction : ${money(

                summary.weighBridge.records === 0

                    ? 0

                    : summary.weighBridge.totalIncome /

                      summary.weighBridge.records

            )}.`,

            `Average Income Per Customer : ${money(

                summary.weighBridge.customers === 0

                    ? 0

                    : summary.weighBridge.totalIncome /

                      summary.weighBridge.customers

            )}.`,

            summary.weighBridge.creditIncome > 0

                ? "Monthly credit collections are active. Follow up on pending customer settlements regularly."

                : "No monthly credit collections were recorded during the selected period.",

            summary.weighBridge.upiIncome >

            summary.weighBridge.cashIncome

                ? "Digital payments exceed cash collections."

                : "Cash remains the dominant payment mode.",

            summary.weighBridge.records > 0

                ? "Weigh bridge operations are actively generating additional revenue."

                : "No weigh bridge transactions were recorded during the selected period.",

            "Review customer-wise collections periodically to improve revenue tracking and payment management."

        ],

        y

    );



    drawFooter(

        doc

    );

};