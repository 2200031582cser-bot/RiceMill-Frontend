import {
    drawHeader,
    drawFooter,
    money,
    qty
} from "../pdfHelpers";

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

import { ensurePageSpace } from "../pdfPageHelper";

export const drawBrokenRiceSection = (
    doc,
    report
) => {

    const {
        summary,
        data
    } = report;

    let y = 30;

    /* ==========================================================
       EMPTY STATE
    ========================================================== */

    if (
        !data.brokenRice ||
        data.brokenRice.length === 0
    ) {

        drawHeader(
            doc,
            "Broken Rice Procurement",
            "Purchase & Cost Analysis"
        );

        y = 40;
y=ensurePageSpace(

doc,

y,

120,

"Broken Rice Procurement",
"Purchase & Cost Analysis"

);

y = drawInsightBox(

            doc,

            "NO PROCUREMENT DATA",

            [

                "No broken rice procurement was recorded during the selected reporting period.",

                "",

                "Possible reasons:",

                "No broken rice purchases were made during this period.",

                "No procurement records were entered into the system.",

                "",

                "Remaining Broken Rice pages have been skipped."

            ],

            y

        );

        drawFooter(doc);

        return;

    }

    /* ==========================================================
       HEADER
    ========================================================== */

    drawHeader(

        doc,

        "Broken Rice Procurement",

        "Purchase & Cost Analysis"

    );



    /* ==========================================================
       KPI DASHBOARD
    ========================================================== */

    y = drawKPIGrid(

        doc,

        [

            {

                icon:"",

                title:"Purchase Records",

                value:
                    String(
                        summary.brokenRice.records
                    ),

                status:"Recorded",

                color:COLORS.primary

            },

            {

                icon:"",

                title:"Quantity",

                value:
                    qty(
                        summary.brokenRice.totalQuantity
                    ) + " Qtls",

                status:"Purchased",

                color:COLORS.success

            },

            {

                icon:"",

                title:"Procurement Cost",

                value:
                    money(
                        summary.brokenRice.totalValue
                    ),

                status:"Investment",

                color:COLORS.warning

            },

            {

                icon:"",

                title:"Average Rate",

                value:
                    money(
                        summary.brokenRice.averagePrice
                    ),

                status:"Per Quintal",

                color:COLORS.info

            }

        ],

        y

    );



    /* ==========================================================
       PROCUREMENT SUMMARY
    ========================================================== */



y=ensurePageSpace(

doc,

y,

45,

"Broken Rice Procurement",
"Purchase & Cost Analysis"

);
    y += 10;

drawSectionDivider(

        doc,

        "PROCUREMENT SUMMARY",

        y

    );



    y=ensurePageSpace(

doc,

y,

70,

"Broken Rice Procurement",
"Purchase & Cost Analysis"

);
    y += 10;
y = drawMetricGrid(

        doc,

        [

            {

                icon:"",

                title:"Total Quantity",

                value:
                    qty(
                        summary.brokenRice.totalQuantity
                    ) + " Qtls"

            },

            {

                icon:"",

                title:"Procurement Cost",

                value:
                    money(
                        summary.brokenRice.totalValue
                    )

            },

            {

                icon:"",

                title:"Average Rate",

                value:
                    money(
                        summary.brokenRice.averagePrice
                    )

            },

            {

                icon:"",

                title:"Highest Rate Paid",

                value:
                    money(
                        summary.brokenRice.highestPrice
                    )

            },

            {

                icon:"",

                title:"Purchase Records",

                value:
                    String(
                        summary.brokenRice.records
                    )

            },

            {

                icon:"",

                title:"Average Cost / Record",

                value:
                    summary.brokenRice.records > 0

                        ? money(
                            summary.brokenRice.totalValue /
                            summary.brokenRice.records
                        )

                        : money(0)

            }

        ],

        y,

        2

    );

    drawFooter(doc);

    /* ==========================================================
       BROKEN RICE REGISTER
    ========================================================== */
        /* ==========================================================
       BROKEN RICE REGISTER
    ========================================================== */

    doc.addPage();

    drawHeader(

        doc,

        "Broken Rice Register",

        "Detailed Procurement Records"

    );

    y = 30;

    const brokenRiceRows =

        data.brokenRice.map(item => [

            item.date,

            qty(item.quantity),

            money(item.price),

            money(

                Number(item.quantity || 0) *

                Number(item.price || 0)

            )

        ]);

    y = drawReportTable(

        doc,

        "Broken Rice Procurement Register",

        [

            "Date",

            "Quantity (Qtls)",

            "Rate / Qtl",

            "Total Amount"

        ],

        brokenRiceRows,

        y

    );

    drawFooter(doc);



    /* ==========================================================
       PROCUREMENT STATISTICS
    ========================================================== */

    doc.addPage();

    drawHeader(

        doc,

        "Broken Rice Statistics",

        "Procurement Performance"

    );

    y = 30;



    const statisticsRows = [

        [

            "Purchase Records",

            String(

                summary.brokenRice.records

            )

        ],

        [

            "Total Quantity",

            qty(

                summary.brokenRice.totalQuantity

            ) + " Qtls"

        ],

        [

            "Average Rate",

            money(

                summary.brokenRice.averagePrice

            )

        ],

        [

            "Highest Rate Paid",

            money(

                summary.brokenRice.highestPrice

            )

        ],

        [

            "Total Procurement Cost",

            money(

                summary.brokenRice.totalValue

            )

        ],

        [

            "Average Cost / Record",

            summary.brokenRice.records > 0

                ? money(

                    summary.brokenRice.totalValue /

                    summary.brokenRice.records

                )

                : money(0)

        ]

    ];



    y = drawReportTable(

        doc,

        "Procurement Statistics",

        [

            "Metric",

            "Value"

        ],

        statisticsRows,

        y

    );



    y += 15;

y=ensurePageSpace(

doc,

y,

45,

"Broken Rice Procurement",
"Purchase & Cost Analysis"

);

drawSectionDivider(

        doc,

        "PURCHASE OBSERVATIONS",

        y

    );






    y=ensurePageSpace(

doc,

y,

70,

"Broken Rice Procurement",
"Purchase & Cost Analysis"

);

    y += 10;
y = drawMetricGrid(

        doc,

        [

            {

                icon:"",

                title:"Purchase Frequency",

                value:

                    summary.brokenRice.records >= 10

                        ? "High"

                        : summary.brokenRice.records >= 5

                        ? "Medium"

                        : "Low"

            },

            {

                icon:"",

                title:"Price Stability",

                value:

                    summary.brokenRice.highestPrice >

                    summary.brokenRice.averagePrice * 1.20

                        ? "Variable"

                        : "Stable"

            },

            {

                icon:"",

                title:"Average Quantity",

                value:

                    summary.brokenRice.records > 0

                        ? qty(

                            summary.brokenRice.totalQuantity /

                            summary.brokenRice.records

                        ) + " Qtls"

                        : "0 Qtls"

            },

            {

                icon:"",

                title:"Investment Level",

                value:

                    summary.brokenRice.totalValue > 100000

                        ? "High"

                        : "Normal"

            }

        ],

        y,

        2

    );



    drawFooter(doc);



    /* ==========================================================
       BROKEN RICE INSIGHTS
    ========================================================== */
        /* ==========================================================
       BROKEN RICE INSIGHTS
    ========================================================== */

    doc.addPage();

    drawHeader(

        doc,

        "Broken Rice Insights",

        "Management Summary"

    );

    y = 30;

    const insights = [];



    /* ==========================================================
       PROCUREMENT SUMMARY
    ========================================================== */

    insights.push(
        "PROCUREMENT SUMMARY"
    );

    insights.push(
        `Broken rice procurement consisted of ${summary.brokenRice.records} purchase record(s).`
    );

    insights.push(
        `A total of ${qty(summary.brokenRice.totalQuantity)} Quintals were procured.`
    );

    insights.push(
        `The total procurement cost amounted to ${money(summary.brokenRice.totalValue)}.`
    );

    insights.push(
        `The average purchase rate was ${money(summary.brokenRice.averagePrice)} per Quintal.`
    );

    insights.push("");



    /* ==========================================================
       PRICE ANALYSIS
    ========================================================== */

    insights.push(
        "PRICE ANALYSIS"
    );

    if (

        summary.brokenRice.highestPrice <=

        summary.brokenRice.averagePrice * 1.10

    ) {

        insights.push(
            "Purchase prices remained consistent throughout the reporting period."
        );

    }

    else {

        insights.push(
            "Purchase prices varied considerably between procurement records."
        );

    }

    insights.push(
        `Highest purchase rate recorded: ${money(summary.brokenRice.highestPrice)}.`
    );

    insights.push("");



    /* ==========================================================
       PROCUREMENT OBSERVATIONS
    ========================================================== */

    insights.push(
        "PROCUREMENT OBSERVATIONS"
    );

    if (

        summary.brokenRice.records >= 10

    ) {

        insights.push(
            "Procurement activity remained consistent throughout the reporting period."
        );

    }

    else if (

        summary.brokenRice.records >= 5

    ) {

        insights.push(
            "Procurement activity was moderate during this reporting period."
        );

    }

    else {

        insights.push(
            "Only a limited number of procurement transactions were recorded."
        );

    }

    insights.push("");



    /* ==========================================================
       MANAGEMENT RECOMMENDATIONS
    ========================================================== */

    insights.push(
        "MANAGEMENT RECOMMENDATIONS"
    );

    insights.push(
        "Monitor broken rice purchase prices regularly before procurement."
    );

    insights.push(
        "Compare procurement rates with market trends to optimise purchasing cost."
    );

    insights.push(
        "Review procurement quantities periodically to maintain sufficient inventory."
    );

    insights.push(
        "Analyse procurement trends alongside broken rice sales for better profitability."
    );



    y=ensurePageSpace(

doc,

y,

120,
"Broken Rice Procurement",
"Purchase & Cost Analysis"

);

y = drawInsightBox(

        doc,

        "BROKEN RICE MANAGEMENT INSIGHTS",

        insights,

        y

    );



    drawFooter(doc);

};