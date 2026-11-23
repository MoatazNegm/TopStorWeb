// Which address may a new volume take?  The same rules as is_unique_ip() in fapi.py (which stays the judge), so the form
// can say it before the request:
//  - never the address of a node (or of the cluster),
//  - NFS shares share no address with anything,
//  - a CIFS share may share an address only with CIFS shares of the same context: the workgroup, or the same domain
//    (one share container serves one workgroup or one domain), never with a NFS, home or iSCSI volume,
//  - a home folder only with other home folders, an iSCSI LUN only with other LUNs (one portal).
// volume.prot tells the kind: 'CIFS' (workgroup), 'CIFS_<domain>', 'HOME', 'NFS', 'ISCSI'.
export const volumeContext = (vol) => {
    const prot = String(vol.prot || '');
    if (prot.startsWith('CIFS_')) return { kind: 'CIFS', domain: prot.slice(5).toLowerCase() };
    if (prot.startsWith('CIFS')) return { kind: 'CIFS', domain: '' };
    return { kind: prot, domain: '' };
};

// QSD5.351: hosts/allinfo gives the cluster address with its prefix ("10.11.11.200/24"): every address is compared
// without the /prefix, so the cluster address (and any address stored with a prefix) is flagged too.
export const bareIp = (v) => String(v || '').trim().split('/')[0].trim();

// ctx: { kind: 'CIFS' | 'NFS' | 'HOME' | 'ISCSI', domain: '' for a workgroup }
export const ipCollision = (ip, ctx, { hosts = [], volumes = [] }) => {
    const value = bareIp(ip);
    if (!value) return '';
    const node = hosts.find((h) => bareIp(h.ip) === value);
    if (node) return node.name === 'cluster' ? 'This is the cluster address' : `This is the address of node ${node.name}`;
    const domain = String(ctx.domain || '').trim().toLowerCase();
    for (const vol of volumes) {
        if (bareIp(vol.ipaddress) !== value) continue;
        const other = volumeContext(vol);
        const name = String(vol.name || '').split('_')[0];
        if (ctx.kind === 'CIFS' && other.kind === 'CIFS') {
            if (other.domain === domain) continue;
            return other.domain ? `Used by CIFS volume ${name} of domain ${other.domain}` : `Used by CIFS volume ${name} of a workgroup`;
        }
        if (ctx.kind === 'HOME' && other.kind === 'HOME') continue;
        if (ctx.kind === 'ISCSI' && other.kind === 'ISCSI') continue;
        const label = other.kind === 'ISCSI' ? 'iSCSI LUN' : other.kind === 'HOME' ? 'home folder' : `${other.kind} volume`;
        return `Used by ${label} ${name}`;
    }
    return '';
};
