export default function formatDate(dateString: string): string {
    const date = new Date(dateString);

    const options: Intl.DateTimeFormatOptions = {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    };

    const formattedDate = date.toLocaleDateString('en-GB', options);
    const [datePart, timePart] = formattedDate.split(', ');

    // Use default values if datePart or timePart is undefined
    return `${(datePart ?? '').toLowerCase()}, ${timePart ?? ''}`;
}