import React, { useState, useEffect, useCallback } from 'react';
import { fetchPartnerList, addPartner, deletePartner } from './api/partners';
import Button from './components/Common/Button';
import Input from './components/Common/Input';
import Dropdown from './components/Common/Dropdown';
import { AlertTriangle, CheckCircle2, Globe, HandHelping, Hash, Key, PlusCircle, RefreshCw, Trash2, Users } from 'lucide-react';

const QPartners = () => {
    const [partners, setPartners] = useState([]);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(null); // 'add' | 'delete'
    const [message, setMessage] = useState({ text: '', type: '' });

    const [formData, setFormData] = useState({
        type: 'Sender',
        address: '',
        alias: '',
        ppass: '',
        port: '22'
    });

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
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const canSubmit = (
        (formData.address.length > 6 || formData.alias.length > 2) &&
        formData.alias.length > 2 &&
        formData.ppass.length > 2
    );

    const handleAddPartner = async (e) => {
        if (e) e.preventDefault();
        if (!canSubmit) return;

        setActionLoading('add');
        setMessage({ text: '', type: '' });

        try {
            await addPartner({
                ip: formData.address,
                pass: formData.ppass,
                port: formData.port,
                type: formData.type,
                alias: formData.alias
            });
            setMessage({ text: 'Partner added successfully', type: 'success' });
            setFormData({
                type: 'Sender',
                address: '',
                alias: '',
                ppass: '',
                port: '22'
            });
            loadPartners();
        } catch (err) {
            console.error("Add failed", err);
            setMessage({ text: 'Failed to add partner', type: 'error' });
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
                            <Button
                                onClick={() => loadPartners()}
                                variant="secondary"
                                icon={<RefreshCw size={15} className={loading ? 'animate-spin' : ''} />}
                            >
                                Sync Now
                            </Button>
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
                                        <Dropdown
                                            label="Partner Type"
                                            options={[
                                                { value: 'Sender', label: 'Sender' },
                                                { value: 'Receiver', label: 'Receiver' },
                                                { value: 'Dual way', label: 'Dual way' }
                                            ]}
                                            value={formData.type}
                                            onChange={(val) => handleInputChange('type', val)}
                                        />

                                        <Input
                                            label="Partner Alias"
                                            id="alias"
                                            placeholder="e.g. branch_office"
                                            value={formData.alias}
                                            onChange={(e) => handleInputChange('alias', e.target.value)}
                                            icon={<Users size={16} />}
                                        />

                                        <Input
                                            label="Network Address (IP/DNS)"
                                            id="address"
                                            placeholder="xxx.xxx.xxx.xxx"
                                            value={formData.address}
                                            onChange={(e) => handleInputChange('address', e.target.value)}
                                            icon={<Globe size={16} />}
                                        />

                                        <Input
                                            label="Port"
                                            id="port"
                                            type="number"
                                            placeholder="22"
                                            value={formData.port}
                                            onChange={(e) => handleInputChange('port', e.target.value)}
                                            icon={<Hash size={16} />}
                                        />
                                        <Input
                                            label="Access Key"
                                            id="ppass"
                                            type="password"
                                            placeholder="••••••••"
                                            value={formData.ppass}
                                            onChange={(e) => handleInputChange('ppass', e.target.value)}
                                            icon={<Key size={16} />}
                                        />

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

                                <div className="overflow-x-auto">
                                        <table className="min-w-[760px] w-full text-left">
                                            <thead className="bg-surface-muted">
                                                <tr className="border-b border-border">
                                                    <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">Alias</th>
                                                    <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">Network Info</th>
                                                    <th className="px-5 py-3 text-center text-xs font-semibold uppercase tracking-wide text-gray-500">Type</th>
                                                    <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-border">
                                                {partners.map((partner, index) => (
                                                    <tr key={index} className="group transition-colors hover:bg-gray-50/60">
                                                        <td className="px-5 py-4">
                                                            <div className="flex items-center gap-3">
                                                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-50 text-xs font-semibold text-brand-600">
                                                                    {partner.alias.charAt(0).toUpperCase()}
                                                                </div>
                                                                <span className="text-sm font-semibold text-gray-800">{partner.alias.split('_')[0]}</span>
                                                            </div>
                                                        </td>
                                                        <td className="px-5 py-4">
                                                            <div className="flex flex-col">
                                                                <span className="text-sm text-gray-700">{partner.ip}</span>
                                                                <span className="text-xs font-medium uppercase tracking-wide text-gray-500">Port: {partner.port}</span>
                                                            </div>
                                                        </td>
                                                        <td className="px-5 py-4 text-center">
                                                            <span className={`inline-flex rounded-sm border px-3 py-1 text-xs font-semibold uppercase tracking-wide ${partner.type === 'Dual way' ? 'border-brand-100 bg-brand-50 text-brand-700' :
                                                                partner.type === 'Sender' ? 'border-info-100 bg-info-50 text-info-600' :
                                                                    'border-success-100 bg-success-50 text-success-600'
                                                                }`}>
                                                                {partner.type}
                                                            </span>
                                                        </td>
                                                        <td className="px-5 py-4 text-right">
                                                            <button
                                                                onClick={() => handleDeletePartner(partner.alias)}
                                                                disabled={actionLoading === `delete-${partner.alias}`}
                                                                className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-surface text-gray-500 transition-colors hover:border-danger-100 hover:bg-danger-50 hover:text-danger-600"
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
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
    );
};

export default QPartners;
