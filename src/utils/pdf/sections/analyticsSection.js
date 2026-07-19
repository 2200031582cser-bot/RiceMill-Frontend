import {
    drawHeader,
    drawFooter,
    money,
    percent
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

export const drawAnalyticsSection = (
    doc,
    report
) => {

    const { summary } = report;

    const analytics =
        summary.analytics;

    const dashboard =
        summary.dashboard;

    let y = 30;

    drawHeader(

        doc,

        "Business Analytics Dashboard",

        "Complete Business Performance"

    );



    /* ==========================================================
       BUSINESS HEALTH
    ========================================================== */

    doc.setFillColor(
        248,
        248,
        248
    );

    doc.roundedRect(
        15,
        y,
        180,
        22,
        4,
        4,
        "F"
    );

    doc.setDrawColor(
        ...COLORS.border
    );

    doc.roundedRect(
        15,
        y,
        180,
        22,
        4,
        4
    );

    doc.setFont(
        "helvetica",
        "bold"
    );

    doc.setFontSize(18);

    doc.setTextColor(
        ...COLORS.primary
    );

    doc.text(
        "BUSINESS HEALTH",
        20,
        y + 9
    );

    doc.setFontSize(22);

    doc.text(

        dashboard.healthScore.toFixed(1) +
        " / 100",

        150,

        y + 10,

        {
            align: "right"
        }

    );

    doc.setFont(
        "helvetica",
        "normal"
    );

    doc.setFontSize(10);

    doc.setTextColor(100);

    const healthStatus =

        dashboard.healthScore >= 85

            ? "Excellent overall business performance"

            : dashboard.healthScore >= 70

            ? "Business operating within healthy limits"

            : "Business requires management attention";

    doc.text(

        healthStatus,

        20,

        y + 18

    );

    y += 30;



    /* ==========================================================
       EXECUTIVE KPI DASHBOARD
    ========================================================== */

    y = drawKPIGrid(

        doc,

        [

            {

                icon: "",

                title: "Revenue",

                value:
                    money(
                        dashboard.revenue
                    ),

                status:

                    dashboard.revenue > 0

                        ? "Healthy"

                        : "No Revenue",

                color:
                    COLORS.success

            },

            {

                icon: "",

                title: "Expenses",

                value:
                    money(
                        dashboard.expenses
                    ),

                status:
                    "Operational",

                color:
                    COLORS.warning

            },

            {

                icon: "",

                title: "Net Profit",

                value:
                    money(
                        dashboard.profit
                    ),

                status:

                    dashboard.profit >= 0

                        ? "Profit"

                        : "Loss",

                color:

                    dashboard.profit >= 0

                        ? COLORS.success

                        : COLORS.danger

            },

            {

                icon: "",

                title: "Rice Recovery",

                value:
                    percent(
                        dashboard.recovery
                    ),

                status:

                    dashboard.recovery >= 68

                        ? "Excellent"

                        : dashboard.recovery >= 64

                        ? "Good"

                        : "Average",

                color:
                    COLORS.info

            }

        ],

        y

    );



    /* ==========================================================
       FINANCIAL OVERVIEW
    ========================================================== */


y=ensurePageSpace(

doc,

y,

45,

"Business Analytics Dashboard",
"Complete Business Performance"

);
    y += 10;


drawSectionDivider(
        doc,

        "FINANCIAL OVERVIEW",

        y

    );



    y=ensurePageSpace(

doc,

y,

70,

"Business Analytics Dashboard",
"Complete Business Performance"

);
    y += 10;

y = drawMetricGrid(

        doc,

        [

            {

                icon: "",

                title: "Profit Margin",

                value:

                    percent(
                        analytics.profitMargin
                    )

            },

            {

                icon: "",

                title: "Collection Rate",

                value:

                    percent(
                        analytics.salesRecovery
                    )

            },

            {

                icon: "",

                title: "Ledger Recovery",

                value:

                    percent(
                        analytics.ledgerRecovery
                    )

            },

            {

                icon: "",

                title: "Ledger Outstanding",

                value:

                    money(
                        dashboard.outstanding
                    )

            },

            {

                icon: "",

                title: "Attendance",

                value:

                    percent(
                        dashboard.attendance
                    )

            },

            {

                icon: "",

                title: "Weigh Bridge",

                value:

                    money(
                        dashboard.weighBridgeIncome
                    )

            }

        ],

        y,

        2

    );



    /* ==========================================================
       BUSINESS HIGHLIGHTS
    ========================================================== */
        /* ==========================================================
       BUSINESS HIGHLIGHTS
    ========================================================== */



y=ensurePageSpace(

doc,

y,

45,

"Business Analytics Dashboard",
"Complete Business Performance"

);
    y += 10;
drawSectionDivider(

        doc,

        "BUSINESS HIGHLIGHTS",

        y

    );



    y=ensurePageSpace(

doc,

y,

70,

"Business Analytics Dashboard",
"Complete Business Performance"

);
    y += 10;
y = drawMetricGrid(

        doc,

        [

            {

                icon: "",

                title: "Top Farmer",

                value:

                    dashboard.topFarmer ||

                    "No Data"

            },

            {

                icon: "",

                title: "Best Customer",

                value:

                    dashboard.bestCustomer ||

                    "No Data"

            },

            {

                icon: "",

                title: "Best Product",

                value:

                    dashboard.bestProduct ||

                    "No Data"

            },

            {

                icon: "",

                title: "Ledger Outstanding",

                value:

                    money(

                        dashboard.outstanding

                    )

            },

            {

                icon: "",

                title: "Weigh Bridge",

                value:

                    money(

                        dashboard.weighBridgeIncome

                    )

            },

            {

                icon: "",

                title: "Business Health",

                value:

                    dashboard.healthScore.toFixed(1)

                    + " / 100"

            }

        ],

        y,

        2

    );



    /* ==========================================================
       FINANCIAL BREAKDOWN
    ========================================================== */

    drawFooter(doc);

    doc.addPage();

    drawHeader(

        doc,

        "Financial Analytics",

        "Revenue & Expense Breakdown"

    );

    y = 30;

    const financialRows = [

        [

            "Sales Revenue",

            money(

                summary.sales.totalRevenue

            )

        ],

        [

            "Weigh Bridge Income",

            money(

                summary.weighBridge.totalIncome

            )

        ],

        [

            "Total Revenue",

            money(

                dashboard.revenue

            )

        ],

        [

            "Paddy Procurement",

            money(

                summary.procurement.totalAmount

            )

        ],

        [

            "Broken Rice Procurement",

            money(

                summary.brokenRice.totalValue

            )

        ],

        [

            "Salary Liability",

            money(

                summary.salary.totalSalary

            )

        ],

        [

            "Miscellaneous Expenses",

            money(

                summary.expense.totalAmount

            )

        ],

        [

            "Total Expenses",

            money(

                dashboard.expenses

            )

        ],

        [

            "Net Profit",

            money(

                dashboard.profit

            )

        ]

    ];



    y = drawReportTable(

        doc,

        "Financial Summary",

        [

            "Category",

            "Amount"

        ],

        financialRows,

        y

    );



    y += 12;

y=ensurePageSpace(

doc,

y,

45,

"Business Analytics Dashboard",
"Complete Business Performance"

);

drawSectionDivider(

        doc,

        "REVENUE & EXPENSE OVERVIEW",

        y

    );






    y=ensurePageSpace(

doc,

y,

70,

"Business Analytics Dashboard",
"Complete Business Performance"

);

    y += 10;
y = drawMetricGrid(

        doc,

        [

            {

                icon: "",

                title: "Revenue",

                value:

                    money(

                        dashboard.revenue

                    )

            },

            {

                icon: "",

                title: "Expenses",

                value:

                    money(

                        dashboard.expenses

                    )

            },

            {

                icon: "",

                title: "Net Profit",

                value:

                    money(

                        dashboard.profit

                    )

            },

            {

                icon: "",

                title: "Profit Margin",

                value:

                    percent(

                        analytics.profitMargin

                    )

            },

            {

                icon: "",

                title: "Collection Rate",

                value:

                    percent(

                        analytics.salesRecovery

                    )

            },

            {

                icon: "",

                title: "Ledger Recovery",

                value:

                    percent(

                        analytics.ledgerRecovery

                    )

            }

        ],

        y,

        2

    );



    drawFooter(doc);



    /* ==========================================================
       OPERATIONAL PERFORMANCE
    ========================================================== */
        /* ==========================================================
       OPERATIONAL PERFORMANCE
    ========================================================== */
    /* ==========================================================
   OPERATIONAL PERFORMANCE
========================================================== */

drawFooter(doc);

doc.addPage();

    drawHeader(
        doc,
        "Operational Analytics",
        "Mill Performance"
    );

    y = 30;

    y=ensurePageSpace(

doc,

y,

70,

"Business Analytics Dashboard",
"Complete Business Performance"

);

y = drawMetricGrid(

        doc,

        [

            {
                icon: "",
                title: "Paddy Procured",
                value:
                    summary.procurement.totalQuantity.toFixed(2) +
                    " Qtls"
            },

            {
                icon: "",
                title: "Broken Rice Purchased",
                value:
                    summary.brokenRice.totalQuantity.toFixed(2) +
                    " Qtls"
            },

            {
                icon: "",
                title: "Rice Recovery",
                value:
                    percent(
                        dashboard.recovery
                    )
            },

            {
                icon: "",
                title: "Rice Delivery Ratio",
                value:
                    percent(
                        summary.government.deliveryPercentage
                    )
            },

            {
                icon: "",
                title: "Attendance",
                value:
                    percent(
                        dashboard.attendance
                    )
            },

            {
                icon: "",
                title: "Collection Rate",
                value:
                    percent(
                        analytics.salesRecovery
                    )
            }

        ],

        y,

        2

    );

drawFooter(doc);

doc.addPage();

drawHeader(
    doc,
    "Executive Intelligence",
    "Management Summary"
);

y = 30;

    /* ==========================================================
       EXECUTIVE INTELLIGENCE
    ========================================================== */

    y += 14;

y=ensurePageSpace(

doc,

y,

45,

"Business Analytics Dashboard",
"Complete Business Performance"

);

drawSectionDivider(

        doc,

        "EXECUTIVE INTELLIGENCE",

        y

    );

    y += 12;

    const insights = [];



    /* ==========================
       BUSINESS STRENGTHS
    ========================== */

    insights.push(
        "BUSINESS STRENGTHS"
    );

    if (dashboard.profit > 0) {

        insights.push(
            `Net profit of ${money(dashboard.profit)} generated during this period.`
        );

    }

    if (dashboard.recovery >= 68) {

        insights.push(
            `Rice recovery is excellent at ${percent(dashboard.recovery)}.`
        );

    }

    if (analytics.salesRecovery >= 90) {

        insights.push(
            `Customer collection efficiency is ${percent(analytics.salesRecovery)}.`
        );

    }

    if (dashboard.healthScore >= 80) {

        insights.push(
            `Overall Business Health Score is ${dashboard.healthScore.toFixed(1)} / 100.`
        );

    }

    insights.push("");



    /* ==========================
       FINANCIAL RISKS
    ========================== */

    insights.push(
        "AREAS TO WATCH"
    );

    if (dashboard.outstanding > 100000) {

        insights.push(
            `Outstanding receivables of ${money(dashboard.outstanding)} require follow-up.`
        );

    } else {

        insights.push(
            "Outstanding receivables remain under control."
        );

    }

    if (analytics.profitMargin < 10) {

        insights.push(
            `Profit margin is only ${percent(analytics.profitMargin)}.`
        );

    }

    if (dashboard.attendance < 80) {

        insights.push(
            `Employee attendance is ${percent(dashboard.attendance)}.`
        );

    }

    insights.push("");



    /* ==========================
       OPERATIONAL INSIGHTS
    ========================== */

    insights.push(
        "OPERATIONAL INSIGHTS"
    );

    insights.push(
        `${dashboard.topFarmer} supplied the highest quantity of paddy.`
    );

    insights.push(
        `${dashboard.bestCustomer} generated the highest customer revenue.`
    );

    insights.push(
        `${dashboard.bestProduct} remained the best selling product.`
    );

    insights.push(
        `Weigh Bridge generated ${money(dashboard.weighBridgeIncome)} during this period.`
    );

    insights.push("");



    /* ==========================
       RECOMMENDATIONS
    ========================== */

    insights.push(
        "RECOMMENDATIONS"
    );

    if (dashboard.outstanding > 0) {

        insights.push(
            "• Prioritize recovery of pending customer payments."
        );

    }

    insights.push(
        "• Continue maintaining high milling recovery."
    );

    insights.push(
        "• Monitor procurement costs every week."
    );

    insights.push(
        "• Review monthly expenses before major purchases."
    );

    insights.push(
        "• Maintain attendance above 90% for consistent operations."
    );



    y=ensurePageSpace(

doc,

y,

120,

"Business Analytics Dashboard",
"Complete Business Performance"
);

y = drawInsightBox(

        doc,

        "MANAGEMENT OBSERVATIONS",

        insights,

        y

    );



    drawFooter(doc);

};