import React, { useState } from 'react';
import { ChevronDown, Users } from 'lucide-react';
import Button from './Common/Button';
import Input from './Common/Input';
import Dropdown from './Common/Dropdown';

const AddGroupForm = ({ users, onAdd }) => {
    const [isExpanded, setIsExpanded] = useState(true);
    const [formData, setFormData] = useState({
        Group: '',
        GroupUsers: []
    });

    const handleChange = (id, value) => {
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            name: formData.Group,
            users: formData.GroupUsers.join(','),
            Myname: 'mezo'
        };
        onAdd(data);
        // Reset form
        setFormData({ Group: '', GroupUsers: [] });
    };

    const canSubmit = formData.Group.length > 2;

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 transition-all duration-300 relative group hover:shadow-md">
            {/* Theme Accent Line - Indigo for Groups */}
            <div className="absolute top-0 bottom-0 left-0 w-1.5 bg-indigo-500 rounded-l-2xl shadow-[2px_0_10px_rgba(99,102,241,0.2)]"></div>

            <div
                className="px-6 py-5 border-b border-gray-50 flex justify-between items-center cursor-pointer hover:bg-gray-50/50 transition-colors"
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 shadow-inner">
                        <i className={`fas fa-users transition-transform duration-500 ${isExpanded ? 'scale-110' : ''}`}></i>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-gray-800 tracking-tight">Create New Group</h3>
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mt-0.5">Permission Management</p>
                    </div>
                </div>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${isExpanded ? 'bg-indigo-600 text-white rotate-180 shadow-lg shadow-indigo-200' : 'bg-gray-100 text-gray-400'}`}>
                    <ChevronDown size={18} />
                </div>
            </div>

            {isExpanded && (
                <div className="p-8 animate-in fade-in slide-in-from-top-4 duration-500">
                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <Input
                                label="Group Name"
                                placeholder="e.g. developers"
                                id="Group"
                                value={formData.Group}
                                onChange={(e) => handleChange('Group', e.target.value)}
                                icon={<Users size={16} />}
                            />

                            <Dropdown
                                label="Initial Members"
                                isMulti
                                options={users.map(user => ({ value: String(user.id), label: user.text }))}
                                value={formData.GroupUsers}
                                onChange={(val) => handleChange('GroupUsers', val)}
                            />
                        </div>

                        <div className="pt-6 border-t border-gray-50 flex justify-end items-center gap-4">
                            <Button
                                type="submit"
                                className="w-full sm:w-auto"
                                bgColor="bg-indigo-600"
                                disabled={!canSubmit}
                                icon={<i className="fas fa-plus-circle"></i>}
                                onClick={handleSubmit}
                            >
                                Create Group
                            </Button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default AddGroupForm;
