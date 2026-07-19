import {

    number

} from "./pdfHelpers";

/* ==========================================================
   COMMON HELPERS
========================================================== */

const sum = (

    list = [],

    field

) =>

    list.reduce(

        (total, item) =>

            total + number(item[field]),

        0

    );

const groupBy = (

    list = [],

    field

) => {

    const groups = {};

    list.forEach(item => {

        const key = item[field] || "Unknown";

        if (!groups[key]) {

            groups[key] = [];

        }

        groups[key].push(item);

    });

    return groups;

};

const filterByDate = (

    list = [],

    field,

    fromDate,

    toDate

) => {

    return list.filter(item => {

        if (!item[field]) return false;

        const current = new Date(item[field]);

        if (

            fromDate &&

            current < new Date(fromDate)

        ) {

            return false;

        }

        if (

            toDate &&

            current > new Date(toDate)

        ) {

            return false;

        }

        return true;

    });

};

/* ==========================================================
   PROCUREMENT SUMMARY
========================================================== */

const calculateProcurementSummary = (

    procurement

) => {

    const totalQuantity =

        sum(

            procurement,

            "quantity"

        );

    const totalAmount =

        sum(

            procurement,

            "finalAmount"

        );

    const totalFarmers =

        new Set(

            procurement.map(

                p => p.farmerName

            )

        ).size;

    const averagePrice =

        totalQuantity === 0

            ? 0

            :

            totalAmount /

            totalQuantity;

    const totalHamali =
    sum(
        procurement,
        "hamaliCharges"
    );

const totalWeighBridge =
    sum(
        procurement,
        "weighBridgeCharges"
    );

const totalCashCutting =
    sum(
        procurement,
        "cashCutting"
    );

const totalMoisture =
    sum(
        procurement,
        "moistureCutting"
    );

const totalNetWeight =
    sum(
        procurement,
        "netWeight"
    );

const totalGrossWeight =
    sum(
        procurement,
        "grossWeight"
    );

const totalBags =
    sum(
        procurement,
        "numberOfBags"
    );

const averageMoisture =
    procurement.length === 0
        ? 0
        : totalMoisture /
          procurement.length;

    let topFarmer = "-";

    let highestPurchase = 0;

    const farmerMap = {};

    procurement.forEach(item => {

        if (

            !farmerMap[

                item.farmerName

            ]

        ) {

            farmerMap[

                item.farmerName

            ] = 0;

        }

        farmerMap[

            item.farmerName

        ] +=

            number(

                item.quantity

            );

    });

    Object.entries(

        farmerMap

    ).forEach(

        ([name, amount]) => {

            if (

                amount >

                highestPurchase

            ) {

                highestPurchase = amount;

                topFarmer = name;

            }

        }

    );

    return {

    records:
        procurement.length,

    totalQuantity,

    totalAmount,

    totalFarmers,

    averagePrice,

    topFarmer,

    totalHamali,

    totalWeighBridge,

    totalCashCutting,

    totalMoisture,

    totalNetWeight,

    totalGrossWeight,

    totalBags,

    averageMoisture

};

};

/* ==========================================================
   MILLING SUMMARY
========================================================== */

