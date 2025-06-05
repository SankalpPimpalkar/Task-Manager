function DdMmYYyyFormat(isoDateString) {
    if (!isoDateString) return 'Invalid date';

    const date = new Date(isoDateString);
    if (isNaN(date)) return 'Invalid date';

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
}

export default DdMmYYyyFormat