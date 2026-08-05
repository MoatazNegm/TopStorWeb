import React from 'react';

const MetricCard = ({ title, value, unit, icon, color, trend, trendValue }) => {
    const colorClasses = {
        brand: 'bg-brand-50 text-brand-600 border-brand-100',
        success: 'bg-success-50 text-success-600 border-success-100',
        warning: 'bg-warning-50 text-warning-600 border-warning-100',
        danger: 'bg-danger-50 text-danger-600 border-danger-100',
        info: 'bg-info-50 text-info-600 border-info-100',
    };

    const accentColor = colorClasses[color] || colorClasses.brand;
    const bgToken = accentColor.split(' ')[0];

    return (
        <div className="group relative overflow-hidden rounded-lg border border-border bg-surface p-5 shadow-sm transition-shadow hover:shadow-md">
            <div className={`absolute -right-5 -top-5 h-24 w-24 rounded-full opacity-10 blur-2xl ${bgToken}`} />

            <div className="mb-4 flex items-start justify-between">
                <div className={`flex h-11 w-11 items-center justify-center rounded-md border ${accentColor}`}>
                    {icon}
                </div>
                {trend && (
                    <div className={`rounded-sm px-2.5 py-1 text-xs font-semibold uppercase tracking-wide ${trend === 'up' ? 'bg-success-50 text-success-600' : 'bg-danger-50 text-danger-600'
                        }`}>
                        {trendValue}
                    </div>
                )}
            </div>

            <div className="space-y-1.5">
                <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-500">{title}</h3>
                <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-semibold tracking-tight text-gray-900">{value}</span>
                    <span className="text-sm font-medium text-gray-500">{unit}</span>
                </div>
            </div>

            <div className="mt-5 h-1 w-full overflow-hidden rounded-full bg-gray-100">
                <div className={`h-full w-2/3 rounded-full ${bgToken}`} />
            </div>
        </div>
    );
};

export default MetricCard;
