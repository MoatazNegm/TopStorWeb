// Sample telemetry for the Service Performance page. Used ONLY when Prometheus cannot be reached from the UI
// (for example the mock-only UI node); the page then shows a "Sample data" badge. Shapes match the Prometheus
// HTTP API so the page code path is the same as with live data.
const INSTANCES = ['10.11.11.201:9100', '10.11.11.78:9100'];
// key -> [base, amplitude, period seconds]
const SHAPE = {
    cpu: [28, 14, 600], mem: [58, 6, 1800], read: [42, 30, 420], write: [26, 18, 540], busy: [22, 14, 480],
    queue: [2.5, 2, 300], load: [1.4, 0.8, 900], arc: [11, 1.2, 3600], arcMax: [16, 0, 1], l2: [24, 0.5, 7200],
    hit: [93, 4, 800], memTotal: [32, 0, 1],
};
const wave = (t, base, amp, period, phase) => Math.max(0, base + amp * Math.sin((2 * Math.PI * (t + phase)) / period)
    + amp * 0.35 * Math.sin((2 * Math.PI * (t + phase)) / (period / 3.7)));

export const sampleRange = (key, start, end, step) => {
    const [base, amp, period] = SHAPE[key] || [10, 3, 600];
    const result = INSTANCES.map((instance, i) => {
        const values = [];
        for (let t = start; t <= end; t += step) {
            let v = wave(t, base * (i ? 0.85 : 1), amp, period, i * 137);
            if (key === 'mem' || key === 'busy' || key === 'cpu' || key === 'hit') v = Math.min(99, v);
            values.push([t, String(v)]);
        }
        return { metric: { instance, job: 'node' }, values };
    });
    return { data: { status: 'success', data: { resultType: 'matrix', result } } };
};

export const sampleTop = () => ({
    data: {
        data: {
            result: [['pdhcp45229467/cifs/finance', 38.4], ['pdhcp45229467/nfs/backup', 21.7], ['pdhcp45229467/iscsi/vm01', 12.9],
                ['pdhcp45229467/cifs/home', 4.2], ['pdhcp45229467/nfs/media', 1.1]]
                .map(([dataset, v]) => ({ metric: { dataset }, value: [Date.now() / 1000, String(v)] })),
        },
    },
});

export const samplePools = () => ({
    data: {
        data: {
            result: INSTANCES.map((instance) => ({
                metric: { instance, job: 'node', zpool: 'pdhcp45229467', state: 'online' }, value: [Date.now() / 1000, '1'],
            })),
        },
    },
});

// a Prometheus answer: an object with data.data.result (an HTML page from a missing proxy route is not one)
export const isPromAnswer = (res) => Array.isArray(res?.data?.data?.result);

const VOLS = [['finance', 38.4, 4.1, 2400, 640], ['backup', 3.2, 18.5, 120, 900], ['vm01', 9.8, 3.1, 1500, 700], ['home', 2.9, 1.3, 260, 110], ['media', 1.0, 0.1, 40, 4]];
const vec = (i) => ({
    data: { data: { result: VOLS.map((v) => ({ metric: { dataset: `pdhcp45229467/${v[0]}` }, value: [Date.now() / 1000, String(v[1 + i] * (0.9 + 0.2 * Math.random()))] })) } },
});
// order: read MB/s, write MB/s, read IOPS, write IOPS (same as IQ.vol)
export const sampleVols = () => [vec(0), vec(1), vec(2), vec(3)];
