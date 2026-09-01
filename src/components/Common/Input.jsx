import React from 'react';
import { IP_PLACEHOLDER, SUBNET_VALUES, DEFAULT_SUBNET, ipError, snapSubnet } from './NetFields';

const Input = ({
    type = 'text',
    label,
    value,
    onChange,
    placeholder,
    disabled = false,
    className = "",
    icon,
    required = false,
    id,
    min,
    max,
    step,
    isTextArea = false,
    rows = 3,
    error: errorProp,
    hint,
    name,
    kind, // 'ip' | 'hostip' | 'subnet': placeholder, centring, validation and stepping for network fields
}) => {
    const isIp = kind === 'ip' || kind === 'hostip';
    const isSubnet = kind === 'subnet';
    const error = errorProp || (isIp ? ipError(value, { allowHost: kind === 'hostip' }) : '');
    if (isIp && placeholder === undefined && kind === 'ip') placeholder = IP_PLACEHOLDER;
    if (isSubnet) {
        type = 'number'; min = SUBNET_VALUES[0]; max = SUBNET_VALUES[SUBNET_VALUES.length - 1]; step = 8;
        if (value === '' || value == null) value = DEFAULT_SUBNET;
    }
    const onBlur = isSubnet ? () => {
        const snapped = snapSubnet(value);
        if (String(snapped) !== String(value) && onChange) onChange({ target: { name, value: String(snapped), type: 'number' } });
    } : undefined;

    const baseClasses = [
        'w-full rounded-md border bg-surface text-sm text-gray-800 outline-none transition-colors',
        (isIp && kind === 'ip') || isSubnet ? 'text-center' : '',
        icon ? 'pl-9 pr-3' : 'px-3',
        isTextArea ? 'py-2.5' : 'h-10',
        error
            ? 'border-danger-500 focus:border-danger-600 focus:ring-4 focus:ring-danger-100'
            : 'border-border focus:border-brand-500 focus:ring-4 focus:ring-brand-100',
        disabled ? 'cursor-not-allowed bg-gray-50 text-gray-400' : 'hover:border-border-strong',
    ].join(' ');

    return (
        <div className={`space-y-1.5 ${className}`}>
            {label && (
                <label className="block text-sm font-medium text-gray-700" htmlFor={id}>
                    {label}
                </label>
            )}
            <div className="relative">
                {isTextArea ? (
                    <textarea
                        id={id}
                        required={required}
                        disabled={disabled}
                        placeholder={placeholder}
                        className={`${baseClasses} resize-none`}
                        value={value}
                        onChange={onChange}
                        rows={rows}
                    />
                ) : (
                    <input
                        type={type}
                        id={id}
                        required={required}
                        disabled={disabled}
                        placeholder={placeholder}
                        min={min}
                        max={max}
                        step={step}
                        className={baseClasses}
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                        name={name}
                    />
                )}
                {icon && (
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex w-9 items-center justify-center text-gray-400">
                        {icon}
                    </div>
                )}
            </div>
            {error ? <p className="text-xs font-medium text-danger-600">{error}</p> : null}
            {!error && hint ? <p className="text-xs text-gray-500">{hint}</p> : null}
        </div>
    );
};

export default Input;
