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

export const drawMillingSection = (

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

        "Milling Report",

        "Production & Recovery Analysis"

    );



    /* ==========================================================

       KPI DASHBOARD

    ========================================================== */

    y = drawKPIGrid(

        doc,

        [

            {

                icon:"",

                title:"Sessions",

                value:String(

                    summary.milling.totalSessions

                ),

                status:"Completed",

                color:COLORS.info

            },

            {

                icon:"",

                title:"Input Paddy",

                value:

                    qty(

                        summary.milling.totalInput

                    ) + " Qtls",

                status:"Processed",

                color:COLORS.warning

            },

            {

                icon:"",

                title:"Rice Produced",

                value:

                    qty(

                        summary.milling.totalRice

                    ) + " Qtls",

                status:"Output",

                color:COLORS.success

            },

            {

                icon:"",

                title:"Recovery",

                value:

                    percent(

                        summary.milling.recovery

                    ),

                status:

                    summary.milling.recovery >= 65

                        ? "Excellent"

                        : "Average",

                color:COLORS.primary

            }

        ],

        y

    );



    /* ==========================================================

       PRODUCTION SUMMARY

    ========================================================== */



y=ensurePageSpace(

doc,

y,

45,

"Milling Report",
"Production & Recovery Analysis"

);
    y += 10;

drawSectionDivider(

        doc,

        "PRODUCTION SUMMARY",

        y

    );







    y=ensurePageSpace(

doc,

y,

70,

"Milling Report",
"Production & Recovery Analysis"

);
    y += 10;

y = drawMetricGrid(

        doc,

        [

            {

                icon:"",

                title:"Input Paddy",

                value:

                    qty(

                        summary.milling.totalInput

                    ) + " Qtls"

            },

            {

                icon:"",

                title:"Rice Produced",

                value:

                    qty(

                        summary.milling.totalRice

                    ) + " Qtls"

            },

            {

                icon:"",

                title:"Broken Rice",

                value:

                    qty(

                        summary.milling.totalBrokenRice

                    ) + " Qtls"

            },

            {

                icon:"",

                title:"Average Recovery",

                value:

                    percent(

                        summary.milling.averageRecovery

                    )

            },

            {

                icon:"",

                title:"Thin Rice Sessions",

                value:

                    String(

                        summary.milling.thinRiceSessions

                    )

            },

            {

                icon:"",

                title:"Fat Rice Sessions",

                value:

                    String(

                        summary.milling.fatRiceSessions

                    )

            }

        ],

        y,

        2

    );



    /* ==========================================================

       RECOVERY ANALYSIS

    ========================================================== */


y=ensurePageSpace(

doc,

y,

45,

"Milling Report",
"Production & Recovery Analysis"

);

    y += 10;
drawSectionDivider(

        doc,

        "RECOVERY ANALYSIS",

        y

    );






    y=ensurePageSpace(

doc,

y,

70,

"Milling Report",
"Production & Recovery Analysis"

);


    y += 10;

y = drawMetricGrid(

        doc,

        [

            {

                icon:"",

                title:"Overall Recovery",

                value:

                    percent(

                        summary.milling.recovery

                    )

            },

            {

                icon:"",

                title:"Average Recovery",

                value:

                    percent(

                        summary.milling.averageRecovery

                    )

            },

            {

                icon:"",

                title:"Best Session",

                value:

                    "#" +

                    summary.milling.bestSession

            },

            {

                icon:"",

                title:"Best Recovery",

                value:

                    percent(

                        summary.milling.bestRecovery

                    )

            }

        ],

        y,

        2

    );

        /* ==========================================================

       MILLING TRANSACTIONS

    ========================================================== */

    drawFooter(doc);

    doc.addPage();

    drawHeader(

        doc,

        "Milling Transactions",

        "Detailed Session Records"

    );

    y = 30;

    const millingRows =

        data.milling.map(item => {

            const recovery =

                Number(item.inputPaddy) === 0

                    ? 0

                    :

                    (

                        (

                            Number(item.outputRice) +

                            Number(item.outputBrokenRice)

                        )

                        /

                        Number(item.inputPaddy)

                    ) * 100;

            return [

                item.sessionNo,

                item.date,

                item.riceType,

                qty(item.inputPaddy),

                qty(item.outputRice),

                qty(item.outputBrokenRice),

                percent(recovery),

                item.remarks || "-"

            ];

        });

    y = drawReportTable(

        doc,

        "Milling Session Details",

        [

            "Session",

            "Date",

            "Rice Type",

            "Input",

            "Rice",

            "Broken",

            "Recovery",

            "Remarks"

        ],

        millingRows,

        y

    );

    drawFooter(doc);




    /* ==========================================================

       MILLING INSIGHTS

    ========================================================== */

    doc.addPage();

    drawHeader(

        doc,

        "Milling Insights",

        "Production Analysis"

    );

    y = 30;

        y=ensurePageSpace(

doc,

y,

120,

"Milling Report",
"Production & Recovery Analysis"

);

y = drawInsightBox(

        doc,

        "MILLING INSIGHTS",

        [

            `Total Milling Sessions Completed : ${summary.milling.totalSessions}.`,

            `Total Input Paddy Processed : ${qty(summary.milling.totalInput)} Quintals.`,

            `Total Rice Produced : ${qty(summary.milling.totalRice)} Quintals.`,

            `Total Broken Rice Produced : ${qty(summary.milling.totalBrokenRice)} Quintals.`,

            `Overall Recovery Achieved : ${percent(summary.milling.recovery)}.`,

            `Average Recovery Per Session : ${percent(summary.milling.averageRecovery)}.`,

            `Best Milling Session : #${summary.milling.bestSession}.`,

            `Best Recovery Recorded : ${percent(summary.milling.bestRecovery)}.`,

            `Thin Rice Milling Sessions : ${summary.milling.thinRiceSessions}.`,

            `Fat Rice Milling Sessions : ${summary.milling.fatRiceSessions}.`,

            summary.milling.recovery >= 67

                ? "Overall milling efficiency is excellent."

                : summary.milling.recovery >= 64

                ? "Overall milling efficiency is satisfactory."

                : "Overall milling efficiency needs improvement.",

            summary.milling.totalBrokenRice <= (summary.milling.totalRice * 0.08)

                ? "Broken rice generation is within the expected range."

                : "Broken rice generation is comparatively high.",

            "Regular maintenance of milling machines can further improve recovery percentage.",

            "Monitor individual session recovery to identify operational improvements."

        ],

        y

    );



    drawFooter(doc);

};