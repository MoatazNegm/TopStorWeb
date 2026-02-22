import React from 'react';
import QNodes from './QNodes';
import QUsers from './QUsers';
import QGroups from './QGroups';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

function App() {
    const [view, setView] = React.useState('nodes');

    React.useEffect(() => {
        const handleHashChange = () => {
            const hash = window.location.hash;
            if (hash === '#/users') setView('users');
            else if (hash === '#/groups') setView('groups');
            else setView('nodes');
        };
        window.addEventListener('hashchange', handleHashChange);
        handleHashChange(); // initial check
        return () => window.removeEventListener('hashchange', handleHashChange);
    }, []);

    return (
        <div className="wrapper wrapper-index">
            <Navbar />
            <Sidebar />
            {view === 'users' && <QUsers />}
            {view === 'groups' && <QGroups />}
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
