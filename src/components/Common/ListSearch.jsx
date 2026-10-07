import React from 'react';
import { ChevronDown, ChevronUp, ChevronsUpDown, Search, X } from 'lucide-react';

/**
 * Shared search for the list pages.
 *   const { query, setQuery, visible } = useRowFilter(rows, optionalTextFn);
 *   <ListSearch value={query} onChange={setQuery} count={visible.length} total={rows.length} />
 * The filter runs on every key press. A row matches when every word typed is found, in any order, anywhere in any of
 * its values (text, numbers, the entries of lists ...), upper or lower case.
 */

// every primitive value of a row, joined: strings, numbers, booleans, nested lists and objects
export const flattenValues = (value, depth = 0) => {
    if (value === null || value === undefined || depth > 4) return '';
    if (Array.isArray(value)) return value.map((item) => flattenValues(item, depth + 1)).join(' ');
    if (typeof value === 'object') return Object.values(value).map((item) => flattenValues(item, depth + 1)).join(' ');
    return String(value);
};

// the same filter as a plain function (for pages that cannot call a hook where the rows are known)
export const filterRows = (rows, query, textOf) => {
    const terms = String(query || '').toLowerCase().split(/\s+/).filter(Boolean);
    const list = rows || [];
    if (terms.length === 0) return list;
    return list.filter((row) => {
        const text = (textOf ? textOf(row) : flattenValues(row)).toLowerCase();
        return terms.every((term) => text.includes(term));
    });
};

export const useRowFilter = (rows, textOf) => {
    const [query, setQuery] = React.useState('');
    const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
    const list = rows || [];
    const visible = terms.length === 0
        ? list
        : list.filter((row) => {
            const text = (textOf ? textOf(row) : flattenValues(row)).toLowerCase();
            return terms.every((term) => text.includes(term));
        });
    return { query, setQuery, visible, filtering: terms.length > 0 };
};

export const ListSearch = ({ value, onChange, count, total, placeholder = 'Search all fields ...', id }) => (
    <div className="flex items-center gap-2 border-b border-border px-2.5 py-1.5">
        <div className="relative flex-1">
            <Search size={14} className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
                type="text"
                id={id}
                value={value}
                onChange={(event) => onChange(event.target.value)}
                placeholder={placeholder}
                autoComplete="off"
                className="h-8 w-full rounded-md border border-border bg-surface pl-8 pr-8 text-sm text-gray-800 outline-none transition-colors hover:border-border-strong focus:border-brand-500 focus:ring-4 focus:ring-brand-100"
            />
            {value && (
                <button
                    type="button"
                    onClick={() => onChange('')}
                    title="Clear search"
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
                >
                    <X size={14} />
                </button>
            )}
        </div>
        {value && total !== undefined ? (
            <span className="whitespace-nowrap text-xs font-medium text-gray-500">{count} of {total}</span>
        ) : null}
    </div>
);

/**
 * Sorting for the list pages.
 *   const { sort, toggle } = useSort();
 *   const sorted = sortRows(visible, sort, { name: (row) => row.name, size: (row) => row.quota });
 *   <SortTh sortKey="name" sort={sort} onToggle={toggle} className="px-2.5 py-1.5 ...">Name</SortTh>
 * A click on a header sorts ascending, a second click descending, a third click removes the sort.
 * Numbers sort as numbers (also with a unit: 5G, 700M, 1.5T), IP addresses by their four numbers, dates as dates,
 * everything else as text (case does not matter, "disk2" before "disk10"). Empty values are always last.
 */
const collator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' });
const UNITS = { '': 1, K: 1024, M: 1024 ** 2, G: 1024 ** 3, T: 1024 ** 4, P: 1024 ** 5 };

export const isEmptyValue = (v) => v === undefined || v === null || ['', 'n/a', 'na', 'nan', '-', '—', '_1'].includes(String(v).trim().toLowerCase());

// date + time as one sortable number; falls back to the text when the date cannot be read
export const dateKey = (date, time) => {
    const t = Date.parse(`${String(date || '').replace(/-/g, ' ')} ${time || ''}`.trim());
    return Number.isNaN(t) ? `${date || ''} ${time || ''}`.trim() : t;
};

export const compareValues = (a, b) => {
    if (typeof a === 'number' && typeof b === 'number') return a - b;
    const sa = String(a).trim();
    const sb = String(b).trim();
    const ip = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})(?:[:/].*)?$/;
    const ma = sa.match(ip);
    const mb = sb.match(ip);
    if (ma && mb) {
        for (let i = 1; i <= 4; i += 1) {
            if (Number(ma[i]) !== Number(mb[i])) return Number(ma[i]) - Number(mb[i]);
        }
        return 0;
    }
    const num = /^(-?\d+(?:\.\d+)?)\s*([KMGTP]?)B?$/i;
    const na = sa.match(num);
    const nb = sb.match(num);
    if (na && nb) {
        const va = parseFloat(na[1]) * UNITS[na[2].toUpperCase()];
        const vb = parseFloat(nb[1]) * UNITS[nb[2].toUpperCase()];
        if (va !== vb) return va - vb;
        return 0;
    }
    return collator.compare(sa, sb);
};

export const useSort = () => {
    const [sort, setSort] = React.useState({ key: null, dir: 'asc' });
    const toggle = (key) => setSort((prev) => {
        if (prev.key !== key) return { key, dir: 'asc' };
        if (prev.dir === 'asc') return { key, dir: 'desc' };
        return { key: null, dir: 'asc' };
    });
    return { sort, toggle };
};

export const sortRows = (rows, sort, accessors) => {
    const get = sort && sort.key && accessors ? accessors[sort.key] : null;
    if (!get) return rows;
    const factor = sort.dir === 'desc' ? -1 : 1;
    return rows
        .map((row, index) => ({ row, index, value: get(row) }))
        .sort((x, y) => {
            const ex = isEmptyValue(x.value);
            const ey = isEmptyValue(y.value);
            if (ex || ey) return ex === ey ? x.index - y.index : (ex ? 1 : -1);
            return factor * compareValues(x.value, y.value) || x.index - y.index;
        })
        .map((item) => item.row);
};

export const SortTh = ({ sortKey, sort, onToggle, className = '', children, ...rest }) => {
    const active = sort && sort.key === sortKey;
    const Icon = !active ? ChevronsUpDown : sort.dir === 'asc' ? ChevronUp : ChevronDown;
    return (
        <th className={className} aria-sort={active ? (sort.dir === 'asc' ? 'ascending' : 'descending') : 'none'} {...rest}>
            <button
                type="button"
                onClick={() => onToggle(sortKey)}
                title="Sort by this column"
                className="inline-flex items-center gap-1 uppercase tracking-wide hover:text-gray-800"
            >
                <span>{children}</span>
                <Icon size={11} className={active ? 'text-brand-600' : 'text-gray-300'} />
            </button>
        </th>
    );
};
