import autoTable from "jspdf-autotable";

import {

    PAGE,

    TABLE

} from "../pdfTheme";

export const drawReportTable = (

    doc,

    title,

    headers,

    rows,

    startY

) => {

    doc.setFont(

        "helvetica",

        "bold"

    );

    doc.setFontSize(13);

    doc.setTextColor(

        70,

        70,

        70

    );

    doc.text(

        title,

        PAGE.margin,

        startY

    );

    autoTable(

        doc,

        {

            startY: startY + 6,

            head: [headers],

            body: rows,

            theme: "grid",

            margin: {

                top: 25,

                bottom: 22,

                left: PAGE.margin,

                right: PAGE.margin

            },

            styles:{

    fontSize:10,

    cellPadding:2.5,

    overflow:"linebreak",

    valign:"middle",

                lineColor: [230,230,230],

                lineWidth: 0.2,

                textColor: [80,80,80]

            },

            headStyles: {

                fillColor: TABLE.headerFill,

                textColor: 255,

                fontStyle: "bold",

                halign: "center",

                valign: "middle"

            },

            bodyStyles: {

                valign: "middle"

                

            },

            columnStyles:{

    0:{cellWidth:22},

    1:{cellWidth:38},

    2:{cellWidth:32},

    3:{cellWidth:"auto"},

    4:{halign:"center"},

    5:{halign:"right"}

},
            alternateRowStyles: {

                fillColor: TABLE.alternateFill

            },

            didDrawPage: function () {

    // Empty for now

},

        }

    );

    return doc.lastAutoTable
    ? doc.lastAutoTable.finalY
    : startY;

};