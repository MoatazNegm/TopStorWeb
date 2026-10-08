import React from 'react';
import { Server } from 'lucide-react';

/**
 * @typedef {Object} ServerNodeProps
 * @property {string} name - The server hostname (e.g., "qs-node-01")
 * @property {string} ip - The IP address (e.g., "192.168.1.10")
 * @property {'up' | 'down' | 'discovered'} state - Current status of the server
 * @property {string} [className] - Optional additional classes
 * @property {function} [onClick] - Optional click handler
 */

/**
 * The label of a node box: its alias when one is set, otherwise the host name.
 * An alias that is empty or "_1" (etcd's "not found") counts as not set.
 */
export const nodeLabel = (host, allHosts) => {
    const hostName = typeof host === 'object' ? (host.name || host.alias) : host;
    const full = (allHosts && allHosts[hostName]) || (typeof host === 'object' ? host : {});
    const alias = (typeof full.alias === 'string' ? full.alias : (typeof host === 'object' && typeof host.alias === 'string' ? host.alias : '')).trim();
    return alias && alias !== '_1' && alias !== hostName ? alias : hostName;
};

const ServerNode = ({ name, ip, state = 'up', selected = false, className = '', onClick }) => {
    const config = {
        up: {
            dot: 'bg-success-500',
            label: 'Online',
            labelClass: 'text-success-700',
        },
        down: {
            dot: 'bg-danger-500',
            label: 'Offline',
            labelClass: 'text-danger-700',
        },
        discovered: {
            dot: 'bg-brand-500',
            label: 'Discovered',
            labelClass: 'text-brand-700',
        },
    };

    const currentConfig = config[state] || config.up;

    return (
        <button
            onClick={onClick}
            className={`
                group flex min-h-[48px] w-full min-w-0 items-center gap-2 rounded-lg border px-2.5 py-2 text-left
                ${selected ? 'border-brand-500 bg-brand-50/40 ring-4 ring-brand-100' : 'border-border bg-surface hover:border-border-strong hover:bg-gray-50'}
                transition-colors
                ${className}
            `}
        >
            <span className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md ${selected ? 'bg-brand-100 text-brand-600' : 'bg-gray-100 text-gray-500'}`}>
                <Server size={18} />
            </span>

            <span className="min-w-0 flex-1">
                <span className="flex items-center gap-1.5">
                    <span className="min-w-0 flex-1 truncate text-xs font-semibold text-gray-800">{name}</span>
                    <span className="flex flex-shrink-0 items-center gap-1" title={currentConfig.label}>
                        <span className={`h-2 w-2 rounded-full ${currentConfig.dot}`}></span>
                        <span className={`text-[10px] font-medium ${currentConfig.labelClass}`}>{currentConfig.label}</span>
                    </span>
                </span>
                <span className="block whitespace-nowrap font-mono text-[11px] text-gray-500">{ip}</span>
            </span>
        </button>
    );
};

export default ServerNode;
