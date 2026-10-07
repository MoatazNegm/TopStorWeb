import React from 'react';
import Button from './Button';

/**
 * End of a list whose edits are only collected until they are submitted:
 *   <SubmitBar count={n} onSubmit={...} onCancel={...} status="..." busy={false} />
 * Submit sends them (the page loops over the changed rows and makes one API call for each), Cancel throws all of them away.
 */
const SubmitBar = ({ count, onSubmit, onCancel, status = '', busy = false }) => (
    <div className="flex flex-wrap items-center justify-end gap-2 border-t border-border bg-surface-muted px-2.5 py-2">
        {status ? <span className="mr-auto text-xs font-medium text-gray-700">{status}</span> : null}
        <span className="text-xs text-gray-500">
            {count === 0 ? 'No pending changes' : `${count} pending change${count === 1 ? '' : 's'}, not applied until submitted`}
        </span>
        <Button type="button" variant="secondary" size="sm" onClick={onCancel} disabled={count === 0 || busy}>
            Cancel
        </Button>
        <Button type="button" variant="primary" size="sm" onClick={onSubmit} disabled={count === 0 || busy}>
            Submit changes
        </Button>
    </div>
);

export default SubmitBar;
