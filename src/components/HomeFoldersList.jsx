import React from 'react';
import { Home } from 'lucide-react';
import ShareList from './ShareList';

const HomeFoldersList = (props) => (
    <ShareList {...props} title="Home Folders List" subtitle="User home directories" count="Homes" emptyText="No home folders found" icon={Home} showGroups={false} />
);

export default HomeFoldersList;
