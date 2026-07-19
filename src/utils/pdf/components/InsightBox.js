import {
    PAGE,
    COLORS,
    FONT
} from "../pdfTheme";

export const drawInsightBox = (
    doc,
    title,
    insights,
    startY
) => {

    const padding = 8;

    const lineHeight = 9;

    let boxHeight = 25;

insights.forEach((text) => {

    if (text === "") {

        boxHeight += 4;

    }

    else if (

        text === "BUSINESS STRENGTHS" ||

        text === "AREAS TO WATCH" ||

        text === "RECOMMENDATIONS"

    ) {

        boxHeight += 8;

    }

    else {

        const lines = doc.splitTextToSize(
    text,
    PAGE.contentWidth - (padding * 2) - 6
);

boxHeight += lines.length * lineHeight;

    }

});

    doc.setFillColor(
        ...COLORS.background
    );

    doc.roundedRect(
        PAGE.margin,
        startY,
        PAGE.contentWidth,
        boxHeight,
        4,
        4,
        "F"
    );

    doc.setDrawColor(
        ...COLORS.border
    );

    doc.roundedRect(
        PAGE.margin,
        startY,
        PAGE.contentWidth,
        boxHeight,
        4,
        4
    );

    doc.setFont(
        "helvetica",
        "bold"
    );

    doc.setFontSize(16);

    doc.setTextColor(
        ...COLORS.primary
    );

    doc.text(
        title,
        PAGE.margin + padding,
        startY + 10
    );

    doc.setFont(
        "helvetica",
        "normal"
    );

    doc.setFontSize(
        11
    );

    doc.setTextColor(
        ...COLORS.text
    );

    let currentY = startY + 20;

insights.forEach((text) => {

    if (text === "") {

        currentY += 4;

        return;

    }

    const heading =

        text === "BUSINESS STRENGTHS" ||

        text === "AREAS TO WATCH" ||

        text === "RECOMMENDATIONS";

    if (heading) {

        doc.setFont(
            "helvetica",
            "bold"
        );

        doc.setFontSize(13);

        doc.setTextColor(
            ...COLORS.primary
        );

        doc.text(

            text,

            PAGE.margin + padding,

            currentY

        );

        currentY += 8;

    }

    else {

        doc.setFont(
    "helvetica",
    "normal"
);

doc.setFontSize(11);

doc.setTextColor(
    ...COLORS.text
);

const lines = doc.splitTextToSize(
    text,
    PAGE.contentWidth - (padding * 2) - 6
);

doc.text(
    lines,
    PAGE.margin + padding + 3,
    currentY
);

currentY += lines.length * lineHeight;

    }

});

    return startY + boxHeight;

};