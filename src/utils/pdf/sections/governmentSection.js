import {

    drawHeader,

    drawFooter,

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

export const drawGovernmentSection = (

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

        "Government Milling Report",

        "Government Procurement & Delivery"

    );



    /* ==========================================================

       KPI DASHBOARD

    ========================================================== */

    const recovery =

        summary.government.totalPaddy === 0

            ? 0

            :

            (

                summary.government.totalRice

                /

                summary.government.totalPaddy

            ) * 100;



    y = drawKPIGrid(

        doc,

        [

            {

                icon:"",

                title:"Paddy Received",

                value:

                    qty(

                        summary.government.totalPaddy

                    ) + " Qtls",

                status:"Received",

                color:COLORS.primary

            },

            {

                icon:"",

                title:"Rice Delivered",

                value:

                    qty(

                        summary.government.totalRice

                    ) + " Qtls",

                status:"Delivered",

                color:COLORS.success

            },

            {

                icon:"",

                title:"Recovery",

                value:

                    percent(recovery),

                status:"Conversion",

                color:COLORS.info

            },

            {

                icon:"",

                title:"Transactions",

                value:

                    String(

                        summary.government.records

                    ),

                status:"Records",

                color:COLORS.warning

            }

        ],

        y

    );



    /* ==========================================================

       GOVERNMENT SUMMARY

    ========================================================== */



y=ensurePageSpace(

doc,

y,

45,

"Government Milling Report",
"Government Procurement & Delivery"

);
    y += 10;
drawSectionDivider(

        doc,

        "GOVERNMENT SUMMARY",

        y

    );






    y=ensurePageSpace(

doc,

y,

70,

"Government Milling Report",
"Government Procurement & Delivery"

);

    y += 10;

y = drawMetricGrid(

        doc,

        [

            {

                icon:"",

                title:"Total Paddy",

                value:

                    qty(

                        summary.government.totalPaddy

                    ) + " Qtls"

            },

            {

                icon:"",

                title:"Rice Delivered",

                value:

                    qty(

                        summary.government.totalRice

                    ) + " Qtls"

            },

            {

                icon:"",

                title:"Recovery",

                value:

                    percent(recovery)

            },

            {

                icon:"",

                title:"Records",

                value:

                    String(

                        summary.government.records

                    )

            }

        ],

        y,

        2

    );

        /* ==========================================================

       GOVERNMENT LEDGER

    ========================================================== */

    drawFooter(doc);

    doc.addPage();

    drawHeader(

        doc,

        "Government Ledger",

        "Government Paddy & Rice Transactions"

    );

    y = 30;

    const ledgerRows =

        (data.government || []).map(item => {

            const itemRecovery =

                Number(item.paddyReceived || 0) === 0

                    ? 0

                    : (

                        Number(item.riceDelivered || 0) /

                        Number(item.paddyReceived || 0)

                    ) * 100;

            return [

                item.cropSeason,

                item.cropYear,

                qty(item.paddyReceived),

                qty(item.riceDelivered),

                percent(itemRecovery)

            ];

        });

    y = drawReportTable(

        doc,

        "Government Ledger Register",

        [

            "Season",

            "Year",

            "Paddy (Qtls)",

            "Rice (Qtls)",

            "Recovery"

        ],

        ledgerRows,

        y

    );

    drawFooter(doc);



    /* ==========================================================

       RECOVERY SUMMARY

    ========================================================== */

    doc.addPage();

    drawHeader(

        doc,

        "Government Recovery",

        "Season Wise Performance"

    );

    y = 30;

    const recoveryRows =

        (data.government || []).map(item => {

            const recovery =

                Number(item.paddyReceived || 0) === 0

                    ? 0

                    : (

                        Number(item.riceDelivered || 0) /

                        Number(item.paddyReceived || 0)

                    ) * 100;

            return [

                item.cropSeason,

                item.cropYear,

                qty(item.paddyReceived),

                qty(item.riceDelivered),

                percent(recovery)

            ];

        });

    y = drawReportTable(

        doc,

        "Recovery Analysis",

        [

            "Season",

            "Year",

            "Paddy",

            "Rice",

            "Recovery"

        ],

        recoveryRows,

        y

    );

    drawFooter(doc);



    /* ==========================================================

       GOVERNMENT INSIGHTS

    ========================================================== */

    doc.addPage();

    drawHeader(

        doc,

        "Government Insights",

        "Government Supply Performance"

    );

    y = 30;

        y=ensurePageSpace(

doc,

y,

120,

"Government Milling Report",
"Government Procurement & Delivery"

);

y = drawInsightBox(

        doc,

        "GOVERNMENT INSIGHTS",

        [

            `Total Government Paddy Received : ${qty(summary.government.totalPaddy)} Quintals.`,

            `Total Rice Delivered : ${qty(summary.government.totalRice)} Quintals.`,

            `Total Government Transactions : ${summary.government.records}.`,

            `Overall Recovery : ${percent(recovery)}.`,

            recovery >= 67

                ? "Government milling recovery is excellent."

                : recovery >= 64

                ? "Government milling recovery is within the expected range."

                : "Government milling recovery is below the expected range and should be reviewed.",

            summary.government.records > 0

                ? "Government procurement records are available for monitoring seasonal performance."

                : "No government transactions were recorded during the selected period.",

            "Monitor season-wise paddy receipts and rice deliveries regularly to improve operational planning.",

            "Maintain consistent recovery percentages across all crop seasons for better government compliance.",

            "Review seasonal variations to optimize milling efficiency and delivery schedules."

        ],

        y

    );



    drawFooter(

        doc

    );

};