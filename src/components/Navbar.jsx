import React, { useState } from 'react';
import { Bell, Maximize2, User, LogOut, Key } from 'lucide-react';
import { changePassword } from '../api/users';

const Navbar = ({ sectionTitle }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [pass, setPass] = useState('');
    const [newpass, setNewpass] = useState('');
    const [passErr, setPassErr] = useState('retype the same password in both fields');
    const [passErrColor, setPassErrColor] = useState('text-blue-400');
    const [saveDisabled, setSaveDisabled] = useState(true);
    const [saving, setSaving] = useState(false);

    const validatePasswords = (p, np) => {
        if (p === np && np.length >= 3) {
            setPassErr('');
            setPassErrColor('text-blue-400');
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
        setPassErrColor('text-blue-400');
        setSaveDisabled(true);
        setModalOpen(true);
    };

    const handleSave = async () => {
        const username = localStorage.getItem('user');
        setSaving(true);
        try {
            await changePassword(username, pass);
            setModalOpen(false);
        } catch (e) {
            setPassErr('Failed to change password');
            setPassErrColor('text-red-500');
        } finally {
            setSaving(false);
        }
    };

    return (
        <>
        <nav className="main-header navbar navbar-expand navbar-white navbar-light" style={{ background: 'linear-gradient(90deg, var(--sidebar-bg-start) 0%, var(--sidebar-bg-end) 100%)', backdropFilter: 'blur(30px) saturate(200%)', border: '0px' }}>
            {/* Left navbar links */}
            <ul className="navbar-nav">
                <li className="nav-item d-none d-sm-inline-block">
                    <div className="!text-3xl font-black tracking-tight flex items-center h-full px-0 select-none cursor-default" style={{ color: '#0047FF' }}>
                        {sectionTitle}
                    </div>
                </li>
            </ul>

            {/* Right navbar links */}
            <ul className="navbar-nav ml-auto headtitle items-center gap-2">
                {/* Notifications Dropdown Menu */}
                <li className="nav-item">
                    <a className="nav-link" href="#" style={{ color: '#0047FF' }}>
                        <div id="syncStatus" className="text-xs font-medium leading-tight text-right">
                            Getting <br /><span>Status...</span>
                        </div>
                    </a>
                </li>
                <li className="nav-item dropdown">
                    <a className="nav-link relative flex items-center justify-center w-10 h-10 rounded-full hover:bg-white/50 transition-all" style={{ color: '#0047FF' }} data-toggle="dropdown" href="#">
                        <Bell size={20} strokeWidth={2} />
                        <span className="absolute top-2 right-2 flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500 text-[8px] text-white flex items-center justify-center" id="tot"></span>
                        </span>
                    </a>
                    <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right border-0 shadow-lg rounded-xl overflow-hidden mt-2">
                        <span className="dropdown-item dropdown-header bg-blue-50 font-semibold py-3" style={{ color: '#0047FF' }}>Notifications (7 days)</span>
                        <div className="dropdown-divider my-0"></div>
                        <a href="./QLogs.html" className="dropdown-item hover:bg-blue-50 px-4 py-3 flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-yellow-50 flex items-center justify-center text-yellow-600">
                                <i className="fas fa-exclamation-triangle text-xs"></i>
                            </div>
                            <div>
                                <span className="font-semibold" style={{ color: '#0047FF' }} id="warns">0</span>
                                <span className="text-sm ml-1" style={{ color: '#0047FF' }}>Warnings</span>
                            </div>
                        </a>
                        <div className="dropdown-divider my-0"></div>
                        <a href="./QLogs.html" className="dropdown-item hover:bg-blue-50 px-4 py-3 flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center text-red-600">
                                <i className="fas fa-microchip text-xs"></i>
                            </div>
                            <div>
                                <span className="font-semibold" style={{ color: '#0047FF' }} id="errs">0</span>
                                <span className="text-sm ml-1" style={{ color: '#0047FF' }}>System Errors</span>
                            </div>
                        </a>
                        <div className="dropdown-divider my-0"></div>
                        <a href="./QLogs.html" className="dropdown-item hover:bg-blue-50 px-4 py-3 flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                                <i className="fas fa-users text-xs"></i>
                            </div>
                            <div>
                                <span className="font-semibold" style={{ color: '#0047FF' }} id="logonfails">0</span>
                                <span className="text-sm ml-1" style={{ color: '#0047FF' }}>Auth Failures</span>
                            </div>
                        </a>
                        <div className="dropdown-divider my-0"></div>
                        <a href="./QLogs.html" className="dropdown-item dropdown-footer bg-blue-50 font-medium py-3 hover:bg-blue-100" style={{ color: '#0047FF' }}>See All Notifications</a>
                    </div>
                </li>
                <li className="nav-item">
                    <a className="nav-link flex items-center justify-center w-10 h-10 rounded-full hover:bg-white/50 transition-all" style={{ color: '#0047FF' }} data-widget="fullscreen" href="#" role="button">
                        <Maximize2 size={20} strokeWidth={2} />
                    </a>
                </li>
                <li className="nav-item dropdown">
                    <a className="nav-link !flex !flex-row !items-center !gap-3 px-4 py-2 rounded-full border hover:border-blue-300 transition-all group" style={{ backgroundColor: 'rgba(0, 71, 255, 0.08)', borderColor: 'rgba(0, 71, 255, 0.2)' }} data-toggle="dropdown" href="#">
                        <User size={18} strokeWidth={2.5} style={{ color: '#0047FF' }} className="shrink-0" />
                        <span id="username" className="font-bold text-sm hidden sm:block whitespace-nowrap" style={{ color: '#0047FF' }}>Admin</span>
                    </a>
                    <div className="dropdown-menu dropdown-menu-sm dropdown-menu-right border-0 shadow-2xl rounded-2xl overflow-hidden mt-3 p-1.5 min-w-[200px] bg-white">
                        <button
                            onClick={() => {
                                localStorage.removeItem('token');
                                localStorage.setItem('token', '0'); // Signal logout to App.jsx
                                window.dispatchEvent(new Event('storage')); // Trigger auth check in App.jsx
                            }}
                            className="dropdown-item !flex !flex-row !items-center !gap-3 px-4 py-3 rounded-xl hover:bg-red-50 transition-all group/item w-full text-left"
                            style={{ color: '#0047FF' }}
                        >
                            <LogOut size={18} strokeWidth={2} className="text-gray-400 group-hover/item:text-red-500 transition-colors shrink-0" />
                            <span className="font-semibold text-sm whitespace-nowrap">Logout</span>
                        </button>
                        <div className="dropdown-divider my-1 border-blue-100"></div>
                        <button
                            id="chgpasswd"
                            onClick={handleOpenModal}
                            className="dropdown-item chgpasswd !flex !flex-row !items-center !gap-3 px-4 py-3 rounded-xl hover:bg-yellow-50 transition-all group/item w-full text-left"
                            style={{ color: '#0047FF' }}
                        >
                            <Key size={18} strokeWidth={2} className="text-gray-400 group-hover/item:text-yellow-500 transition-colors shrink-0" />
                            <span className="font-semibold text-sm whitespace-nowrap">Change Password</span>
                        </button>
                    </div>
                </li>

            </ul>
        </nav>

        {modalOpen && (
            <div className="fixed inset-0 z-[9999] flex items-center justify-center">
                <div className="absolute inset-0 bg-black/40" onClick={() => setModalOpen(false)} />
                <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm mx-4 p-6">
                    <div className="flex justify-between items-center mb-5">
                        <h4 className="text-lg font-bold" style={{ color: '#0047FF' }}>Change Password</h4>
                        <button onClick={() => setModalOpen(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                            <i className="fas fa-times"></i>
                        </button>
                    </div>
                    <div className="space-y-4">
                        <div className="relative">
                            <input
                                type="password"
                                id="pass"
                                placeholder="Password"
                                value={pass}
                                onChange={(e) => { setPass(e.target.value); validatePasswords(e.target.value, newpass); }}
                                className="w-full px-4 py-2 pr-10 border rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
                                style={{ borderColor: '#0047FF33', color: '#0047FF' }}
                            />
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"><i className="fas fa-lock text-xs"></i></span>
                        </div>
                        <div className="relative">
                            <input
                                type="password"
                                id="newpass"
                                placeholder="Re-type password"
                                value={newpass}
                                onChange={(e) => { setNewpass(e.target.value); validatePasswords(pass, e.target.value); }}
                                className="w-full px-4 py-2 pr-10 border rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
                                style={{ borderColor: '#0047FF33', color: '#0047FF' }}
                            />
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"><i className="fas fa-lock text-xs"></i></span>
                        </div>
                        {passErr && <p id="passerr" className={`text-xs font-medium ${passErrColor}`}>{passErr}</p>}
                    </div>
                    <div className="flex justify-between items-center mt-6">
                        <button onClick={() => setModalOpen(false)} className="px-4 py-2 text-sm font-semibold transition-colors" style={{ color: '#0047FF' }}>
                            Cancel
                        </button>
                        <button
                            id="passwrd"
                            onClick={handleSave}
                            disabled={saveDisabled || saving}
                            className="px-5 py-2 text-sm font-bold text-white rounded-lg hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                            style={{ backgroundColor: '#0047FF' }}
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
