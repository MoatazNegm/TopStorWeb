# TopStor REST API — user guide

Source of truth: `fapi.py` (Flask app, listens on port 5001 inside the node; the web UI and the
reverse proxy reach it as `/api/v1/...`). This guide was written from that file and from the React
client in `topstorweb/src/api/`. It describes what the code accepts today; where a reply shape is
not fixed in the code it says so.

## 1. Conventions

| Topic | Rule |
|---|---|
| Base path | `/api/v1/<group>/<call>` (the UI uses `https://<node>:8443/api/v1/...`) |
| Methods | Almost every call accepts `GET` and `POST`. **Both read parameters only from the URL query string.** A JSON or form body is ignored. |
| Authentication | Interactive users: log in once, then pass `token=<value>` on every call (query string). Scripts and applications: use an **API key** (section 11) as the `token` value, no login needed. |
| Spaces | `login_required` strips every space from every string parameter. Do not send values that need spaces. |
| Bad / expired token | HTTP 200 with `{"response": "baduser"}` (not a 401). Treat it as "log in again". |
| Replies | Reads return JSON (`jsonify`). Changes are **queued**: the reply normally echoes your parameters plus `response: <user>`; the change happens asynchronously on the leader. Check progress with `info/notification` or `info/logs`. |
| Arrays | Send as `disks[]=a&disks[]=b` (also `cache[]`, `cache_disks[]`). They arrive as `disks`, `cache`, `cache_disks` lists. |
| Audit | Every change call is recorded in the command log (`info/commandlog`); parameters whose name contains `pass` are never logged. |
| Cache buster | The UI adds `_=<epoch ms>`; harmless. |

Example (curl):

```bash
T=$(curl -sk 'https://NODE:8443/api/v1/login?user=admin&pass=SECRET' | python3 -c 'import sys,json;print(json.load(sys.stdin)["token"])')
curl -sk "https://NODE:8443/api/v1/partners/partnerlist?token=$T"
```

## 2. Session

| Call | Params | Reply |
|---|---|---|
| `GET /login` | `user`, `pass` | `{"token": "<token>"}`; `{"token": "baduser"}` on failure |
| `GET /login/test` | `token` | `{"response": "<user>"}` or `baduser` — is the token valid |
| `GET /login/renewtoken` | `token` | extends the token lifetime |
| `GET /logout` | `token` | invalidates the token |
| `POST /user/changepass` | `token`, user name and new password (UI sends `username`, `password`) | queued password change |

## 3. Cluster, nodes, software

| Call | Params | Purpose |
|---|---|---|
| `/hosts/allinfo` | – | `{all, active, ready, possible, lost, …}` host lists |
| `/hosts/discover` | – | possible / lost hosts |
| `/hosts/syncnow` | `syncnow` | force a cluster sync |
| `/hosts/config` | `ipaddr`, `cluster` | node IP / cluster configuration |
| `/hosts/joincluster` | `leaderip`, `ipaddr`, `ipaddrsubnet`, `alias` | join a node to a cluster |
| `/hosts/evacuate` | `name` | evacuate a node |
| `/hosts/getConfig` | `nodeName` | download that node's config file (file attachment) |
| `/hosts/getAllConfig` | – | download all config files (zip attachment) |
| `/software/versions` | – | available software versions |
| `/software/setversion`, `/software/apply` | `version` | select / apply a version |
| `/software/update` | `source`, `version`, `location`, `username`, `password` | online update; replies `{"data": "<command>"}` |
| `/software/localFileUpdate` | multipart file upload | update from an uploaded file |

## 4. Pools and disks

| Call | Params | Purpose |
|---|---|---|
| `/pools/poolsinfo`, `/volumes/poolsinfo` | – | `{"results": [...]}` pools |
| `/pools/dgsinfo` | – | disk groups with their disks |
| `/pools/newpool` | `disks[]`, `redundancy`, `useable`, `owner`, `cache[]`, `cache_bool`, `status` | create a pool |
| `/pools/addtopool` | `pool`, `redundancy`, `useable`, `owner` (+ `disks[]`) | add a group to a pool |
| `/pools/delpool` | `pool`, `owner` | delete a pool |
| `/pools/actionOnDisk` | `action`, `actualdisk`, `pool`, `owner` | offline / online / replace a disk |
| `/pools/cachespares`, `/pools/delcachespares` | `cache_disks[]` | add / remove cache or spare disks (JSON `response` + `message`; 400 on no disks) |
| `/pools/updatecache` | `pool`, `host`, `raids`, `cache[]`, `owner` | change a pool's cache layout |

