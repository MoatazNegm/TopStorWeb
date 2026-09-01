import React from 'react';

/**
 * Shared network-field helpers.
 *  - IP fields   : placeholder xxx.xxx.xxx.xxx, text centred, validated as an IPv4 address.
 *  - host fields : (NTP server, DNS server, search ...) may hold a name; the IPv4 check runs only while the
 *                  value consists of digits and dots, as soon as there is a letter it does not run.
 *  - subnet      : whole number of 8, 16, 24 or 32 (the only valid values here), default 24.
 */
export const IP_PLACEHOLDER = 'xxx.xxx.xxx.xxx';
export const SUBNET_VALUES = [8, 16, 24, 32];
export const DEFAULT_SUBNET = 24;

export const isValidIPv4 = (value) => {
    const parts = String(value).trim().split('.');
    if (parts.length !== 4) return false;
    return parts.every((p) => /^\d{1,3}$/.test(p) && Number(p) <= 255);
};

/** '' when fine (or when the check does not apply), otherwise the message to show. */
export const ipError = (value, { allowHost = false } = {}) => {
    const v = String(value ?? '').trim();
    if (v === '' || v === '_1') return '';
    if (allowHost && !/^[0-9.]+$/.test(v)) return '';
    return isValidIPv4(v) ? '' : 'Invalid IP address: use xxx.xxx.xxx.xxx with each part from 0 to 255';
};

/** The nearest valid subnet number (8, 16, 24 or 32); default 24 for an empty or unusable value. */
export const snapSubnet = (value) => {
    const n = Number(value);
    if (value === '' || value == null || Number.isNaN(n)) return DEFAULT_SUBNET;
    return SUBNET_VALUES.reduce((best, v) => (Math.abs(v - n) < Math.abs(best - n) ? v : best), SUBNET_VALUES[0]);
};

const errorClasses = '!border-danger-500 focus:!border-danger-600 focus:!ring-danger-100';

/** Plain <input> for an IPv4 address (allowHost: a name is accepted too, see above). */
export const IpInput = ({ value, onChange, className = '', allowHost = false, center = true, placeholder = IP_PLACEHOLDER, wrapperClassName = 'inline-block', ...rest }) => {
    const error = ipError(value, { allowHost });
    return (
        <div className={wrapperClassName}>
            <input
                type="text"
                inputMode={allowHost ? 'text' : 'decimal'}
                autoComplete="off"
                spellCheck={false}
                placeholder={placeholder}
                title={error || undefined}
                aria-invalid={error ? 'true' : undefined}
                className={`${className} ${center ? 'text-center' : ''} ${error ? errorClasses : ''}`}
                value={value}
                onChange={onChange}
                {...rest}
            />
            {error ? <p className="mt-0.5 max-w-[16rem] text-[11px] font-medium leading-tight text-danger-600">{error}</p> : null}
        </div>
    );
};

/** Plain <input type="number"> counting 8, 16, 24, 32; an empty or odd value becomes a valid one when the field is left. */
export const SubnetInput = ({ value, onChange, name, className = '', ...rest }) => {
    const shown = value === '' || value == null ? DEFAULT_SUBNET : value;
    const settle = () => {
        const snapped = snapSubnet(shown);
        if (String(snapped) !== String(value) && onChange) onChange({ target: { name, value: String(snapped), type: 'number' } });
    };
    return (
        <input
            type="number"
            min={SUBNET_VALUES[0]}
            max={SUBNET_VALUES[SUBNET_VALUES.length - 1]}
            step={8}
            name={name}
            className={`${className} text-center`}
            value={shown}
            onChange={onChange}
            onBlur={settle}
            {...rest}
        />
    );
};
