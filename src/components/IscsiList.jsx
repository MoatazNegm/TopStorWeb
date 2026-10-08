import React from 'react';
import { Database } from 'lucide-react';
import ShareList from './ShareList';

const IscsiList = (props) => (
    <ShareList {...props} variant="iscsi" title="iSCSI LUN List" subtitle="Block-level storage targets" count="Targets" emptyText="No iSCSI LUNs found" icon={Database} showGroups={false} />
);

export default IscsiList;