## 5. Volumes and snapshots

| Call | Params | Purpose |
|---|---|---|
| `/volumes/volumesinfo`, `/volumes/{CIFS,NFS,ISCSI,HOME}/volumesinfo` | – | `{"allvolumes": [...]}` |
| `/volumes/volumelist`, `/volumes/stats`, `/volumes/connections` | – | list / statistics / client connections |
| `/volumes/create` | `type` (`CIFS`/`NFS`/`ISCSI`/`HOME`), `pool`, `name`, `size`, `owner`, `ipaddress`, `Subnet`, `groups`, `compression`, `dedup`, `active`; CIFS domain: `domname`,`domip`,`domsrv`,`domadmin`,`dompass`; iSCSI: `portalport`,`initiators`,`chapuser`,`chappas` | create a volume |
| `/volumes/config` | `volume`, `type`, `owner`, `ipaddress`, `groups`, `portalport`, `initiators`, `chapuser`, `chappas` | change a volume |
| `/volumes/volumeactive` | `name`, `active`, `owner` | activate / deactivate |
| `/volumes/volumedel` | `name`, `type`, `owner` | delete |
| `/volumes/grouplist` | – | groups usable by a volume |
| `/volumes/snapshots/snapshotsinfo` | – | `{allsnaps, Once, Hourly, Weekly, …}` |
| `/volumes/snapshots/create` | `pool`, `volume`, `name`, `snapsel`, `receiver`, `owner` | create a snapshot / schedule |
| `/volumes/snapshots/snaprollback`, `…/snapshotdel`, `…/perioddelete` | `name`, `owner` | roll back / delete / delete a schedule |

## 6. Users, groups, tenants

| Call | Params | Purpose |
|---|---|---|
| `GET /users/userlist` | `tenant` | users |
| `GET /users/grouplist` | `tenant` | groups for the user form |
| `/users/UnixAddUser` | `name`, `Password`, `groups`, `Volpool`, `Volsize`, `HomeAddress`, `HomeSubnet`, `adduser` | add a user (with home volume) |
| `/users/userchange` | `name`, `groups`, `tenant`, `owner` | change a user's groups |
| `/users/userdel` | `name`, `tenant` | delete |
| `GET /users/userauths` | `username` | privileges of a user |
| `/users/usersauth` | `tochange`, `auths` | set a user's privileges |
| `/users/uploadUsers` | multipart file | bulk import |
| `GET /groups/grouplist`, `GET /groups/userlist` | – | groups / users with membership |
| `/groups/UnixAddgroup` | `name`, `users` | add group |
| `/groups/groupchange` | `name`, `users` | change members |
| `/groups/groupdel` | `name` | delete |
| `/tenants/tenantinfo` | – | tenants; `/tenant/adduser` adds a user to a tenant |

## 7. Replication partners

| Call | Params | Reply |
|---|---|---|
| `GET /partners/partnerlist` | – | `{"allpartners": [{"alias","ip","type","port"}]}` |
| `GET /partners/freeport` | – | `{"port": <int>}` — a random port in 3001–8000 that is not listened on by this node and not used by another partner entry. No side effects. If no free port is found after 50 tries: `{"port": 0, "response": "select another port"}`. |
| `/partners/AddPartner` | `ip`, `alias`, `type` (`Sender`/`Receiver`), `port`, `pass` | echo + queued `PartnerAdd.py`. The IP is validated; a bad or duplicate IP raises a notification and the reply has no effect. The `port` must be 3001–8000, not listened on by this node (`ss -ltn` + bind test) and not used by another partner; otherwise nothing is authorized, an error notification is raised and the reply is the plain text `select another port` (HTTP 200). |
| `/partners/partnerdel` | `name` (the alias) | queued `PartnerDel.py` |

The partner type `Dual way` no longer exists: use `Sender` or `Receiver`.

## 8. Information, logs, health

