export function parseBoolean(envValue: string): boolean {
    if (envValue !== 'true' && envValue !== 'false') {
        throw new Error(`Expected boolean value, but git ${envValue}`);
    }

    return envValue === 'true';
}
