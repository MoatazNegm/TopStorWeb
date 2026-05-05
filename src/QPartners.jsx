import React, { useState, useEffect, useCallback } from 'react';
import { fetchPartnerList, addPartner, deletePartner } from './api/partners';
import Button from './components/Common/Button';
import Input from './components/Common/Input';
import Dropdown from './components/Common/Dropdown';
import { Users, Globe, Hash, Key, Trash2, PlusCircle, RefreshCw, HandHelping } from 'lucide-react';

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
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    return (
        <div className="content-wrapper">
            <div className="floating-canvas">
                <div className="content-header px-4">
                    <div className="container-fluid">
                        <div className="flex justify-between items-center mb-10">
                            <div>
                                <h1 className="text-2xl font-black text-gray-800 tracking-tight">Partner Ecosystem</h1>
                                <p className="text-xs text-gray-400 mt-0.5 font-medium uppercase tracking-wider">Manage replication partners and secure communication channels</p>
                            </div>
                            <Button
                                onClick={() => loadPartners()}
                                bgColor="bg-white"
                                textColor="text-gray-400"
                                className="border border-gray-100 hover:text-indigo-500 rounded-xl shadow-sm transition-all"
                                icon={<RefreshCw size={16} className={loading ? 'animate-spin' : ''} />}
                            />
                        </div>

                        {message.text && (
                            <div className={`mb-8 p-4 rounded-2xl flex items-center gap-3 text-sm font-bold animate-in fade-in slide-in-from-top-4 ${message.type === 'success' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-rose-50 text-rose-600 border border-rose-100'}`}>
                                <i className={`fas ${message.type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}`}></i>
                                {message.text}
                            </div>
                        )}

                        <div className="flex flex-col gap-8">
                            {/* New Partner Form */}
                            <div>
                                <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 relative group">
                                    <div className="absolute top-0 bottom-0 left-0 w-1.5 bg-indigo-500 rounded-l-xl shadow-[2px_0_10px_rgba(99,102,241,0.2)]"></div>

                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-500 flex items-center justify-center shadow-sm">
                                            <HandHelping size={20} />
                                        </div>
                                        <h3 className="text-lg font-bold text-gray-800 tracking-tight">Provision Partner</h3>
                                    </div>

                                    <form onSubmit={handleAddPartner} className="space-y-6">
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
                                                className="w-full py-3 text-[10px] font-black uppercase tracking-[0.2em] shadow-md shadow-indigo-100 transition-all hover:-translate-y-0.5"
                                                bgColor="bg-indigo-600"
                                                disabled={!canSubmit || actionLoading === 'add'}
                                                icon={<PlusCircle size={16} />}
                                                onClick={handleAddPartner}
                                            >
                                                {actionLoading === 'add' ? 'Establishing Relationship...' : 'Authorize Partner'}
                                            </Button>
                                        </div>
                                    </form>
                                </div>
                            </div>

                            {/* Partner List */}
                            <div>
                                <div className="bg-white rounded-xl shadow-sm border border-gray-100 relative group overflow-visible">
                                    <div className="absolute top-0 bottom-0 left-0 w-1.5 bg-indigo-500 rounded-l-xl shadow-[2px_0_10px_rgba(99,102,241,0.2)]"></div>

                                    <div className="px-8 py-6 border-b border-gray-50 flex justify-between items-center bg-gray-50/30 rounded-t-xl">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-500 flex items-center justify-center">
                                                <i className="fas fa-list-ul text-xs"></i>
                                            </div>
                                            <h3 className="text-lg font-bold text-gray-800 tracking-tight">Active Relationships</h3>
                                        </div>
                                        <span className="px-3 py-1 bg-white border border-gray-100 rounded-full text-[10px] font-black text-gray-400 uppercase tracking-widest shadow-sm">
                                            {partners.length} Total
                                        </span>
                                    </div>

                                    <div className="p-0 overflow-x-auto">
                                        <table className="w-full text-left border-collapse">
                                            <thead>
                                                <tr className="bg-gray-50/50">
                                                    <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">Alias</th>
                                                    <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">Network Info</th>
                                                    <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100 text-center">Type</th>
                                                    <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100 text-right">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-50">
                                                {partners.map((partner, index) => (
                                                    <tr key={index} className="hover:bg-gray-50/50 transition-colors group">
                                                        <td className="px-8 py-4">
                                                            <div className="flex items-center gap-3">
                                                                <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center text-[10px] font-bold shadow-sm">
                                                                    {partner.alias.charAt(0).toUpperCase()}
                                                                </div>
                                                                <span className="font-bold text-gray-700 text-sm">{partner.alias.split('_')[0]}</span>
                                                            </div>
                                                        </td>
                                                        <td className="px-8 py-4">
                                                            <div className="flex flex-col">
                                                                <span className="text-sm font-semibold text-gray-600">{partner.ip}</span>
                                                                <span className="text-[10px] font-medium text-gray-400 uppercase tracking-tighter">Port: {partner.port}</span>
                                                            </div>
                                                        </td>
                                                        <td className="px-8 py-4 text-center">
                                                            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${partner.type === 'Dual way' ? 'bg-indigo-50 text-indigo-600 border border-indigo-100' :
                                                                partner.type === 'Sender' ? 'bg-blue-50 text-blue-600 border border-blue-100' :
                                                                    'bg-emerald-50 text-emerald-600 border border-emerald-100'
                                                                }`}>
                                                                {partner.type}
                                                            </span>
                                                        </td>
                                                        <td className="px-8 py-4 text-right">
                                                            <button
                                                                onClick={() => handleDeletePartner(partner.alias)}
                                                                disabled={actionLoading === `delete-${partner.alias}`}
                                                                className="w-9 h-9 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center hover:bg-rose-500 hover:text-white transition-all shadow-sm hover:shadow-rose-100"
                                                                title="Delete Partner"
                                                            >
                                                                {actionLoading === `delete-${partner.alias}` ? (
                                                                    <div className="w-4 h-4 border-2 border-rose-200 border-t-rose-500 rounded-full animate-spin"></div>
                                                                ) : (
                                                                    <Trash2 size={14} />
                                                                )}
                                                            </button>
                                                        </td>

                                                    </tr>
                                                ))}
                                                {partners.length === 0 && (
                                                    <tr>
                                                        <td colSpan="4" className="px-8 py-20 text-center">
                                                            <div className="flex flex-col items-center gap-4">
                                                                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-gray-200">
                                                                    <HandHelping size={32} />
                                                                </div>
                                                                <div>
                                                                    <p className="text-sm font-bold text-gray-400 uppercase tracking-[0.2em]">No Partners Found</p>
                                                                    <p className="text-xs text-gray-300 font-medium mt-1">Add a relationship to start data replication</p>
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
                </div>
            </div>
        </div>
    );
};

export default QPartners;
