import React, { useState } from 'react';
import { UserPlus, Users } from 'lucide-react';
import Button from './Common/Button';
import Input from './Common/Input';
import Dropdown from './Common/Dropdown';
import Panel from './Common/Panel';

const AddGroupForm = ({ users, onAdd }) => {
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
        <Panel
            icon={<UserPlus size={17} />}
            title="Create New Group"
            subtitle="Permission management"
            collapsible
            defaultOpen
            bodyClass="p-5"
        >
            <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
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
                        options={users.map((user) => ({ value: String(user.id), label: user.text }))}
                        value={formData.GroupUsers}
                        onChange={(val) => handleChange('GroupUsers', val)}
                    />
                </div>

                <div className="flex justify-end border-t border-border pt-4">
                    <Button type="submit" className="w-full sm:w-auto" disabled={!canSubmit} icon={<UserPlus size={15} />}>
                        Create Group
                    </Button>
                </div>
            </form>
        </Panel>
    );
};

export default AddGroupForm;
