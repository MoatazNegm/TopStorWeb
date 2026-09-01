import React, { useState, useEffect, useCallback } from 'react';
import {
    AlertTriangle, Ban, BookOpen, Check, Copy, Download, Inbox, KeySquare, PlusCircle, RefreshCw, Trash2,
} from 'lucide-react';
import { fetchApiKeys, createApiKey, regenerateApiKey, revokeApiKey, deleteApiKey, API_GUIDE_URL } from './api/apikeys';
import Button from './components/Common/Button';
import Input from './components/Common/Input';
import Dropdown from './components/Common/Dropdown';

const NAME_RE = /^[A-Za-z][A-Za-z0-9_-]{2,31}$/;

const QApiKeys = () => {
    const [keys, setKeys] = useState([]);
    const [loading, setLoading] = useState(true);
    const [busy, setBusy] = useState('');
    const [message, setMessage] = useState({ type: '', text: '' });
    const [form, setForm] = useState({ name: '', access: 'read' });
    // The secret exists only here, right after create/regenerate; it is never listed again.
    const [secret, setSecret] = useState(null);
    const [copied, setCopied] = useState(false);

    const load = useCallback(async () => {
        try {
            const res = await fetchApiKeys();
            setKeys(res.data.allkeys || []);
        } catch (err) {
            console.error('Failed to load API keys', err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        load();
        const t = setInterval(load, 10000);
        return () => clearInterval(t);
    }, [load]);

    // The backend answers 200 with response 'error' and a message for refusals.
    const run = async (tag, call, okText) => {
        setBusy(tag);
        setMessage({ type: '', text: '' });
        try {
            const res = await call();
            const d = res.data || {};
            if (d.response && d.response !== 'Ok') {
                setMessage({ type: 'error', text: d.message || String(d.response) });
                return null;
            }
            if (okText) setMessage({ type: 'success', text: okText });
            await load();
            return d;
        } catch (err) {
            setMessage({ type: 'error', text: 'The request failed.' });
            return null;
        } finally {
            setBusy('');
        }
    };

    const showSecret = (d) => {
        if (d && d.key) {
            setSecret({ name: d.name, key: d.key });
            setCopied(false);
        }
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        const d = await run('create', () => createApiKey(form), `API key ${form.name} created.`);
        if (d) {
            showSecret(d);
            setForm({ name: '', access: 'read' });
        }
    };

    const handleRegenerate = async (k) => {
        if (!window.confirm(`Create a new key for ${k.name}? The current key stops working immediately.`)) return;
        showSecret(await run('regen-' + k.name, () => regenerateApiKey(k.name), `New key created for ${k.name}.`));
    };

    const handleRevoke = async (k) => {
        if (!window.confirm(`Revoke the key of ${k.name}? Applications using it are refused at once. The name stays so you can create a new key.`)) return;
        await run('revoke-' + k.name, () => revokeApiKey(k.name), `Key of ${k.name} revoked.`);
    };

    const handleDelete = async (k) => {
        if (!window.confirm(`Remove ${k.name} from the list? The name becomes free again.`)) return;
        await run('del-' + k.name, () => deleteApiKey(k.name), `${k.name} removed.`);
    };

    const copySecret = async () => {
        try {
            await navigator.clipboard.writeText(secret.key);
            setCopied(true);
        } catch (err) {
            setMessage({ type: 'error', text: 'Copy failed, select the key and copy it by hand.' });
        }
    };

    const nameOk = NAME_RE.test(form.name);
    const taken = keys.some((k) => k.name === form.name);

    return (
        <div className="p-5">
            <div className="rounded-xl border border-border bg-surface p-6 shadow-sm">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight text-gray-900">API Keys</h1>
                        <p className="mt-1 text-sm text-gray-500">
                            Named keys for scripts and applications that call the REST API. A key is not a user of the system:
                            it has no group and no home, it only authenticates API calls.
                        </p>
                    </div>
                    <a
                        href={API_GUIDE_URL}
                        download="TopStor-API-USER-GUIDE.md"
                        className="inline-flex flex-shrink-0 items-center gap-2 rounded-md border border-border bg-surface px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-brand-100 hover:text-brand-600"
                    >
                        <BookOpen size={15} />
                        API user guide
                        <Download size={14} />
                    </a>
                </div>

                {message.text && (
                    <div className={`mt-6 flex items-center gap-2 rounded-lg border px-4 py-3 text-sm font-medium ${message.type === 'success' ? 'border-success-100 bg-success-50 text-success-600' : 'border-danger-100 bg-danger-50 text-danger-600'}`}>
                        {message.type === 'success' ? <Check size={14} /> : <AlertTriangle size={14} />}
                        {message.text}
                    </div>
                )}

                {secret && (
                    <div className="mt-6 rounded-lg border border-warning-100 bg-warning-50 p-4">
                        <p className="text-sm font-semibold text-gray-800">
                            Key for <span className="font-mono">{secret.name}</span> — copy it now, it is shown only once.
                        </p>
                        <div className="mt-3 flex items-center gap-2">
                            <code className="min-w-0 flex-1 select-all break-all rounded-md border border-border bg-surface px-3 py-2 font-mono text-sm text-gray-900">
                                {secret.key}
                            </code>
                            <Button type="button" variant="secondary" onClick={copySecret} icon={copied ? <Check size={14} /> : <Copy size={14} />}>
                                {copied ? 'Copied' : 'Copy'}
                            </Button>
                            <Button type="button" variant="secondary" onClick={() => setSecret(null)}>Done</Button>
                        </div>
                        <p className="mt-2 text-xs text-gray-500">
                            Use it as the <span className="font-mono">token</span> parameter of any API call. Store it like a password.
                        </p>
                    </div>
                )}

                <form onSubmit={handleCreate} className="mt-6 flex flex-wrap items-end gap-x-5 gap-y-4 rounded-lg border border-border bg-surface p-5">
                    <Input
                        label="Key name"
                        id="keyname"
                        className="w-64"
                        placeholder="e.g. backup_script"
                        value={form.name}
                        onChange={(e) => setForm((f) => ({ ...f, name: e.target.value.replace(/\s/g, '') }))}
                        error={form.name && !nameOk ? '3-32 letters, digits, _ or -' : (taken ? 'Name already used' : '')}
                        icon={<KeySquare size={16} />}
                    />
                    <Dropdown
                        label="Access"
                        className="w-52"
                        options={[
                            { value: 'read', label: 'Read only' },
                            { value: 'write', label: 'Read and change' },
                        ]}
                        value={form.access}
                        onChange={(val) => setForm((f) => ({ ...f, access: val }))}
                    />
                    <Button
                        type="submit"
                        disabled={!nameOk || taken || busy === 'create'}
                        icon={busy === 'create' ? <RefreshCw size={14} className="animate-spin" /> : <PlusCircle size={16} />}
                    >
                        Generate key
                    </Button>
                </form>

                <div className="mt-6 overflow-x-auto rounded-lg border border-border">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-surface-muted text-xs font-semibold uppercase tracking-wide text-gray-500">
                            <tr>
                                <th className="px-4 py-3">Name</th>
                                <th className="px-4 py-3">Access</th>
                                <th className="px-4 py-3">Status</th>
                                <th className="px-4 py-3">Created</th>
                                <th className="px-4 py-3">Last used</th>
                                <th className="px-4 py-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {keys.map((k) => (
                                <tr key={k.name}>
                                    <td className="px-4 py-3 font-mono font-medium text-gray-800">{k.name}</td>
                                    <td className="px-4 py-3 text-gray-600">{k.access === 'write' ? 'Read and change' : 'Read only'}</td>
                                    <td className="px-4 py-3">
                                        <span className={`inline-flex rounded-sm border px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide ${k.status === 'active' ? 'border-success-100 bg-success-50 text-success-600' : 'border-danger-100 bg-danger-50 text-danger-600'}`}>
                                            {k.status === 'active' ? 'Active' : 'Revoked'}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-gray-600">{k.created || '-'}{k.createdby ? ` by ${k.createdby}` : ''}</td>
                                    <td className="px-4 py-3 text-gray-600">{k.lastused || 'never'}</td>
                                    <td className="px-4 py-3">
                                        <div className="flex justify-end gap-2">
                                            <Button
                                                type="button"
                                                variant="secondary"
                                                disabled={!!busy}
                                                onClick={() => handleRegenerate(k)}
                                                icon={<RefreshCw size={14} />}
                                            >
                                                New key
                                            </Button>
                                            {k.status === 'active' && (
                                                <Button
                                                    type="button"
                                                    variant="secondary"
                                                    disabled={!!busy}
                                                    onClick={() => handleRevoke(k)}
                                                    icon={<Ban size={14} />}
                                                >
                                                    Revoke
                                                </Button>
                                            )}
                                            <button
                                                type="button"
                                                disabled={!!busy}
                                                onClick={() => handleDelete(k)}
                                                title="Remove from the list"
                                                aria-label={`Remove ${k.name}`}
                                                className="flex h-9 w-9 items-center justify-center rounded-md border border-border text-gray-500 transition-colors hover:border-danger-100 hover:text-danger-600 disabled:opacity-50"
                                            >
                                                <Trash2 size={15} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {!loading && keys.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="px-4 py-10 text-center text-gray-500">
                                        <Inbox size={18} className="mx-auto mb-2 text-gray-400" />
                                        No API keys yet.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default QApiKeys;
