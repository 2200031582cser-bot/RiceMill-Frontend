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

export const drawEmployeeSection = (

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

        "Employee Report",

        "Human Resource & Payroll Analysis"

    );



    /* ==========================================================

       KPI DASHBOARD

    ========================================================== */



    y = drawKPIGrid(

        doc,

        [

            {

                icon:"",

                title:"Employees",

                value:String(

                    summary.employee.totalEmployees

                ),

                status:"Registered",

                color:COLORS.primary

            },

            {

                icon:"",

                title:"Salary Paid",

                value:money(

                    summary.employee.totalSalaryPaid

                ),

                status:"Disbursed",

                color:COLORS.success

            },

            {

                icon:"",

                title:"Balance",

                value:money(

                    summary.employee.totalBalance

                ),

                status:"Pending",

                color:COLORS.danger

            },

            {

                icon:"",

                title:"Attendance",

                value:percent(

                    summary.attendance.attendancePercentage

                ),

                status:"Overall",

                color:COLORS.info

            }

        ],

        y

    );



    /* ==========================================================

       PAYROLL SUMMARY

    ========================================================== */





y=ensurePageSpace(

doc,

y,

45,

"Employee Report",
"Human Resource & Payroll Analysis"

);
    y += 10;

drawSectionDivider(

        doc,

        "PAYROLL SUMMARY",

        y

    );







    y=ensurePageSpace(

doc,

y,

70,

"Employee Report",
"Human Resource & Payroll Analysis"

);
    y += 10;

y = drawMetricGrid(

        doc,

        [

            {

                icon:"",

                title:"Monthly Salary Cost",

                value:

                    money(

                        summary.employee.monthlySalaryCost

                    )

            },

            {

                icon:"",

                title:"Final Salary",

                value:

                    money(

                        summary.employee.totalFinalSalary

                    )

            },

            {

                icon:"",

                title:"Salary Paid",

                value:

                    money(

                        summary.employee.totalSalaryPaid

                    )

            },

            {

                icon:"",

                title:"Outstanding",

                value:

                    money(

                        summary.employee.totalBalance

                    )

            },

            {

                icon:"",

                title:"Average Daily Wage",

                value:

                    money(

                        summary.employee.averageDailyWage

                    )

            },

            {

                icon:"",

                title:"Highest Paid",

                value:

                    summary.employee.highestPaidEmployee

            }

        ],

        y,

        2

    );



    /* ==========================================================

       ATTENDANCE SUMMARY

    ========================================================== */




y=ensurePageSpace(

doc,

y,

45,

"Employee Report",
"Human Resource & Payroll Analysis"

);


    y += 10;

drawSectionDivider(

        doc,

        "ATTENDANCE SUMMARY",

        y

    );







    y=ensurePageSpace(

doc,

y,

70,

"Employee Report",
"Human Resource & Payroll Analysis"

);

    y += 10;

y = drawMetricGrid(

        doc,

        [

            {

                icon:"",

                title:"Full Days",

                value:

                    String(

                        summary.attendance.fullDays

                    )

            },

            {

                icon:"",

                title:"Half Days",

                value:

                    String(

                        summary.attendance.halfDays

                    )

            },

            {

                icon:"",

                title:"Absent Days",

                value:

                    String(

                        summary.attendance.absent

                    )

            },

            {

                icon:"",

                title:"Attendance",

                value:

                    percent(

                        summary.attendance.attendancePercentage

                    )

            }

        ],

        y,

        2

    );

        /* ==========================================================

       EMPLOYEE REGISTER

    ========================================================== */

    drawFooter(doc);

    doc.addPage();

    drawHeader(

        doc,

        "Employee Register",

        "Employee Master Records"

    );

    y = 30;

    const employeeRows =

        data.employees.map(item => [

            item.employeeName,

            item.phoneNumber,

            item.joiningDate,

            money(item.monthlySalary),

            money(item.dailyWage)

        ]);

    y = drawReportTable(

        doc,

        "Employee Details",

        [

            "Employee",

            "Phone",

            "Joining Date",

            "Monthly Salary",

            "Daily Wage"

        ],

        employeeRows,

        y

    );

    drawFooter(doc);



    /* ==========================================================

       SALARY TRANSACTIONS

    ========================================================== */

    doc.addPage();

    drawHeader(

        doc,

        "Salary Transactions",

        "Payroll Records"

    );

    y = 30;

    const salaryRows =

        data.salary.map(item => [

            item.employeeName,

            item.monthName,

            money(item.monthlyFixed),

            money(item.dailyWage),

            item.fullDays,

            item.halfDays,

            money(item.finalSalary),

            money(item.amountPaid),

            money(item.balanceAmount)

        ]);

    y = drawReportTable(

        doc,

        "Salary Register",

        [

            "Employee",

            "Month",

            "Monthly",

            "Daily",

            "Full",

            "Half",

            "Final",

            "Paid",

            "Balance"

        ],

        salaryRows,

        y

    );

    drawFooter(doc);



    /* ==========================================================

       EMPLOYEE INSIGHTS

    ========================================================== */

    doc.addPage();

    drawHeader(

        doc,

        "Employee Insights",

        "Workforce Performance"

    );

    y = 30;

        y=ensurePageSpace(

doc,

y,

120,

"Employee Report",
"Human Resource & Payroll Analysis"

);

y = drawInsightBox(

        doc,

        "EMPLOYEE INSIGHTS",

        [

            `Total Employees Registered : ${summary.employee.totalEmployees}.`,

            `Total Monthly Salary Cost : ${money(summary.employee.monthlySalaryCost)}.`,

            `Total Final Salary Calculated : ${money(summary.employee.totalFinalSalary)}.`,

            `Total Salary Paid : ${money(summary.employee.totalSalaryPaid)}.`,

            `Outstanding Salary Balance : ${money(summary.employee.totalBalance)}.`,

            `Average Daily Wage : ${money(summary.employee.averageDailyWage)}.`,

            `Highest Paid Employee : ${summary.employee.highestPaidEmployee}.`,

            `Overall Attendance : ${percent(summary.attendance.attendancePercentage)}.`,

            `Full Attendance Records : ${summary.attendance.fullDays}.`,

            `Half Day Records : ${summary.attendance.halfDays}.`,

            `Absent Records : ${summary.attendance.absent}.`,

            summary.attendance.attendancePercentage >= 90

                ? "Employee attendance is excellent."

                : summary.attendance.attendancePercentage >= 75

                ? "Employee attendance is satisfactory."

                : "Employee attendance should be improved.",

            summary.employee.totalBalance > 0

                ? "There are pending salary payments that require attention."

                : "All employee salaries have been settled.",

            summary.employee.averageDailyWage > 0

                ? "Daily wage structure is available for temporary employees."

                : "No daily wage records were found.",

            "Regular attendance monitoring and timely salary payments help improve workforce productivity."

        ],

        y

    );



    drawFooter(doc);

};