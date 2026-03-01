import React from 'react';

const PerformanceChart = ({ title, icon, data, color }) => {
    const colorMap = {
        blue: { stroke: '#3B82F6', fill: 'rgba(59, 130, 246, 0.05)' },
        emerald: { stroke: '#10B981', fill: 'rgba(16, 185, 129, 0.05)' },
        amber: { stroke: '#F59E0B', fill: 'rgba(245, 158, 11, 0.05)' },
    };

    const colors = colorMap[color] || colorMap.blue;

    // Standard high-performance SVG path generator for sparklines/simple area charts
    const points = data.map((val, idx) => `${(idx / (data.length - 1)) * 300},${100 - val}`).join(' ');
    const areaPath = `M 0,100 L ${points} L 300,100 Z`;
    const linePath = `M ${points}`;

    return (
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-xl hover:shadow-gray-100/50 transition-all duration-300 relative overflow-hidden flex flex-col h-full">
            <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400`}>
                        <i className={`fas ${icon}`}></i>
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 tracking-tight">{title}</h3>
                </div>
                <div className="flex gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Live Feed</span>
                </div>
            </div>

            <div className="flex-1 relative min-h-[160px] flex items-end">
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

            <div className="mt-8 flex justify-between items-end border-t border-gray-50 pt-4">
                <div className="flex items-center gap-6">
                    <div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Peak Load</p>
                        <p className="text-lg font-black text-gray-800">{Math.max(...data).toFixed(1)} <span className="text-xs text-gray-400 font-bold uppercase italic ml-1">Units</span></p>
                    </div>
                    <div className="w-px h-8 bg-gray-100"></div>
                    <div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Avg Efficiency</p>
                        <p className="text-lg font-black text-gray-800">{(data.reduce((a, b) => a + b, 0) / data.length).toFixed(1)} <span className="text-xs text-gray-400 font-bold uppercase italic ml-1">%</span></p>
                    </div>
                </div>
                <div className="flex flex-col items-end">
                    <span className={`text-xs font-black uppercase tracking-widest px-2 py-0.5 rounded-md border ${color === 'amber' ? 'bg-amber-50 text-amber-600 border-amber-100' : 'bg-blue-50 text-blue-600 border-blue-100'}`}>
                        {color === 'amber' ? 'Warning Thr.' : 'Stable'}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default PerformanceChart;
