import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Check, ChevronDown, ChevronLeft, ChevronRight, ClipboardList, Minus, PartyPopper, RotateCcw, X } from 'lucide-react';
import { TEST_SHEETS } from './sheets';

const STORAGE_PREFIX = 'qs-test-wizard-pos:';
const prefersReducedMotion = () =>
    typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

// Flattens a sheet's steps into a single ordered list of
// { stepIndex, actionIndex, step, action } entries so Previous/Next can walk
// across step boundaries seamlessly.
function flatten(sheet) {
    const list = [];
    sheet.steps.forEach((step, stepIndex) => {
        step.actions.forEach((action, actionIndex) => {
            list.push({ stepIndex, actionIndex, step, action });
        });
    });
    return list;
}

// A bare word targets `[data-wizard-id="word"]`; anything starting with a CSS
// selector character (#, ., [) is used as-is.
function resolveSelector(target) {
    if (!target) return null;
    return /^[#.\[]/.test(target) ? target : `[data-wizard-id="${target}"]`;
}

// Tracks the live position of the target element (for the spotlight) and,
// the first time it appears for a given action, scrolls it into view and —
// when it's a focusable control — moves real keyboard focus onto it.
function useTargetRect(selector, active) {
    const [rect, setRect] = useState(null);
    const revealedSelectorRef = useRef(null);

    useEffect(() => {
        revealedSelectorRef.current = null;
        if (!active || !selector) {
            setRect(null);
            return;
        }
        let frame;
        const measure = () => {
            const raw = document.querySelector(selector);
            if (raw) {
                let el = raw;
                let r = raw.getBoundingClientRect();
                if (r.width === 0 && r.height === 0) {
                    // The real element is hidden (e.g. a <select> replaced by a
                    // widget like select2) — spotlight its rendered widget instead,
                    // scoped to the same wrapper so we never grab an unrelated
                    // element elsewhere on the page.
                    const widget = raw.parentElement?.querySelector('.select2-container, .select2-selection, [class*="select2"]')
                        || raw.nextElementSibling;
                    if (widget) {
                        el = widget;
                        r = widget.getBoundingClientRect();
                    }
                }
                setRect(r);
                if (revealedSelectorRef.current !== selector) {
                    revealedSelectorRef.current = selector;
                    el.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'center' });
                    if (el === raw && el.matches('input, select, textarea, button, [tabindex]') && document.activeElement !== el) {
                        el.focus({ preventScroll: true });
                    }
                }
            } else {
                setRect(null);
            }
            frame = requestAnimationFrame(measure);
        };
        frame = requestAnimationFrame(measure);
        return () => cancelAnimationFrame(frame);
    }, [selector, active]);

    return rect;
}

