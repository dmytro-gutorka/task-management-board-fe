export function parseNumber(envValue: string): number {
    const parsedNumber = Number(envValue);

    if (isNaN(parsedNumber)) throw new Error(`Expected a number, got ${parsedNumber}`);

    return parsedNumber;
}
