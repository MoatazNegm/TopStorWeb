import React from 'react';

const DiskIcon = ({
    diskId,
    data,
    isSelected,
    isCache,
    onClick,
    onContextMenu,
    showActions = false,
    onAction
}) => {
    const { status, size, name, changeop } = data;
    const shortDisk = diskId.slice(-5);
    const isOnline = status.includes('ONLINE') || status.includes('free') || status.includes('cache') || (status.includes('NA') && data.raid?.includes('stripe'));
    const silvering = data.silvering !== 'no';

    const getDiskImage = () => {
        if (isOnline) return 'disk-image.png';
        return 'invaliddisk.png';
    };

    const handleContextMenu = (e) => {
        if (onContextMenu) {
            e.preventDefault();
            onContextMenu(diskId);
        }
    };

    return (
        <div
            className={`flex flex-col items-center p-2 rounded-xl transition-all cursor-pointer relative group border ${isCache ? 'bg-amber-50 border-amber-200 shadow-sm shadow-amber-100/50' :
                isSelected ? 'bg-indigo-50 border-indigo-200 shadow-sm shadow-indigo-100/50' :
                    'border-transparent hover:bg-gray-50'
                }`}
            onClick={() => onClick(diskId)}
            onContextMenu={handleContextMenu}
            title={`${diskId}\nStatus: ${status}\nOP: ${changeop}`}
        >
            {isCache && (
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 px-1.5 py-0.5 bg-amber-400 text-[8px] font-black text-white rounded shadow-sm z-10 uppercase tracking-tighter">
                    Cache
                </div>
            )}

            <div className="relative">
                <img
                    src={`img/${getDiskImage()}`}
                    alt="disk"
                    className={`w-10 h-10 object-contain transition-all ${isSelected || isCache ? 'scale-110' : ''
                        } ${silvering ? 'animate-pulse' : ''}`}
                    style={{
                        filter: 'none'
                    }}
                />
            </div>

            <span className="text-[9px] font-bold text-gray-400 mt-1 uppercase tracking-tight">
                {shortDisk}
            </span>
            <span className="text-[10px] font-black text-gray-700 leading-none">
                {parseFloat(size).toFixed(1)}GB
            </span>

            {showActions && isSelected && (
                <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 bg-white shadow-xl rounded-lg border border-gray-100 p-1 flex gap-1 z-20 animate-in zoom-in-95 duration-75">
                    <button
                        onClick={(e) => { e.stopPropagation(); onAction('online'); }}
                        className="px-2 py-1 text-[8px] font-black uppercase bg-emerald-50 text-emerald-600 rounded hover:bg-emerald-100"
                    >
                        Online
                    </button>
                    <button
                        onClick={(e) => { e.stopPropagation(); onAction('offline'); }}
                        className="px-2 py-1 text-[8px] font-black uppercase bg-rose-50 text-rose-600 rounded hover:bg-rose-100"
                    >
                        Offline
                    </button>
                </div>
            )}
        </div>
    );
};

export default DiskIcon;
