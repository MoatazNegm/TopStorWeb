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
import { validateUserName, validatePassword } from '../utils/userRules';
import { ipError } from './Common/NetFields';

const AddUserForm = ({ pools, groups, users = [], onAdd }) => {
    const [formData, setFormData] = useState({
        Tenant: 'Cluster',
        User: '',
        UserPass: '',
        UserVol: 'NoHome',
        volsize: 1,
        HomeAddress: '',
        HomeSubnet: 24,
        Usergroups: []
    });

    const handleChange = (id, value) => {
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    // The same rules as the backend (TopStor/uservalid.py).  A message is shown as soon as the field has content,
    // and nothing is sent while a rule is broken.
    const nameError = validateUserName(formData.User, users.map((user) => user.name));
    const passError = validatePassword(formData.UserPass);
    const canSubmit = !nameError && !passError && !addressError;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!canSubmit) return;
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

    const addressError = ipError(formData.HomeAddress);

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
                <div className="grid min-w-0 grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                    <Input
                        label="User Name"
                        placeholder="e.g. john-doe"
                        id="User"
                        value={formData.User}
                        onChange={(event) => handleChange('User', event.target.value)}
                        icon={<User size={16} />}
                        error={formData.User ? nameError : ''}
                    />

                    <Input
                        label="Password"
                        type="password"
                        placeholder="********"
                        id="UserPass"
                        value={formData.UserPass}
                        onChange={(event) => handleChange('UserPass', event.target.value)}
                        icon={<Key size={16} />}
                        error={formData.UserPass ? passError : ''}
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

                    <div className="flex min-w-0 flex-wrap items-start gap-3 md:col-span-2">
                        <Input
                            label="Quota (GB)"
                            type="text"
                            inputMode="numeric"
                            placeholder="50"
                            id="volsize"
                            className="w-28 flex-shrink-0"
                            value={formData.volsize}
                            onChange={(event) => handleChange('volsize', event.target.value.replace(/\D/g, '').slice(0, 5))}
                            icon={<HardDrive size={16} />}
                            disabled={formData.UserVol === 'NoHome'}
                        />

                        <Input
                            label="IP Address"
                            id="HomeAddress"
                            kind="ip"
                            className="w-44 flex-shrink-0"
                            value={formData.HomeAddress}
                            onChange={(event) => handleChange('HomeAddress', event.target.value)}
                            icon={<Hash size={16} />}
                            disabled={formData.UserVol === 'NoHome'}
                            error={addressError}
                        />

                        <Input
                            label="Subnet"
                            id="HomeSubnet"
                            kind="subnet"
                            className="w-20 flex-shrink-0"
                            value={formData.HomeSubnet}
                            onChange={(event) => handleChange('HomeSubnet', event.target.value)}
                            disabled={formData.UserVol === 'NoHome'}
                        />
                    </div>

                    <Dropdown
                        label="Allowed Groups"
                        isMulti
                        options={groups.map((group) => ({ value: String(group.id), label: group.text }))}
                        value={formData.Usergroups}
                        onChange={(value) => handleChange('Usergroups', value)}
                    />
                </div>

                {addressError && (
                    <div className="inline-flex items-center gap-2 rounded-md border border-warning-100 bg-warning-50 px-3 py-2 text-xs font-medium text-warning-700">
                        <AlertCircle size={14} />
                        {addressError}
                    </div>
                )}
            </form>
        </Panel>
    );
};

export default AddUserForm;
