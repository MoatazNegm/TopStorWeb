import React, { useState, useRef, useEffect } from 'react';
import { Check, ChevronDown, X } from 'lucide-react';

const normalizeToArray = (value) => {
    if (Array.isArray(value)) return value;
    if (value === null || value === undefined || value === '') return [];
    return [value];
};

const Dropdown = ({ options, value, onChange, placeholder, disabled, className = "", isMulti = false, label, compact = false }) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(-1);

    const handleKeyDown = (event) => {
        if (disabled) return;
        const key = event.key;
        if (!isOpen) {
            if (key === 'Enter' || key === ' ' || key === 'ArrowDown' || key === 'ArrowUp') {
                event.preventDefault();
                const idx = options.findIndex((o) => isSelected(o.value));
                setActiveIndex(idx >= 0 ? idx : 0);
                setIsOpen(true);
            }
            return;
        }
        if (key === 'Escape') {
            event.preventDefault();
            event.stopPropagation();
            if (event.nativeEvent && event.nativeEvent.stopImmediatePropagation) event.nativeEvent.stopImmediatePropagation();
            setIsOpen(false);
        } else if (key === 'ArrowDown') {
            event.preventDefault();
            setActiveIndex((i) => Math.min(options.length - 1, i + 1));
        } else if (key === 'ArrowUp') {
            event.preventDefault();
            setActiveIndex((i) => Math.max(0, i - 1));
        } else if (key === 'Enter' || key === ' ') {
            event.preventDefault();
            if (options[activeIndex]) handleSelect(options[activeIndex].value);
        } else if (key === 'Tab') {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const selectedMultiValues = normalizeToArray(value);

    const getSelectedLabel = () => {
        if (isMulti) {
            if (selectedMultiValues.length === 0) return placeholder;
            if (selectedMultiValues.length === 1) {
                const opt = options.find(o => String(o.value) === String(selectedMultiValues[0]));
                return opt ? opt.label : placeholder;
            }
            return `${selectedMultiValues.length} selected`;
        } else {
            const selectedOption = options.find(opt => String(opt.value) === String(value));
            return selectedOption ? selectedOption.label : placeholder;
        }
    };

    const handleSelect = (optValue) => {
        if (isMulti) {
            const current = normalizeToArray(value);
            const newValue = current.includes(optValue)
                ? current.filter(v => v !== optValue)
                : [...current, optValue];
            onChange(newValue);
        } else {
            onChange(optValue);
            setIsOpen(false);
        }
    };

    const isSelected = (optValue) => {
        if (isMulti) {
            return selectedMultiValues.includes(optValue);
        }
        return String(optValue) === String(value);
    };

    const removeMultiValue = (optValue) => {
        if (!isMulti) return;
        onChange(selectedMultiValues.filter((item) => item !== optValue));
    };

    return (
        <div className={`min-w-0 ${compact ? 'space-y-0' : 'space-y-1.5'} ${className}`} ref={containerRef}>
            {label && (
                <label className="block text-sm font-medium text-gray-700">
                    {label}
                </label>
            )}
            <div className="relative">
                <div
                    onClick={() => !disabled && setIsOpen(!isOpen)}
                    onKeyDown={handleKeyDown}
                    tabIndex={disabled ? -1 : 0}
                    role="combobox"
                    aria-haspopup="listbox"
                    aria-expanded={isOpen}
                    aria-disabled={disabled ? true : undefined}
                    className={`flex ${compact ? 'min-h-7 px-2 py-0.5' : 'min-h-10 px-3 py-2'} w-full min-w-0 items-center justify-between gap-2 rounded-md border bg-surface text-sm text-gray-700 transition-colors ${
                        isOpen ? 'border-brand-500 ring-4 ring-brand-100' : 'border-border hover:border-border-strong'
                    } ${disabled ? 'cursor-not-allowed bg-gray-50 text-gray-400' : 'cursor-pointer'}`}
                >
                    <div className={`flex min-w-0 flex-1 flex-wrap items-center ${compact ? 'gap-1' : 'gap-1.5'}`}>
                        {isMulti && selectedMultiValues.length > 0 ? (
                            selectedMultiValues.map((selected) => {
                                const opt = options.find((item) => String(item.value) === String(selected));
                                const text = opt ? opt.label : String(selected);
                                return (
                                    <span
                                        key={String(selected)}
                                        className="inline-flex items-center gap-1 rounded-sm bg-brand-50 px-2 py-0.5 text-xs font-medium text-brand-700"
                                    >
                                        {text}
                                        {!disabled && (
                                            <button
                                                type="button"
                                                className="text-brand-400 hover:text-brand-700"
                                                onClick={(event) => {
                                                    event.stopPropagation();
                                                    removeMultiValue(selected);
                                                }}
                                            >
                                                <X size={12} />
                                            </button>
                                        )}
                                    </span>
                                );
                            })
                        ) : (
                            <span
                                className={
                                    (!isMulti && (!value && value !== 0)) || (isMulti && selectedMultiValues.length === 0)
                                        ? 'text-gray-400'
                                        : 'text-gray-700'
                                }
                            >
                                {getSelectedLabel()}
                            </span>
                        )}
                    </div>
                    <ChevronDown size={16} className={`text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                </div>

                {isOpen && (
                    <div className="absolute top-full left-0 z-[100] mt-2 w-full overflow-hidden rounded-md border border-border bg-surface shadow-lg">
                        <div className="max-h-80 overflow-y-auto no-scrollbar" role="listbox" aria-multiselectable={isMulti || undefined}>
                            {options.length === 0 ? (
                                <div className="px-4 py-3 text-sm text-gray-500">No options available</div>
                            ) : (
                                options.map((opt, optIndex) => (
                                    <div
                                        key={opt.value}
                                        role="option"
                                        aria-selected={isSelected(opt.value)}
                                        ref={(el) => { if (el && optIndex === activeIndex && el.scrollIntoView) el.scrollIntoView({ block: 'nearest' }); }}
                                        onClick={() => handleSelect(opt.value)}
                                        className={`flex cursor-pointer items-center justify-between px-4 ${compact ? 'py-1.5' : 'py-2.5'} text-sm transition-colors ${
                                            isSelected(opt.value)
                                                ? 'bg-brand-50 text-brand-700'
                                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
                                        } ${optIndex === activeIndex ? 'bg-gray-100' : ''}`}
                                    >
                                        <div className="flex min-w-0 items-center gap-3">
                                            <span className="truncate whitespace-nowrap">{opt.label}</span>
                                        </div>
                                        {isSelected(opt.value) && <Check size={14} />}
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                )}
            </div>

                        <style
                            dangerouslySetInnerHTML={{
                __html: `
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
                        `
                            }}
                        />
        </div>
    );
};

export default Dropdown;

