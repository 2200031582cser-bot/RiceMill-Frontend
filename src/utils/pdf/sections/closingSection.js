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

import { ensurePageSpace } from "../pdfPageHelper";

export const drawClosingSection = (

    doc,

    report

) => {

    const {

        summary,

        options

    } = report;

    const analytics =

        summary.analytics;

    drawHeader(

        doc,

        "Business Report Summary",

        "Final Executive Overview"

    );

    let y = 30;



    /* ==========================================================

       FINAL KPI SUMMARY

    ========================================================== */

    y = drawKPIGrid(

        doc,

        [

            {

                icon:"",

                title:"Health Score",

                value:

                    analytics.healthScore.toFixed(1),

                status:

                    analytics.healthScore >= 85

                        ? "Excellent"

                        : analytics.healthScore >= 70

                        ? "Healthy"

                        : "Attention",

                color:

                    analytics.healthScore >= 85

                        ? COLORS.success

                        : analytics.healthScore >= 70

                        ? COLORS.info

                        : COLORS.danger

            },

            {

                icon:"",

                title:"Revenue",

                value:

                    money(

                        analytics.revenue

                    ),

                status:"Generated",

                color:COLORS.success

            },

            {

                icon:"",

                title:"Profit",

                value:

                    money(

                        analytics.profit

                    ),

                status:

                    analytics.profit >= 0

                        ? "Profit"

                        : "Loss",

                color:

                    analytics.profit >= 0

                        ? COLORS.success

                        : COLORS.danger

            },

            {

                icon:"",

                title:"Recovery",

                value:

                    percent(

                        analytics.recovery

                    ),

                status:"Production",

                color:COLORS.primary

            }

        ],

        y

    );



    /* ==========================================================

       REPORT SUMMARY

    ========================================================== */



y=ensurePageSpace(

doc,

y,

45,

"Business Report Summary",
"Final Executive Overview"

);
    y += 10;
drawSectionDivider(

        doc,

        "REPORT SUMMARY",

        y

    );






    y=ensurePageSpace(

doc,

y,

70,

"Business Report Summary",
"Final Executive Overview"

);

    y += 10;
y = drawMetricGrid(

        doc,

        [

            {

                icon:"",

                title:"Report From",

                value:

                    options.fromDate ||

                    "Beginning"

            },

            {

                icon:"",

                title:"Report To",

                value:

                    options.toDate ||

                    "Today"

            },

            {

                icon:"",

                title:"Generated On",

                value:

                    new Date()

                    .toLocaleDateString()

            },

            {

                icon:"",

                title:"Generated At",

                value:

                    new Date()

                    .toLocaleTimeString()

            }

        ],

        y,

        2

    );

        /* ==========================================================

       EXECUTIVE CONCLUSION

    ========================================================== */



y=ensurePageSpace(

doc,

y,

45,

"Business Report Summary",
"Final Executive Overview"

);
    y += 10;
drawSectionDivider(

        doc,

        "EXECUTIVE CONCLUSION",

        y

    );

    y += 12;

    y=ensurePageSpace(

doc,

y,

120,

"Business Report Summary",
"Final Executive Overview"

);

y = drawInsightBox(
        doc,

        "FINAL BUSINESS SUMMARY",

        [

            `Business Health Score : ${analytics.healthScore.toFixed(1)} / 100.`,

            `Total Revenue Generated : ${money(analytics.revenue)}.`,

            `Total Operating Expenses : ${money(analytics.expenses)}.`,

            `Net Profit Earned : ${money(analytics.profit)}.`,

            `Profit Margin : ${percent(analytics.profitMargin)}.`,

            `Rice Recovery : ${percent(analytics.recovery)}.`,

            `Sales Recovery : ${percent(analytics.salesRecovery)}.`,

            `Ledger Recovery : ${percent(analytics.ledgerRecovery)}.`,

            analytics.healthScore >= 85

                ? "Overall business performance is excellent and operations are well managed."

                : analytics.healthScore >= 70

                ? "Business performance is stable with opportunities for further improvement."

                : "Business performance requires attention. Review costs, production efficiency and collections.",

            analytics.profit >= 0

                ? "The business remained profitable during the selected reporting period."

                : "The business reported a loss during the selected reporting period.",

            analytics.outstanding > 0

                ? `Outstanding receivables of ${money(analytics.outstanding)} should be collected as early as possible.`

                : "There are no outstanding customer receivables.",

            "Continue monitoring procurement costs, milling recovery, customer collections, employee productivity and operating expenses to improve long-term profitability.",

            "This report is generated automatically from the Rice Mill ERP System using the business transactions available for the selected reporting period."

        ],

        y

    );



    /* ==========================================================

       CONFIDENTIALITY

    ========================================================== */



y=ensurePageSpace(

doc,

y,

45,
"Business Report Summary",
"Final Executive Overview"

);
    y += 10;
drawSectionDivider(

        doc,

        "CONFIDENTIALITY NOTICE",

        y

    );

    y += 12;

    doc.setFontSize(10);

    doc.setTextColor(90);

    doc.text(

        "This report contains confidential business information intended solely for the management of the rice mill. Any unauthorized copying, sharing or distribution of this report is prohibited.",

        15,

        y,

        {

            maxWidth: 180

        }

    );



    y += 22;

    doc.setFontSize(13);

    doc.setFont(

        "helvetica",

        "bold"

    );

    doc.setTextColor(40);

    doc.text(

        "Thank you for using the Rice Mill ERP Business Reporting System.",

        15,

        y

    );



    y += 8;

    doc.setFontSize(10);

    doc.setFont(

        "helvetica",

        "normal"

    );

    doc.setTextColor(100);

    doc.text(

        "Generated automatically by the Rice Mill ERP Reporting Engine.",

        15,

        y

    );



    drawFooter(doc);

};