import React, { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import Toast from './Toast';
import { fetchNotification } from '../api/notifications';
import { fetchAllHostsInfo } from '../api/nodes';

const TOAST_CONFIG = {
    info: { position: 'bottom-right', duration: 4000 },
    warning: { position: 'bottom-left', duration: 10000 },
    error: { position: 'top-right', duration: 10000 },
};

// Fixed container positions — match legacy Qmain.js bg.loc values
const POSITION_CLASSES = {
    'top-right': 'fixed top-4 right-4 z-[9999] flex flex-col gap-2 items-end pointer-events-none',
    'top-left': 'fixed top-4 left-4 z-[9999] flex flex-col gap-2 items-start pointer-events-none',
    'bottom-right': 'fixed bottom-4 right-4 z-[9999] flex flex-col-reverse gap-2 items-end pointer-events-none',
    'bottom-left': 'fixed bottom-4 left-4 z-[9999] flex flex-col-reverse gap-2 items-start pointer-events-none',
};

let nextId = 0;

const NotificationPoller = () => {
    const [toasts, setToasts] = useState([]);
    const lastNotif = useRef({ time: 'init', msgcode: 'init' });

    const dismissToast = useCallback((id) => {
        setToasts(prev => prev.filter(t => t.id !== id));
    }, []);

    const addToast = useCallback((toast) => {
        const type = TOAST_CONFIG[toast?.type] ? toast.type : 'info';
        const defaults = TOAST_CONFIG[type];

        setToasts(prev => [...prev, {
            id: ++nextId,
            type,
            title: toast?.title || 'System',
            subtitle: toast?.subtitle,
            body: toast?.body || '',
            code: toast?.code,
            duration: toast?.duration || defaults.duration,
            position: toast?.position || defaults.position,
        }]);
    }, []);

    // number of ActivePartners (hosts/allinfo -> active), refreshed every 3rd poll; null until the first answer
    const activeCount = useRef(null);
    const pollCount = useRef(0);
    const lastInsync = useRef('yes');
    const aliases = useRef({});   // host name -> alias, from hosts/allinfo

    // one line only: a single node shows 'Single node' (blue led in the Navbar), a cluster shows its sync state
    const updateSyncStatus = (isInsync) => {
        const el = document.getElementById('syncStatus');
        if (!el) return;
        lastInsync.current = isInsync;
        el.classList.remove('in-sync', 'not-in-sync', 'single-node');
        if (activeCount.current === 1) {
            el.textContent = 'Single node';
            el.classList.add('single-node');
        } else if (isInsync === 'yes') {
            el.textContent = 'Cluster in Sync';
            el.classList.add('in-sync');
        } else {
            el.textContent = 'Nodes Not in Sync';
            el.classList.add('not-in-sync');
        }
    };

    // the alias of the node, or its name when the alias is empty or '_1' (etcd's 'not found')
    const nodeAlias = (host) => {
        const a = aliases.current[host];
        return a && a !== '_1' ? a : (host || 'System');
    };

    const refreshActiveCount = async () => {
        try {
            const res = await fetchAllHostsInfo();
            const all = res?.data?.all;
            if (all && typeof all === 'object') {
                aliases.current = Object.fromEntries(Object.entries(all).map(([h, v]) => [h, typeof v?.alias === 'string' ? v.alias.trim() : '']));
            }
            if (Array.isArray(res?.data?.active)) {
                const changed = activeCount.current !== res.data.active.length;
                activeCount.current = res.data.active.length;
                if (changed) updateSyncStatus(lastInsync.current);
            }
        } catch (e) { /* keep the previous count */ }
    };

    const updateTasksTable = (requests) => {
        const tbody = document.getElementById('tasktable');
        if (!tbody || !requests) return;
        const rows = Object.entries(requests)
            .flatMap(([task, hosts]) =>
                Object.entries(hosts).map(([host, status]) => {
                    const done = status === 'done';
                    const label = done
                        ? '<span class="badge badge-success">done</span>'
                        : '<span class="badge badge-warning">active</span>';
                    return `<tr>
                        <td class="text-xs">${task}</td>
                        <td class="text-xs">${host}</td>
                        <td class="text-xs">${status}</td>
                        <td>${label}</td>
                    </tr>`;
                })
            )
            .join('');
        tbody.innerHTML = rows;
    };

    const poll = useCallback(async () => {
        try {
            const res = await fetchNotification();
            const notif = res.data;
            if (!notif || !notif.response || notif.response === 'baduser') return;

            if (pollCount.current++ % 3 === 0) await refreshActiveCount();
            if (notif.isinsync !== undefined) updateSyncStatus(notif.isinsync);
            if (notif.requests) updateTasksTable(notif.requests);

            // Only show toast when a new notification arrives (dedup by time + msgcode)
            if (!notif.msgbody) return;
            if (notif.time === lastNotif.current.time && notif.msgcode === lastNotif.current.msgcode) return;

            lastNotif.current = { time: notif.time, msgcode: notif.msgcode };

            addToast({
                type: notif.type,
                title: nodeAlias(notif.host),
                subtitle: notif.user,
                body: notif.msgbody,
                code: notif.msgcode,
            });
        } catch {
            // Silent — don't flood UI on transient network errors
        }
    }, [addToast]);

    useEffect(() => {
        const handleLocalToast = (event) => {
            if (!event?.detail) return;
            addToast(event.detail);
        };

        window.addEventListener('app-toast', handleLocalToast);
        return () => window.removeEventListener('app-toast', handleLocalToast);
    }, [addToast]);

    useEffect(() => {
        poll();
        const interval = setInterval(poll, 7000);
        return () => clearInterval(interval);
    }, [poll]);

    // Group active toasts by position
    const byPosition = toasts.reduce((acc, t) => {
        (acc[t.position] ??= []).push(t);
        return acc;
    }, {});

    return createPortal(
        <>
            {Object.entries(POSITION_CLASSES).map(([position, classes]) => {
                const group = byPosition[position];
                if (!group?.length) return null;
                return (
                    <div key={position} className={classes}>
                        {group.map(toast => (
                            <div key={toast.id} className="pointer-events-auto">
                                <Toast {...toast} onDismiss={dismissToast} />
                            </div>
                        ))}
                    </div>
                );
            })}
        </>,
        document.body
    );
};

export default NotificationPoller;

