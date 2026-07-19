import {
    drawHeader,
    drawFooter,
    money,
    qty,
    percent
} from "../pdfHelpers";

import {
    COLORS
} from "../pdfTheme";
import { ensurePageSpace } from "../pdfPageHelper";
import {
    drawKPIGrid
} from "../components/KPIGrid";

import {
    drawMetricGrid
} from "../components/MetricGrid";

import {
    drawProgressBars
} from "../components/ProgressBar";

import {
    drawInsightBox
} from "../components/InsightBox";

import {
    drawSectionDivider
} from "../components/SectionDivider";

export const drawExecutiveSection = (
    doc,
    report
) => {

    const { summary } = report;

    const dashboard =
        summary.dashboard;

    drawHeader(
        doc,
        "Executive Dashboard",
        "Business Performance Overview"
    );

    let y = 30;

    /* ==========================================================
       KPI DASHBOARD
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
                    COLORS.danger
            },

            {
                icon: "",

                title: "Profit",

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

                title: "Recovery",

                value:
                    percent(
                        dashboard.recovery
                    ),

                status:

                    dashboard.recovery >= 68

                        ? "Excellent"

                        : dashboard.recovery >= 64

                        ? "Good"

                        : dashboard.recovery >= 60

                        ? "Average"

                        : "Needs Attention",

                color:
                    COLORS.info
            }

        ],

        y

    );



    /* ==========================================================
       BUSINESS SNAPSHOT
    ========================================================== */

y=ensurePageSpace(

doc,

y,

45,

"Executive Dashboard",
"Business Performance Overview"

);
    y += 8;
drawSectionDivider(

        doc,

        "BUSINESS SNAPSHOT",

        y

    );

    y += 10;

    y=ensurePageSpace(

doc,

y,

70,

"Executive Dashboard",
"Business Performance Overview"

);

y = drawMetricGrid(

        doc,

        [

            {

                icon: "",

                title: "Procurement",

                value:

                    qty(

                        dashboard.totalProcurement

                    ) + " Qtls"

            },

            {

                icon: "",

                title: "Sales Revenue",

                value:

                    money(

                        dashboard.totalSales

                    )

            },

            {

                icon: "",

                title: "Collections",

                value:

                    money(

                        dashboard.collections

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

                title: "Profit Margin",

                value:

                    percent(

                        summary.analytics.profitMargin

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
       FINANCIAL HEALTH
    ========================================================== */

    y += 10;

y=ensurePageSpace(

doc,

y,

45,

"Executive Dashboard",
"Business Performance Overview"

);

drawSectionDivider(

        doc,

        "FINANCIAL HEALTH",

        y

    );

    y += 12;

    const revenue =
        dashboard.revenue;

    const expenses =
        dashboard.expenses;

    const profit =
        dashboard.profit;

    const maximum = Math.max(

        revenue,

        expenses,

        Math.abs(profit),

        1

    );

        y = drawProgressBars(

        doc,

        [

            {

                title: "Revenue",

                value:
                    money(revenue),

                percent:
                    (revenue / maximum) * 100,

                color:
                    COLORS.success

            },

            {

                title: "Expenses",

                value:
                    money(expenses),

                percent:
                    (expenses / maximum) * 100,

                color:
                    COLORS.danger

            },

            {

                title: "Net Profit",

                value:
                    money(profit),

                percent:
                    Math.abs(profit) / maximum * 100,

                color:

                    profit >= 0

                        ? COLORS.primary

                        : COLORS.danger

            },

            {

                title: "Rice Recovery",

                value:
                    percent(
                        dashboard.recovery
                    ),

                percent:
                    dashboard.recovery,

                color:
                    COLORS.info

            }

        ],

        y

    );



    /* ==========================================================

       EXECUTIVE METRICS

    ========================================================== */

    y += 10;

    drawSectionDivider(

        doc,

        "EXECUTIVE METRICS",

        y

    );

    y += 10;

    y=ensurePageSpace(

doc,

y,

70,

"Executive Dashboard",
"Business Performance Overview"

);

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

            },

            {

                icon: "",

                title: "Recovery Rate",

                value:

                    percent(

                        dashboard.recovery

                    )

            }

        ],

        y,

        2

    );

        /* ==========================================================
       EXECUTIVE INSIGHTS
    ========================================================== */

    y += 10;

    if (y + 170 > 260) {

        drawFooter(doc);

        doc.addPage();

        drawHeader(
            doc,
            "Executive Dashboard",
            "Management Insights"
        );

        y = 30;

    }

    const insights = [];

    /* ==========================
       BUSINESS STRENGTHS
    ========================== */

    insights.push("BUSINESS STRENGTHS");

    if (dashboard.profit > 0) {

        insights.push(
            `Business generated a net profit of ${money(dashboard.profit)}.`
        );

    } else {

        insights.push(
            "- Business reported an overall loss."
        );

    }

    if (dashboard.recovery >= 68) {

        insights.push(
            `Rice recovery is excellent at ${percent(dashboard.recovery)}.`
        );

    } else if (dashboard.recovery >= 64) {

        insights.push(
            `Rice recovery is satisfactory at ${percent(dashboard.recovery)}.`
        );

    }

    if (dashboard.collections >= dashboard.outstanding) {

        insights.push(
            "Customer collections are stronger than outstanding dues."
        );

    }

    insights.push("---");



    /* ==========================
       AREAS TO WATCH
    ========================== */

    insights.push("AREAS TO WATCH");

    if (dashboard.outstanding > 100000) {

        insights.push(
            `Outstanding receivables are ${money(dashboard.outstanding)}.`
        );

    } else {

        insights.push(
            "Outstanding receivables are under control."
        );

    }

    if (dashboard.attendance < 80) {

        insights.push(
            `Employee attendance is only ${percent(dashboard.attendance)}.`
        );

    } else {

        insights.push(
            `Employee attendance is healthy at ${percent(dashboard.attendance)}.`
        );

    }

    if (summary.analytics.profitMargin < 10) {

        insights.push(
            `Profit margin is only ${percent(summary.analytics.profitMargin)}.`
        );

    } else {

        insights.push(
            `Profit margin stands at ${percent(summary.analytics.profitMargin)}.`
        );

    }

    insights.push("---");



    /* ==========================
       RECOMMENDATIONS
    ========================== */

    insights.push("RECOMMENDATIONS");

    if (dashboard.outstanding > 0) {

        insights.push(
            "- Prioritize collection of pending customer payments."
        );

    }

    insights.push(
        "- Continue monitoring procurement costs."
    );

    insights.push(
        "- Maintain high milling recovery through quality control."
    );

    insights.push(
        "- Increase digital payment collections wherever possible."
    );

    insights.push(
        "- Review monthly operating expenses regularly."
    );



    y=ensurePageSpace(

doc,

y,

120,

"Executive Dashboard",
"Business Performance Overview"
);

y = drawInsightBox(

        doc,

        "EXECUTIVE SUMMARY",

        insights,

        y

    );



    drawFooter(doc);

};