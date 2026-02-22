import React, { useState, useEffect } from 'react';

const Sidebar = () => {
    const [userExpanded, setUserExpanded] = useState(null);
    const [pathname, setPathname] = useState(window.location.hash || window.location.pathname);

    useEffect(() => {
        const handleLocationChange = () => setPathname(window.location.hash || window.location.pathname);
        window.addEventListener('popstate', handleLocationChange);
        window.addEventListener('hashchange', handleLocationChange);
        return () => {
            window.removeEventListener('popstate', handleLocationChange);
            window.removeEventListener('hashchange', handleLocationChange);
        };
    }, []);

    const menuItems = [
        {
            label: 'Main menu',
            isHeader: true
        },
        {
            label: 'System configuration',
            icon: 'fa fa-cogs',
            subItems: [
                { label: 'Users', icon: 'fas fa-user-plus', href: '#/users' },
                { label: 'Groups', icon: 'fas fa-users', href: '#/groups' },
                { label: 'Nodes', icon: 'fas fa-server', href: '#/nodes' }, // Stay in React
            ]
        },
        {
            label: 'System Status',
            icon: 'fas fa-crosshairs',
            subItems: [
                { label: 'Logs', icon: 'fas fa-clipboard-list', href: './QLogs.html' },
                { label: 'Service Performance', icon: 'far fa-chart-bar', href: './Qserviceperformance.html' },
            ]
        },
        {
            label: 'Volumes',
            icon: 'fas fa-hdd',
            subItems: [
                { label: 'CIFS', icon: 'fab fa-windows', href: './Qcifs.html' },
                { label: 'NFS', icon: 'fab fa-linux', href: './Qnfs.html' },
                { label: 'Home Folders', icon: 'fas fa-house-user', href: './Qhome.html' },
                { label: 'ISCSI LUNs', icon: 'fas fa-database', href: './Qiscsi.html' },
                { label: 'Snapshots', icon: 'fas fa-camera', href: './Qsnapshots.html' },
            ]
        },
        {
            label: 'Replication',
            icon: 'far fa-clone',
            subItems: [
                { label: 'Partner', icon: 'fas fa-hands-helping', href: './Qpartner.html' },
                { label: 'Sender Schedule', icon: 'fab fa-perbyte', href: './Qsender.html' },
                { label: 'Received Snapshots', icon: 'fas fa-paper-plane', href: './Qreceived.html' },
            ]
        },
        {
            label: 'Pools',
            icon: 'fas fa-stream',
            subItems: [
                { label: 'Disk Groups', icon: 'fas fa-database', href: './Qdg.html' },
            ]
        },
        {
            label: 'Settings',
            icon: 'fas fa-cog',
            subItems: [
                { label: 'User Privelideges', icon: 'fas fa-unlock-alt', href: './Quserpriv.html' },
                { label: 'Updates', icon: 'fas fa-pen-fancy', href: './Qupdates.html' },
            ]
        }
    ];

    const isItemActive = (href) => {
        if (href.startsWith('#')) return pathname === href;
        const cleanPath = pathname.split('/').pop() || 'index.html';
        const cleanHref = href.replace('./', '');
        return cleanPath === cleanHref;
    };

    const activeParent = menuItems.find(menu =>
        !menu.isHeader && menu.subItems.some(item => isItemActive(item.href))
    )?.label;

    const handleToggle = (e, label) => {
        e.preventDefault();
        e.stopPropagation(); // Stop AdminLTE from seeing this click
        if (label === activeParent) {
            setUserExpanded(null);
            return;
        }
        setUserExpanded(prev => prev === label ? null : label);
    };

    const isExpanded = (label) => label === activeParent || label === userExpanded;

    // Toggle Sidebar Logic
    const [isSidebarOpen, setIsSidebarOpen] = useState(!document.body.classList.contains('sidebar-collapse'));

    const toggleSidebar = () => {
        const body = document.body;
        if (isSidebarOpen) {
            body.classList.add('sidebar-collapse');
        } else {
            body.classList.remove('sidebar-collapse');
        }
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <aside className="main-sidebar elevation-0 sidebar-glass" style={{ width: '280px' }}>
            {/* Floating Toggle Button */}
            <button
                onClick={toggleSidebar}
                className="btn btn-link sidebar-toggle-btn"
                style={{
                    position: 'absolute',
                    top: '15px',
                    right: '-45px', // Floating just outside the sidebar
                    zIndex: 9999,
                    color: '#495BE2',
                    fontSize: '1.4rem',
                    transition: 'all 0.3s ease',
                    background: 'transparent',
                    border: 'none',
                    outline: 'none'
                }}
            >
                <i className={`fas ${isSidebarOpen ? 'fa-times' : 'fa-bars'}`} style={{ transition: 'transform 0.3s' }}></i>
            </button>

            {/* Brand Logo */}
            <div className="brand-link">
                <a href="./QuickStor.html" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img src="img/logo.png" width="180" style={{ filter: 'brightness(0.2)' }} alt="QuickStor" />
                </a>
            </div>

            {/* Sidebar */}
            <div className="sidebar">
                {/* Search Bar Refined - Width handled by CSS */}
                <div className="form-inline mt-0 mb-1">
                    <div className="input-group" style={{
                        backgroundColor: 'rgba(0,0,0,0.03)',
                        borderRadius: '12px',
                        padding: '2px 8px',
                        border: '1px solid rgba(0,0,0,0.05)',
                        boxSizing: 'border-box'
                    }}>
                        <div className="input-group-prepend">
                            <span className="input-group-text border-0 bg-transparent">
                                <i className="fas fa-search text-muted" style={{ fontSize: '0.9rem' }}></i>
                            </span>
                        </div>
                        <input
                            className="form-control border-0 bg-transparent"
                            style={{ fontSize: '0.9rem', color: '#4A4A68', boxShadow: 'none' }}
                            type="search"
                            placeholder="Search menu..."
                            aria-label="Search"
                        />
                    </div>
                </div>

                {/* Sidebar Menu */}
                <nav>
                    <ul className="nav nav-pills nav-sidebar flex-column" role="menu">
                        {menuItems.map((menu, idx) => {
                            if (menu.isHeader) {
                                return <li key={idx} className="nav-header">{menu.label}</li>;
                            }

                            const expanded = isExpanded(menu.label);
                            const isActive = menu.label === activeParent;

                            return (
                                <li key={menu.label} className={`nav-item ${expanded ? 'menu-open' : ''}`}>
                                    <a
                                        href="#"
                                        className={`nav-link ${isActive ? 'active' : ''}`}
                                        onClick={(e) => handleToggle(e, menu.label)}
                                        style={{ display: 'flex', alignItems: 'center' }}
                                    >
                                        <i className={`nav-icon ${menu.icon}`} style={{ fontSize: '1.1rem', width: '24px' }}></i>
                                        <p style={{ marginLeft: '12px', flex: 1, fontWeight: '500' }}>
                                            {menu.label}
                                            <i className={`right fas fa-angle-left`} style={{
                                                transition: 'transform 0.3s',
                                                transform: expanded ? 'rotate(-90deg)' : 'rotate(0deg)',
                                                fontSize: '0.8rem'
                                            }}></i>
                                        </p>
                                    </a>
                                    <ul
                                        className="nav nav-treeview"
                                        style={{
                                            display: expanded ? 'block' : 'none',
                                            overflow: 'hidden'
                                        }}
                                    >
                                        {menu.subItems.map((subItem) => (
                                            <li key={subItem.label} className="nav-item">
                                                <a
                                                    href={subItem.href}
                                                    className={`nav-link ${isItemActive(subItem.href) ? 'active' : ''}`}
                                                    style={{ display: 'flex', alignItems: 'center' }}
                                                    onClick={(e) => {
                                                        e.stopPropagation(); // Stop AdminLTE from seeing this click too
                                                        if (subItem.href === '#') e.preventDefault();
                                                    }}
                                                >
                                                    <i className={`${subItem.icon} nav-icon`} style={{ fontSize: '0.8rem' }}></i>
                                                    <p style={{ marginLeft: '10px' }}>{subItem.label}</p>
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </div>
        </aside>
    );
};

export default Sidebar;
