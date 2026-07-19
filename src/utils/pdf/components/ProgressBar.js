import {
    PAGE
} from "../pdfTheme";

export const drawProgressBars = (
    doc,
    bars,
    startY
) => {

    const leftX = PAGE.margin;

    const rightX = 110;

    const barWidth = 70;

    const barHeight = 6;

    const rowHeight = 32;

    bars.forEach((bar, index) => {

        const x =
            index % 2 === 0
                ? leftX
                : rightX;

        const y =
            startY +
            Math.floor(index / 2) *
            rowHeight;

        /* -----------------------------
           Title
        ----------------------------- */

        doc.setFont(
            "helvetica",
            "bold"
        );

        doc.setFontSize(9);

        doc.setTextColor(90);

        doc.text(
            bar.title,
            x,
            y
        );

        /* -----------------------------
           Percentage
        ----------------------------- */

        const percentage =
            Math.max(
                0,
                Math.min(
                    Number(bar.percent) || 0,
                    100
                )
            );

        doc.setFont(
            "helvetica",
            "bold"
        );

        doc.setFontSize(8);

        doc.setTextColor(120);

        doc.text(

            percentage.toFixed(0) + "%",

            x + barWidth - 8,

            y

        );

        /* -----------------------------
           Background Bar
        ----------------------------- */

        doc.setFillColor(
            235,
            235,
            235
        );

        doc.roundedRect(

            x,

            y + 5,

            barWidth,

            barHeight,

            2,

            2,

            "F"

        );

        /* -----------------------------
           Filled Bar
        ----------------------------- */

        const fillWidth =
            (percentage / 100) *
            barWidth;

        doc.setFillColor(
            ...bar.color
        );

        doc.roundedRect(

            x,

            y + 5,

            fillWidth,

            barHeight,

            2,

            2,

            "F"

        );

        /* -----------------------------
           Value
        ----------------------------- */

        doc.setFont(
            "helvetica",
            "bold"
        );

        doc.setFontSize(10);

        doc.setTextColor(70);

        doc.text(

            String(bar.value),

            x,

            y + 18

        );

    });

    const rows =
        Math.ceil(
            bars.length / 2
        );

    return (
        startY +
        rows *
        rowHeight
    );

};