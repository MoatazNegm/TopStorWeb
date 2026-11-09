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

// severity of a log row: the type column holds the name (backend rows: type "warning"/"error"/"info", importance a number
// string "0"/"1"/"2"); importance only when it is itself a name (mock rows). Same rule as the toasts (NotificationPoller: notif.type).
const SEV_NAMES = ['error', 'warning', 'info'];
const sevName = (v) => { const s = String(v ?? '').trim().toLowerCase(); return SEV_NAMES.includes(s) ? s : ''; };
export const logSeverity = (l) => {
    const s = sevName(l?.type) || sevName(l?.importance);
    return s === 'error' || s === 'warning' ? s : 'info';
};

export const matchesLogSev = (l, kind) => {
    if (!kind) return true;
    if (kind === 'failedlogon') return l.msgcode === 'Lognfa0';
    return logSeverity(l) === kind;
};

export const LOGSEV_LABEL = { warning: 'Warnings', error: 'System Errors', failedlogon: 'Auth Failures' };