const calculateMillingSummary = (

    milling

) => {

    const totalInput =

        sum(

            milling,

            "inputPaddy"

        );

    const totalRice =

        sum(

            milling,

            "outputRice"

        );

    const totalBrokenRice =

        sum(

            milling,

            "outputBrokenRice"

        );

    const recovery =

        totalInput === 0

            ? 0

            :

            (

                (

                    totalRice +

                    totalBrokenRice

                )

                /

                totalInput

            ) * 100;


    const totalSessions =
    milling.length;

const averageRecovery =
    totalSessions === 0
        ? 0
        :
        milling.reduce(

            (sum, item) => {

                const input =
                    number(item.inputPaddy);

                const output =
                    number(item.outputRice) +
                    number(item.outputBrokenRice);

                if (input === 0)
                    return sum;

                return (
                    sum +
                    (output / input) * 100
                );

            },

            0

        ) / totalSessions;

const thinRiceSessions =
    milling.filter(

        item =>

            item.riceType === "Thin"

    ).length;

const fatRiceSessions =
    milling.filter(

        item =>

            item.riceType === "Fat"

    ).length;

let bestSession = "-";

let bestRecovery = 0;

milling.forEach(item => {

    const input =
        number(item.inputPaddy);

    if (input === 0)
        return;

    const currentRecovery =

        (

            (

                number(item.outputRice) +

                number(item.outputBrokenRice)

            )

            /

            input

        ) * 100;

    if (

        currentRecovery >

        bestRecovery

    ) {

        bestRecovery =
            currentRecovery;

        bestSession =
            item.sessionNo;

    }

});
    return {

    records:

        milling.length,

    totalSessions,

    totalInput,

    totalRice,

    totalBrokenRice,

    recovery,

    averageRecovery,

    bestSession,

    bestRecovery,

    thinRiceSessions,

    fatRiceSessions

};

};

/* ==========================================================
   SALES SUMMARY
========================================================== */

const calculateSalesSummary = (

    sales

) => {

    const totalSales =

        sales.length;

    const totalRevenue =

        sum(

            sales,

            "totalAmount"

        );

    const received =

        sum(

            sales,

            "amountReceived"

        );

    const outstanding =

        totalRevenue -

        received;

    const totalQuantity =

        sum(

            sales,

            "quantity"

        );

    const totalCustomers =

        new Set(

            sales.map(

                s => s.customerName

            )

        ).size;

    const averageSale =

        totalSales === 0

            ? 0

            :

            totalRevenue /

            totalSales;

    const recoveryPercentage =

        totalRevenue === 0

            ? 0

            :

            (

                received /

                totalRevenue

            ) * 100;

    const paidSales =

        sales.filter(

            sale =>

                sale.paymentStatus === "PAID"

        ).length;

    const dueSales =

        sales.filter(

            sale =>

                sale.paymentStatus === "DUE"

        ).length;

    const discountSales =

        sales.filter(

            sale =>

                sale.paymentStatus === "DISCOUNT"

        ).length;



    /* ===========================================
       BEST CUSTOMER
    =========================================== */

    let bestCustomer = "-";

    let highestCustomerAmount = 0;

    const customerTotals = {};

    sales.forEach(item => {

        const customer =

            item.customerName || "-";

        customerTotals[customer] =

            (

                customerTotals[customer] ||

                0

            )

            +

            number(

                item.totalAmount

            );

    });

    Object.entries(

        customerTotals

    ).forEach(

        ([customer, amount]) => {

            if (

                amount >

                highestCustomerAmount

            ) {

                highestCustomerAmount =

                    amount;

                bestCustomer =

                    customer;

            }

        }

    );



    /* ===========================================
       BEST PRODUCT
    =========================================== */

    let bestProduct = "-";

    let highestProductAmount = 0;

    const productTotals = {};

    sales.forEach(item => {

        const product =

            item.productName || "-";

        productTotals[product] =

            (

                productTotals[product] ||

                0

            )

            +

            number(

                item.totalAmount

            );

    });

    Object.entries(

        productTotals

    ).forEach(

        ([product, amount]) => {

            if (

                amount >

                highestProductAmount

            ) {

                highestProductAmount =

                    amount;

                bestProduct =

                    product;

            }

        }

    );



    return {

        records:

            totalSales,

        totalSales,

        totalRevenue,

        received,

        outstanding,

        totalQuantity,

        totalCustomers,

        averageSale,

        recoveryPercentage,

        paidSales,

        dueSales,

        discountSales,

        bestCustomer,

        bestProduct

    };

};

/* ==========================================================
   WEIGH BRIDGE SUMMARY
========================================================== */

