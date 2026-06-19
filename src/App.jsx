import React from 'react';
import QNodes from './QNodes';
import QUsers from './QUsers';
import QGroups from './QGroups';
import QLogs from './QLogs';
import QServicePerformance from './QServicePerformance';
import QCifs from './QCifs';
import QNfs from './QNfs';
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

function App() {
    const [view, setView] = React.useState('nodes');
    const [isAuthenticated, setIsAuthenticated] = React.useState(!!localStorage.getItem('token') && localStorage.getItem('token') !== '0');

    React.useEffect(() => {
        const handleHashChange = () => {
            // Show overlay when transitioning between pages
            const overlay = document.getElementById('overlay-container');
            if (overlay) {
                overlay.style.display = 'flex';
            }

            const hash = window.location.hash;
            if (hash === '#/users') setView('users');
            else if (hash === '#/groups') setView('groups');
            else if (hash === '#/logs') setView('logs');
            else if (hash === '#/performance') setView('performance');
            else if (hash === '#/volumes/cifs') setView('cifs');
            else if (hash === '#/volumes/nfs') setView('nfs');
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

            // Hide overlay after transition completes
            setTimeout(() => {
                if (overlay) {
                    overlay.style.display = 'none';
                }
            }, 400);
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

    if (!isAuthenticated) {
        return <QLogin onLoginSuccess={() => setIsAuthenticated(true)} />;
    }

    return (
        <div className="wrapper wrapper-index">
            <NotificationPoller />
            <Navbar sectionTitle={getSectionTitle(view)} />
            <Sidebar />
            {view === 'users' && <QUsers />}
            {view === 'groups' && <QGroups />}
            {view === 'logs' && <QLogs />}
            {view === 'performance' && <QServicePerformance />}
            {view === 'cifs' && <QCifs />}
            {view === 'nfs' && <QNfs />}
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
            {/* Footer */}
            <footer className="main-footer">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-body p-0">
                                <table className="table table-sm">
                                    <thead>
                                        <tr>
                                            <th> Task</th>
                                            <th> Node</th>
                                            <th>Progress</th>
                                            <th style={{ width: '40px' }}>Label</th>
                                        </tr>
                                    </thead>
                                    <tbody id="tasktable">

                                    </tbody>
                                </table>
                            </div>
                            {/* /.card-body */}
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default App;