const TestWizard = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [expandedSheetId, setExpandedSheetId] = useState(TEST_SHEETS[0].id);
    const [sheetIndex, setSheetIndex] = useState(0);
    const [flatIndex, setFlatIndex] = useState(null); // null = no active walkthrough
    const sidebarRef = useRef(null);

    const sheet = TEST_SHEETS[sheetIndex];
    const flat = useMemo(() => flatten(sheet), [sheet]);
    const current = flatIndex !== null ? flat[flatIndex] : null;
    const isDone = flatIndex !== null && flatIndex >= flat.length;
    const isActive = !!current && !isDone;
    const selector = isActive ? resolveSelector(current.action.target) : null;
    const rect = useTargetRect(selector, isActive);

    // Restore saved progress for the initial sheet once, on mount.
    useEffect(() => {
        try {
            const saved = localStorage.getItem(STORAGE_PREFIX + TEST_SHEETS[0].id);
            if (saved !== null) setFlatIndex(Number(saved));
        } catch (e) { /* localStorage unavailable */ }
    }, []);

    useEffect(() => {
        if (flatIndex === null) return;
        try {
            localStorage.setItem(STORAGE_PREFIX + sheet.id, String(flatIndex));
        } catch (e) { /* localStorage unavailable */ }
    }, [flatIndex, sheet.id]);

    // Keep the active sheet's accordion section expanded.
    useEffect(() => {
        setExpandedSheetId(sheet.id);
    }, [sheet.id]);

    // Transition the app itself to the page this step belongs to.
    useEffect(() => {
        if (!isActive) return;
        const route = current.step.route ?? '';
        if (window.location.hash !== route) {
            window.location.hash = route;
        }
    }, [isActive, current?.stepIndex, sheetIndex]);

    // Scroll the active step into view in the sidebar list as it advances.
    useEffect(() => {
        if (!current || !sidebarRef.current) return;
        const row = sidebarRef.current.querySelector(`[data-step-row="${sheetIndex}-${current.stepIndex}"]`);
        row?.scrollIntoView({ block: 'nearest' });
    }, [current?.stepIndex, sheetIndex]);

    const startStep = (si, stepIdx) => {
        const targetFlat = si === sheetIndex ? flat : flatten(TEST_SHEETS[si]);
        const idx = targetFlat.findIndex((f) => f.stepIndex === stepIdx);
        setSheetIndex(si);
        setFlatIndex(idx === -1 ? 0 : idx);
    };

    const goNext = () => setFlatIndex((i) => Math.min((i ?? -1) + 1, flat.length));
    const goPrev = () => setFlatIndex((i) => Math.max((i ?? 0) - 1, 0));
    const exitWalkthrough = () => setFlatIndex(null);
    const restart = () => {
        setFlatIndex(0);
        try { localStorage.removeItem(STORAGE_PREFIX + sheet.id); } catch (e) { /* noop */ }
    };
    const toggleSheet = (id) => setExpandedSheetId((prev) => (prev === id ? null : id));

    return (
        <>
            {isActive && <Spotlight rect={rect} />}

            {!sidebarOpen && (
                <button
                    type="button"
                    onClick={() => setSidebarOpen(true)}
                    className={`fixed right-6 z-[9994] flex items-center gap-2 rounded-full bg-brand-600 px-4 py-3 text-sm font-semibold text-white shadow-lg hover:bg-brand-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-100 ${current ? 'bottom-16' : 'bottom-6'}`}
                    title={current || isDone ? 'Show step list' : 'Open Test Wizard'}
                >
                    <ClipboardList className="h-[18px] w-[18px]" />
                    Test Wizard
                </button>
            )}

            {/* Step browser sidebar */}
            <aside
                className={`fixed right-0 top-0 z-[9992] flex h-full w-full flex-col border-l border-border bg-surface shadow-xl transition-transform duration-200 ease-out motion-reduce:transition-none sm:w-[380px] ${
                    sidebarOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
                aria-hidden={!sidebarOpen}
            >
                <div className="flex items-start justify-between gap-3 border-b border-border px-5 py-4">
                    <div className="flex items-start gap-3">
                        <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-md bg-brand-50 text-brand-600">
                            <ClipboardList className="h-[18px] w-[18px]" />
                        </span>
                        <div>
                            <div className="text-xs font-semibold uppercase tracking-wide text-gray-400">Test Wizard</div>
                            <h3 className="text-base font-semibold leading-tight text-gray-800">Test Sheets</h3>
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={() => setSidebarOpen(false)}
                        className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                        title="Collapse"
                    >
                        <Minus className="h-[18px] w-[18px]" />
                    </button>
                </div>

                <div ref={sidebarRef} className="flex-1 overflow-y-auto px-3 py-3">
                    {TEST_SHEETS.map((s, si) => {
                        const isExpanded = expandedSheetId === s.id;
                        return (
                            <div key={s.id} className="mb-1.5">
                                <button
                                    type="button"
                                    onClick={() => toggleSheet(s.id)}
                                    className="flex w-full items-center justify-between gap-2 rounded-md px-3 py-2.5 text-left hover:bg-gray-50"
                                >
                                    <span className="flex min-w-0 items-center gap-2">
                                        <ChevronDown className={`h-4 w-4 flex-shrink-0 text-gray-400 transition-transform ${isExpanded ? '' : '-rotate-90'}`} />
                                        <span className="truncate text-sm font-semibold text-gray-800">{s.name}</span>
                                    </span>
                                    <span className="flex-shrink-0 font-mono text-xs text-gray-400">{s.steps.length}</span>
                                </button>

                                {isExpanded && (
                                    <div className="ml-[7px] flex flex-col gap-1 border-l border-border py-1 pl-3">
                                        {s.steps.map((step, i) => {
                                            const isCurrentRow = sheetIndex === si && current?.stepIndex === i;
                                            const isPast = sheetIndex === si && current && i < current.stepIndex;
                                            return (
                                                <button
                                                    key={step.n}
                                                    type="button"
                                                    data-step-row={`${si}-${i}`}
                                                    onClick={() => startStep(si, i)}
                                                    className={`flex items-start gap-2.5 rounded-md px-3 py-2 text-left transition-colors ${
                                                        isCurrentRow
                                                            ? 'border-2 border-brand-500 bg-brand-50 shadow-sm'
                                                            : isPast
                                                                ? 'border border-transparent bg-success-50/60 hover:bg-success-50'
                                                                : 'border border-transparent hover:bg-gray-50'
                                                    }`}
                                                >
                                                    <span className="w-6 flex-shrink-0 pt-px font-mono text-xs text-gray-400">{step.n}</span>
                                                    {isPast ? (
                                                        <span className="mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-success-500">
                                                            <Check className="h-3 w-3 text-white" strokeWidth={3} />
                                                        </span>
                                                    ) : (
                                                        <span className={`mt-1.5 h-2 w-2 flex-shrink-0 rounded-full ${isCurrentRow ? 'bg-brand-500' : 'bg-gray-300'}`} />
                                                    )}
                                                    <span className={`min-w-0 flex-1 text-sm leading-snug line-clamp-2 ${isCurrentRow ? 'font-semibold text-gray-800' : isPast ? 'text-success-700' : 'text-gray-600'}`}>
                                                        {step.actions[0].text}
                                                    </span>
                                                </button>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                <div className="border-t border-border px-5 py-3.5">
                    <button
                        type="button"
                        onClick={restart}
                        className="flex w-full items-center justify-center gap-1.5 rounded-md border border-border px-3 py-2 text-xs font-medium text-gray-500 hover:border-brand-500 hover:text-brand-600"
                    >
                        <RotateCcw className="h-3.5 w-3.5" /> Start this sheet over
                    </button>
                </div>
            </aside>

            {isActive && (
                <ActionCard
                    sheet={sheet}
                    current={current}
                    flatIndex={flatIndex}
                    flatLength={flat.length}
                    onNext={goNext}
                    onPrev={goPrev}
                    onClose={exitWalkthrough}
                />
            )}

            {isDone && (
                <DoneCard sheet={sheet} expanded={!sidebarOpen} onRestart={restart} onClose={exitWalkthrough} />
            )}
        </>
    );
};

const Spotlight = ({ rect }) => {
    if (!rect) {
        // No real UI element for this action (external step, or target not on
        // screen right now) — just dim everything.
        return <div className="fixed inset-0 z-[9989] bg-gray-900/45 pointer-events-none transition-opacity motion-reduce:transition-none" />;
    }

    const pad = 8;
    const top = rect.top - pad;
    const left = rect.left - pad;
    const bottom = rect.bottom + pad;
    const right = rect.right + pad;

    const dim = 'fixed z-[9989] bg-gray-900/45 pointer-events-none transition-all duration-150 motion-reduce:transition-none';

    return (
        <>
            <div className={dim} style={{ top: 0, left: 0, right: 0, height: Math.max(top, 0) }} />
            <div className={dim} style={{ top: bottom, left: 0, right: 0, bottom: 0 }} />
            <div className={dim} style={{ top, left: 0, width: Math.max(left, 0), height: bottom - top }} />
            <div className={dim} style={{ top, left: right, right: 0, height: bottom - top }} />
            <div
                className="fixed z-[9990] rounded-lg ring-4 ring-brand-500 transition-all duration-150 motion-reduce:transition-none"
                style={{ top, left, width: right - left, height: bottom - top, pointerEvents: 'none' }}
            />
        </>
    );
};

const ActionCard = ({ sheet, current, flatIndex, flatLength, onNext, onPrev, onClose }) => (
    <div className="fixed inset-x-0 bottom-0 z-[9993] border-t border-border bg-surface shadow-xl">
        <div className="flex items-center gap-2.5 px-3 py-2">
            <span
                className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-md bg-brand-50 font-mono text-xs font-semibold text-brand-600"
                title={`Step ${current.stepIndex + 1} of ${sheet.steps.length}${current.step.actions.length > 1 ? ` · Action ${current.actionIndex + 1} of ${current.step.actions.length}` : ''}`}
            >
                {current.step.n}
            </span>
            <p className="min-w-0 flex-1 text-sm font-medium leading-snug text-gray-800 line-clamp-2">{current.action.text}</p>
            <button
                type="button"
                onClick={onPrev}
                disabled={flatIndex === 0}
                className="flex flex-shrink-0 items-center gap-1 rounded-md px-2 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
            >
                <ChevronLeft className="h-4 w-4" /> <span className="hidden sm:inline">Previous</span>
            </button>
            <div className="hidden h-1.5 w-20 flex-shrink-0 overflow-hidden rounded-full bg-gray-200 sm:block">
                <div
                    className="h-full rounded-full bg-brand-500 transition-[width] duration-150 motion-reduce:transition-none"
                    style={{ width: `${((current.stepIndex + 1) / sheet.steps.length) * 100}%` }}
                />
            </div>
            <button
                type="button"
                onClick={onNext}
                className="flex flex-shrink-0 items-center gap-1 rounded-md bg-brand-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-brand-700"
            >
                {flatIndex === flatLength - 1 ? 'Finish' : 'Next'} <ChevronRight className="h-4 w-4" />
            </button>
            <button
                type="button"
                onClick={onClose}
                className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-md text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                title="Close"
            >
                <X className="h-4 w-4" />
            </button>
        </div>
    </div>
);

const DoneCard = ({ sheet, expanded, onRestart, onClose }) => (
    <>
        <div className="fixed inset-0 z-[9989] bg-gray-900/45" />
        <div className={`fixed bottom-8 left-1/2 z-[9993] w-[calc(100%-2rem)] -translate-x-1/2 transition-[max-width] duration-150 ${expanded ? 'max-w-lg' : 'max-w-md'}`}>
            <div className="relative overflow-hidden rounded-xl border border-border bg-surface p-6 text-center shadow-xl">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                    <PartyPopper className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800">{"Nice, that’s everything!"}</h3>
                <p className="mt-1 text-sm text-gray-500">{`You’ve walked through every step in “${sheet.name}”.`}</p>
                <div className="mt-5 flex justify-center gap-3">
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-md border border-border px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50"
                    >
                        Close
                    </button>
                    <button
                        type="button"
                        onClick={onRestart}
                        className="flex items-center gap-1.5 rounded-md bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700"
                    >
                        <RotateCcw className="h-4 w-4" /> Start Over
                    </button>
                </div>
            </div>
        </div>
    </>
);

export default TestWizard;
