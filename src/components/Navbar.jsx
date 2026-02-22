import React from 'react';
import { Bell, Maximize2, User, LogOut, Key } from 'lucide-react';

const Navbar = () => {
    return (
        <nav className="main-header navbar navbar-expand navbar-white navbar-light" style={{ background: 'linear-gradient(90deg, var(--sidebar-bg-start) 0%, var(--sidebar-bg-end) 100%)', backdropFilter: 'blur(30px) saturate(200%)', border: '0px' }}>
            {/* Left navbar links */}
            <ul className="navbar-nav">
                {/* Burger icon removed - moved to Sidebar */}
                <li className="nav-item d-none d-sm-inline-block">
                    <a href="./QuickStor.html" className="boldit nav-link" style={{ color: 'black' }}  >Cluster Management</a>
                </li>
            </ul>

            {/* Right navbar links */}
            <ul className="navbar-nav ml-auto headtitle items-center gap-2">
                {/* Notifications Dropdown Menu */}
                <li className="nav-item">
                    <a className="nav-link" href="#" style={{ color: '#4A4A68' }}>
                        <div id="syncStatus" className="text-xs font-medium leading-tight text-right">
                            Getting <br /><span>Status...</span>
                        </div>
                    </a>
                </li>
                <li className="nav-item dropdown">
                    <a className="nav-link relative flex items-center justify-center w-10 h-10 rounded-full hover:bg-white/50 transition-all text-gray-500 hover:text-blue-600" data-toggle="dropdown" href="#">
                        <Bell size={20} strokeWidth={2} />
                        <span className="absolute top-2 right-2 flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500 text-[8px] text-white flex items-center justify-center" id="tot"></span>
                        </span>
                    </a>
                    <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right border-0 shadow-lg rounded-xl overflow-hidden mt-2">
                        <span className="dropdown-item dropdown-header bg-gray-50 font-semibold text-gray-700 py-3">Notifications (7 days)</span>
                        <div className="dropdown-divider my-0"></div>
                        <a href="./QLogs.html" className="dropdown-item hover:bg-gray-50 px-4 py-3 flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-yellow-50 flex items-center justify-center text-yellow-600">
                                <i className="fas fa-exclamation-triangle text-xs"></i>
                            </div>
                            <div>
                                <span className="font-semibold text-gray-800" id="warns">0</span>
                                <span className="text-sm text-gray-500 ml-1">Warnings</span>
                            </div>
                        </a>
                        <div className="dropdown-divider my-0"></div>
                        <a href="./QLogs.html" className="dropdown-item hover:bg-gray-50 px-4 py-3 flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center text-red-600">
                                <i className="fas fa-microchip text-xs"></i>
                            </div>
                            <div>
                                <span className="font-semibold text-gray-800" id="errs">0</span>
                                <span className="text-sm text-gray-500 ml-1">System Errors</span>
                            </div>
                        </a>
                        <div className="dropdown-divider my-0"></div>
                        <a href="./QLogs.html" className="dropdown-item hover:bg-gray-50 px-4 py-3 flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                                <i className="fas fa-users text-xs"></i>
                            </div>
                            <div>
                                <span className="font-semibold text-gray-800" id="logonfails">0</span>
                                <span className="text-sm text-gray-500 ml-1">Auth Failures</span>
                            </div>
                        </a>
                        <div className="dropdown-divider my-0"></div>
                        <a href="./QLogs.html" className="dropdown-item dropdown-footer bg-gray-50 text-blue-600 font-medium py-3 hover:bg-gray-100">See All Notifications</a>
                    </div>
                </li>
                <li className="nav-item">
                    <a className="nav-link flex items-center justify-center w-10 h-10 rounded-full hover:bg-white/50 transition-all text-gray-500 hover:text-blue-600" data-widget="fullscreen" href="#" role="button">
                        <Maximize2 size={20} strokeWidth={2} />
                    </a>
                </li>
                <li className="nav-item dropdown">
                    <a className="nav-link !flex !flex-row !items-center !gap-3 px-4 py-2 rounded-full bg-blue-50/80 border border-blue-200 hover:bg-blue-100 hover:border-blue-300 transition-all group" data-toggle="dropdown" href="#">
                        <User size={18} strokeWidth={2.5} className="text-blue-600 shrink-0" />
                        <span id="username" className="font-bold text-sm hidden sm:block text-blue-700 whitespace-nowrap">Admin</span>
                    </a>
                    <div className="dropdown-menu dropdown-menu-sm dropdown-menu-right border-0 shadow-2xl rounded-2xl overflow-hidden mt-3 p-1.5 min-w-[200px] bg-white">
                        <a href="./login.html" className="dropdown-item !flex !flex-row !items-center !gap-3 px-4 py-3 rounded-xl hover:bg-red-50 text-gray-700 hover:text-red-700 transition-all group/item">
                            <LogOut size={18} strokeWidth={2} className="text-gray-400 group-hover/item:text-red-500 transition-colors shrink-0" />
                            <span className="font-semibold text-sm whitespace-nowrap">Logout</span>
                        </a>
                        <div className="dropdown-divider my-1 border-gray-100"></div>
                        <a href="#modal-sm" id="chgpasswd" data-toggle="modal" data-target="#modal-sm" className="dropdown-item chgpasswd !flex !flex-row !items-center !gap-3 px-4 py-3 rounded-xl hover:bg-yellow-50 text-gray-700 hover:text-yellow-700 transition-all group/item">
                            <Key size={18} strokeWidth={2} className="text-gray-400 group-hover/item:text-yellow-500 transition-colors shrink-0" />
                            <span className="font-semibold text-sm whitespace-nowrap">Change Password</span>
                        </a>
                    </div>
                </li>

            </ul>
        </nav>
    );
};

export default Navbar;
