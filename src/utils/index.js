export function isValidDate(date) {
    return date instanceof Date && !isNaN(date.getTime());
}

export function getMap(options) {
    return options.reduce((prev, next) => {
        prev[next.value] = next.label;
        return prev;
    }, {});
}
