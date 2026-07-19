import {

    drawHeader,

    drawFooter,

    money,

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

export const drawExpenseSection = (

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

        "Expense Report",

        "Operational Expense Analysis"

    );



    /* ==========================================================

       KPI DASHBOARD

    ========================================================== */



    y = drawKPIGrid(

        doc,

        [

            {

                icon: "",

                title: "Total Expenses",

                value: money(

                    summary.expense.totalAmount

                ),

                status: "Operational",

                color: COLORS.danger

            },

            {

                icon: "",

                title: "Average Expense",

                value: money(

                    summary.expense.averageExpense

                ),

                status: "Per Entry",

                color: COLORS.warning

            },

            {

                icon: "",

                title: "Categories",

                value: String(

                    Object.keys(

                        summary.expense.categories

                    ).length

                ),

                status: "Expense Heads",

                color: COLORS.info

            },

            {

                icon: "",

                title: "Entries",

                value: String(

                    summary.expense.records

                ),

                status: "Recorded",

                color: COLORS.primary

            }

        ],

        y

    );



    /* ==========================================================

       EXPENSE BREAKDOWN

    ========================================================== */





y=ensurePageSpace(

doc,

y,

45,

"Expense Report",
"Operational Expense Analysis"

);
    y += 10;

drawSectionDivider(

        doc,

        "EXPENSE BREAKDOWN",

        y

    );






    y=ensurePageSpace(

doc,

y,

70,

"Expense Report",
"Operational Expense Analysis"

);

    y += 10;

y = drawMetricGrid(

        doc,

        [

            {

                icon: "",

                title: "Highest Category",

                value:

                    summary.expense.highestCategory

            },

            {

                icon: "",

                title: "Highest Amount",

                value:

                    money(

                        summary.expense.highestCategoryAmount

                    )

            },

            {

                icon: "",

                title: "Average Expense",

                value:

                    money(

                        summary.expense.averageExpense

                    )

            },

            {

                icon: "",

                title: "Total Expense",

                value:

                    money(

                        summary.expense.totalAmount

                    )

            }

        ],

        y,

        2

    );



    /* ==========================================================

       CATEGORY SUMMARY

    ========================================================== */





y=ensurePageSpace(

doc,

y,

45,

"Expense Report",
"Operational Expense Analysis"

);
    y += 10;
drawSectionDivider(

        doc,

        "CATEGORY SUMMARY",

        y

    );



    y += 10;



    const categoryCards =

        Object.entries(

            summary.expense.categories

        )

        .map(

            ([category, amount]) => ({

                icon: "",

                title: category,

                value: money(amount)

            })

        );



    y=ensurePageSpace(

doc,

y,

70,
"Expense Report",
"Operational Expense Analysis"

);

y = drawMetricGrid(

        doc,

        categoryCards,

        y,

        2

    );

        /* ==========================================================

       EXPENSE TRANSACTIONS

    ========================================================== */

    drawFooter(doc);

    doc.addPage();

    drawHeader(

        doc,

        "Expense Transactions",

        "Detailed Expense Records"

    );

    y = 30;

    const expenseRows =

        data.expenses.map(item => [

            item.expenseDate,

            item.expenseName,

            item.category,

            money(item.amount),

            item.description || "-"

        ]);

    y = drawReportTable(

        doc,

        "Expense Register",

        [

            "Date",

            "Expense",

            "Category",

            "Amount",

            "Description"

        ],

        expenseRows,

        y

    );

    drawFooter(doc);



    /* ==========================================================

       CATEGORY ANALYSIS

    ========================================================== */

    doc.addPage();

    drawHeader(

        doc,

        "Expense Categories",

        "Category Wise Expense Summary"

    );

    y = 30;

    const categoryRows =

        Object.entries(

            summary.expense.categories

        ).map(

            ([category, amount]) => [

                category,

                money(amount),

                percent(

                    (amount /

                        summary.expense.totalAmount) *

                    100

                )

            ]

        );

    y = drawReportTable(

        doc,

        "Expense Category Summary",

        [

            "Category",

            "Total Amount",

            "% of Expenses"

        ],

        categoryRows,

        y

    );

    drawFooter(doc);



    /* ==========================================================

       EXPENSE INSIGHTS

    ========================================================== */

    doc.addPage();

    drawHeader(

        doc,

        "Expense Insights",

        "Business Expense Analysis"

    );

    y = 30;

        y=ensurePageSpace(

doc,

y,

120,

"Expense Report",
"Operational Expense Analysis"

);

y = drawInsightBox(

        doc,

        "EXPENSE INSIGHTS",

        [

            `Total Operational Expenses : ${money(summary.expense.totalAmount)}.`,

            `Total Expense Entries : ${summary.expense.records}.`,

            `Average Expense Per Entry : ${money(summary.expense.averageExpense)}.`,

            `Highest Expense Category : ${summary.expense.highestCategory}.`,

            `Amount Spent in Highest Category : ${money(summary.expense.highestCategoryAmount)}.`,

            `Total Expense Categories Used : ${Object.keys(summary.expense.categories).length}.`,

            summary.expense.averageExpense >= 50000

                ? "Average expense value is comparatively high."

                : "Average expense value is within a normal range.",

            summary.expense.highestCategoryAmount >= (summary.expense.totalAmount * 0.40)

                ? "A large portion of expenses comes from one category."

                : "Expenses are well distributed across categories.",

            "Review recurring expenses periodically to identify possible cost savings.",

            "Monitor high-value operational expenses every month to improve profitability.",

            "Maintaining detailed expense records improves financial planning and audit readiness."

        ],

        y

    );



    drawFooter(doc);

};