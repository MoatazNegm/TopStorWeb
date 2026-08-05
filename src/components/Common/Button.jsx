import React from 'react';

const mapLegacyVariant = (bgColor = '') => {
    const val = String(bgColor).toLowerCase();
    if (val.includes('rose') || val.includes('red') || val.includes('danger')) return 'danger';
    if (val.includes('white') || val.includes('gray') || val.includes('slate')) return 'secondary';
    return 'primary';
};

const sizeClassMap = {
    sm: 'h-9 px-3.5 text-sm',
    md: 'h-10 px-4 text-sm',
};

const variantClassMap = {
    primary:
        'bg-brand-600 text-white border border-transparent shadow-xs hover:bg-brand-700 focus-visible:ring-4 focus-visible:ring-brand-100',
    secondary:
        'bg-surface text-gray-700 border border-border shadow-xs hover:bg-gray-50 hover:text-brand-600 focus-visible:ring-4 focus-visible:ring-brand-100',
    ghost:
        'bg-transparent text-gray-600 border border-transparent hover:bg-gray-50 hover:text-gray-800 focus-visible:ring-4 focus-visible:ring-brand-100',
    danger:
        'bg-danger-600 text-white border border-transparent shadow-xs hover:bg-danger-700 focus-visible:ring-4 focus-visible:ring-danger-100',
};

const Button = ({
    variant,
    size = 'md',
    bgColor,
    textColor,
    icon,
    onClick,
    disabled = false,
    className = '',
    type = 'button',
    children,
    ...props
}) => {
    const effectiveVariant = variant || mapLegacyVariant(bgColor);
    const variantClasses = variantClassMap[effectiveVariant] || variantClassMap.primary;
    const sizeClasses = sizeClassMap[size] || sizeClassMap.md;

    const isHexBg = typeof bgColor === 'string' && bgColor.startsWith('#');
    const isHexText = typeof textColor === 'string' && textColor.startsWith('#');

    const inlineStyles = {
        ...(isHexBg ? { backgroundColor: bgColor } : {}),
        ...(isHexText ? { color: textColor } : {}),
        ...(props.style || {}),
    };

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={[
                'inline-flex items-center justify-center gap-2 rounded-md font-semibold transition-colors outline-none',
                sizeClasses,
                disabled
                    ? 'cursor-not-allowed border border-border bg-gray-100 text-gray-400 opacity-60'
                    : variantClasses,
                className,
            ].join(' ')}
            style={inlineStyles}
            {...props}
        >
            {icon ? <span className="flex items-center justify-center">{icon}</span> : null}
            {children}
        </button>
    );
};

export default Button;
