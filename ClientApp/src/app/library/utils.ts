export function _camelCase(key: string): any {
    return key?.length > 0 ? key[0].toLowerCase() + key.slice(1) : key;
}

export function _toSentenceCase(str: string): string {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}