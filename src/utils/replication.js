// QSD5.352 (QC 695): one rule for "is this snapshot / schedule a replication item", used by the Snapshots page (which
// leaves them out) and the Sender Schedule page (which shows only them).  A snapshot's partner:receiver is the zfs
// property; when it was never set zfs prints '-', which counted as a receiver, so the Sender view listed local
// snapshots and the Snapshots page listed replication snapshots.
const NO_RECEIVER = ['', '-', 'NoReceiver', 'noreceiver', 'no', 'No', 'none', 'None', '_1'];

export const isReplicated = (receiver) => {
    const value = String(receiver ?? '').trim();
    return value !== '' && !NO_RECEIVER.includes(value);
};
export const periodReplicated = (p) => isReplicated(p?.receiver);
export const snapReplicated = (s) => isReplicated(s?.partnerR);
