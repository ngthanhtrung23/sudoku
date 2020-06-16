// Return: number of bit 1 of `n`.
export const bitCount = (n: number): number => {
    n = n - ((n >> 1) & 0x55555555)
    n = (n & 0x33333333) + ((n >> 2) & 0x33333333)
    return ((n + (n >> 4) & 0xF0F0F0F) * 0x1010101) >> 24
}

// Return: true if the corresponding bit of n is 1.
export const bitContains = (n: number, bit: number): boolean => {
    return ((n >> bit) & 1) > 0;
}

// Return: copy of n with corresponding bit set to 0.
export const bitRemoveIfExists = (n: number, bit: number): number => {
    if (!bitContains(n, bit)) {
        return n;
    }
    return n - (1<<bit);
}
