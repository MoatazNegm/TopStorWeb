import React from 'react';
import { Activity, AlertCircle, Plus, Server } from 'lucide-react';

/**
 * @typedef {Object} ServerNodeProps
 * @property {string} name - The server hostname (e.g., "qs-node-01")
 * @property {string} ip - The IP address (e.g., "192.168.1.10")
 * @property {'up' | 'down' | 'discovered'} state - Current status of the server
 * @property {string} [className] - Optional additional classes
 * @property {function} [onClick] - Optional click handler
 */

const ServerNode = ({ name, ip, state = 'up', selected = false, className = '', onClick }) => {
    // State configurations
    const config = {
        up: {
            themeText: 'text-emerald-500',
            icon: Activity,
            ledActive: 'bg-emerald-500 animate-pulse',
            ledPassive: 'bg-emerald-500/50',
            border: 'border-#a4adf1',
            text: 'text-black',
            bg: 'bg-[#edeffc]',
            ring: 'ring-emerald-500'
        },
        down: {
            themeText: 'text-rose-500',
            icon: AlertCircle,
            ledActive: 'bg-rose-900',
            ledPassive: 'bg-rose-900/50',
            border: 'border-#a4adf1',
            text: 'text-black',
            bg: 'bg-[#edeffc]',
            ring: 'ring-rose-500'
        },
        discovered: {
            themeText: 'text-blue-500',
            icon: Server,
            ledActive: 'bg-blue-500',
            ledPassive: 'bg-blue-500/50',
            border: 'border-blue-500/30',
            text: 'text-black',
            bg: 'bg-[#edeffc]',
            ring: 'ring-blue-500'
        }
    };

    const currentConfig = config[state] || config.up;
    const Icon = currentConfig.icon;

    return (
        <div
            onClick={onClick}
            className={`
                relative flex items-center justify-between
                p-3 sm:p-4 rounded
                border ${currentConfig.border}
                ${currentConfig.bg}
                ${selected ? `ring-2 ${currentConfig.ring}` : ''}
                transition-all duration-200
                cursor-pointer
                group
                ${className}
            `}
        >
            {/* Left Side: LED Bars */}
            <div className="flex gap-1 mr-3">
                <div className={`w-1 h-6 sm:h-8 rounded-full ${currentConfig.ledActive}`}></div>
                <div className={`w-1 h-6 sm:h-8 rounded-full ${currentConfig.ledPassive}`}></div>
            </div>

            {/* Middle: Text Info */}
            <div className="flex-1 min-w-0 mr-3">
                <div className="font-mono text-xs sm:text-sm text-black font-medium truncate">
                    {name}
                </div>
                <div className="font-mono text-[10px] sm:text-xs text-gray-500 truncate">
                    {ip}
                </div>
            </div>

            {/* Right Side: Status Icon */}
            <div className={`${currentConfig.themeText}`}>
                <Icon size={20} className={state === 'up' ? 'animate-pulse' : ''} />
            </div>
        </div>
    );
};

export default ServerNode;
