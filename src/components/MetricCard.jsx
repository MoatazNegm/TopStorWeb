import React from 'react';

const MetricCard = ({ title, value, unit, icon, color, trend, trendValue }) => {
    const colorClasses = {
        blue: 'bg-blue-50 text-blue-600 border-blue-100',
        emerald: 'bg-emerald-50 text-emerald-600 border-emerald-100',
        amber: 'bg-amber-50 text-amber-600 border-amber-100',
        indigo: 'bg-indigo-50 text-indigo-600 border-indigo-100',
        rose: 'bg-rose-50 text-rose-600 border-rose-100',
    };

    const accentColor = colorClasses[color] || colorClasses.blue;

    return (
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:shadow-gray-100/50 transition-all duration-300 group relative overflow-hidden">
            {/* Background Glow */}
            <div className={`absolute -right-4 -top-4 w-24 h-24 rounded-full opacity-5 blur-2xl ${accentColor.split(' ')[0]}`}></div>

            <div className="flex justify-between items-start mb-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${accentColor} shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                    <i className={`fas ${icon} text-lg`}></i>
                </div>
                {trend && (
                    <div className={`px-2.5 py-1 rounded-lg text-[10px] font-black tracking-wider uppercase flex items-center gap-1 ${trend === 'up' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                        }`}>
                        <i className={`fas fa-chevron-${trend}`}></i>
                        {trendValue}
                    </div>
                )}
            </div>

            <div className="space-y-1">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">{title}</h3>
                <div className="flex items-baseline gap-1.5">
                    <span className="text-3xl font-black text-gray-800 tracking-tight">{value}</span>
                    <span className="text-sm font-bold text-gray-400 capitalize">{unit}</span>
                </div>
            </div>

            {/* Bottom Progress Bar (Visual Polish) */}
            <div className="mt-6 h-1 w-full bg-gray-50 rounded-full overflow-hidden">
                <div className={`h-full opacity-60 rounded-full w-2/3 ${accentColor.split(' ')[0]}`}></div>
            </div>
        </div>
    );
};

export default MetricCard;
