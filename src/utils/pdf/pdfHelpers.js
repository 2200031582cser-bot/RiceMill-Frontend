import autoTable from "jspdf-autotable";
import { PAGE, COLORS, FONT, CARD, TABLE } from "./pdfTheme";

/* ==========================================================
   FORMATTERS
========================================================== */

export const money = (value = 0) =>

  `Rs ${Number(value).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}`;

export const qty = (value = 0) =>

  Number(value).toLocaleString("en-IN", {
    maximumFractionDigits: 2
  });

export const percent = (value = 0) =>

  `${Number(value).toFixed(2)} %`;

export const number = (value = 0) =>

  Number(value || 0);

export const formatDate = (date) => {

  if (!date) return "-";

  try {

    return new Date(date).toLocaleDateString("en-IN");

  }

  catch {

    return date;

  }

};

/* ==========================================================
   PAGE HEADER
========================================================== */

export const drawHeader = (

  doc,

  title,

  subtitle = ""

) => {

  doc.setFillColor(...COLORS.primary);

  doc.rect(

    0,

    0,

    PAGE.width,

    24,

    "F"

  );

  doc.setTextColor(255);

  doc.setFont(

    "helvetica",

    "bold"

  );

  doc.setFontSize(FONT.heading);

  doc.text(

    title,

    PAGE.margin,

    15

  );

  doc.setFont(

    "helvetica",

    "normal"

  );

  doc.setFontSize(FONT.small);

  doc.text(

    subtitle,

    PAGE.margin,

    21

  );

};

/* ==========================================================
   FOOTER
========================================================== */

export const drawFooter = (doc) => {

  const page =

    doc.getCurrentPageInfo().pageNumber;

  doc.setDrawColor(...COLORS.border);

  doc.line(

    PAGE.margin,

    PAGE.footerY,

    PAGE.width - PAGE.margin,

    PAGE.footerY

  );

  doc.setTextColor(...COLORS.lightText);

  doc.setFontSize(FONT.small);

  doc.text(

    `Generated : ${new Date().toLocaleString()}`,

    PAGE.margin,

    PAGE.footerY + 5

  );

  doc.text(

    `Page ${page}`,

    PAGE.width - PAGE.margin,

    PAGE.footerY + 5,

    {

      align: "right"

    }

  );

};

/* ==========================================================
   SECTION TITLE
========================================================== */

export const drawSectionTitle = (

  doc,

  title,

  y

) => {

  doc.setFont(

    "helvetica",

    "bold"

  );

  doc.setFontSize(FONT.subHeading);

  doc.setTextColor(...COLORS.heading);

  doc.text(

    title,

    PAGE.margin,

    y

  );

};

/* ==========================================================
   KPI CARD
========================================================== */

export const drawCard = (

  doc,

  x,

  y,

  w,

  title,

  value,

  color = COLORS.primary

) => {

  doc.setFillColor(...COLORS.background);

  doc.roundedRect(

    x,

    y,

    w,

    CARD.height,

    CARD.radius,

    CARD.radius,

    "F"

  );

  doc.setDrawColor(...COLORS.border);

  doc.roundedRect(

    x,

    y,

    w,

    CARD.height,

    CARD.radius,

    CARD.radius

  );

  doc.setFont(

    "helvetica",

    "normal"

  );

  doc.setFontSize(FONT.small);

  doc.setTextColor(...COLORS.lightText);

  doc.text(

    title,

    x + 5,

    y + 8

  );

  doc.setFont(

    "helvetica",

    "bold"

  );

  doc.setFontSize(12);

  doc.setTextColor(...color);

  doc.text(

    value,

    x + 5,

    y + 20

  );

};

/* ==========================================================
   KPI ROW
========================================================== */

export const drawFourCards = (

  doc,

  cards

) => {

  const width = 42;

  const gap = 5;

  const y = 35;

  cards.forEach((card, index) => {

    drawCard(

      doc,

      PAGE.margin + index * (width + gap),

      y,

      width,

      card.title,

      card.value,

      card.color

    );

  });

};

/* ==========================================================
   TABLE
========================================================== */

export const drawTable = (

  doc,

  head,

  body,

  startY

) => {

  autoTable(doc, {

    startY,

    head,

    body,

    theme: "grid",

    margin: {

      left: PAGE.margin,

      right: PAGE.margin

    },

    styles: {

      fontSize: TABLE.fontSize,

      cellPadding: TABLE.cellPadding

    },

    headStyles: {

      fillColor: TABLE.headerFill,

      textColor: 255,

      fontStyle: "bold"

    },

    alternateRowStyles: {

      fillColor: TABLE.alternateFill

    }

  });

};

/* ==========================================================
   NEXT Y POSITION
========================================================== */

export const nextY = (

  doc,

  gap = 10

) => {

  if (!doc.lastAutoTable)

    return 35;

  return doc.lastAutoTable.finalY + gap;

};

/* ==========================================================
   PAGE BREAK
========================================================== */

export const checkPage = (

  doc,

  neededHeight = 40

) => {

  let currentY = nextY(doc);

  if (

    currentY + neededHeight >

    270

  ) {

    drawFooter(doc);

    doc.addPage();

    return 20;

  }

  return currentY;

};