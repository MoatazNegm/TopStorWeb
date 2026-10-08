import React from 'react';
import { HardDrive } from 'lucide-react';
import ShareList from './ShareList';

const NfsList = (props) => (
    <ShareList {...props} title="NFS Volume List" subtitle="Unix-compatible shares" count="Shares" emptyText="No NFS volumes found" icon={HardDrive} />
);

export default NfsList;
