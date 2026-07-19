import {

    PAGE,

    COLORS,

    FONT

} from "../pdfTheme";

export const drawSectionDivider = (

    doc,

    title,

    startY

) => {

    doc.setDrawColor(

        ...COLORS.primary

    );

    doc.setLineWidth(0.8);

    doc.line(

        PAGE.margin,

        startY,

        PAGE.width - PAGE.margin,

        startY

    );

    doc.setFillColor(

        ...COLORS.primary

    );

    doc.roundedRect(

        PAGE.margin,

        startY - 5,

        55,

        10,

        2,

        2,

        "F"

    );

    doc.setFont(

        "helvetica",

        "bold"

    );

    doc.setFontSize(

        FONT.normal

    );

    doc.setTextColor(255);

    doc.text(

        title,

        PAGE.margin + 5,

        startY + 1

    );

};