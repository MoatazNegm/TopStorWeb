import React from 'react';

const PerformanceChart = ({ title, icon, data, color }) => {
    const colorMap = {
        info: { stroke: '#495BE2', fill: 'rgba(73, 91, 226, 0.08)' },
        success: { stroke: '#1F9D6B', fill: 'rgba(31, 157, 107, 0.08)' },
        warning: { stroke: '#C77A12', fill: 'rgba(199, 122, 18, 0.08)' },
    };

    const colors = colorMap[color] || colorMap.info;
    const safeData = Array.isArray(data) && data.length > 0 ? data : [0, 0];

    const points = safeData.map((val, idx) => `${(idx / Math.max(safeData.length - 1, 1)) * 300},${100 - val}`).join(' ');
    const areaPath = `M 0,100 L ${points} L 300,100 Z`;
    const linePath = `M ${points}`;
    const peak = Math.max(...safeData).toFixed(1);
    const avg = (safeData.reduce((a, b) => a + b, 0) / safeData.length).toFixed(1);

    return (
        <div className="relative flex h-full flex-col overflow-hidden rounded-lg border border-border bg-surface p-5 shadow-sm transition-shadow hover:shadow-md">
            <div className="mb-5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="flex h-9 w-9 items-center justify-center rounded-md bg-surface-muted text-brand-600">
                        {icon}
                    </div>
                    <h3 className="text-base font-semibold text-gray-800">{title}</h3>
                </div>
                <div className="inline-flex items-center gap-2 rounded-sm border border-border bg-surface-muted px-2.5 py-1 text-xs font-medium text-gray-500">
                    <span className="h-2 w-2 rounded-full bg-success-500" />
                    Live Feed
                </div>
            </div>

            <div className="relative flex min-h-[160px] flex-1 items-end">
                <svg viewBox="0 0 300 100" className="w-full h-full preserve-3d" preserveAspectRatio="none">
                    <defs>
                        <linearGradient id={`grad-${color}`} x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor={colors.stroke} stopOpacity="0.2" />
                            <stop offset="100%" stopColor={colors.stroke} stopOpacity="0" />
                        </linearGradient>
                    </defs>
                    <path d={areaPath} fill={`url(#grad-${color})`} className="transition-all duration-1000" />
                    <path d={linePath} fill="none" stroke={colors.stroke} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-all duration-1000" />
                </svg>
            </div>

            <div className="mt-5 flex items-end justify-between border-t border-border pt-4">
                <div className="flex items-center gap-6">
                    <div>
                        <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-500">Peak Load</p>
                        <p className="text-lg font-semibold text-gray-800">{peak} <span className="ml-1 text-xs font-medium text-gray-500">Units</span></p>
                    </div>
                    <div className="h-8 w-px bg-border" />
                    <div>
                        <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-500">Average</p>
                        <p className="text-lg font-semibold text-gray-800">{avg} <span className="ml-1 text-xs font-medium text-gray-500">%</span></p>
                    </div>
                </div>
                <div className="flex flex-col items-end">
                    <span className={`rounded-sm border px-2 py-0.5 text-xs font-semibold uppercase tracking-wide ${color === 'warning' ? 'border-warning-100 bg-warning-50 text-warning-600' : 'border-info-100 bg-info-50 text-info-600'}`}>
                        {color === 'warning' ? 'Warning Threshold' : 'Stable'}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default PerformanceChart;
