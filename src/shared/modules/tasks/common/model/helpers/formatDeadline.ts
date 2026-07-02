export function formatDeadline(deadline?: string | null) {
    if (!deadline) return null;

    const date = new Date(deadline);

    if (Number.isNaN(date.getTime())) return deadline;

    return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    }).format(date);
}
