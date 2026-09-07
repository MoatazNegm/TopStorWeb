import React, { useEffect, useMemo, useState } from 'react';
import {
  Activity,
  ChevronDown,
  Copy,
  Database,
  HardDrive,
  Layers,
  RadioTower,
  Search,
  Server,
  Settings,
  UserPlus,
  Users,
} from 'lucide-react';

const Sidebar = ({ hasPriv }) => {
  const [pathname, setPathname] = useState(window.location.hash || window.location.pathname);
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    const handleLocationChange = () => setPathname(window.location.hash || window.location.pathname);
    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  const menuItems = useMemo(
    () => [
      {
        label: 'System configuration',
        icon: Settings,
        subItems: [
          { label: 'Users', icon: UserPlus, href: '#/users' },
          { label: 'Groups', icon: Users, href: '#/groups' },
          { label: 'Nodes', icon: Server, href: '#/nodes' },
        ],
      },
      {
        label: 'System Status',
        icon: Activity,
        subItems: [
          { label: 'Logs', icon: Activity, href: '#/logs' },
          { label: 'Service Performance', icon: Activity, href: '#/performance' },
        ],
      },
      {
        label: 'Volumes',
        icon: HardDrive,
        subItems: [
          { label: 'CIFS', icon: Server, href: '#/volumes/cifs' },
          { label: 'NFS', icon: Server, href: '#/volumes/nfs' },
          { label: 'S3 Buckets', icon: Database, href: '#/volumes/s3' },
          { label: 'Home Folders', icon: Users, href: '#/volumes/home' },
          { label: 'ISCSI LUNs', icon: Database, href: '#/volumes/iscsi' },
          { label: 'Snapshots', icon: Copy, href: '#/volumes/snapshots' },
        ],
      },
      {
        label: 'Replication',
        icon: Copy,
        subItems: [
          { label: 'Partner', icon: Users, href: '#/replication/partners' },
          { label: 'Sender Schedule', icon: RadioTower, href: '#/replication/sender' },
          { label: 'Received Snapshots', icon: Copy, href: '#/replication/received' },
        ],
      },
      {
        label: 'Pools',
        icon: Layers,
        subItems: [{ label: 'Disk Groups', icon: Database, href: '#/pools/diskgroups' }],
      },
      {
        label: 'Settings',
        icon: Settings,
        subItems: [
          { label: 'User Privileges', icon: Users, href: '#/settings/privileges' },
          { label: 'Updates', icon: Activity, href: '#/settings/updates' },
        ],
      },
    ],
    []
  );

  const filteredMenuItems = useMemo(() => {
    if (!hasPriv) return menuItems;
    return menuItems.map(menu => ({
      ...menu,
      subItems: menu.subItems.filter(subItem => {
        const label = subItem.label;
        if (label === 'Users' || label === 'Groups') return hasPriv('Box_Users');
        if (label === 'Nodes') return hasPriv('Cluster');
        if (label === 'Logs') return hasPriv('Logs');
        if (label === 'Service Performance') return hasPriv('Service_Charts');
        if (label === 'CIFS') return hasPriv('CIFS');
        if (label === 'NFS') return hasPriv('NFS');
        if (label === 'S3 Buckets') return true;
        if (label === 'Home Folders') return hasPriv('HOME');
        if (label === 'ISCSI LUNs') return hasPriv('ISCSI');
        if (label === 'Snapshots') return hasPriv('SnapShots');
        if (label === 'Partner') return hasPriv('Partners');
        if (label === 'Sender Schedule') return hasPriv('Senders');
        if (label === 'Received Snapshots') return hasPriv('Replication');
        if (label === 'Disk Groups') return hasPriv('DiskGroups');
        if (label === 'User Privileges') return hasPriv('UserPrivilegesch');
        if (label === 'Updates') return hasPriv('Uploadch');
        return true;
      })
    })).filter(menu => menu.subItems.length > 0);
  }, [hasPriv, menuItems]);

  const isItemActive = (href) => pathname === href;

  const activeParent =
    filteredMenuItems.find((menu) => menu.subItems.some((item) => isItemActive(item.href)))?.label || null;

  const isExpanded = (label) => label === activeParent || label === expanded;

  const toggleSection = (label) => {
    setExpanded((prev) => (prev === label ? null : label));
  };

  const toggleDesktopCollapse = () => {
    document.body.classList.toggle('sidebar-collapse');
  };

  const closeMobileSidebar = () => {
    document.body.classList.remove('sidebar-mobile-open');
  };

  return (
    <aside className="app-sidebar fixed left-0 top-0 z-50 flex h-screen w-[260px] flex-col border-r border-border bg-surface">
      <div className="flex h-16 flex-shrink-0 items-center justify-between gap-2 border-b border-border px-4">
        <a href="#/nodes" className="flex items-center gap-2" onClick={closeMobileSidebar}>
          <img src="/dist/img/Quickstor logo.png" alt="QuickStor" className="h-8 w-auto object-contain" />
        </a>
        <button
          type="button"
          onClick={toggleDesktopCollapse}
          className="hidden h-8 w-8 items-center justify-center rounded-md text-gray-400 hover:bg-gray-100 hover:text-brand-600 lg:flex"
          title="Collapse sidebar"
        >
          <ChevronDown className="h-[18px] w-[18px] rotate-90" />
        </button>
      </div>

      <div className="flex-shrink-0 px-3 pt-3">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-[15px] w-[15px] -translate-y-1/2 text-gray-400" />
          <input
            type="search"
            placeholder="Search menu..."
            className="w-full rounded-md border border-border bg-surface-muted py-2 pl-9 pr-3 text-sm text-gray-700 placeholder:text-gray-400 outline-none focus:border-brand-500 focus:bg-surface focus:ring-4 focus:ring-brand-100"
          />
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-3">
        <div className="px-2 pb-1 pt-2 text-[11px] font-semibold uppercase tracking-wider text-gray-400">Main menu</div>

        {filteredMenuItems.map((menu) => {
          const Icon = menu.icon;
          const expandedSection = isExpanded(menu.label);
          const sectionActive = menu.label === activeParent;

          return (
            <div key={menu.label} className="mb-1">
              <button
                type="button"
                onClick={() => toggleSection(menu.label)}
                 className={`flex w-full items-center gap-3 rounded-md px-2.5 py-2 text-sm font-medium transition-colors ${
                  sectionActive ? 'text-brand-700 bg-brand-50' : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Icon className={`h-[18px] w-[18px] ${sectionActive ? 'text-brand-600' : 'text-gray-400'}`} />
                <span className="flex-1 text-left">{menu.label}</span>
                <ChevronDown
                  className={`h-[15px] w-[15px] text-gray-400 transition-transform ${
                    expandedSection ? '' : '-rotate-90'
                  }`}
                />
              </button>

              {expandedSection && (
                <ul className="mb-1 ml-3.5 mt-0.5 flex flex-col gap-0.5 border-l border-border pl-3">
                  {menu.subItems.map((subItem) => {
                    const SubIcon = subItem.icon;
                    const active = isItemActive(subItem.href);
                    return (
                      <li key={subItem.label}>
                        <a
                          href={subItem.href}
                          onClick={closeMobileSidebar}
                           className={`flex items-center gap-2.5 rounded-md px-2.5 py-2 text-sm transition-colors ${
                            active
                              ? '!bg-brand-600 font-medium text-white'
                              : 'text-gray-600 hover:bg-gray-50 hover:text-brand-600'
                          }`}
                        >
                          <SubIcon className={`h-[15px] w-[15px] ${active ? 'text-white' : 'text-gray-400'}`} />
                          {subItem.label}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;



