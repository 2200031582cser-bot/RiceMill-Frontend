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

export const drawProcurementSection = (

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

        "Procurement Report",

        "Paddy Procurement Analysis"

    );



    /* ==========================================================

       KPI CARDS

    ========================================================== */

    y = drawKPIGrid(

        doc,

        [

            {

                icon:"",

                title:"Total Quantity",

                value:qty(

                    summary.procurement.totalQuantity

                ) + " Qtls",

                status:"Procured",

                color:COLORS.success

            },

            {

                icon:"",

                title:"Farmers",

                value:String(

                    summary.procurement.totalFarmers

                ),

                status:"Suppliers",

                color:COLORS.info

            },

            {

                icon:"",

                title:"Avg Price",

                value:money(

                    summary.procurement.averagePrice

                ),

                status:"Per Quintal",

                color:COLORS.warning

            },

            {

                icon:"",

                title:"Total Amount",

                value:money(

                    summary.procurement.totalAmount

                ),

                status:"Paid",

                color:COLORS.primary

            }

        ],

        y

    );



    /* ==========================================================

       PROCUREMENT BREAKDOWN

    ========================================================== */

    y += 10;

y=ensurePageSpace(

doc,

y,

45,

"Procurement Report",
"Paddy Procurement Analysis"

);

drawSectionDivider(

        doc,

        "PROCUREMENT BREAKDOWN",

        y

    );



    y += 10;



    y=ensurePageSpace(

doc,

y,

70,

"Procurement Report",

"Paddy Procurement Analysis"

);

y = drawMetricGrid(
        doc,

        [

            {
    icon:"",
    title:"Net Paddy",
    value:
        qty(
            summary.procurement.totalNetWeight
        ) + " Qtls"
},

           {
    icon:"",
    title:"Moisture Deduction",
    value:
        qty(
            summary.procurement.totalMoisture
        ) + " Kg"
},

{
    icon:"",
    title:"Average Rate",
    value:
        money(
            summary.procurement.averagePrice
        )
},

            {

                icon:"",

                title:"Average Moisture Loss",

                value:qty(

                    summary.procurement.averageMoisture

                ) + " Kg"

            },

            {

                icon:"",

                title:"Total Bags",

                value:String(

                    summary.procurement.totalBags

                )

            },

            {

                icon:"",

                title:"Top Farmer",

                value:

                    summary.procurement.topFarmer

            }

        ],

        y,

        2

    );



    /* ==========================================================

       DEDUCTION ANALYSIS

    ========================================================== */

    y += 10;

y=ensurePageSpace(

doc,

y,

45,

"Procurement Report",
"Paddy Procurement Analysis"

);

drawSectionDivider(

        doc,

        "DEDUCTION ANALYSIS",

        y

    );



    y += 10;



    y=ensurePageSpace(

doc,

y,

70,

"Procurement Report",
"Paddy Procurement Analysis"

);

y = drawMetricGrid(

        doc,

        [

            {

                icon:"",

                title:"Hamali Charges",

                value:money(

                    summary.procurement.totalHamali

                )

            },

            {

                icon:"",

                title:"Weigh Bridge",

                value:money(

                    summary.procurement.totalWeighBridge

                )

            },

            {

                icon:"",

                title:"Cash Cutting",

                value:money(

                    summary.procurement.totalCashCutting

                )

            },

            {

                icon:"",

                title:"Final Procurement",

                value:money(

                    summary.procurement.totalAmount

                )

            }

        ],

        y,

        2

    );

        /* ==========================================================

       PROCUREMENT TRANSACTIONS - PAGE 1

    ========================================================== */

    drawFooter(doc);

    doc.addPage();

    drawHeader(

        doc,

        "Procurement Transactions",

        "Operational Details"

    );

    y = 30;

    const procurementRowsOne =

        data.procurement.map(item => [

            item.date,

            item.farmerName,

            item.procurementYear,

            item.seasonType,

            item.riceType,

            qty(item.quantity),

            item.numberOfBags,

        ]);

    y = drawReportTable(

        doc,

        "Procurement Records",

        [

            "Date",

            "Farmer",

            "Year",

            "Season",

            "Rice",

            "Qty",

            "Bags"  

        ],

        procurementRowsOne,

        y

    );



    drawFooter(doc);



    /* ==========================================================

       PROCUREMENT TRANSACTIONS - PAGE 2

    ========================================================== */

    doc.addPage();

    drawHeader(

        doc,

        "Procurement Transactions",

        "Financial Details"

    );

    y = 30;

    const procurementRowsTwo =

        data.procurement.map(item => [

            item.farmerName,

            qty(item.moistureCutting),

            qty(item.netWeight),

            money(item.pricePerQuintal),

            money(item.hamaliCharges),

            money(item.weighBridgeCharges),

            money(item.cashCutting),

            money(item.finalAmount)

        ]);

    y = drawReportTable(

        doc,

        "Financial Breakdown",

        [

            "Farmer",

            "Moisture",

            "Net Wt",

            "Rate",

            "Hamali",

            "Weigh Bridge",

            "Cash",

            "Final"

        ],

        procurementRowsTwo,

        y

    );

    drawFooter(doc);



    /* ==========================================================

       PROCUREMENT INSIGHTS

    ========================================================== */

    doc.addPage();

    drawHeader(

        doc,

        "Procurement Insights",

        "Business Analysis"

    );

    y = 30;

        y=ensurePageSpace(

doc,

y,

120,

"Procurement Report",
"Paddy Procurement Analysis"

);

y = drawInsightBox(

        doc,

        "PROCUREMENT INSIGHTS",

        [

            `Total Procurement Quantity : ${qty(summary.procurement.totalQuantity)} Quintals.`,

            `Total Procurement Amount : ${money(summary.procurement.totalAmount)}.`,

            `Average Procurement Price : ${money(summary.procurement.averagePrice)} per Quintal.`,

            `Highest Procurement was from ${summary.procurement.topFarmer}.`,

            `Net Paddy Procured : ${qty(summary.procurement.totalNetWeight)} Quintals.`,
            `Total Moisture Deduction : ${qty(summary.procurement.totalMoisture)} Kg.`,

            `Total Number of Bags Received : ${summary.procurement.totalBags}.`,

            `Total Hamali Charges Paid : ${money(summary.procurement.totalHamali)}.`,

            `Total Weigh Bridge Charges : ${money(summary.procurement.totalWeighBridge)}.`,

            `Total Cash Cutting : ${money(summary.procurement.totalCashCutting)}.`,

            summary.procurement.averageMoisture <= 2

                ? "Moisture deduction is within acceptable limits."

                : "Average moisture deduction should be monitored to reduce procurement losses.",

            summary.procurement.totalCashCutting > 0

                ? "Cash deductions were applied during procurement."

                : "No cash deductions were recorded.",

            "Regular monitoring of procurement cost and moisture deduction improves milling profitability."

        ],

        y

    );



    drawFooter(doc);

};