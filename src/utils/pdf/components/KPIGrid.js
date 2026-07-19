import {
    PAGE,
    COLORS
} from "../pdfTheme";

export const drawKPIGrid = (
    doc,
    cards,
    startY = 30,
    columns = 4
) => {

    const gap = 6;

    const cardHeight = 38;

    const cardWidth =
        (
            PAGE.contentWidth -
            gap * (columns - 1)
        ) / columns;

    cards.forEach((card, index) => {

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

        doc.setFillColor(240);

        doc.roundedRect(
            x + 1,
            y + 1,
            cardWidth,
            cardHeight,
            4,
            4,
            "F"
        );

        /* Card */

        doc.setFillColor(255);

        doc.roundedRect(
            x,
            y,
            cardWidth,
            cardHeight,
            4,
            4,
            "F"
        );

        /* Border */

        doc.setDrawColor(
            ...(card.color || COLORS.primary)
        );

        doc.roundedRect(
            x,
            y,
            cardWidth,
            cardHeight,
            4,
            4
        );

        /* Title */

        doc.setFont(
            "helvetica",
            "normal"
        );

        doc.setFontSize(8);

        doc.setTextColor(130);

        doc.text(
            card.icon,
            x + 4,
            y + 8
        );

        doc.text(
            card.title,
            x + 12,
            y + 8
        );

        /* Value */

        doc.setFont(
            "helvetica",
            "bold"
        );

        doc.setFontSize(14);

        doc.setTextColor(
            ...(card.color || COLORS.primary)
        );

        doc.text(
            card.value,
            x + 4,
            y + 20
        );

        /* Status Badge */

        const badgeWidth = Math.max(
            22,
            doc.getTextWidth(card.status) + 8
        );

        let badgeColor = COLORS.info;

        if (
            card.status
                .toLowerCase()
                .includes("profit") ||

            card.status
                .toLowerCase()
                .includes("healthy") ||

            card.status
                .toLowerCase()
                .includes("excellent")
        ) {

            badgeColor = COLORS.success;

        }

        else if (

            card.status
                .toLowerCase()
                .includes("loss") ||

            card.status
                .toLowerCase()
                .includes("poor") ||

            card.status
                .toLowerCase()
                .includes("attention")

        ) {

            badgeColor = COLORS.danger;

        }

        else if (

            card.status
                .toLowerCase()
                .includes("average")

        ) {

            badgeColor = COLORS.warning;

        }

        doc.setFillColor(
            ...badgeColor
        );

        doc.roundedRect(

            x + 4,

            y + 28,

            badgeWidth,

            8,

            3,

            3,

            "F"

        );

        doc.setFont(
            "helvetica",
            "bold"
        );

        doc.setFontSize(7);

        doc.setTextColor(255);

        doc.text(

            card.status,

            x + 8,

            y + 33.5

        );

    });

    const rows =
        Math.ceil(
            cards.length /
            columns
        );

    return (

        startY +

        rows *

        (cardHeight + gap)

    );

};