const calculateWeighBridgeSummary = (

    entries

) => {

    const cashIncome =

        entries

            .filter(

                e =>

                    e.paymentMode === "Cash"

            )

            .reduce(

                (sum, item) =>

                    sum +

                    number(item.amount),

                0

            );

    const upiIncome =

        entries

            .filter(

                e =>

                    e.paymentMode === "UPI"

            )

            .reduce(

                (sum, item) =>

                    sum +

                    number(item.amount),

                0

            );

    const creditIncome =

        entries

            .filter(

                e =>

                    e.paymentMode ===

                    "Monthly Credit"

            )

            .reduce(

                (sum, item) =>

                    sum +

                    number(item.amount),

                0

            );

    const totalIncome =

        cashIncome +

        upiIncome +

        creditIncome;

    const customers =

        new Set(

            entries.map(

                e =>

                    e.customerName

            )

        ).size;

    return {

        records:

            entries.length,

        customers,

        cashIncome,

        upiIncome,

        creditIncome,

        totalIncome

    };

};

/* ==========================================================
   LEDGER SUMMARY
========================================================== */

const calculateLedgerSummary = (

    ledger

) => {

    const records =

        ledger.length;

    const totalBill =

        sum(

            ledger,

            "billAmount"

        );

    const totalReceived =

        sum(

            ledger,

            "amountReceived"

        );

    const totalDue =

        sum(

            ledger,

            "dueAmount"

        );

    const pendingCustomers =

        ledger.filter(

            item =>

                number(item.dueAmount) > 0

        ).length;

    const clearedCustomers =

        ledger.filter(

            item =>

                number(item.dueAmount) === 0

        ).length;

    const recovery =

        totalBill === 0

            ? 0

            :

            (

                totalReceived /

                totalBill

            ) * 100;

    return {

        records,

        totalBill,

        totalReceived,

        totalDue,

        pendingCustomers,

        clearedCustomers,

        recovery

    };

};

/* ==========================================================
   GOVERNMENT SUMMARY
========================================================== */

const calculateGovernmentSummary = (

    government

) => {

    return {

        records:

            government.length,

        totalPaddy:

            sum(

                government,

                "paddyReceived"

            ),

        totalRice:

            sum(

                government,

                "riceDelivered"

            )

    };

};

/* ==========================================================
   BROKEN RICE SUMMARY
========================================================== */

const calculateBrokenRiceSummary = (

    brokenRice

) => {

    const records =

        brokenRice.length;

    const totalQuantity =

        sum(

            brokenRice,

            "quantity"

        );

    const totalValue =

        brokenRice.reduce(

            (sum, item) =>

                sum +

                (

                    number(item.quantity) *

                    number(item.price)

                ),

            0

        );

    const averagePrice =

        records === 0

            ? 0

            :

            brokenRice.reduce(

                (sum, item) =>

                    sum +

                    number(item.price),

                0

            ) / records;

    const highestPrice =

        records === 0

            ? 0

            :

            Math.max(

                ...brokenRice.map(

                    item =>

                        number(item.price)

                )

            );

    return {

        records,

        totalQuantity,

        totalValue,

        averagePrice,

        highestPrice

    };

};

/* ==========================================================
   EMPLOYEE SUMMARY
========================================================== */

const calculateEmployeeSummary = (

    employees = [],

    salaries = [],

    attendance =[]

) => {

    const totalEmployees =

        employees.length;

    const monthlySalaryCost =

        sum(

            employees,

            "monthlySalary"

        );

    const averageDailyWage =

        totalEmployees === 0

            ? 0

            :

            sum(

                employees,

                "dailyWage"

            ) /

            totalEmployees;

    const totalSalaryPaid =

        sum(

            salaries,

            "amountPaid"

        );

    const totalFinalSalary =

        sum(

            salaries,

            "finalSalary"

        );

    const totalBalance =

        sum(

            salaries,

            "balanceAmount"

        );

    const fullDays =

        attendance.filter(

            a =>

                a.status === "FULL_DAY"

        ).length;

    const halfDays =

        attendance.filter(

            a =>

                a.status === "FIRST_HALF" || a.status === "SECOND_HALF"

        ).length;

    const absentDays =

        attendance.filter(

            a =>

                a.status === "ABSENT"

        ).length;

    const attendancePercentage =

        attendance.length === 0

            ? 0

            :

            (

                (

                    fullDays +

                    halfDays * 0.5

                )

                /

                attendance.length

            ) * 100;

    let highestPaidEmployee = "-";

    let highestSalary = 0;

    salaries.forEach(item => {

        if (

            number(

                item.finalSalary

            ) >

            highestSalary

        ) {

            highestSalary =

                number(

                    item.finalSalary

                );

            highestPaidEmployee =

                item.employeeName;

        }

    });

    return {

        totalEmployees,

        monthlySalaryCost,

        averageDailyWage,

        totalSalaryPaid,

        totalFinalSalary,

        totalBalance,

        fullDays,

        halfDays,

        absentDays,

        attendancePercentage,

        highestPaidEmployee,

        highestSalary

    };

};

