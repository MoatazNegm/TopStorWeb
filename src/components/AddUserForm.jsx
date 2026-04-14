import React, { useState } from 'react';
import { ChevronDown, User, Key, HardDrive, Hash, Shield } from 'lucide-react';
import Button from './Common/Button';
import Input from './Common/Input';
import Dropdown from './Common/Dropdown';

const AddUserForm = ({ pools, groups, onAdd }) => {
    const [isExpanded, setIsExpanded] = useState(true);
    const [formData, setFormData] = useState({
        Tenant: 'Cluster',
        User: '',
        UserPass: '',
        UserVol: 'NoHome',
        volsize: 1,
        HomeAddress: '',
        HomeSubnet: 8,
        Usergroups: []
    });

    const handleChange = (id, value) => {
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            name: formData.User,
            Volpool: formData.UserVol,
            groups: formData.Usergroups.join(','),
            Password: formData.UserPass,
            Volsize: formData.volsize,
            HomeAddress: formData.HomeAddress || 'NoAddress',
            HomeSubnet: formData.HomeSubnet,
            Myname: 'mezo'
        };
        onAdd(data);
    };

    const canSubmit = formData.User.length > 2 && formData.UserPass.length > 2;

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 transition-all duration-300 relative group hover:shadow-md">
            {/* Theme Accent Line - Indigo for Users */}
            <div className="absolute top-0 bottom-0 left-0 w-1.5 bg-indigo-500 rounded-l-2xl shadow-[2px_0_10px_rgba(99,102,241,0.2)]"></div>

            <div
                className="px-6 py-5 border-b border-gray-50 flex justify-between items-center cursor-pointer hover:bg-gray-50/50 transition-colors"
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 shadow-inner">
                        <i className={`fas fa-user-plus transition-transform duration-500 ${isExpanded ? 'scale-110' : ''}`}></i>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-gray-800 tracking-tight">Create New User</h3>
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mt-0.5">Account Provisioning</p>
                    </div>
                </div>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${isExpanded ? 'bg-indigo-600 text-white rotate-180 shadow-lg shadow-indigo-200' : 'bg-gray-100 text-gray-400'}`}>
                    <ChevronDown size={18} />
                </div>
            </div>

            {isExpanded && (
                <div className="p-8 animate-in fade-in slide-in-from-top-4 duration-500">
                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Section Header */}
                        <div className="flex items-center gap-3 mb-2">
                            <span className="h-px flex-1 bg-gray-100"></span>
                            <span className="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em]">Basic Information</span>
                            <span className="h-px flex-1 bg-gray-100"></span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <Input
                                label="User Name"
                                placeholder="e.g. john_doe"
                                id="User"
                                value={formData.User}
                                onChange={(e) => handleChange('User', e.target.value)}
                                icon={<User size={16} />}
                            />

                            <Input
                                label="Password"
                                type="password"
                                placeholder="••••••••"
                                id="UserPass"
                                value={formData.UserPass}
                                onChange={(e) => handleChange('UserPass', e.target.value)}
                                icon={<Key size={16} />}
                            />

                            <Dropdown
                                label="Home Pool"
                                options={[
                                    { value: 'NoHome', label: 'Select storage pool' },
                                    ...pools.map(pool => ({ value: pool.id || pool.text, label: pool.text }))
                                ]}
                                value={formData.UserVol}
                                onChange={(val) => handleChange('UserVol', val)}
                            />

                            <Input
                                label="Quota (GB)"
                                type="number"
                                placeholder="e.g. 50"
                                id="volsize"
                                value={formData.volsize}
                                onChange={(e) => handleChange('volsize', e.target.value)}
                                icon={<HardDrive size={16} />}
                            />

                            <Input
                                label="IP Address Restriction"
                                id="HomeAddress"
                                placeholder="e.g. 192.168.1.100"
                                value={formData.HomeAddress}
                                onChange={(e) => handleChange('HomeAddress', e.target.value)}
                                icon={<Hash size={16} />}
                            />

                            <Dropdown
                                label="Allowed Groups"
                                isMulti
                                options={groups.map(group => ({ value: group.text, label: group.text }))}
                                value={formData.Usergroups}
                                onChange={(val) => handleChange('Usergroups', val)}
                            />
                        </div>

                        {/* Footer Actions */}
                        <div className="pt-6 border-t border-gray-50 flex flex-col sm:flex-row justify-between items-center gap-4">
                            <div className="flex gap-2">
                                <button type="button" className="px-4 py-2 bg-gray-50 text-gray-500 hover:bg-gray-100 hover:text-gray-700 rounded-lg text-xs font-bold transition-colors border border-gray-100">
                                    <i className="fas fa-file-import mr-2"></i> Import Template
                                </button>
                                <a className="px-4 py-2 bg-gray-50 text-gray-500 hover:bg-gray-100 hover:text-gray-700 rounded-lg text-xs font-bold transition-colors border border-gray-100 flex items-center" href="dist/Template.xlsx" download>
                                    <i className="fas fa-download mr-2"></i> Download Template
                                </a>
                            </div>

                            <Button
                                type="submit"
                                className="w-full sm:w-auto"
                                bgColor="bg-indigo-600"
                                disabled={!canSubmit}
                                icon={<i className="fas fa-plus-circle"></i>}
                                onClick={handleSubmit}
                            >
                                Add System User
                            </Button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default AddUserForm;
