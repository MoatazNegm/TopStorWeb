import React, { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import Toast from './Toast';
import { fetchNotification } from '../api/notifications';

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

    const updateSyncStatus = (isInsync) => {
        const el = document.getElementById('syncStatus');
        if (!el) return;
        if (isInsync === 'yes') {
            el.innerHTML = 'Cluster <br><span>in Sync</span>';
            el.classList.remove('not-in-sync');
            el.classList.add('in-sync');
        } else {
            el.innerHTML = 'Nodes <br><span>Not in Sync</span>';
            el.classList.remove('in-sync');
            el.classList.add('not-in-sync');
        }
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

            if (notif.isinsync !== undefined) updateSyncStatus(notif.isinsync);
            if (notif.requests) updateTasksTable(notif.requests);

            // Only show toast when a new notification arrives (dedup by time + msgcode)
            if (!notif.msgbody) return;
            if (notif.time === lastNotif.current.time && notif.msgcode === lastNotif.current.msgcode) return;

            lastNotif.current = { time: notif.time, msgcode: notif.msgcode };

            const type = TOAST_CONFIG[notif.type] ? notif.type : 'info';
            const { position, duration } = TOAST_CONFIG[type];

            setToasts(prev => [...prev, {
                id: ++nextId,
                type,
                title: notif.host || 'System',
                subtitle: notif.user,
                body: notif.msgbody,
                duration,
                position,
            }]);
        } catch {
            // Silent — don't flood UI on transient network errors
        }
    }, []);

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
