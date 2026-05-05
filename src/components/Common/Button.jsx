import React from 'react';

/**
 * Shared Button Component
 * 
 * @param {string} bgColor - Background color class (e.g., 'bg-emerald-600') or hex
 * @param {string} textColor - Text color class (e.g., 'text-white') or hex
 * @param {string} borderRadius - Optional border radius class (default: 'rounded-lg')
 * @param {React.ReactNode} icon - Optional icon element
 * @param {function} onClick - Click handler function
 * @param {boolean} disabled - Optional disabled state
 * @param {string} className - Optional additional classes
 * @param {string} type - Button type (default: 'button')
 * @param {React.ReactNode} children - Button text/content
 */
const Button = ({
    bgColor = 'bg-emerald-600',
    textColor = 'text-white',
    borderRadius = 'rounded-lg',
    icon,
    onClick,
    disabled = false,
    className = '',
    type = 'button',
    children,
    ...props
}) => {
    // Determine background style (class vs hex)
    const isHexBg = bgColor.startsWith('#');
    const isHexText = textColor.startsWith('#');

    const baseStyles = `
        w-full sm:w-auto px-8 py-2.5 font-medium shadow-sm 
        transition-all duration-200 flex items-center justify-center gap-2
        ${borderRadius}
        active:transform active:scale-95
    `;

    const stateStyles = disabled
        ? 'bg-gray-100 text-gray-400 cursor-not-allowed border-gray-100 shadow-none transform-none'
        : `${!isHexBg ? bgColor : ''} ${!isHexText ? textColor : ''} hover:shadow-md hover:brightness-110`;

    const inlineStyles = {
        backgroundColor: !disabled && isHexBg ? bgColor : undefined,
        color: !disabled && isHexText ? textColor : undefined,
        ...props.style
    };

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`${baseStyles} ${stateStyles} ${className}`}
            style={inlineStyles}
            {...props}
        >
            {icon && <span className="flex items-center justify-center">{icon}</span>}
            {children}
        </button>
    );
};

export default Button;
