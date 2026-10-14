// Global click debounce. A human who double-clicks (or hammers) OK / Cancel /
// Submit / Delete must produce ONE action, not one request per click. The
// listener runs in the capture phase on the document, so a repeated click on
// the same button inside the window never reaches React and never reaches the
// API. Opt out for controls that are meant to be clicked quickly (steppers,
// pagers) with data-rapid on the element or on a parent.
const WINDOW_MS = 800;
const SUBMIT_WINDOW_MS = 1500;
const last = new WeakMap();

const installClickGuard = () => {
    if (typeof document === 'undefined' || window.__clickGuardInstalled) return;
    window.__clickGuardInstalled = true;
    document.addEventListener(
        'click',
        (event) => {
            const el = event.target && event.target.closest
                ? event.target.closest('button, input[type="submit"], input[type="button"], [role="button"]')
                : null;
            if (!el || el.disabled || el.closest('[data-rapid]')) return;
            const now = Date.now();
            const before = last.get(el) || 0;
            const isSubmit = el.type === 'submit' || !!el.closest('form');
            if (now - before < (isSubmit ? SUBMIT_WINDOW_MS : WINDOW_MS)) {
                event.preventDefault();
                event.stopImmediatePropagation();
                return;
            }
            last.set(el, now);
        },
        true
    );
};

export default installClickGuard;
