import React, { useState, useEffect, useCallback } from 'react';
import { fetchPartnerList, addPartner, deletePartner, fetchFreePort } from './api/partners';
import Button from './components/Common/Button';
import Input from './components/Common/Input';
import Dropdown from './components/Common/Dropdown';
import { AlertTriangle, CheckCircle2, Globe, HandHelping, Key, KeyRound, PlusCircle, Shuffle, Trash2, Users } from 'lucide-react';
import { ListSearch, filterRows, SortTh, useSort, sortRows, dateKey } from './components/Common/ListSearch';

// Replication ports live in this window; the port field is a counter inside it.
const PORT_MIN = 3001;
const PORT_MAX = 8000;

// A random access key for a Sender partner. crypto.getRandomValues, not
// Math.random: it is a shared secret. 32 characters from a 62-letter alphabet.
const makeAccessKey = () => {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const bytes = new Uint8Array(32);
    window.crypto.getRandomValues(bytes);
    return Array.from(bytes, (b) => alphabet[b % alphabet.length]).join('');
};

const QPartners = () => {
    const { sort: partnerSort, toggle: partnerToggle } = useSort();
    const [partnerQuery, setPartnerQuery] = React.useState('');
    const [partners, setPartners] = useState([]);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(null); // 'add' | 'delete'
    const [message, setMessage] = useState({ text: '', type: '' });

    const [formData, setFormData] = useState({
        type: 'Sender',
        address: '',
        alias: '',
        ppass: '',
        port: String(PORT_MIN)
    });
    const [portError, setPortError] = useState('');
    const [portBusy, setPortBusy] = useState(false);
    const [keyShown, setKeyShown] = useState(false);

    const loadPartners = useCallback(async (isInitial = false) => {
        try {
            const res = await fetchPartnerList();
            const data = res.data.allpartners || [];
            // Only update if data changed to avoid unnecessary re-renders
            setPartners(prev => JSON.stringify(prev) !== JSON.stringify(data) ? data : prev);
        } catch (err) {
            console.error("Failed to load partners", err);
        } finally {
            if (isInitial) setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadPartners(true);
        const interval = setInterval(() => loadPartners(), 5000);
        return () => clearInterval(interval);
    }, [loadPartners]);

    const handleInputChange = (id, value) => {
        if (id === 'port') setPortError('');
        if (id === 'type' && value !== 'Sender') setKeyShown(false);
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const portNumber = Number(formData.port);
    const portValid = Number.isInteger(portNumber) && portNumber >= PORT_MIN && portNumber <= PORT_MAX;

    const canSubmit = (
        (formData.address.length > 6 || formData.alias.length > 2) &&
        formData.alias.length > 2 &&
        formData.ppass.length > 2 &&
        portValid
    );

    // Ask the backend for a free port in PORT_MIN..PORT_MAX (it picks at random
    // and checks that nothing listens on it). If the call is not there yet, fall
    // back to a local pick and say so: the backend still checks at authorize time.
    const handlePickPort = async () => {
        setPortBusy(true);
        setPortError('');
        try {
            const res = await fetchFreePort();
            const port = Number(res?.data?.port ?? res?.data?.freeport ?? res?.data);
            if (!Number.isInteger(port) || port < PORT_MIN || port > PORT_MAX) throw new Error('bad port reply');
            handleInputChange('port', String(port));
        } catch (err) {
            const local = PORT_MIN + Math.floor(Math.random() * (PORT_MAX - PORT_MIN + 1));
            handleInputChange('port', String(local));
            setMessage({ text: `Suggested port ${local} (not checked by the node yet; it is verified when you authorize).`, type: 'error' });
        } finally {
            setPortBusy(false);
        }
    };

    const handleGenerateKey = () => {
        handleInputChange('ppass', makeAccessKey());
        setKeyShown(true);
    };

    const handleAddPartner = async (e) => {
        if (e) e.preventDefault();
        if (!canSubmit) return;

        setActionLoading('add');
        setMessage({ text: '', type: '' });

        try {
            const res = await addPartner({
                ip: formData.address,
                pass: formData.ppass,
                port: formData.port,
                type: formData.type,
                alias: formData.alias
            });
            // The backend refuses a used / out-of-range port with HTTP 200 and the plain text 'select another port'.
            const body = typeof res?.data === 'string' ? res.data : (res?.data?.response || '');
            if (/another port/i.test(String(body))) {
                setPortError('Select another port');
                setMessage({ text: 'Select another port', type: 'error' });
                return;
            }
            setMessage({ text: 'Partner added successfully', type: 'success' });
            setFormData({
                type: 'Sender',
                address: '',
                alias: '',
                ppass: '',
                port: String(PORT_MIN)
            });
            setKeyShown(false);
            loadPartners();
        } catch (err) {
            console.error("Add failed", err);
            // The backend answers 'select another port' when the port is taken.
            const reply = typeof err?.response?.data === 'string'
                ? err.response.data
                : (err?.response?.data?.message || err?.response?.data?.response || '');
            if (/another port/i.test(reply)) {
                setPortError('Select another port');
                setMessage({ text: 'Select another port', type: 'error' });
            } else {
                setMessage({ text: 'Failed to add partner', type: 'error' });
            }
        } finally {
            setActionLoading(null);
        }
    };

    const handleDeletePartner = async (alias) => {
        if (!window.confirm(`Are you sure you want to remove partner ${alias}?`)) return;

        setActionLoading(`delete-${alias}`);
        try {
            await deletePartner(alias);
            setMessage({ text: 'Partner removed successfully', type: 'success' });
            loadPartners();
        } catch (err) {
            console.error("Delete failed", err);
            setMessage({ text: 'Failed to remove partner', type: 'error' });
        } finally {
            setActionLoading(null);
        }
    };

    if (loading) {
        return (
            <div className="flex min-h-[400px] items-center justify-center">
                <div className="h-10 w-10 animate-spin rounded-full border-2 border-brand-200 border-t-brand-600" />
            </div>
        );
    }

    return (
                <div className="p-5">
                    <div className="rounded-xl border border-border bg-surface p-6 shadow-sm">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                            <div>
                                <h1 className="text-2xl font-semibold tracking-tight text-gray-900">Partner Ecosystem</h1>
                                <p className="mt-1 text-sm text-gray-500">Manage replication partners and secure communication channels</p>
                            </div>
                        </div>

                        {message.text && (
                            <div className={`mt-6 flex items-center gap-2 rounded-lg border px-4 py-3 text-sm font-medium ${message.type === 'success' ? 'border-success-100 bg-success-50 text-success-600' : 'border-danger-100 bg-danger-50 text-danger-600'}`}>
                                {message.type === 'success' ? <CheckCircle2 size={15} /> : <AlertTriangle size={15} />}
                                {message.text}
                            </div>
                        )}

                        <div className="mt-6 space-y-6">
                            <div className="rounded-lg border border-border bg-surface p-5 shadow-sm">
                                <div className="mb-5 flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-md bg-brand-50 text-brand-600">
                                        <HandHelping size={17} />
                                    </div>
                                    <h3 className="text-base font-semibold text-gray-800">Provision Partner</h3>
                                </div>

                                <form onSubmit={handleAddPartner} className="space-y-5">
                                    {/* Compact fields: each one is as wide as the longest thing it holds. */}
                                    <div className="flex flex-wrap items-end gap-x-5 gap-y-4">
                                        <Dropdown
                                            label="Partner Type"
                                            className="w-36"
                                            options={[
                                                { value: 'Sender', label: 'Sender' },
                                                { value: 'Receiver', label: 'Receiver' }
                                            ]}
                                            value={formData.type}
                                            onChange={(val) => handleInputChange('type', val)}
                                        />

                                        <Input
                                            label="Partner Alias"
                                            id="alias"
                                            className="w-60"
                                            placeholder="e.g. node_1_flat_dr_dls"
                                            value={formData.alias}
                                            onChange={(e) => handleInputChange('alias', e.target.value)}
                                            icon={<Users size={16} />}
                                        />

                                        <Input
                                            label="Network Address (IP/DNS)"
                                            id="address"
                                            kind="hostip"
                                            className="w-40"
                                            placeholder="xxx.xxx.xxx.xxx"
                                            value={formData.address}
                                            onChange={(e) => handleInputChange('address', e.target.value)}
                                            icon={<Globe size={16} />}
                                        />

                                        <div className="flex items-end gap-2">
                                            <Input
                                                label="Port"
                                                id="port"
                                                type="number"
                                                min={PORT_MIN}
                                                max={PORT_MAX}
                                                step={1}
                                                className="w-16 [&_input]:[appearance:textfield] [&_input::-webkit-inner-spin-button]:appearance-none"
                                                placeholder={String(PORT_MIN)}
                                                value={formData.port}
                                                error={portError || (formData.port !== '' && !portValid ? `${PORT_MIN}-${PORT_MAX}` : '')}
                                                onChange={(e) => handleInputChange('port', e.target.value)}
                                            />
                                            <button
                                                type="button"
                                                onClick={handlePickPort}
                                                disabled={portBusy}
                                                title={`Pick a free port (${PORT_MIN}-${PORT_MAX})`}
                                                aria-label="Pick a free port"
                                                className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md border border-border bg-surface text-gray-500 transition-colors hover:border-border-strong hover:text-brand-600 disabled:cursor-not-allowed disabled:opacity-50"
                                            >
                                                <Shuffle size={16} />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="flex items-end gap-2">
                                        <Input
                                            label="Access Key"
                                            id="ppass"
                                            type={keyShown ? 'text' : 'password'}
                                            className="w-full max-w-lg"
                                            placeholder="••••••••"
                                            value={formData.ppass}
                                            onChange={(e) => handleInputChange('ppass', e.target.value)}
                                            icon={<Key size={16} />}
                                        />
                                        {formData.type === 'Sender' && (
                                            <button
                                                type="button"
                                                onClick={handleGenerateKey}
                                                title="Generate a random access key"
                                                aria-label="Generate a random access key"
                                                className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md border border-border bg-surface text-gray-500 transition-colors hover:border-border-strong hover:text-brand-600"
                                            >
                                                <KeyRound size={16} />
                                            </button>
                                        )}
                                    </div>

                                    <div className="pt-4 border-t border-gray-50">
                                        <Button
                                            type="submit"
                                            className="w-full sm:w-auto"
                                            disabled={!canSubmit || actionLoading === 'add'}
                                            icon={<PlusCircle size={16} />}
                                            onClick={handleAddPartner}
                                        >
                                            {actionLoading === 'add' ? 'Establishing Relationship...' : 'Authorize Partner'}
                                        </Button>
                                    </div>
                                </form>
                            </div>

                            <div className="overflow-hidden rounded-lg border border-border bg-surface shadow-sm">
                                <div className="flex items-center justify-between gap-4 border-b border-border px-5 py-4">
                                    <div className="flex items-center gap-3">
                                        <span className="flex h-9 w-9 items-center justify-center rounded-md bg-brand-50 text-brand-600">
                                            <Users size={16} />
                                        </span>
                                        <div>
                                            <h3 className="text-base font-semibold text-gray-800">Active Relationships</h3>
                                            <p className="text-sm text-gray-500">Configured replication partners</p>
                                        </div>
                                    </div>
                                    <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface-muted px-3 py-1 text-xs font-medium text-gray-600">
                                        <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
                                        {partners.length} Total
                                    </span>
                                </div>

                                <ListSearch id="listsearch" value={partnerQuery} onChange={setPartnerQuery} />
                                <div className="overflow-x-auto">
                                        <table className="min-w-[760px] w-full text-left">
                                            <thead className="bg-surface-muted">
                                                <tr className="border-b border-border">
                                                    <SortTh sortKey="alias" sort={partnerSort} onToggle={partnerToggle} className="px-2.5 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-gray-500">Alias</SortTh>
                                                    <SortTh sortKey="net" sort={partnerSort} onToggle={partnerToggle} className="px-2.5 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-gray-500">Network Info</SortTh>
                                                    <SortTh sortKey="type" sort={partnerSort} onToggle={partnerToggle} className="px-2.5 py-1.5 text-center text-[11px] font-semibold uppercase tracking-wide text-gray-500">Type</SortTh>
                                                    <th className="px-2.5 py-1.5 text-right text-[11px] font-semibold uppercase tracking-wide text-gray-500">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-border">
                                                {sortRows(filterRows(partners, partnerQuery), partnerSort, { alias: (p) => p.alias.split('_')[0], net: (p) => p.ip, type: (p) => p.type }).map((partner, index) => (
                                                    <tr key={index} className="group transition-colors hover:bg-gray-50/60">
                                                        <td className="px-2.5 py-1">
                                                            <div className="flex items-center gap-3">
                                                                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-50 text-xs font-semibold text-brand-600">
                                                                    {partner.alias.charAt(0).toUpperCase()}
                                                                </div>
                                                                <span className="text-sm font-semibold text-gray-800">{partner.alias.split('_')[0]}</span>
                                                            </div>
                                                        </td>
                                                        <td className="px-2.5 py-1">
                                                            <div className="flex flex-col">
                                                                <span className="text-sm text-gray-700">{partner.ip}</span>
                                                                <span className="text-xs font-medium uppercase tracking-wide text-gray-500">Port: {partner.port}</span>
                                                            </div>
                                                        </td>
                                                        <td className="px-2.5 py-1 text-center">
                                                            <span className={`inline-flex rounded-sm border px-3 py-1 text-xs font-semibold uppercase tracking-wide ${partner.type === 'Sender' ? 'border-info-100 bg-info-50 text-info-600' :
                                                                'border-success-100 bg-success-50 text-success-600'
                                                                }`}>
                                                                {partner.type}
                                                            </span>
                                                        </td>
                                                        <td className="px-2.5 py-1 text-right">
                                                            <button
                                                                onClick={() => handleDeletePartner(partner.alias)}
                                                                disabled={actionLoading === `delete-${partner.alias}`}
                                                                className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-border bg-surface text-gray-500 transition-colors hover:border-danger-100 hover:bg-danger-50 hover:text-danger-600"
                                                                title="Delete Partner"
                                                            >
                                                                {actionLoading === `delete-${partner.alias}` ? (
                                                                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-danger-100 border-t-danger-600" />
                                                                ) : (
                                                                    <Trash2 size={14} />
                                                                )}
                                                            </button>
                                                        </td>

                                                    </tr>
                                                ))}
                                                {partners.length === 0 && (
                                                    <tr>
                                                        <td colSpan="4" className="px-5 py-14 text-center">
                                                            <div className="flex flex-col items-center gap-4">
                                                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-surface-muted text-gray-400">
                                                                    <HandHelping size={18} />
                                                                </div>
                                                                <div>
                                                                    <p className="text-sm font-semibold text-gray-500">No partners found</p>
                                                                    <p className="mt-1 text-xs text-gray-400">Add a relationship to start data replication</p>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                        {partnerQuery.trim() && filterRows(partners, partnerQuery).length === 0 && partners.length > 0 && (
                                            <div className="py-6 text-center text-sm text-gray-500">No rows match the search</div>
                                        )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
    );
};

export default QPartners;
