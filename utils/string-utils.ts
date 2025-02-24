export const formatUrlString = (str: string) => {
    return str.toLowerCase().replace(/\s+/g, '-');
};

export const formatParvaName = (name: string) => {
    return name
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};