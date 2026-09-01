import React from 'react';
import api from '../api/volumes';

const KEY = 'qs_app_version_full';

// cversion looks like "QSD5.286-f40cc2f1": show "QSD5.286-0cc2f1" (branch + last 6 figures of the commit)
const shortVersion = (cv) => {
    const s = String(cv || '').trim();
    if (!s) return '';
    const i = s.lastIndexOf('-');
    if (i < 0) return s;
    return s.slice(0, i) + '-' + s.slice(i + 1).slice(-6);
};

const cached = () => {
    try { return localStorage.getItem(KEY) || ''; } catch (e) { return ''; }
};

/**
 * Small app version label (last 6 figures of the commit).
 * The version API needs a login, so the login page shows the value remembered from the last session.
 */
export default function AppVersion({ className = '' }) {
    const [ver, setVer] = React.useState(cached());

    React.useEffect(() => {
        let alive = true;
        api.get('api/v1/info/cversion')
            .then((res) => {
                const v = shortVersion(res && res.data && res.data.cversion);
                if (!v || !alive) return;
                setVer(v);
                try { localStorage.setItem(KEY, v); } catch (e) { /* storage may be blocked */ }
            })
            .catch(() => {});
        return () => { alive = false; };
    }, []);

    if (!ver) return null;
    return <span className={className} title="App version">{ver}</span>;
}