/* ==========================================================
   ATTENDANCE SUMMARY
========================================================== */

const calculateAttendanceSummary = (

    attendance

) => {

    const fullDays =

        attendance.filter(

            a =>

                a.status === "FULL_DAY"

        ).length;

    const halfDays =

        attendance.filter(

            a =>

                a.status === "FIRST_HALF" ||

                a.status === "SECOND_HALF"

        ).length;

    const absent =

        attendance.filter(

            a =>

                a.status === "ABSENT"

        ).length;

    const attendancePercentage =
    attendance.length === 0
        ? 0
        :
        (
            (
                fullDays +
                halfDays * 0.5
            )
            /
            attendance.length
        ) * 100;

    return {

        records:

            attendance.length,

        fullDays,

        halfDays,

        absent,

        attendancePercentage

    };

};

/* ==========================================================
   SALARY SUMMARY
========================================================== */

const calculateSalarySummary = (

    salary

) => {

    return {

        totalSalary:

            sum(

                salary,

                "finalSalary"

            ),

        amountPaid:

            sum(

                salary,

                "amountPaid"

            ),

        balance:

            sum(

                salary,

                "balanceAmount"

            )

    };

};

/* ==========================================================
   EXPENSE SUMMARY
========================================================== */
/* ==========================================================
   EXPENSE SUMMARY
========================================================== */

const calculateExpenseSummary = (

    expenses

) => {

    const records =

        expenses.length;

    const totalAmount =

        sum(

            expenses,

            "amount"

        );

    const averageExpense =

        records === 0

            ? 0

            :

            totalAmount /

            records;

    const categories = {};

    expenses.forEach(item => {

        const category =

            item.category || "Others";

        categories[category] =

            (

                categories[category] ||

                0

            )

            +

            number(

                item.amount

            );

    });

    let highestCategory = "-";

    let highestCategoryAmount = 0;

    Object.entries(categories).forEach(

        ([category, amount]) => {

            if (

                amount >

                highestCategoryAmount

            ) {

                highestCategoryAmount =

                    amount;

                highestCategory =

                    category;

            }

        }

    );

    return {

        records,

        totalAmount,

        averageExpense,

        highestCategory,

        highestCategoryAmount,

        categories

    };

};

/* ==========================================================
   ANALYTICS
========================================================== */

const calculateAnalytics = (

    summary

) => {

    const revenue =

    summary.sales.totalRevenue +

    summary.weighBridge.totalIncome;

    const expenses =

        summary.procurement.totalAmount +

        summary.brokenRice.totalValue +

        summary.expense.totalAmount +

        summary.salary.totalSalary;
    const profit =

        revenue -

        expenses;

    const profitMargin =

        revenue === 0

            ? 0

            : (profit / revenue) * 100;

    const healthScore =

        Math.max(

            0,

            Math.min(

                100,

                (

                    summary.sales.recoveryPercentage * 0.30 +

                    summary.milling.recovery * 0.25 +

                    summary.attendance.attendancePercentage * 0.15 +

                    Math.max(0, profitMargin) * 0.30

                )

            )

        );

    return {

        revenue,

        expenses,

        profit,

        profitMargin,

        healthScore,

        recovery:

            summary.milling.recovery,

        salesRecovery:

            summary.sales.recoveryPercentage,

        ledgerRecovery:

            summary.ledger.recovery,

        topFarmer:

            summary.procurement.topFarmer,

        bestCustomer:

            summary.sales.bestCustomer,

        bestProduct:

            summary.sales.bestProduct,

        attendance:

            summary.attendance.attendancePercentage,

        outstanding:

            summary.ledger.totalDue,

        salaryExpense:

            summary.salary.totalSalary,

        procurementExpense:

            summary.procurement.totalAmount,

        brokenRiceExpense:

            summary.brokenRice.totalValue,

        miscExpense:

            summary.expense.totalAmount,

        weighBridgeIncome:

            summary.weighBridge.totalIncome

    };

};

