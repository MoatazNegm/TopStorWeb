// Everyone is every user, so as the group of a share it is exclusive: picking it clears the other groups, and picking
// another group while Everyone is selected takes Everyone out.  isEveryone(value) says whether a value is that group.
export const pickGroups = (before, after, isEveryone) => {
    const prev = Array.isArray(before) ? before : [];
    const next = Array.isArray(after) ? after : [];
    const added = next.filter((v) => !prev.includes(v));
    if (added.some(isEveryone)) return next.filter(isEveryone);
    if (next.some(isEveryone) && next.some((v) => !isEveryone(v))) return next.filter((v) => !isEveryone(v));
    return next;
};
