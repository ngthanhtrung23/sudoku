export const set_intersection = (a: Set<any>, b: Set<any>): Set<any> => {
    return new Set([...a].filter(x => b.has(x)));
}

export const set_difference = (a: Set<any>, b: Set<any>): Set<any> => {
    return new Set([...a].filter(x => !b.has(x)));
}
