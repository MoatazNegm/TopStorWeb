import React from 'react';
import { ChartLine } from 'lucide-react';

const VolumeInsights = ({ volumes }) => {
    const totalVols = volumes.length;
    const onlineVols = volumes.length; // Simplified for now
    const avgCompression = volumes.reduce((acc, vol) => {
        const ratio = parseFloat(vol.refcompressratio) || 1.0;
        return acc + ratio;
    }, 0) / (totalVols || 1);

    return (
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex flex-col h-full relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-50/40 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-brand-100/50 transition-colors duration-500"></div>

            <div className="flex justify-between items-center mb-10 relative z-10">
                <div>
                    <h3 className="text-base font-semibold text-gray-800">Home Volume Insights</h3>
                    <p className="mt-1 text-sm text-gray-500">Operational summary</p>
                </div>
                <div className="w-10 h-10 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center">
                    <ChartLine size={14} />
                </div>
            </div>

            <div className="flex-1 space-y-8 relative z-10">
                {/* Status Breakdown */}
                <div className="flex gap-4">
                    <div className="flex-1 bg-gray-50/50 rounded-2xl p-4 border border-gray-50 transition-colors group-hover:border-brand-100">
                        <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-500">Online</p>
                        <p className="text-2xl font-semibold tracking-tight text-success-600">{onlineVols}</p>
                    </div>
                    <div className="flex-1 bg-gray-50/50 rounded-2xl p-4 border border-gray-50">
                        <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-500">Standby</p>
                        <p className="text-2xl font-semibold tracking-tight text-gray-300">0</p>
                    </div>
                </div>

                {/* Compression Efficiency Bar */}
                <div className="space-y-3">
                    <div className="flex justify-between items-end">
                        <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Global Compression</p>
                        <p className="text-sm font-semibold italic text-brand-600">{(avgCompression).toFixed(2)}x</p>
                    </div>
                    <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div
                            className="h-full rounded-full bg-gradient-to-r from-brand-600 to-brand-500 transition-all duration-1000"
                            style={{ width: `${Math.min((avgCompression - 1) * 20, 100)}%` }}
                        ></div>
                    </div>
                    <p className="text-xs font-medium text-gray-500">Aggregate ZFS efficiency across all CIFS shares</p>
                </div>

                {/* Pulse Indicator */}
                <div className="pt-4 flex items-center gap-3">
                    <div className="flex -space-x-2">
                        {volumes.slice(0, 3).map((v, i) => (
                            <div key={i} className="w-7 h-7 rounded-full bg-white border-2 border-white shadow-sm flex items-center justify-center overflow-hidden">
                                <div className="w-full h-full bg-brand-100 flex items-center justify-center">
                                    <span className="text-xs font-semibold text-brand-600">{v.name.charAt(0)}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <p className="text-xs font-medium text-gray-500">
                        {totalVols > 3 ? `+${totalVols - 3} more volumes active` : 'Volume distribution active'}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default VolumeInsights;
