import React from 'react';
import QNodes from './QNodes';
import QUsers from './QUsers';
import QGroups from './QGroups';
import QLogs from './QLogs';
import QServicePerformance from './QServicePerformance';
import QCifs from './QCifs';
import QNfs from './QNfs';
import QS3Buckets from './QS3Buckets';
import QHomeFolders from './QHomeFolders';
import QIscsi from './QIscsi';
import QSnapshots from './QSnapshots';
import QUserPrivileges from './QUserPrivileges';
import QUpdates from './QUpdates';
import QDisks from './QDisks';
import QPartners from './QPartners';
import QSender from './QSender';
import QReceived from './QReceived';
import QLogin from './QLogin';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import NotificationPoller from './components/NotificationPoller';
import { validateToken } from './api/auth';

function App() {
    const [view, setView] = React.useState('nodes');
    const [isAuthenticated, setIsAuthenticated] = React.useState(false);
    const [authChecking, setAuthChecking] = React.useState(true);

    // On mount, validate the stored token against the backend before trusting it.
    // This prevents the broken state caused by stale tokens after a server restart
    // (the backend's in-memory loggedusers dict is cleared on restart).
    React.useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token || token === '0') {
            setIsAuthenticated(false);
            setAuthChecking(false);
            return;
        }

        validateToken(token)
            .then((res) => {
                const response = res.data?.response;
                if (response && response !== 'baduser' && !String(response).includes('baduser')) {
                    setIsAuthenticated(true);
                } else {
                    // Token is stale/invalid — clear it and show login
                    localStorage.setItem('token', '0');
                    setIsAuthenticated(false);
                }
            })
            .catch(() => {
                // Network error or server unreachable — clear token to be safe
                localStorage.setItem('token', '0');
                setIsAuthenticated(false);
            })
            .finally(() => {
                setAuthChecking(false);
            });
    }, []);

    React.useEffect(() => {
        const handleHashChange = () => {
            const hash = window.location.hash;
            if (hash === '#/users') setView('users');
            else if (hash === '#/groups') setView('groups');
            else if (hash === '#/logs') setView('logs');
            else if (hash === '#/performance') setView('performance');
            else if (hash === '#/volumes/cifs') setView('cifs');
            else if (hash === '#/volumes/nfs') setView('nfs');
            else if (hash === '#/volumes/s3') setView('s3');
            else if (hash === '#/volumes/home') setView('home');
            else if (hash === '#/volumes/iscsi') setView('iscsi');
            else if (hash === '#/volumes/snapshots') setView('snapshots');
            else if (hash === '#/settings/privileges') setView('privileges');
            else if (hash === '#/settings/updates') setView('updates');
            else if (hash === '#/pools/diskgroups') setView('diskgroups');
            else if (hash === '#/replication/partners') setView('partners');
            else if (hash === '#/replication/sender') setView('sender');
            else if (hash === '#/replication/received') setView('received');
            else setView('nodes');
        };
        window.addEventListener('hashchange', handleHashChange);
        handleHashChange(); // initial check

        // Check auth status periodically or on focus
        const checkAuth = () => {
            const token = localStorage.getItem('token');
            setIsAuthenticated(!!token && token !== '0');
        };
        window.addEventListener('storage', checkAuth);

        return () => {
            window.removeEventListener('hashchange', handleHashChange);
            window.removeEventListener('storage', checkAuth);
        };
    }, []);

    const getSectionTitle = (view) => {
        switch (view) {
            case 'users':
            case 'groups':
            case 'nodes':
                return 'System configuration';
            case 'logs':
            case 'performance':
                return 'System Status';
            case 'cifs':
            case 'nfs':
            case 's3':
            case 'home':
            case 'iscsi':
            case 'snapshots':
                return 'Volumes';
            case 'privileges':
            case 'updates':
                return 'Settings';
            case 'diskgroups':
                return 'Pools';
            case 'partners':
            case 'sender':
            case 'received':
                return 'Replication';
            default:
                return 'System configuration';
        }
    };

    // Show a loading state while the token is being validated
    if (authChecking) {
        return (
            <div className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm">
                <img
                    src="dist/img/Quickstor icon.png"
                    alt="Loading"
                    className="w-16 h-16 mb-4 animate-pulse"
                />
                <span className="text-gray-500 font-medium text-sm tracking-wide">Verifying session...</span>
            </div>
        );
    }

    if (!isAuthenticated) {
        return <QLogin onLoginSuccess={() => setIsAuthenticated(true)} />;
    }

    return (
        <div className="min-h-screen bg-canvas">
            <NotificationPoller />
            <div className="flex min-h-screen">
                <div
                    className="sidebar-backdrop lg:hidden"
                    onClick={() => document.body.classList.remove('sidebar-mobile-open')}
                ></div>

                <Sidebar />

                <main className="main-content-shell flex-1 lg:ml-[260px]">
                    <Navbar sectionTitle={getSectionTitle(view)} />

                    {view === 'users' && <QUsers />}
                    {view === 'groups' && <QGroups />}
                    {view === 'logs' && <QLogs />}
                    {view === 'performance' && <QServicePerformance />}
                    {view === 'cifs' && <QCifs />}
                    {view === 'nfs' && <QNfs />}
                    {view === 's3' && <QS3Buckets />}
                    {view === 'home' && <QHomeFolders />}
                    {view === 'iscsi' && <QIscsi />}
                    {view === 'snapshots' && <QSnapshots />}
                    {view === 'privileges' && <QUserPrivileges />}
                    {view === 'updates' && <QUpdates />}
                    {view === 'diskgroups' && <QDisks />}
                    {view === 'partners' && <QPartners />}
                    {view === 'sender' && <QSender />}
                    {view === 'received' && <QReceived />}
                    {view === 'nodes' && <QNodes />}

                    <footer className="px-4 pb-6 pt-2">
                        <div className="overflow-hidden rounded-lg border border-border bg-surface shadow-sm">
                            <div className="overflow-x-auto">
                                <table className="min-w-full text-left text-sm">
                                    <thead>
                                        <tr className="border-b border-border bg-surface-muted text-gray-500">
                                            <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide">Task</th>
                                            <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide">Node</th>
                                            <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide">Progress</th>
                                            <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide">Label</th>
                                        </tr>
                                    </thead>
                                    <tbody id="tasktable"></tbody>
                                </table>
                            </div>
                        </div>
                    </footer>
                </main>
                </div>
        </div>
    );
}

export default App;
