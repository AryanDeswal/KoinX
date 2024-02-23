// Function to check if a date is valid
function isValidDate(dateString) {
    const dateRegex = /^\d{2}-\d{2}-\d{4}$/;
    if (!dateString.match(dateRegex)) {
        return false; // Date format is invalid
    }

    const [day, month, year] = dateString.split('-').map(Number);
    if (month < 1 || month > 12) {
        return false; // Month is invalid
    }

    const daysInMonth = new Date(year, month, 0).getDate();
    if (day < 1 || day > daysInMonth) {
        return false; // Day is invalid
    }

    return true; // Date is valid
}

module.exports = { isValidDate };