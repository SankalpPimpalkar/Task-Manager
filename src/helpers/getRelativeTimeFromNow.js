export default function getRelativeTimeFromNow(dateString) {
    const now = new Date();
    const date = new Date(dateString);
    const diffMs = date - now;

    const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

    const units = [
        { max: 60, value: 1000, name: 'second' },
        { max: 3600, value: 1000 * 60, name: 'minute' },
        { max: 86400, value: 1000 * 60 * 60, name: 'hour' },
        { max: 604800, value: 1000 * 60 * 60 * 24, name: 'day' },
        { max: 2592000, value: 1000 * 60 * 60 * 24 * 7, name: 'week' },
        { max: 31536000, value: 1000 * 60 * 60 * 24 * 30, name: 'month' },
        { max: Infinity, value: 1000 * 60 * 60 * 24 * 365, name: 'year' },
    ];

    const diffSeconds = Math.abs(diffMs / 1000);

    for (const unit of units) {
        if (diffSeconds < unit.max) {
            const value = Math.round(diffMs / unit.value);
            return rtf.format(value, unit.name);
        }
    }
}
