function DueDateFormat(dateString) {
    const today = new Date();
    const dueDate = new Date(dateString);

    // Zero out the time for accurate day comparison
    today.setHours(0, 0, 0, 0);
    dueDate.setHours(0, 0, 0, 0);

    const diffTime = dueDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Due today";
    if (diffDays === 1) return "Due tomorrow";
    if (diffDays > 1) return `Due in ${diffDays} days`;
    if (diffDays === -1) return "Was due yesterday";
    return `Overdue by ${Math.abs(diffDays)} days`;
}

export default DueDateFormat