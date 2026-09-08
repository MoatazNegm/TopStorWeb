import React from 'react';

const DiskIcon = ({
    diskId,
    data,
    isSelected,
    isCache,
    onClick,
    onContextMenu,
    showActions = false,
    onAction,
    displaySize = 'default'
}) => {
    const { status, size, name, changeop } = data;
    const shortDisk = diskId.slice(-5);
    const isOnline = status.includes('ONLINE') || status.includes('free') || status.includes('cache') || (status.includes('NA') && data.raid?.includes('stripe'));
    const silvering = data.silvering !== 'no';
    const isLarge = displaySize === 'large';

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
            className={`group relative flex cursor-pointer flex-col items-center rounded-md border transition-colors ${isLarge ? 'p-3' : 'p-2'} ${isCache ? 'border-warning-200 bg-warning-50' :
                isSelected ? 'border-brand-200 bg-brand-50' :
                    'border-transparent hover:bg-gray-50/60'
                }`}
            onClick={onClick ? () => onClick(diskId) : undefined}
            onContextMenu={handleContextMenu}
            title={`${diskId}\nStatus: ${status}\nOP: ${changeop}`}
        >
            {isCache && (
                <div className="absolute -top-2 left-1/2 z-10 -translate-x-1/2 rounded-sm bg-warning-500 px-1.5 py-0.5 text-xs font-semibold uppercase tracking-wide text-white shadow-xs">
                    Cache
                </div>
            )}

            <div className="relative">
                <img
                    src={`img/${getDiskImage()}`}
                    alt="disk"
                    className={`${isLarge ? 'h-20 w-16' : 'h-10 w-10'} object-contain transition-all ${isSelected || isCache ? 'scale-110' : ''
                        } ${silvering ? 'animate-pulse' : ''}`}
                />
            </div>

            <span className="mt-1 text-xs font-medium uppercase tracking-wide text-gray-500">
                {shortDisk}
            </span>
            <span className="text-xs font-semibold leading-none text-gray-800">
                {parseFloat(size).toFixed(1)}GB
            </span>

            {showActions && isSelected && (
                <div className="absolute -bottom-11 left-1/2 z-20 flex -translate-x-1/2 gap-1 rounded-md border border-border bg-surface p-1 shadow-lg animate-in zoom-in-95 duration-75">
                    <button
                        onClick={(e) => { e.stopPropagation(); onAction('online'); }}
                        className="rounded-sm bg-success-50 px-2 py-1 text-xs font-semibold uppercase tracking-wide text-success-700 transition-colors hover:bg-success-100"
                    >
                        Online
                    </button>
                    <button
                        onClick={(e) => { e.stopPropagation(); onAction('offline'); }}
                        className="rounded-sm bg-danger-50 px-2 py-1 text-xs font-semibold uppercase tracking-wide text-danger-700 transition-colors hover:bg-danger-100"
                    >
                        Offline
                    </button>
                </div>
            )}
        </div>
    );
};

export default DiskIcon;

