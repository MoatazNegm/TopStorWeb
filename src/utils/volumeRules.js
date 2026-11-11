// The rule a new volume / share / LUN / bucket name must meet.  It mirrors the backend (TopStor/volvalid.py, which
// volumes/create applies with HTTP 400): 1 to 32 letters, digits, _ or -, starting with a letter or a digit.
// Returns '' when the name is fine (an empty field is left to `required`), otherwise the message to show.

export const VOLUME_NAME_MAX = 32;

export const volumeNameError = (name) => {
    const value = name ?? '';
    if (value === '') return '';
    if (value.length > VOLUME_NAME_MAX) return `Parameter too long (max ${VOLUME_NAME_MAX} characters).`;
    if (!/^[A-Za-z0-9][A-Za-z0-9_-]*$/.test(value)) {
        return 'Invalid character: use letters, digits, _ and - only, starting with a letter or digit.';
    }
    return '';
};
