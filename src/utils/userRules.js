// The rules a new user must meet.  They mirror the backend (TopStor/uservalid.py): the form never submits a
// user the backend would reject, and tells the person why.  Each function returns '' when the value is fine,
// otherwise the message to show.

export const USER_NAME_MIN = 3;
export const USER_NAME_MAX = 32;
export const USER_PASS_MIN = 4;
export const USER_PASS_MAX = 128;

const RESERVED = new Set([
    'root', 'admin', 'bin', 'daemon', 'adm', 'lp', 'sync', 'shutdown', 'halt', 'mail', 'operator', 'games', 'ftp', 'nobody',
    'dbus', 'polkitd', 'sshd', 'chrony', 'tss', 'rpc', 'rpcuser', 'nfsnobody', 'postfix', 'apache', 'nginx', 'named', 'tcpdump',
    'docker', 'etcd', 'grafana', 'prometheus', 'systemd', 'wheel', 'users', 'nogroup', 'guest', 'samba', 'smb',
]);

export const validateUserName = (name, existingNames = []) => {
    const value = name ?? '';
    if (value === '') return 'Enter a user name.';
    if (value.length < USER_NAME_MIN) return `The user name needs at least ${USER_NAME_MIN} characters.`;
    if (value.length > USER_NAME_MAX) return `The user name can have ${USER_NAME_MAX} characters at most.`;
    if (!/^[A-Za-z][A-Za-z0-9-]*$/.test(value)) {
        return 'Use letters, digits and - only, starting with a letter (no blanks, no underscore).';
    }
    if (RESERVED.has(value.toLowerCase()) || value.toLowerCase().startsWith('systemd-')) {
        return 'This name is reserved for the system.';
    }
    if (existingNames.includes(value)) return 'A user with this name already exists.';
    return '';
};

export const validatePassword = (password) => {
    const value = password ?? '';
    if (value === '') return 'Enter a password.';
    if (value.length < USER_PASS_MIN) return `The password needs at least ${USER_PASS_MIN} characters.`;
    if (value.length > USER_PASS_MAX) return `The password can have ${USER_PASS_MAX} characters at most.`;
    if (/\s/.test(value)) return 'The password must not contain blanks.';
    if (/['"`\\*?[\]]/.test(value)) return 'The password must not contain quotes, back slashes, * ? [ or ].';
    return '';
};
