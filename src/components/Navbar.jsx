import React, { useState } from 'react';
import { Bell, ChevronRight, Key, LogOut, Maximize2, Menu, X } from 'lucide-react';
import { changePassword } from '../api/users';

const Navbar = ({ sectionTitle }) => {
    const [notifOpen, setNotifOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [pass, setPass] = useState('');
    const [newpass, setNewpass] = useState('');
    const [passErr, setPassErr] = useState('retype the same password in both fields');
    const [passErrColor, setPassErrColor] = useState('text-gray-400');
    const [saveDisabled, setSaveDisabled] = useState(true);
    const [saving, setSaving] = useState(false);

    const validatePasswords = (p, np) => {
        if (p === np && np.length >= 3) {
            setPassErr('');
            setPassErrColor('text-gray-400');
            setSaveDisabled(false);
        } else {
            if (p === np) {
                setPassErr('password length is too small');
            } else {
                setPassErr('retype the same password in both fields');
            }
            setPassErrColor('text-red-500');
            setSaveDisabled(true);
        }
    };

    const handleOpenModal = () => {
        setPass('');
        setNewpass('');
        setPassErr('retype the same password in both fields');
        setPassErrColor('text-gray-400');
        setSaveDisabled(true);
        setModalOpen(true);
    };

    const handleSave = async () => {
        const username = localStorage.getItem('user');
        setUserMenuOpen(false);
        setSaving(true);

    const handleFullscreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen?.();
        } else {
            document.exitFullscreen?.();
        }
    };

    const currentLabel = (() => {
        const hash = window.location.hash;
        if (!hash || hash === '#/nodes') return 'Nodes';
        const map = {
            '#/users': 'Users',
            '#/groups': 'Groups',
            '#/logs': 'Logs',
            '#/performance': 'Service Performance',
            '#/volumes/cifs': 'CIFS',
            '#/volumes/nfs': 'NFS',
            '#/volumes/s3': 'S3 Buckets',
            '#/volumes/home': 'Home Folders',
            '#/volumes/iscsi': 'ISCSI LUNs',
            '#/volumes/snapshots': 'Snapshots',
            '#/settings/privileges': 'User Privileges',
            '#/settings/updates': 'Updates',
            '#/pools/diskgroups': 'Disk Groups',
            '#/replication/partners': 'Partner',
            '#/replication/sender': 'Sender Schedule',
            '#/replication/received': 'Received Snapshots',
        };
        return map[hash] || 'Nodes';
    })();
        try {
            await changePassword(username, pass);
            setModalOpen(false);
            <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b border-border bg-surface px-4 sm:px-6">
                <div className="flex min-w-0 items-center gap-2">
                    <button
                        type="button"
                        className="-ml-1 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-md text-gray-500 hover:bg-gray-100 hover:text-brand-600 lg:hidden"
                        onClick={() => document.body.classList.toggle('sidebar-mobile-open')}
                    >
                        <Menu className="h-5 w-5" />
                    </button>
                    <nav className="flex min-w-0 items-center gap-1.5 text-sm">
                        <span className="truncate text-gray-500">{sectionTitle}</span>
                        <ChevronRight className="h-[15px] w-[15px] flex-shrink-0 text-gray-300" />
                        <span className="truncate font-semibold text-gray-900">{currentLabel}</span>
                    </nav>
                </div>

                <div className="flex items-center gap-1.5 sm:gap-2">
                    <div className="hidden items-center gap-2 rounded-full border border-border bg-surface-muted px-3 py-1.5 sm:flex">
                        <span className="h-2 w-2 flex-shrink-0 rounded-full bg-success-500"></span>
                        <div id="syncStatus" className="text-xs font-medium leading-tight text-gray-600">
                            Getting Status...
                        </div>
    };

                    <div className="relative">
                        <button
                            type="button"
                            onClick={() => {
                                setNotifOpen((prev) => !prev);
                                setUserMenuOpen(false);
                            }}
                            className="relative flex h-9 w-9 items-center justify-center rounded-md text-gray-500 hover:bg-gray-100 hover:text-brand-600"
                        >
                            <Bell className="h-[18px] w-[18px]" />
                            <span className="absolute right-1.5 top-1.5 inline-flex h-2.5 w-2.5 rounded-full bg-danger-500 text-[8px] text-white" id="tot"></span>
                        </button>

                        {notifOpen && (
                            <div className="absolute right-0 mt-2 w-72 overflow-hidden rounded-xl border border-border bg-surface shadow-lg">
                                <div className="border-b border-border bg-surface-muted px-4 py-3 text-sm font-semibold text-gray-700">Notifications (7 days)</div>
                                <a href="#/logs" className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50" onClick={() => setNotifOpen(false)}>
                                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-warning-50 text-warning-600">!</span>
                                    <span><strong id="warns">0</strong> Warnings</span>
                                </a>
                                <a href="#/logs" className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50" onClick={() => setNotifOpen(false)}>
                                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-danger-50 text-danger-600">x</span>
                                    <span><strong id="errs">0</strong> System Errors</span>
                                </a>
                                <a href="#/logs" className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50" onClick={() => setNotifOpen(false)}>
                                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand-50 text-brand-600">i</span>
                                    <span><strong id="logonfails">0</strong> Auth Failures</span>
                                </a>
                            </div>
                        )}
                    </div>

                    <button
                        type="button"
                        onClick={handleFullscreen}
                        className="hidden h-9 w-9 items-center justify-center rounded-md text-gray-500 hover:bg-gray-100 hover:text-brand-600 sm:flex"
                    >
                        <Maximize2 className="h-[18px] w-[18px]" />
                    </button>

                    <span className="hidden h-6 w-px bg-border sm:block"></span>

                    <div className="relative">
                        <button
                            type="button"
                            onClick={() => {
                                setUserMenuOpen((prev) => !prev);
                                setNotifOpen(false);
                            }}
                            className="flex items-center gap-2.5 rounded-md py-1.5 pl-1.5 pr-2 hover:bg-gray-100"
                        >
                            <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                                <Key className="h-4 w-4" />
                            </span>
                            <span id="username" className="hidden text-sm font-semibold text-gray-800 sm:block">Admin</span>
                        </button>

                        {userMenuOpen && (
                            <div className="absolute right-0 mt-2 w-52 overflow-hidden rounded-xl border border-border bg-surface p-1.5 shadow-lg">
                                <button
                                    onClick={() => {
                                        localStorage.removeItem('token');
                                        localStorage.setItem('token', '0');
                                        window.dispatchEvent(new Event('storage'));
                                    }}
                                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-gray-700 hover:bg-danger-50 hover:text-danger-700"
                                >
                                    <LogOut className="h-4 w-4" />
                                    Logout
                                </button>
                                <button
                                    id="chgpasswd"
                                    onClick={handleOpenModal}
                                    className="chgpasswd flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-gray-700 hover:bg-warning-50 hover:text-warning-700"
                                >
                                    <Key className="h-4 w-4" />
                                    Change Password
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </header>
                            className="dropdown-item chgpasswd !flex !flex-row !items-center !gap-3 px-4 py-3 rounded-xl hover:bg-yellow-50 text-gray-700 hover:text-yellow-700 transition-all group/item w-full text-left"
                        >
                            <Key size={18} strokeWidth={2} className="text-gray-400 group-hover/item:text-yellow-500 transition-colors shrink-0" />
                            <span className="font-semibold text-sm whitespace-nowrap">Change Password</span>
                        </button>
                    </div>
                </li>

            </ul>
        </nav>

        {modalOpen && (
            <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-gray-900/40 p-4 backdrop-blur-sm">
                <div className="w-full max-w-md overflow-hidden rounded-xl border border-border bg-surface shadow-xl">
                    <div className="flex items-center justify-between border-b border-border px-5 py-4">
                        <h4 className="text-base font-semibold text-gray-800">Change Password</h4>
                        <button onClick={() => setModalOpen(false)} className="flex h-8 w-8 items-center justify-center rounded-md text-gray-400 hover:bg-gray-100 hover:text-gray-600">
                            <X className="h-[18px] w-[18px]" />
                        </button>
                    </div>
                    <div className="space-y-5 p-5">
                        <div className="relative">
                            <input
                                type="password"
                                id="pass"
                                placeholder="New password"
                                value={pass}
                                onChange={(e) => { setPass(e.target.value); validatePasswords(e.target.value, newpass); }}
                                className="w-full rounded-md border border-border bg-surface px-3 py-2.5 text-sm text-gray-800 outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-100"
                            />
                        </div>
                        <div className="relative">
                            <input
                                type="password"
                                id="newpass"
                                placeholder="Confirm new password"
                                value={newpass}
                                onChange={(e) => { setNewpass(e.target.value); validatePasswords(pass, e.target.value); }}
                                className="w-full rounded-md border border-border bg-surface px-3 py-2.5 text-sm text-gray-800 outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-100"
                            />
                        </div>
                        {passErr && <p id="passerr" className={`text-xs font-medium ${passErrColor}`}>{passErr}</p>}
                    </div>
                    <div className="flex justify-end gap-3 border-t border-border bg-surface-muted px-5 py-4">
                        <button onClick={() => setModalOpen(false)} className="inline-flex items-center justify-center rounded-md px-4 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-100 hover:text-gray-900">
                            Cancel
                        </button>
                        <button
                            id="passwrd"
                            onClick={handleSave}
                            disabled={saveDisabled || saving}
                            className="inline-flex items-center justify-center rounded-md bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {saving ? 'Saving...' : 'Save'}
                        </button>
                    </div>
                </div>
            </div>
        )}
        </>
    );
};

export default Navbar;
