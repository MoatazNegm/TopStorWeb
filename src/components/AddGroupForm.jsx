import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

const AddGroupForm = ({ users, onAdd }) => {
    const [isExpanded, setIsExpanded] = useState(true);
    const [formData, setFormData] = useState({
        Group: '',
        GroupUsers: []
    });

    const selectRef = useRef(null);

    useEffect(() => {
        if (isExpanded && selectRef.current && window.$) {
            const $select = window.$(selectRef.current);
            $select.select2({
                placeholder: "Select users to add to this group",
                theme: 'bootstrap4',
                width: '100%'
            });
            $select.on('change', (e) => {
                const values = window.$(e.target).val() || [];
                setFormData(prev => ({ ...prev, GroupUsers: values }));
            });
            return () => {
                if ($select.data('select2')) $select.select2('destroy');
            };
        }
    }, [isExpanded]);

    const handleChange = (e) => {
        const { id, value } = e.target;
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
        if (selectRef.current && window.$) {
            window.$(selectRef.current).val(null).trigger('change');
        }
    };

    const canSubmit = formData.Group.length > 2;

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 relative group hover:shadow-md">
            {/* Theme Accent Line - Indigo for Groups */}
            <div className="absolute top-0 bottom-0 left-0 w-1.5 bg-indigo-500 shadow-[2px_0_10px_rgba(99,102,241,0.2)]"></div>

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
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider px-1">Group Name</label>
                                <div className="relative group">
                                    <input
                                        type="text"
                                        className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-gray-700 focus:bg-white focus:ring-4 focus:ring-indigo-100 focus:border-indigo-400 transition-all outline-none"
                                        placeholder="e.g. developers"
                                        id="Group"
                                        value={formData.Group}
                                        onChange={handleChange}
                                    />
                                    <i className="fas fa-users-cog absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-indigo-400 transition-colors"></i>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider px-1">Initial Members</label>
                                <select
                                    ref={selectRef}
                                    className="select2 w-full"
                                    multiple
                                    defaultValue={[]}
                                >
                                    {users.map(user => (
                                        <option key={user.id} value={user.id}>{user.text}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="pt-6 border-t border-gray-50 flex justify-end items-center gap-4">
                            <button
                                type="submit"
                                className={`w-full sm:w-auto px-10 py-3 rounded-xl font-bold shadow-lg transition-all flex items-center justify-center gap-3 ${canSubmit ? 'bg-indigo-600 text-white shadow-indigo-200 hover:bg-indigo-700 hover:shadow-indigo-300 hover:-translate-y-0.5 active:translate-y-0' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
                                disabled={!canSubmit}
                            >
                                <i className="fas fa-plus-circle"></i>
                                Create Group
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default AddGroupForm;
