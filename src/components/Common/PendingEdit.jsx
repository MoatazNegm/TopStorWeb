import React from 'react';
import { Check, X } from 'lucide-react';

// small parts shared by the lists whose edits are collected as pending (users, CIFS, NFS, home folders)

// "current value" shown very small and green above a field that is being edited
export const CurrentValue = ({ children, applyTo = 0 }) => (
    <div className="mb-0.5 whitespace-nowrap text-[9px] font-medium leading-none text-success-600" title="current value">
        {children}
        {applyTo > 1 && <span className="ml-1.5 text-warning-700">applies to {applyTo} users</span>}
    </div>
);

// the small square x: takes back the change of this one field
export const RevertButton = ({ onClick, title = 'Cancel this change' }) => (
    <button
        type="button"
        onMouseDown={(event) => event.preventDefault()}
        onClick={onClick}
        title={title}
        className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-sm border border-border bg-surface text-gray-500 transition-colors hover:bg-gray-100"
    >
        <X size={11} />
    </button>
);

// the small square ok: leaves the edit shape; the changed value stays in the field with the original shown above it
export const OkButton = ({ onClick, disabled = false }) => (
    <button
        type="button"
        onMouseDown={(event) => event.preventDefault()}
        onClick={onClick}
        disabled={disabled}
        title={disabled ? 'Enter a valid value first' : 'Done editing this field (the change is submitted with Submit changes)'}
        className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-sm border border-success-100 bg-success-50 text-success-600 transition-colors hover:bg-success-600 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
    >
        <Check size={11} />
    </button>
);

export const closeOnLeave = (close) => (event) => {
    if (!event.currentTarget.contains(event.relatedTarget)) close();
};
