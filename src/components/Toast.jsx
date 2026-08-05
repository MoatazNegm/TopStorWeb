import React, { useState, useEffect } from 'react';
import { AlertCircle, TriangleAlert, Info, X } from 'lucide-react';

const THEME = {
    info: {
        border: 'border-l-brand-500',
        icon: Info,
        iconColor: 'text-brand-600',
        bar: 'bg-brand-500',
    },
    warning: {
        border: 'border-l-warning-500',
        icon: TriangleAlert,
        iconColor: 'text-warning-600',
        bar: 'bg-warning-500',
    },
    error: {
        border: 'border-l-danger-500',
        icon: AlertCircle,
        iconColor: 'text-danger-600',
        bar: 'bg-danger-500',
    },
};

const Toast = ({ id, type, title, subtitle, body, duration, onDismiss }) => {
    const [visible, setVisible] = useState(true);
    const [progressStarted, setProgressStarted] = useState(false);
    const theme = THEME[type] || THEME.info;
    const Icon = theme.icon;

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
                w-80 rounded-lg border border-border border-l-4 bg-surface shadow-sm ${theme.border}
                overflow-hidden transition-all duration-300
                ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}
            `}
        >
            <div className="px-4 pt-3 pb-2.5">
                <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-2.5 min-w-0">
                        <Icon size={14} className={`${theme.iconColor} mt-0.5 flex-shrink-0`} />
                        <div className="min-w-0">
                            <p className="truncate text-sm font-semibold leading-tight text-gray-800">{title}</p>
                            {subtitle && (
                                <p className="mt-0.5 truncate text-xs font-medium uppercase tracking-wide text-gray-500">{subtitle}</p>
                            )}
                        </div>
                    </div>
                    <button
                        onClick={dismiss}
                        className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-sm text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
                    >
                        <X size={12} />
                    </button>
                </div>
                <p className="mt-2 pl-[22px] text-sm leading-relaxed text-gray-600">{body}</p>
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
