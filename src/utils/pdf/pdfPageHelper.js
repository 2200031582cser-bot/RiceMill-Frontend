import { drawHeader, drawFooter } from "./pdfHelpers";

export const ensurePageSpace = (
    doc,
    currentY,
    requiredHeight,
    title,
    subtitle
) => {

    const PAGE_BOTTOM = 270;

    if (currentY + requiredHeight > PAGE_BOTTOM) {

        drawFooter(doc);

        doc.addPage();

        drawHeader(doc, title, subtitle);

        return 30;
    }

    return currentY;
};