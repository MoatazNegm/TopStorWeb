import React from 'react';

const VolumeInsights = ({ volumes }) => {
    const totalVols = volumes.length;
    const onlineVols = volumes.length; // Simplified for now
    const avgCompression = volumes.reduce((acc, vol) => {
        const ratio = parseFloat(vol.refcompressratio) || 1.0;
        return acc + ratio;
    }, 0) / (totalVols || 1);

    return (
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex flex-col h-full relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50/30 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-indigo-100/40 transition-colors duration-500"></div>

            <div className="flex justify-between items-center mb-10 relative z-10">
                <div>
                    <h3 className="text-xl font-bold text-gray-800 tracking-tight">CIFS Insights</h3>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">Operational Summary</p>
                </div>
                <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-500 flex items-center justify-center">
                    <i className="fas fa-chart-line text-xs"></i>
                </div>
            </div>

            <div className="flex-1 space-y-8 relative z-10">
                {/* Status Breakdown */}
                <div className="flex gap-4">
                    <div className="flex-1 bg-gray-50/50 rounded-2xl p-4 border border-gray-50 group-hover:border-indigo-100 transition-colors">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Online</p>
                        <p className="text-2xl font-black text-emerald-500 tracking-tight">{onlineVols}</p>
                    </div>
                    <div className="flex-1 bg-gray-50/50 rounded-2xl p-4 border border-gray-50">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Standby</p>
                        <p className="text-2xl font-black text-gray-300 tracking-tight">0</p>
                    </div>
                </div>

                {/* Compression Efficiency Bar */}
                <div className="space-y-3">
                    <div className="flex justify-between items-end">
                        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Global Compression</p>
                        <p className="text-sm font-black text-indigo-600 italic">{(avgCompression).toFixed(2)}x</p>
                    </div>
                    <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full transition-all duration-1000"
                            style={{ width: `${Math.min((avgCompression - 1) * 20, 100)}%` }}
                        ></div>
                    </div>
                    <p className="text-[9px] text-gray-400 font-medium">Aggregate ZFS efficiency across all CIFS shares</p>
                </div>

                {/* Pulse Indicator */}
                <div className="pt-4 flex items-center gap-3">
                    <div className="flex -space-x-2">
                        {volumes.slice(0, 3).map((v, i) => (
                            <div key={i} className="w-7 h-7 rounded-full bg-white border-2 border-white shadow-sm flex items-center justify-center overflow-hidden">
                                <div className="w-full h-full bg-indigo-100 flex items-center justify-center">
                                    <span className="text-[8px] font-black text-indigo-400">{v.name.charAt(0)}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <p className="text-[10px] font-bold text-gray-400">
                        {totalVols > 3 ? `+${totalVols - 3} more volumes active` : 'Volume distribution active'}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default VolumeInsights;
