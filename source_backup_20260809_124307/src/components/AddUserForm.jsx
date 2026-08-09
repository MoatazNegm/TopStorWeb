import React, { useState } from 'react';
import {
    AlertCircle,
    Download,
    HardDrive,
    Hash,
    Key,
    PlusCircle,
    Upload,
    User,
    UserPlus,
} from 'lucide-react';
import Button from './Common/Button';
import Input from './Common/Input';
import Dropdown from './Common/Dropdown';
import Panel from './Common/Panel';

const isValidIP = (ip) =>
    /^(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)$/.test(ip);

const AddUserForm = ({ pools, groups, onAdd }) => {
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

    const ipError =
        formData.HomeAddress && !isValidIP(formData.HomeAddress)
            ? 'Invalid IP address format; backend validation will reject this value.'
            : '';

    return (
        <Panel
            collapsible
            defaultOpen
            icon={<UserPlus size={18} />}
            title="Create New User"
            subtitle="Account provisioning"
            bodyClass="p-6"
            footer={
                <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
                    <div className="flex flex-wrap items-center gap-2">
                        <button
                            type="button"
                            className="inline-flex items-center gap-2 rounded-md border border-border bg-surface px-3.5 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-brand-600"
                        >
                            <Upload size={15} />
                            Import Template
                        </button>
                        <a
                            className="inline-flex items-center gap-2 rounded-md border border-border bg-surface px-3.5 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-brand-600"
                            href="dist/Template.xlsx"
                            download
                        >
                            <Download size={15} />
                            Download Template
                        </a>
                    </div>
                    <Button
                        type="submit"
                        variant="primary"
                        disabled={!canSubmit}
                        icon={<PlusCircle size={16} />}
                        onClick={handleSubmit}
                    >
                        Add System User
                    </Button>
                </div>
            }
        >
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                    <Input
                        label="User Name"
                        placeholder="e.g. john_doe"
                        id="User"
                        value={formData.User}
                        onChange={(event) => handleChange('User', event.target.value)}
                        icon={<User size={16} />}
                    />

                    <Input
                        label="Password"
                        type="password"
                        placeholder="********"
                        id="UserPass"
                        value={formData.UserPass}
                        onChange={(event) => handleChange('UserPass', event.target.value)}
                        icon={<Key size={16} />}
                    />

                    <Dropdown
                        label="Home Pool"
                        options={[
                            { value: 'NoHome', label: 'Select storage pool' },
                            ...pools.map((pool) => ({ value: pool.text, label: pool.text }))
                        ]}
                        value={formData.UserVol}
                        onChange={(value) => handleChange('UserVol', value)}
                    />

                    <Input
                        label="Quota (GB)"
                        type="number"
                        placeholder="e.g. 50"
                        id="volsize"
                        value={formData.volsize}
                        onChange={(event) => handleChange('volsize', event.target.value)}
                        icon={<HardDrive size={16} />}
                        disabled={formData.UserVol === 'NoHome'}
                    />

                    <Input
                        label="IP Address Restriction"
                        id="HomeAddress"
                        placeholder="e.g. 192.168.1.100"
                        value={formData.HomeAddress}
                        onChange={(event) => handleChange('HomeAddress', event.target.value)}
                        icon={<Hash size={16} />}
                        disabled={formData.UserVol === 'NoHome'}
                        error={ipError}
                    />

                    <Dropdown
                        label="Allowed Groups"
                        isMulti
                        options={groups.map((group) => ({ value: String(group.id), label: group.text }))}
                        value={formData.Usergroups}
                        onChange={(value) => handleChange('Usergroups', value)}
                    />
                </div>

                {ipError && (
                    <div className="inline-flex items-center gap-2 rounded-md border border-warning-100 bg-warning-50 px-3 py-2 text-xs font-medium text-warning-700">
                        <AlertCircle size={14} />
                        {ipError}
                    </div>
                )}
            </form>
        </Panel>
    );
};

export default AddUserForm;
