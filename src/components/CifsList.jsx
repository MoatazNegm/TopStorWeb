import React from 'react';
import { HardDrive } from 'lucide-react';
import ShareList from './ShareList';

const CifsList = (props) => (
    <ShareList {...props} title="CIFS Volume List" subtitle="Active network shares" count="Shares" emptyText="No CIFS volumes found" icon={HardDrive} />
);

export default CifsList;
