import React from 'react';

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
    rows = 3
}) => {
    const baseClasses = `w-full ${icon ? 'pl-12' : 'px-4'} bg-gray-50 border-none rounded-2xl text-sm font-bold text-gray-700 placeholder-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none transition-all ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100/80 focus:bg-white'}`;
    const inputClasses = `${baseClasses} h-[46px]`;
    const textAreaClasses = `${baseClasses} py-3 resize-none`;

    return (
        <div className={`space-y-2 ${className}`}>
            {label && (
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 block">
                    {label}
                </label>
            )}
            <div className="relative group">
                {isTextArea ? (
                    <textarea
                        id={id}
                        required={required}
                        disabled={disabled}
                        placeholder={placeholder}
                        className={textAreaClasses}
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
                        className={inputClasses}
                        value={value}
                        onChange={onChange}
                    />
                )}
                {icon && (
                    <div className="absolute inset-y-0 left-0 w-12 flex items-center justify-center pointer-events-none text-gray-300 group-focus-within:text-indigo-500 transition-colors">
                        {icon}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Input;
