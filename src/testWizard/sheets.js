// Test sheets for the Test Wizard. Each sheet is a sequence of test steps, and
// each step is broken into one or more granular UI actions. A step's `route`
// is the app hash to navigate to before showing its actions. An action's
// `target` is a CSS selector for the real element the tester should focus on
// next (or null when the action happens outside the web UI — VirtualBox,
// waiting, node power state, physical/manual checks).
//
// To add another sheet, append a new { id, name, steps } entry below.

const DISKGROUPS_ROUTE = '#/pools/diskgroups';
const NODES_ROUTE = '';

// Decommissioning a pool is a 3-click confirm flow in the UI (Decommission
// Pool -> Delete -> Confirm Destruction), so every "delete this pool" step
// walks through all three.
const DECOMMISSION_ACTIONS = [
    { text: 'Click Decommission Pool', target: 'pool-decommission-btn' },
    { text: 'Click Delete to confirm', target: 'pool-decommission-confirm1-btn' },
    { text: 'Click Confirm Destruction, then wait about 20 seconds until the pool is fully gone', target: 'pool-decommission-confirm2-btn' },
];

export const TEST_SHEETS = [
    {
        id: 'diskgroups_2nodes',
        name: 'DiskGroups – 2 Node Cluster',
        steps: [
            {
                n: '1',
                route: NODES_ROUTE,
                actions: [
                    { text: 'Select node_1 from the node list so its fields become editable', target: 'node-tile' },
                    { text: 'Set node_1’s IP address to 10.11.11.241', target: '#IPAddress' },
                    { text: 'Set the cluster IP to 10.11.11.249', target: '#Mgmt' },
                    { text: 'Set the time zone to Cairo', target: '#TZ' },
                    { text: 'Click Update Node to apply these changes', target: '#readysubmit' },
                    { text: 'Select node_2 from the Discovered Nodes list so its fields become editable', target: 'discovered-node-tile' },
                    { text: 'If node_2’s IP needs to change before joining, update it here — otherwise just continue', target: '#DiscoveredIPAddress' },
                    { text: 'Click Update and Add to Cluster to join node_2', target: '#updateAndJoinBtn' },
                ],
            },
            { n: '2', route: DISKGROUPS_ROUTE, actions: [{ text: 'While the ZFS service is running, open VirtualBox and add 5 disks of 10GB each on both nodes, plus 1 disk of 1GB on each node', target: null }] },
            { n: '3', route: DISKGROUPS_ROUTE, actions: [{ text: 'Check that you now have 10 × 10GB disks + 2 × 1GB disks available', target: 'qdisks-disk-grid' }] },
            { n: '4', route: DISKGROUPS_ROUTE, actions: [{ text: 'In Available Pool Configurations, check how many groups (RAID types) can be created with the current disks', target: 'qdisks-redundancy-table' }] },
            {
                n: '5',
                route: DISKGROUPS_ROUTE,
                actions: [
                    { text: 'In Available Pool Configurations, pick the single 9GB disk option', target: 'qdisks-redundancy-table' },
                    { text: 'Click Create Pool', target: '#createPoolBtn' },
                    { text: 'Confirm a new DiskGroup card appears for it', target: null },
                ],
            },
            {
                n: '6',
                route: DISKGROUPS_ROUTE,
                actions: [
                    { text: 'In the new pool “pdhcpxxxxxxx” card, pick “Multiple Disks no redundancy” sized to land near 41GB', target: 'qdisks-redundancy-table' },
                    { text: 'Click Create Pool', target: '#createPoolBtn' },
                ],
            },
            {
                n: '7',
                route: DISKGROUPS_ROUTE,
                actions: [
                    { text: 'If step 6 succeeded, pick “Multiple Disks no redundancy” again for the maximum size', target: 'qdisks-redundancy-table' },
                    { text: 'Click Create Pool', target: '#createPoolBtn' },
                ],
            },
            { n: '8', route: DISKGROUPS_ROUTE, actions: DECOMMISSION_ACTIONS },
            {
                n: '9',
                route: DISKGROUPS_ROUTE,
                actions: [
                    { text: 'Pick the RAID10 configuration using 10 × 10GB disks', target: 'qdisks-redundancy-table' },
                    { text: 'Click Create Pool', target: '#createPoolBtn' },
                ],
            },
            { n: '10', route: DISKGROUPS_ROUTE, actions: [{ text: 'Wait until the new pool shows ‘highly available – balanced’', target: null }] },
            { n: '11', route: DISKGROUPS_ROUTE, actions: DECOMMISSION_ACTIONS },
            {
                n: '12',
                route: DISKGROUPS_ROUTE,
                actions: [
                    { text: 'Pick the RAID10 configuration using 5 × 10GB disks and 1 × 1GB disk', target: 'qdisks-redundancy-table' },
                    { text: 'Click Create Pool', target: '#createPoolBtn' },
                ],
            },
            { n: '13', route: DISKGROUPS_ROUTE, actions: DECOMMISSION_ACTIONS },
            {
                n: '14',
                route: DISKGROUPS_ROUTE,
                actions: [
                    { text: 'Pick the RAID50 configuration using 10 × 10GB disks', target: 'qdisks-redundancy-table' },
                    { text: 'Click Create Pool', target: '#createPoolBtn' },
                ],
            },
            { n: '15', route: DISKGROUPS_ROUTE, actions: [{ text: 'Wait until the new pool shows ‘highly available – balanced’', target: null }] },
            { n: '16', route: DISKGROUPS_ROUTE, actions: DECOMMISSION_ACTIONS },
            {
                n: '17',
                route: DISKGROUPS_ROUTE,
                actions: [
                    { text: 'Pick the RAID60 configuration using 10 × 10GB disks', target: 'qdisks-redundancy-table' },
                    { text: 'Click Create Pool', target: '#createPoolBtn' },
                ],
            },
            { n: '18', route: DISKGROUPS_ROUTE, actions: [{ text: 'Wait until the new pool shows ‘highly available – balanced’', target: null }] },
            { n: '19', route: DISKGROUPS_ROUTE, actions: DECOMMISSION_ACTIONS },
            {
                n: '20',
                route: DISKGROUPS_ROUTE,
                actions: [
                    { text: 'Pick the Mirror configuration', target: 'qdisks-redundancy-table' },
                    { text: 'Click Create Pool', target: '#createPoolBtn' },
                ],
            },
            { n: '21', route: DISKGROUPS_ROUTE, actions: [{ text: 'Wait until the new pool shows ‘highly available – balanced’', target: null }] },
            { n: '21.5', route: DISKGROUPS_ROUTE, actions: [{ text: 'Wait for sync to turn green (up to 5 minutes)', target: null }] },
            { n: '22', route: DISKGROUPS_ROUTE, actions: [{ text: 'In VirtualBox, do a sudden death (hard shutdown) of node_2', target: null }] },
            { n: '23', route: DISKGROUPS_ROUTE, actions: [{ text: 'Check that the pool now shows one missing disk (x)', target: null }] },
            { n: '24', route: DISKGROUPS_ROUTE, actions: [{ text: 'Wait up to 5 minutes until the missing disk is auto-replaced', target: null }] },
            { n: '25', route: DISKGROUPS_ROUTE, actions: [{ text: 'Confirm the pool is now ‘highly available – not balanced’', target: null }] },
            { n: '26', route: DISKGROUPS_ROUTE, actions: [{ text: 'Start node_2 back up in VirtualBox', target: null }] },
            { n: '27', route: DISKGROUPS_ROUTE, actions: [{ text: 'Wait up to 5 minutes for the pool to become ‘highly available – balanced’ again', target: null }] },
            { n: '27.5', route: DISKGROUPS_ROUTE, actions: [{ text: 'Wait for sync to turn green (up to 5 minutes)', target: null }] },
            { n: '28', route: DISKGROUPS_ROUTE, actions: [{ text: 'In VirtualBox, do a sudden death (hard shutdown) of node_1', target: null }] },
            { n: '29', route: DISKGROUPS_ROUTE, actions: [{ text: 'Expect the web UI to disconnect or freeze for ~30 seconds, then prompt you to relogin', target: null }] },
            { n: '30', route: DISKGROUPS_ROUTE, actions: [{ text: 'Check that the pool is still listed', target: null }] },
            { n: '31', route: DISKGROUPS_ROUTE, actions: [{ text: 'Confirm the pool shows one missing disk', target: null }] },
            { n: '32', route: DISKGROUPS_ROUTE, actions: [{ text: 'Wait until the disk is replaced and the pool shows ‘highly available – not balanced’', target: null }] },
            { n: '33', route: DISKGROUPS_ROUTE, actions: [{ text: 'Start node_1 back up in VirtualBox', target: null }] },
            { n: '34', route: DISKGROUPS_ROUTE, actions: [{ text: 'Wait for the pool to become ‘highly available – balanced’', target: null }] },
            { n: '35', route: DISKGROUPS_ROUTE, actions: DECOMMISSION_ACTIONS },
            {
                n: '36',
                route: DISKGROUPS_ROUTE,
                actions: [
                    { text: 'Right-click the two 1GB disks to mark them as cache, and wait a few seconds until they’re added', target: 'qdisks-disk-grid' },
                ],
            },
            {
                n: '37',
                route: DISKGROUPS_ROUTE,
                actions: [
                    { text: 'Check the “Include marked cache in pool” box', target: '#includeCache' },
                    { text: 'Pick a mirrored configuration', target: 'qdisks-redundancy-table' },
                    { text: 'Click Create Pool', target: '#createPoolBtn' },
                ],
            },
            { n: '38', route: DISKGROUPS_ROUTE, actions: [{ text: 'Upload the config files from all the nodes', target: null }] },
        ],
    },
];
