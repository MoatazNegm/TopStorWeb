import React, { useState, useRef, useEffect } from 'react';
import { Clock3 } from 'lucide-react';

const CustomTimePicker = ({ value, onChange, disabled }) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef(null);

    // Parse legacy format "11:50 PM" or "23:50"
    const parseTime = (val) => {
        if (!val) return { hour: 11, minute: '50', period: 'PM' };

        // Handle HH:MM AM/PM
        const match = val.match(/(\d+):(\d+)\s*(AM|PM)/i);
        if (match) {
            return { hour: parseInt(match[1]), minute: match[2], period: match[3].toUpperCase() };
        }

        // Handle HH:MM (24h)
        const match24 = val.match(/(\d+):(\d+)/);
        if (match24) {
            let h = parseInt(match24[1]);
            const p = h >= 12 ? 'PM' : 'AM';
            h = h % 12 || 12;
            return { hour: h, minute: match24[2], period: p };
        }

        return { hour: 11, minute: '50', period: 'PM' };
    };

    const time = parseTime(value);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const updateTime = (newTime) => {
        const h = newTime.hour < 10 ? `0${newTime.hour}` : `${newTime.hour}`;
        const formatted = `${h}:${newTime.minute} ${newTime.period}`;
        onChange(formatted);
    };

    const hours = Array.from({ length: 12 }, (_, i) => i + 1);
    const minutes = Array.from({ length: 12 }, (_, i) => (i * 5).toString().padStart(2, '0'));
    const periods = ['AM', 'PM'];

    return (
        <div className="relative" ref={containerRef}>
            <div
                onClick={() => !disabled && setIsOpen(!isOpen)}
                className={`w-full px-4 py-3 bg-gray-50 border-none rounded-2xl text-sm font-bold text-gray-700 flex items-center justify-between cursor-pointer transition-all ${isOpen ? 'ring-2 ring-brand-500' : ''
                    } ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'}`}
            >
                <span>{value || '11:50 PM'}</span>
                <Clock3 size={16} className="text-gray-400" />
            </div>

            {isOpen && (
                <div className="absolute top-full left-0 mt-3 bg-white rounded-3xl shadow-2xl border border-gray-100 p-4 z-50 flex gap-4 animate-in fade-in zoom-in duration-200 min-w-[280px]">
                    {/* Hours */}
                    <div className="flex-1 max-h-60 overflow-y-auto no-scrollbar py-2">
                        <div className="mb-3 px-2 text-center text-xs font-semibold uppercase tracking-wide text-gray-500">Hour</div>
                        {hours.map(h => (
                            <button
                                key={h}
                                onClick={() => updateTime({ ...time, hour: h })}
                                className={`w-full py-2 px-3 rounded-xl text-sm font-bold transition-all mb-1 ${time.hour === h ? 'bg-brand-600 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-50'
                                    }`}
                            >
                                {h}
                            </button>
                        ))}
                    </div>

                    {/* Minutes */}
                    <div className="flex-1 max-h-60 overflow-y-auto no-scrollbar py-2 border-l border-gray-50 pl-4">
                        <div className="mb-3 px-2 text-center text-xs font-semibold uppercase tracking-wide text-gray-500">Min</div>
                        {minutes.map(m => (
                            <button
                                key={m}
                                onClick={() => updateTime({ ...time, minute: m })}
                                className={`w-full py-2 px-3 rounded-xl text-sm font-bold transition-all mb-1 ${time.minute === m ? 'bg-brand-600 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-50'
                                    }`}
                            >
                                {m}
                            </button>
                        ))}
                    </div>

                    {/* Period */}
                    <div className="w-16 py-2 border-l border-gray-50 pl-4">
                        <div className="mb-3 text-center text-xs font-semibold uppercase tracking-wide text-gray-500">Period</div>
                        {periods.map(p => (
                            <button
                                key={p}
                                onClick={() => updateTime({ ...time, period: p })}
                                className={`w-full py-2 px-3 rounded-xl text-sm font-bold transition-all mb-1 ${time.period === p ? 'bg-brand-600 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-50'
                                    }`}
                            >
                                {p}
                            </button>
                        ))}

                        <button
                            onClick={() => setIsOpen(false)}
                            className="mt-4 w-full rounded-md bg-gray-900 py-2.5 text-xs font-semibold uppercase tracking-wide text-white transition-colors hover:bg-black"
                        >
                            OK
                        </button>
                    </div>
                </div>
            )}

            <style dangerouslySetInnerHTML={{
                __html: `
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            `}} />
        </div>
    );
};

export default CustomTimePicker;
