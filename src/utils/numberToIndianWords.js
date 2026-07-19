const ones = [
    "",
    "One",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
    "Ten",
    "Eleven",
    "Twelve",
    "Thirteen",
    "Fourteen",
    "Fifteen",
    "Sixteen",
    "Seventeen",
    "Eighteen",
    "Nineteen"
];

const tens = [
    "",
    "",
    "Twenty",
    "Thirty",
    "Forty",
    "Fifty",
    "Sixty",
    "Seventy",
    "Eighty",
    "Ninety"
];

function convertBelowHundred(num) {

    if (num < 20)
        return ones[num];

    return (
        tens[Math.floor(num / 10)] +
        (num % 10 ? " " + ones[num % 10] : "")
    );

}

function convertBelowThousand(num) {

    if (num < 100)
        return convertBelowHundred(num);

    return (
        ones[Math.floor(num / 100)] +
        " Hundred" +
        (num % 100
            ? " " + convertBelowHundred(num % 100)
            : "")
    );

}

export function numberToIndianWords(value) {

    value = Number(value);

    if (isNaN(value))
        return "";

    if (value === 0)
        return "Rupees Zero Only";

    const rupees = Math.floor(value);

    const paise = Math.round((value - rupees) * 100);

    let words = "";

    let crore = Math.floor(rupees / 10000000);

    let lakh = Math.floor((rupees % 10000000) / 100000);

    let thousand = Math.floor((rupees % 100000) / 1000);

    let hundred = rupees % 1000;

    if (crore)
        words += convertBelowThousand(crore) + " Crore ";

    if (lakh)
        words += convertBelowThousand(lakh) + " Lakh ";

    if (thousand)
        words += convertBelowThousand(thousand) + " Thousand ";

    if (hundred)
        words += convertBelowThousand(hundred);

    words = words.trim();

    if (paise > 0) {

        words +=
            " And " +
            convertBelowHundred(paise) +
            " Paise";

    }

    return "Rupees " + words + " Only";

}