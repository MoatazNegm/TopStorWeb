import React, { useState, useRef, useEffect } from 'react';
import Button from './Button';

const Dropdown = ({ options, value, onChange, placeholder, disabled, className = "", isMulti = false, label }) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const getSelectedLabel = () => {
        if (isMulti) {
            if (!Array.isArray(value) || value.length === 0) return placeholder;
            if (value.length === 1) {
                const opt = options.find(o => String(o.value) === String(value[0]));
                return opt ? opt.label : placeholder;
            }
            return `${value.length} selected`;
        } else {
            const selectedOption = options.find(opt => String(opt.value) === String(value));
            return selectedOption ? selectedOption.label : placeholder;
        }
    };

    const handleSelect = (optValue) => {
        if (isMulti) {
            const newValue = value.includes(optValue)
                ? value.filter(v => v !== optValue)
                : [...value, optValue];
            onChange(newValue);
        } else {
            onChange(optValue);
            setIsOpen(false);
        }
    };

    const isSelected = (optValue) => {
        if (isMulti) {
            return Array.isArray(value) && value.includes(optValue);
        }
        return String(optValue) === String(value);
    };

    return (
        <div className={`space-y-2 ${className}`} ref={containerRef}>
            {label && (
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 block">
                    {label}
                </label>
            )}
            <div className="relative">
                <div
                    onClick={() => !disabled && setIsOpen(!isOpen)}
                    className={`w-full px-4 h-[46px] bg-gray-50 border-none rounded-2xl text-sm font-bold text-gray-700 flex items-center justify-between cursor-pointer transition-all ${isOpen ? 'ring-2 ring-indigo-500 bg-white' : 'hover:bg-gray-100/80'
                        } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    <span className={(!isMulti && (!value && value !== 0)) || (isMulti && (!value || value.length === 0)) ? 'text-gray-300' : ''}>
                        {getSelectedLabel()}
                    </span>
                    <i className={`fas fa-chevron-down text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} style={{ fontSize: '0.8rem' }}></i>
                </div>

                {isOpen && (
                    <div className="absolute top-full left-0 w-full mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 z-[100] animate-in fade-in slide-in-from-top-2 duration-200 overflow-hidden">
                        <div className="max-h-60 overflow-y-auto no-scrollbar">
                            {options.length === 0 ? (
                                <div className="px-4 py-3 text-sm text-gray-400 font-medium italic text-center">No options available</div>
                            ) : (
                                options.map((opt) => (
                                    <div
                                        key={opt.value}
                                        onClick={() => handleSelect(opt.value)}
                                        className={`px-4 py-3 text-sm font-bold transition-all cursor-pointer flex items-center justify-between ${isSelected(opt.value)
                                            ? isMulti ? 'text-indigo-600 hover:bg-indigo-50' : 'bg-indigo-600 text-white'
                                            : 'text-gray-600 hover:bg-indigo-50 hover:text-indigo-600'
                                            }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            {isMulti && (
                                                <div className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${isSelected(opt.value) ? 'bg-indigo-600 border-indigo-600' : 'border-gray-200 bg-white'}`}>
                                                    {isSelected(opt.value) && <i className="fas fa-check text-[8px] text-white"></i>}
                                                </div>
                                            )}
                                            <span>{opt.label}</span>
                                        </div>
                                        {!isMulti && isSelected(opt.value) && <i className="fas fa-check text-[10px]"></i>}
                                    </div>
                                ))
                            )}
                        </div>
                        {isMulti && (
                            <div className="p-3 border-t border-gray-50 flex justify-end bg-gray-50/50">
                                <Button
                                    onClick={() => setIsOpen(false)}
                                    bgColor="bg-gray-900"
                                    textColor="text-white"
                                    borderRadius="rounded-xl"
                                    className="!px-6 !py-2 text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all"
                                >
                                    Done
                                </Button>
                            </div>
                        )}
                    </div>
                )}
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            `}} />
        </div>
    );
};

export default Dropdown;