| Call | Params | Reply |
|---|---|---|
| `/info/notification` | – | latest notification `{isinsync, importance, msgcode, date, time, host, type, user, msgbody, requests, response}` |
| `/info/logs` | – | `{"alllogs": [...]}` |
| `/info/onedaylog` | – | last day of logs |
| `/info/commandlog` | – | `{"response": "Ok", "commands": [...]}` audit trail of change calls |
| `/info/cversion` | – | `{"response": "Ok", "cversion": "<n>"}` cluster version counter |
| `/info/summary` | none (**no token required**) | `{users, groups, pools, volumes: {cifs, nfs, iscsi}}` |
| `/telemetry/heartbeat` | none | UI keep-alive: `{"status": "boost_active"}` |

## 9. Typical flows

1. **Create a CIFS volume**: `login` → `pools/poolsinfo` (pick a pool) → `volumes/create?type=CIFS&pool=…&name=…&size=…&owner=<user>&ipaddress=…&Subnet=…` → poll `info/notification` until the success message → `volumes/CIFS/volumesinfo`.
2. **Add a replication partner**: `login` → `partners/partnerlist` → `partners/AddPartner?ip=…&alias=…&type=Sender&port=3001&pass=<key>` → watch `info/notification`.
3. **Check a change finished**: every queued change publishes a notification; `info/logs` keeps the history and `info/commandlog` shows who called what.

## 10. Known limitations

* No HTTP status codes for most errors: look at `response` and the notification.
* No parameter schema validation beyond what each handler checks.
* Parameters with spaces are mangled (spaces are stripped).
* Replies of change calls are the echoed parameters, not the result of the change.

## 11. API keys (for scripts and applications)

An API key is a named credential for programs. It is **not** a system user: no group, no home
volume, no console login. The key name is the user name recorded in the audit log and in
notifications (`apikey <name>`).

Manage keys in the UI under **Settings → API Keys** (the same page has the *API user guide*
download button), or through the calls below. Managing keys needs the *User Privileges* privilege;
a key can never create, regenerate or revoke keys.

| Call | Params | Reply |
|---|---|---|
| `GET /apikeys/list` | – | `{"response":"Ok","allkeys":[{"name","access","status","created","createdby","lastused","revoked"}]}` — `status` is `active` or `revoked`; secrets are never listed |
| `POST /apikeys/create` | `name` (3–32 chars, letters/digits/`_`/`-`, starts with a letter, not an existing user or key), `access` (`read` default, or `write`) | `{"response":"Ok","name","access","key":"qsk.<name>.<secret>"}` — **the key is shown only once**. Refusal: `{"response":"error","message":"..."}` |
| `POST /apikeys/regenerate` | `name`, optional `access` | a new key for an existing name (works for revoked names too); the old key stops working at once |
| `POST /apikeys/revoke` | `name` | the key is refused immediately; the name stays in the list so a new key can be created for it |
| `POST /apikeys/delete` | `name` | removes the entry; the name becomes free |

### Using a key

Pass the key as `token`, exactly like a login token:

```bash
KEY='qsk.backup_script.xxxxxxxxxxxxxxxxxxxxxxxx'
curl -sk "https://NODE:8443/api/v1/volumes/volumesinfo?token=$KEY"
```

* `read` keys may call the read calls only (lists, info, logs, summary). A change call answers
  `{"response":"error","message":"key is read only"}`.
* `write` keys may call change calls too, except key management and user/privilege changes.
* A revoked or unknown key gets `{"response":"baduser"}`, like an expired token.
* Every use is recorded in the command log with the key name; failed attempts raise a warning
  notification. Keys do not expire by time: revoke them when the application is retired.
* Calls a key can **never** make, even with `write`: everything under `/apikeys/`, user/group/tenant-user
  changes, `users/usersauth` (privileges), `user/changepass`, `hosts/joincluster`, the `software/*`
  change calls, `login/renewtoken`, `logout`. They answer `{"response":"error","message":"not allowed for an API key"}`.
* Brute force: 10 refused keys from one source address within 5 minutes lock that address out for
  5 minutes (every call with a key answers `baduser`; normal logins are not affected).
* The command log (`info/commandlog`) shows the key name as `user` and `"source":"apikey"`.
* Keys are stored as a salted HMAC-SHA256 in the cluster etcd (`apikeys/<name>`) and synced to all
  nodes; a revoke is effective immediately on every node. `lastused` is updated at most once a minute.
* Keep keys out of source control; send them only over HTTPS.