const calculateDashboardSummary = (summary) => {

    return {

        revenue:
            summary.analytics.revenue,

        expenses:
            summary.analytics.expenses,

        profit:
            summary.analytics.profit,

        healthScore:
            summary.analytics.healthScore,

        outstanding:
            summary.ledger.totalDue,

        collections:
            summary.ledger.totalReceived,

        recovery:
            summary.milling.recovery,

        bestCustomer:
            summary.sales.bestCustomer,

        bestProduct:
            summary.sales.bestProduct,

        topFarmer:
            summary.procurement.topFarmer,

        attendance:
            summary.attendance.attendancePercentage,

        weighBridgeIncome:
            summary.weighBridge.totalIncome,

        totalProcurement:
    summary.procurement.totalQuantity,

        totalSales:
    summary.sales.totalRevenue,

totalCustomers:
    summary.sales.totalCustomers,

totalFarmers:
    summary.procurement.totalFarmers,

totalEmployees:
    summary.employee.totalEmployees,

governmentPaddy:
    summary.government.totalPaddy,

governmentRice:
    summary.government.totalRice
    };

};

/* ==========================================================
   MASTER SUMMARY
========================================================== */

export const calculateSummary = (

    report

) => {

    const {

        options,

        data

    } = report;

    const {

        fromDate,

        toDate

    } = options;

    const procurement =

        filterByDate(

            data.procurement,

            "date",

            fromDate,

            toDate

        );

    const milling =

        filterByDate(

            data.milling,

            "date",

            fromDate,

            toDate

        );

    const sales =

        filterByDate(

            data.sales,

            "saleDate",

            fromDate,

            toDate

        );

    const ledger =

    filterByDate(

        data.ledger,

        "ledgerDate",

        fromDate,

        toDate

    );

    const expenses =

        filterByDate(

            data.expenses,

            "expenseDate",

            fromDate,

            toDate

        );

    const brokenRice =

    filterByDate(

        data.brokenRice,

        "date",

        fromDate,

        toDate

    );

    const attendance =

        filterByDate(

            data.attendance,

            "attendanceDate",

            fromDate,

            toDate

        );

    const weighBridge =

filterByDate(

data.weighBridge,

"entryDate",

fromDate,

toDate

);

    const summary = {

        procurement:

            calculateProcurementSummary(

                procurement

            ),

        brokenRice:

    calculateBrokenRiceSummary(

        brokenRice

    ),

        milling:

            calculateMillingSummary(

                milling

            ),

        sales:

            calculateSalesSummary(

                sales

            ),

        weighBridge:

            calculateWeighBridgeSummary(

                weighBridge 

            ),

        ledger:

    calculateLedgerSummary(

        ledger

    ),

        government:

            calculateGovernmentSummary(

                data.government

            ),

        employee:

    calculateEmployeeSummary(

        data.employees,

        data.salary,

        attendance

    ),

        attendance:

            calculateAttendanceSummary(

                attendance

            ),

        salary:

            calculateSalarySummary(

                data.salary

            ),

        expense:

            calculateExpenseSummary(

                expenses

            )

    };

    summary.analytics =

        calculateAnalytics(

            summary

        );

    summary.dashboard =
    calculateDashboardSummary(summary);

    return summary;

};
