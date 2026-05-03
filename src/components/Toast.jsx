import React, { useState, useEffect } from 'react';

const THEME = {
    info: {
        border: 'border-l-sky-500',
        icon: 'fa-info-circle',
        iconColor: 'text-sky-500',
        bar: 'bg-sky-400',
    },
    warning: {
        border: 'border-l-amber-500',
        icon: 'fa-exclamation-triangle',
        iconColor: 'text-amber-500',
        bar: 'bg-amber-400',
    },
    error: {
        border: 'border-l-rose-500',
        icon: 'fa-exclamation-circle',
        iconColor: 'text-rose-500',
        bar: 'bg-rose-400',
    },
};

const Toast = ({ id, type, title, subtitle, body, duration, onDismiss }) => {
    const [visible, setVisible] = useState(true);
    const [progressStarted, setProgressStarted] = useState(false);
    const theme = THEME[type] || THEME.info;

    // Kick off CSS progress bar animation one frame after mount
    useEffect(() => {
        const raf = requestAnimationFrame(() => setProgressStarted(true));
        return () => cancelAnimationFrame(raf);
    }, []);

    // Auto-dismiss after duration
    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
            setTimeout(() => onDismiss(id), 300);
        }, duration);
        return () => clearTimeout(timer);
    }, [id, duration, onDismiss]);

    const dismiss = () => {
        setVisible(false);
        setTimeout(() => onDismiss(id), 300);
    };

    return (
        <div
            className={`
                w-80 bg-white rounded-2xl shadow-lg border border-gray-100 border-l-4 ${theme.border}
                overflow-hidden transition-all duration-300
                ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}
            `}
        >
            <div className="px-4 pt-3 pb-2">
                <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-2.5 min-w-0">
                        <i className={`fas ${theme.icon} ${theme.iconColor} mt-0.5 text-sm flex-shrink-0`}></i>
                        <div className="min-w-0">
                            <p className="font-bold text-gray-800 text-sm leading-tight truncate">{title}</p>
                            {subtitle && (
                                <p className="text-[10px] text-gray-400 font-medium mt-0.5 uppercase tracking-wider truncate">{subtitle}</p>
                            )}
                        </div>
                    </div>
                    <button
                        onClick={dismiss}
                        className="flex-shrink-0 w-5 h-5 flex items-center justify-center rounded-full text-gray-300 hover:text-gray-500 hover:bg-gray-100 transition-colors"
                    >
                        <i className="fas fa-times text-[10px]"></i>
                    </button>
                </div>
                <p className="mt-2 text-xs text-gray-600 leading-relaxed pl-[22px]">{body}</p>
            </div>

            {/* Progress bar — CSS transition shrinks from 100% → 0% over duration */}
            <div className="h-0.5 bg-gray-100">
                <div
                    className={`h-full ${theme.bar}`}
                    style={{
                        width: progressStarted ? '0%' : '100%',
                        transition: progressStarted ? `width ${duration}ms linear` : 'none',
                    }}
                />
            </div>
        </div>
    );
};

export default Toast;
