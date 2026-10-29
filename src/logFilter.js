// Severity filter handed from the navbar bell to the System Logs page.
// kind: 'warning' | 'error' | 'failedlogon' | '' (none)
const KEY = 'logsev';
const EVT = 'logsev-change';

export const getLogSev = () => {
    try { return sessionStorage.getItem(KEY) || ''; } catch (e) { return ''; }
};

export const setLogSev = (kind) => {
    try { if (kind) sessionStorage.setItem(KEY, kind); else sessionStorage.removeItem(KEY); } catch (e) { /* ignore */ }
    window.dispatchEvent(new CustomEvent(EVT));
};

export const onLogSev = (fn) => {
    window.addEventListener(EVT, fn);
    return () => window.removeEventListener(EVT, fn);
};

// severity of a log row: importance (mock and backend rows), else the type column
export const logSeverity = (l) => {
    const imp = String(l.importance ?? '').toLowerCase();
    // importance may be numeric ('1'/'2'); then the severity is in the type column
    const s = imp && !/^\d+$/.test(imp) ? imp : String(l.type || '').toLowerCase();
    return s === 'error' || s === 'warning' ? s : 'info';
};

export const matchesLogSev = (l, kind) => {
    if (!kind) return true;
    if (kind === 'failedlogon') return l.msgcode === 'Lognfa0';
    return logSeverity(l) === kind;
};

export const LOGSEV_LABEL = { warning: 'Warnings', error: 'System Errors', failedlogon: 'Auth Failures' };
