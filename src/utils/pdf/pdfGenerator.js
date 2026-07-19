import jsPDF from "jspdf";

import { calculateSummary } from "./pdfSummary";

import { drawCoverSection } from "./sections/coverSection";
import { drawExecutiveSection } from "./sections/executiveSection";
import { drawProcurementSection } from "./sections/procurementSection";
import { drawMillingSection } from "./sections/millingSection";
import { drawSalesSection } from "./sections/salesSection";
import { drawWeighBridgeSection } from "./sections/weighBridgeSection";
import { drawGovernmentSection } from "./sections/governmentSection";
import { drawExpenseSection } from "./sections/expenseSection";
import { drawEmployeeSection } from "./sections/employeeSection";
import { drawBrokenRiceSection } from "./sections/brokenRiceSection";
import { drawAnalyticsSection } from "./sections/analyticsSection";
import { drawClosingSection } from "./sections/closingSection";
import { drawLedgerSection } from "./sections/ledgerSection";

export const generateBusinessReport = async (report) => {

    const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4"
    });

    report.summary = calculateSummary(report);

    drawCoverSection(doc, report);

    if (report.options.sections.summary) {

        doc.addPage();

        drawExecutiveSection(doc, report);

    }

    if (report.options.sections.procurement) {

        doc.addPage();

        drawProcurementSection(doc, report);

    }

    if (report.options.sections.brokenRice) {

    doc.addPage();

    drawBrokenRiceSection(doc, report);

}

    if (report.options.sections.milling) {

        doc.addPage();

        drawMillingSection(doc, report);

    }

    if (report.options.sections.sales) {

        doc.addPage();

        drawSalesSection(doc, report);

    }

    if (report.options.sections.ledger) {

    doc.addPage();

    drawLedgerSection(doc, report);

}

    if (report.options.sections.weighBridge) {

        doc.addPage();

        drawWeighBridgeSection(doc, report);

    }

    if (report.options.sections.government) {

        doc.addPage();

        drawGovernmentSection(doc, report);

    }

    if (report.options.sections.expenses) {

        doc.addPage();

        drawExpenseSection(doc, report);

    }

    if (
        report.options.sections.salary ||
        report.options.sections.attendance
    ) {

        doc.addPage();

        drawEmployeeSection(doc, report);

    }

    doc.addPage();

    drawAnalyticsSection(doc, report);

    doc.addPage();

    drawClosingSection(doc, report);

    const today = new Date();

    const fileName =
        `RiceMill_Business_Report_${
            today.getFullYear()
        }-${
            String(today.getMonth() + 1).padStart(2, "0")
        }-${
            String(today.getDate()).padStart(2, "0")
        }.pdf`;

    doc.save(fileName);

};