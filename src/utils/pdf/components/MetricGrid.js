import {
    PAGE,
    COLORS
} from "../pdfTheme";

export const drawMetricGrid = (
    doc,
    metrics,
    startY,
    columns = 2
) => {

    const gap = 8;

    const cardHeight = 26;

    const cardWidth =
        (
            PAGE.contentWidth -
            gap * (columns - 1)
        ) / columns;

    metrics.forEach((metric, index) => {

        const row =
            Math.floor(index / columns);

        const col =
            index % columns;

        const x =
            PAGE.margin +
            col * (cardWidth + gap);

        const y =
            startY +
            row * (cardHeight + gap);

        /* Shadow */

        doc.setFillColor(242);

        doc.roundedRect(
            x + 1,
            y + 1,
            cardWidth,
            cardHeight,
            3,
            3,
            "F"
        );

        /* Card */

        doc.setFillColor(252);

        doc.roundedRect(
            x,
            y,
            cardWidth,
            cardHeight,
            3,
            3,
            "F"
        );

        /* Border */

        doc.setDrawColor(
            ...COLORS.border
        );

        doc.roundedRect(
            x,
            y,
            cardWidth,
            cardHeight,
            3,
            3
        );

        /* Title */

        doc.setFont(
            "helvetica",
            "normal"
        );

        doc.setFontSize(8);

        doc.setTextColor(135);

        doc.text(
            metric.icon || "",
            x + 4,
            y + 8
        );

        doc.text(
            metric.title,
            x + 12,
            y + 8
        );

        /* Value */

        doc.setFont(
            "helvetica",
            "bold"
        );

        doc.setFontSize(12);

        doc.setTextColor(
            ...COLORS.heading
        );

        doc.text(
            String(metric.value),
            x + 4,
            y + 20
        );

    });

    const rows =
        Math.ceil(
            metrics.length /
            columns
        );

    return (
        startY +
        rows *
        (cardHeight + gap)
    );

};