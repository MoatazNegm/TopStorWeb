import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, ClipboardList, Minus, PartyPopper, RotateCcw, X } from 'lucide-react';
import { TEST_SHEETS } from './sheets';

const STORAGE_PREFIX = 'qs-test-wizard-pos:';

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

function useTargetRect(selector, active) {
    const [rect, setRect] = useState(null);

    useEffect(() => {
        if (!active || !selector) {
            setRect(null);
            return;
        }
        let frame;
        const measure = () => {
            const el = document.querySelector(selector);
            setRect(el ? el.getBoundingClientRect() : null);
            frame = requestAnimationFrame(measure);
        };
        frame = requestAnimationFrame(measure);
        return () => cancelAnimationFrame(frame);
    }, [selector, active]);

    return rect;
}

const TestWizard = () => {
    const [open, setOpen] = useState(false);
    const [sheetIndex, setSheetIndex] = useState(0);
    const [flatIndex, setFlatIndex] = useState(null); // null = browsing, not walking through an action
    const sidebarRef = useRef(null);

    const sheet = TEST_SHEETS[sheetIndex];
    const flat = useMemo(() => flatten(sheet), [sheet]);
    const current = flatIndex !== null ? flat[flatIndex] : null;
    const isDone = flatIndex !== null && flatIndex >= flat.length;
    const selector = current ? resolveSelector(current.action.target) : null;
    const rect = useTargetRect(selector, open && !!current);

    useEffect(() => {
        try {
            const saved = localStorage.getItem(STORAGE_PREFIX + sheet.id);
            if (saved !== null) setFlatIndex(Number(saved));
        } catch (e) { /* localStorage unavailable */ }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sheetIndex]);

    useEffect(() => {
        if (flatIndex === null) return;
        try {
            localStorage.setItem(STORAGE_PREFIX + sheet.id, String(flatIndex));
        } catch (e) { /* localStorage unavailable */ }
    }, [flatIndex, sheet.id]);

    // Scroll the active step into view in the sidebar list as it advances.
    useEffect(() => {
        if (!current || !sidebarRef.current) return;
        const row = sidebarRef.current.querySelector(`[data-step-row="${current.stepIndex}"]`);
        row?.scrollIntoView({ block: 'nearest' });
    }, [current?.stepIndex]);

    const startStep = (stepIndex) => {
        const idx = flat.findIndex((f) => f.stepIndex === stepIndex);
        setFlatIndex(idx === -1 ? 0 : idx);
    };

    const goNext = () => setFlatIndex((i) => Math.min((i ?? -1) + 1, flat.length));
    const goPrev = () => setFlatIndex((i) => Math.max((i ?? 0) - 1, 0));
    const exitWalkthrough = () => setFlatIndex(null);
    const restart = () => {
        setFlatIndex(0);
        try { localStorage.removeItem(STORAGE_PREFIX + sheet.id); } catch (e) { /* noop */ }
    };

    const showSpotlight = open && current;

    return (
        <>
            {showSpotlight && <Spotlight rect={rect} />}

            {!open && (
                <button
                    type="button"
                    onClick={() => setOpen(true)}
                    className="fixed bottom-6 right-6 z-[9991] flex items-center gap-2 rounded-full bg-brand-600 px-4 py-3 text-sm font-semibold text-white shadow-lg hover:bg-brand-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-100"
                >
                    <ClipboardList className="h-[18px] w-[18px]" />
                    Test Wizard
                </button>
            )}

            {/* Step browser sidebar */}
            <aside
                className={`fixed right-0 top-0 z-[9992] flex h-full w-full flex-col border-l border-border bg-surface shadow-xl transition-transform duration-200 ease-out motion-reduce:transition-none sm:w-[380px] ${
                    open ? 'translate-x-0' : 'translate-x-full'
                }`}
                aria-hidden={!open}
            >
                <div className="flex items-start justify-between gap-3 border-b border-border px-5 py-4">
                    <div className="flex items-start gap-3">
                        <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-md bg-brand-50 text-brand-600">
                            <ClipboardList className="h-[18px] w-[18px]" />
                        </span>
                        <div>
                            <div className="text-xs font-semibold uppercase tracking-wide text-gray-400">Test Wizard</div>
                            <h3 className="text-base font-semibold leading-tight text-gray-800">{sheet.name}</h3>
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={() => setOpen(false)}
                        className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                        title="Minimize"
                    >
                        <Minus className="h-[18px] w-[18px]" />
                    </button>
                </div>

                {TEST_SHEETS.length > 1 && (
                    <div className="border-b border-border px-5 py-3">
                        <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-400">Test Sheets</div>
                        <div className="flex flex-col gap-1.5">
                            {TEST_SHEETS.map((s, i) => (
                                <button
                                    key={s.id}
                                    type="button"
                                    onClick={() => { setSheetIndex(i); setFlatIndex(null); }}
                                    className={`flex items-center justify-between rounded-md border px-3 py-2 text-left text-sm transition-colors ${
                                        i === sheetIndex
                                            ? 'border-brand-500 bg-brand-50 font-semibold text-brand-700'
                                            : 'border-transparent text-gray-600 hover:bg-gray-50'
                                    }`}
                                >
                                    <span className="truncate">{s.name}</span>
                                    <span className="ml-2 flex-shrink-0 font-mono text-xs text-gray-400">{s.steps.length}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                <div ref={sidebarRef} className="flex-1 overflow-y-auto px-3 py-3">
                    <div className="flex flex-col gap-1">
                        {sheet.steps.map((step, i) => {
                            const isCurrent = current?.stepIndex === i;
                            const isPast = current && i < current.stepIndex;
                            return (
                                <button
                                    key={step.n}
                                    type="button"
                                    data-step-row={i}
                                    onClick={() => startStep(i)}
                                    className={`flex items-start gap-2.5 rounded-md px-3 py-2 text-left transition-colors ${
                                        isCurrent
                                            ? 'border border-brand-500 bg-brand-50'
                                            : 'border border-transparent hover:bg-gray-50'
                                    }`}
                                >
                                    <span className="w-6 flex-shrink-0 pt-px font-mono text-xs text-gray-400">{step.n}</span>
                                    <span className={`mt-1.5 h-2 w-2 flex-shrink-0 rounded-full ${isCurrent ? 'bg-brand-500' : isPast ? 'bg-brand-200' : 'bg-gray-300'}`} />
                                    <span className={`min-w-0 flex-1 text-sm leading-snug line-clamp-2 ${isCurrent ? 'font-semibold text-gray-800' : 'text-gray-600'}`}>
                                        {step.actions[0].text}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
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

            {open && current && !isDone && (
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

            {open && isDone && (
                <DoneCard sheet={sheet} onRestart={restart} onClose={exitWalkthrough} />
            )}
        </>
    );
};

const Spotlight = ({ rect }) => {
    if (!rect) {
        // No real UI element for this action (external step, or target not on
        // screen right now) — just dim everything.
        return <div className="fixed inset-0 z-[9989] bg-gray-900/45 transition-opacity motion-reduce:transition-none" />;
    }

    const pad = 8;
    const top = rect.top - pad;
    const left = rect.left - pad;
    const bottom = rect.bottom + pad;
    const right = rect.right + pad;

    const dim = 'fixed z-[9989] bg-gray-900/45 transition-all duration-150 motion-reduce:transition-none';

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
    <div className="fixed bottom-8 left-1/2 z-[9993] w-[calc(100%-2rem)] max-w-lg -translate-x-1/2">
        <div className="overflow-hidden rounded-xl border border-border bg-surface shadow-xl">
            <div className="flex items-start gap-3 px-6 pt-5">
                <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-md bg-brand-50 font-mono text-sm font-semibold text-brand-600">
                    {current.step.n}
                </span>
                <div className="min-w-0 flex-1">
                    <div className="mb-0.5 text-xs font-medium text-gray-400">
                        Step {current.stepIndex + 1} of {sheet.steps.length}
                        {current.step.actions.length > 1 && ` · Action ${current.actionIndex + 1} of ${current.step.actions.length}`}
                    </div>
                    <p className="text-base font-semibold leading-snug text-gray-800 text-balance">{current.action.text}</p>
                </div>
                <button
                    type="button"
                    onClick={onClose}
                    className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-md text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                    title="Close"
                >
                    <X className="h-4 w-4" />
                </button>
            </div>

            <div className="mt-4 flex items-center justify-between gap-3 border-t border-border bg-surface-muted px-6 py-3.5">
                <button
                    type="button"
                    onClick={onPrev}
                    disabled={flatIndex === 0}
                    className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
                >
                    <ChevronLeft className="h-4 w-4" /> Previous
                </button>
                <div className="flex gap-1">
                    {sheet.steps.map((_, i) => (
                        <span
                            key={i}
                            className={`h-1.5 w-1.5 rounded-full ${i === current.stepIndex ? 'bg-brand-500' : i < current.stepIndex ? 'bg-brand-200' : 'bg-gray-200'}`}
                        />
                    ))}
                </div>
                <button
                    type="button"
                    onClick={onNext}
                    className="flex items-center gap-1 rounded-md bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700"
                >
                    {flatIndex === flatLength - 1 ? 'Finish' : 'Next'} <ChevronRight className="h-4 w-4" />
                </button>
            </div>
        </div>
    </div>
);

const DoneCard = ({ sheet, onRestart, onClose }) => (
    <>
        <div className="fixed inset-0 z-[9989] bg-gray-900/45" />
        <div className="fixed bottom-8 left-1/2 z-[9993] w-[calc(100%-2rem)] max-w-md -translate-x-1/2">
            <div className="overflow-hidden rounded-xl border border-border bg-surface p-6 text-center shadow-xl">
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
