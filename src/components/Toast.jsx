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

const Toast = ({ id, type, title, subtitle, body, code, duration, onDismiss }) => {
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
                w-72 rounded-md border border-border border-l-4 bg-surface shadow-sm ${theme.border}
                overflow-hidden transition-all duration-300
                ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}
            `}
        >
            <div className="flex items-start gap-2 px-2.5 py-1.5">
                <Icon size={12} className={`${theme.iconColor} mt-[3px] flex-shrink-0`} />
                <div className="min-w-0 flex-1">
                    <p className="flex items-baseline gap-1.5 truncate text-xs leading-tight">
                        <span className="truncate font-semibold text-gray-800">{title}</span>
                        {subtitle && <span className="flex-shrink-0 text-[11px] text-gray-500">· {subtitle}</span>}
                    </p>
                    <p className="text-xs leading-snug text-gray-600">{body}</p>
                    {code && <p className="font-mono text-[9px] leading-none text-gray-400">{code}</p>}
                </div>
                <button
                    onClick={dismiss}
                    className="flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-sm text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
                >
                    <X size={10} />
                </button>
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
