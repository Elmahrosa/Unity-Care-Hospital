const $ = sel => document.querySelector(sel);

function ts() { return new Date().toISOString().replace('T',' ').slice(0,19); }

function loadState() {
  try {
    const raw = localStorage.getItem('uch_demo_v2');
    if (raw) return JSON.parse(raw);
  } catch(e){}
  return {
    authed: false, user: null, view: 'login',
    audit: [{ t: ts(), actor: 'system', action: 'Demo initialized', sev: 'info' }],
    data: JSON.parse(JSON.stringify(window.UCH_DEMO_DATA))
  };
}

function save() { try { localStorage.setItem('uch_demo_v2', JSON.stringify(state)); } catch(e){} }

function log(action, sev='info') {
  state.audit.unshift({ t: ts(), actor: state.user?.email || 'guest', action, sev });
  save();
}

function pct(x) { return Math.round(x * 100) + '%'; }

function seedReset() {
  localStorage.removeItem('uch_demo_v2');
  state = loadState();
  render();
}

let state = loadState();

/* ── Layout ── */
function layout(title, body) {
  return `
  <div class="hdr">
    <div class="hdr-logo">
      <div class="logo-icon">🏥</div>
      <div>
        <div class="hdr-title">${title}</div>
        <div class="hdr-sub">Interactive demo · mock data · real UI flows</div>
      </div>
    </div>
    <div class="hdr-actions">
      <button class="btn btn-ghost" onclick="seedReset()">Reset demo</button>
      ${state.authed ? `<span class="user-label">${state.user.name} · ${state.user.role}</span>
        <button class="btn btn-red" onclick="logout()">Logout</button>` : ''}
    </div>
  </div>
  ${state.authed ? navBar() : ''}
  <div>${body}</div>`;
}

function navBar() {
  const items = [['dashboard','Dashboard'],['patients','Patients'],['beds','Bed Mgmt'],
                 ['appointments','Appointments'],['telemed','Telemedicine'],['audit','Audit Log']];
  return `<nav>${items.map(([k,l])=>`
    <button class="${state.view===k?'active':''}" onclick="go('${k}')">${l}</button>`).join('')}
  </nav>`;
}

function go(v) { state.view = v; log(`Navigated to ${v}`); render(); }

/* ── Auth ── */
function login() {
  const email = $('#email').value.trim();
  const pass  = $('#pass').value.trim();
  const user  = state.data.users.find(u => u.email===email && u.password===pass);
  if (!user) { alert('Use buyer@demo.com / demo123'); return; }
  state.authed = true;
  state.user   = { email: user.email, role: user.role, name: user.name };
  state.view   = 'dashboard';
  log('Logged in');
  save(); render();
}

function logout() { log('Logged out'); state.authed=false; state.user=null; state.view='login'; save(); render(); }

/* ── Badge ── */
function badge(t) {
  const m = {
    Red:'b-red', Yellow:'b-amber', Green:'b-green',
    Admitted:'b-indigo', ER:'b-amber', ICU:'b-red',
    Available:'b-green', Occupied:'b-slate',
    Scheduled:'b-indigo', 'In Progress':'b-amber', Completed:'b-green',
    info:'b-slate', warn:'b-amber', critical:'b-red'
  };
  return `<span class="badge ${m[t]||'b-slate'}">${t}</span>`;
}

/* ── Views ── */
function viewLogin() {
  return `
  <div style="min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px">
    <div style="max-width:960px;width:100%;display:grid;grid-template-columns:1fr 1fr;gap:40px;align-items:center">

      <!-- LEFT: Positioning -->
      <div>
        <div style="font-size:11px;text-transform:uppercase;letter-spacing:.15em;color:#a5b4fc;margin-bottom:12px">
          Unity Care Hospital
        </div>
        <div style="font-size:32px;font-weight:700;line-height:1.2;margin-bottom:16px">
          Institutional Demo<br>Environment
        </div>
        <p style="font-size:14px;color:#94a3b8;line-height:1.7;margin-bottom:24px">
          This interactive environment demonstrates real operational flows —
          patient management, bed allocation, scheduling,
          telemedicine simulation, and immutable audit logging.
        </p>
        <div style="display:flex;flex-direction:column;gap:10px;font-size:13px;color:#64748b">
          <div>✦ Real UI flows — not screenshots</div>
          <div>✦ Role-based experience (Executive vs Ops)</div>
          <div>✦ Governance + audit visibility</div>
          <div>✦ Synthetic data — no real PHI</div>
        </div>
        <div style="margin-top:24px;font-size:11px;color:#475569;line-height:1.8">
          Environment: Demo / Non-Production<br>
          Compliance Simulation: HIPAA · GDPR · SOC 2 (UI level)
        </div>
        <div style="margin-top:20px">
          <a href="mailto:info@uch.teosegypt.com"
             style="display:inline-flex;align-items:center;gap:8px;padding:10px 16px;border-radius:10px;
                    border:1px solid rgba(0,211,167,.3);background:rgba(0,211,167,.07);
                    color:#00d3a7;font-size:12px;text-decoration:none">
            📋 Request Full Institutional Briefing →
          </a>
        </div>
      </div>

      <!-- RIGHT: Login Box -->
      <div class="card" style="padding:32px;border-color:rgba(99,102,241,.2)">
        <div style="font-size:16px;font-weight:700;margin-bottom:4px">Secure Demo Access</div>
        <div style="font-size:12px;color:#64748b;margin-bottom:24px">Authorized institutional reviewers only.</div>

        <div class="cred-box" style="margin-bottom:24px">
          <div style="font-size:12px;font-weight:600;color:#cbd5e1;margin-bottom:8px">Demo Credentials</div>
          <div>Executive View → <span style="color:#a5b4fc">buyer@demo.com</span></div>
          <div style="margin-top:4px">Ops Admin → <span style="color:#a5b4fc">ops@demo.com</span></div>
          <div style="margin-top:4px">Password → <span style="color:#a5b4fc">demo123</span></div>
        </div>

        <label>Email</label>
        <input id="email" type="text" placeholder="buyer@demo.com" value="buyer@demo.com"
               style="margin-bottom:16px"/>
        <label>Password</label>
        <input id="pass" type="password" placeholder="demo123" value="demo123"
               style="margin-bottom:24px"/>

        <button class="btn btn-indigo" style="width:100%;padding:14px;font-size:14px;font-weight:600"
                onclick="login()">
          Enter Interactive Demo →
        </button>

        <div style="margin-top:20px;font-size:11px;color:#475569;line-height:1.6;border-top:1px solid #1e293b;padding-top:16px">
          This environment contains synthetic data for demonstration purposes only.
          All actions are logged in the audit trail visible inside the platform.
        </div>
      </div>

    </div>
  </div>

  <style>
    @media(max-width:700px){
      div[style*="grid-template-columns:1fr 1fr"]{grid-template-columns:1fr!important}
    }
  </style>`;
}

function viewDashboard() {
  const k = state.data.kpis;
  return layout('Dashboard', `
  <div class="grid4">
    <div class="card"><div class="kpi-label">Bed Occupancy</div><div class="kpi-val">${pct(k.occupancy)}</div><div class="kpi-hint">Updates with bed actions</div></div>
    <div class="card"><div class="kpi-label">Avg Wait Time</div><div class="kpi-val">${k.avgWaitMins}m</div><div class="kpi-hint">ER throughput</div></div>
    <div class="card"><div class="kpi-label">Claims In Review</div><div class="kpi-val">${k.claimsInReview}</div><div class="kpi-hint">Revenue cycle</div></div>
    <div class="card"><div class="kpi-label">Open Incidents</div><div class="kpi-val">${k.incidentsOpen}</div><div class="kpi-hint">Governance</div></div>
  </div>
  <div class="grid2">
    <div class="card">
      <div class="section-title">Quick Actions</div>
      <div style="display:flex;flex-wrap:wrap;gap:8px">
        <button class="btn btn-ghost" onclick="go('patients')">Open Patients</button>
        <button class="btn btn-ghost" onclick="go('beds')">Manage Beds</button>
        <button class="btn btn-green" onclick="simulateClaim()">Simulate Claim</button>
        <button class="btn btn-indigo" onclick="exportAudit()">Export Audit JSON</button>
      </div>
    </div>
    <div class="card">
      <div class="section-title">What this demo proves</div>
      <ul class="feat-list">
        <li>Real UI flows — not screenshots</li>
        <li>Role-based feel (Buyer vs Ops)</li>
        <li>All actions write to audit log</li>
        <li>Exportable audit JSON for compliance buyers</li>
      </ul>
    </div>
  </div>`);
}

function viewPatients() {
  const rows = state.data.patients.map(p=>`
  <tr>
    <td style="color:#64748b;font-size:11px">${p.id}</td>
    <td>${p.name}</td><td>${p.age}</td>
    <td>${badge(p.triage)}</td><td>${badge(p.status)}</td>
    <td>${p.ward}</td><td>${p.bed}</td>
    <td style="text-align:right">
      <button class="btn btn-red" onclick="discharge('${p.id}')">Discharge</button>
    </td>
  </tr>`).join('');

  return layout('Patients', `
  <div class="card">
    <div class="tbl-head">
      <span class="section-title" style="margin:0">Patient Registry</span>
      <button class="btn btn-green" onclick="admitMock()">+ Admit mock patient</button>
    </div>
    <div style="overflow-x:auto">
      <table>
        <thead><tr><th>ID</th><th>Name</th><th>Age</th><th>Triage</th><th>Status</th><th>Ward</th><th>Bed</th><th style="text-align:right">Action</th></tr></thead>
        <tbody>${rows||'<tr><td colspan="8" style="color:#475569;text-align:center;padding:20px">No patients</td></tr>'}</tbody>
      </table>
    </div>
  </div>`);
}

function viewBeds() {
  const cards = state.data.beds.map(b=>`
  <div class="card">
    <div style="display:flex;justify-content:space-between;align-items:center">
      <span style="font-weight:600">${b.id}</span>
      <span style="font-size:11px;color:#64748b">${b.ward} · ${b.type}</span>
    </div>
    <div style="margin:10px 0">${badge(b.status)}</div>
    <div class="row-actions">
      <button class="btn btn-green" onclick="setBed('${b.id}','Available')">Set Available</button>
      <button class="btn btn-amber" onclick="setBed('${b.id}','Occupied')">Set Occupied</button>
    </div>
  </div>`).join('');

  return layout('Bed Management', `<div class="grid3">${cards}</div>`);
}

function viewAppointments() {
  const rows = state.data.appointments.map(a=>`
  <tr>
    <td style="color:#64748b;font-size:11px">${a.id}</td>
    <td>${a.patient}</td><td>${a.dept}</td><td>${a.time}</td>
    <td>${badge(a.status)}</td>
    <td style="text-align:right">
      <button class="btn btn-indigo" onclick="advanceAppt('${a.id}')">Next status</button>
    </td>
  </tr>`).join('');

  return layout('Appointments', `
  <div class="card">
    <div class="tbl-head">
      <span class="section-title" style="margin:0">Scheduling Board</span>
      <button class="btn btn-green" onclick="newAppt()">+ Create appointment</button>
    </div>
    <div style="overflow-x:auto">
      <table>
        <thead><tr><th>ID</th><th>Patient</th><th>Dept</th><th>Time</th><th>Status</th><th style="text-align:right">Action</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
  </div>`);
}

function viewTelemed() {
  return layout('Telemedicine', `
  <div class="grid2">
    <div class="card">
      <div class="section-title">Video Session (Mock WebRTC)</div>
      <p style="font-size:13px;color:#94a3b8;margin-bottom:12px">Simulates session start, event logging, and clinician notes workflow.</p>
      <div style="display:flex;gap:8px">
        <button class="btn btn-green" onclick="teleStart()">▶ Start session</button>
        <button class="btn btn-red" onclick="teleEnd()">■ End session</button>
      </div>
      <div class="tele-box" id="telebox">No active session.</div>
    </div>
    <div class="card">
      <div class="section-title">Clinical Notes</div>
      <textarea id="notes" placeholder="Type a clinical note, then save…"></textarea>
      <div style="margin-top:10px">
        <button class="btn btn-indigo" onclick="saveNotes()">Save note</button>
      </div>
    </div>
  </div>`);
}

function viewAudit() {
  const rows = state.audit.map(a=>`
  <tr>
    <td style="font-size:11px;color:#475569;white-space:nowrap">${a.t}</td>
    <td style="font-size:11px;color:#94a3b8">${a.actor}</td>
    <td>${a.action}</td>
    <td>${badge(a.sev)}</td>
  </tr>`).join('');

  return layout('Audit Log', `
  <div class="card">
    <div class="tbl-head">
      <span class="section-title" style="margin:0">Immutable-style event log</span>
      <button class="btn btn-indigo" onclick="exportAudit()">Export JSON</button>
    </div>
    <div style="overflow-x:auto">
      <table>
        <thead><tr><th>Time</th><th>Actor</th><th>Action</th><th>Severity</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
  </div>`);
}

/* ── Actions ── */
function discharge(pid) {
  const p = state.data.patients.find(x=>x.id===pid); if(!p) return;
  log(`Discharged ${pid} (${p.name})`, 'warn');
  const bed = state.data.beds.find(b=>b.id===p.bed); if(bed) bed.status='Available';
  state.data.patients = state.data.patients.filter(x=>x.id!==pid);
  reKpi(); save(); render();
}

function admitMock() {
  const id = 'P-'+Math.floor(1000+Math.random()*8999);
  state.data.patients.unshift({ id, name:'Mock Patient '+id, age:20+Math.floor(Math.random()*55), triage:'Green', status:'Admitted', ward:'A', bed:'A-10' });
  const bed = state.data.beds.find(b=>b.id==='A-10'); if(bed) bed.status='Occupied';
  log(`Admitted ${id}`, 'info'); reKpi(); save(); render();
}

function setBed(id, status) {
  const bed = state.data.beds.find(b=>b.id===id); if(!bed) return;
  bed.status = status;
  log(`Bed ${id} → ${status}`, status==='Occupied'?'warn':'info');
  reKpi(); save(); render();
}

function reKpi() {
  const beds = state.data.beds;
  state.data.kpis.occupancy = beds.filter(b=>b.status==='Occupied').length / beds.length;
}

function advanceAppt(id) {
  const a = state.data.appointments.find(x=>x.id===id); if(!a) return;
  const seq = ['Scheduled','In Progress','Completed'];
  a.status = seq[(seq.indexOf(a.status)+1)%seq.length];
  log(`Appointment ${id} → ${a.status}`); save(); render();
}

function newAppt() {
  const id = 'A-'+Math.floor(100+Math.random()*900);
  state.data.appointments.unshift({ id, patient:'Mock Patient', dept:'General', time:'14:00', status:'Scheduled' });
  log(`Created appointment ${id}`); save(); render();
}

function teleStart() {
  log('Telemedicine session started');
  const b = $('#telebox'); if(!b) return;
  b.innerHTML = '<span class="tele-live">● LIVE</span> — Mock WebRTC: connected, media OK, session ID: ' + Math.random().toString(36).slice(2,10).toUpperCase();
}

function teleEnd() {
  log('Telemedicine session ended', 'warn');
  const b = $('#telebox'); if(!b) return;
  b.innerHTML = 'Session ended.';
}

function saveNotes() {
  const v = $('#notes')?.value.trim();
  log(v ? 'Saved clinical note' : 'Empty note attempt', v?'info':'warn');
  if(v) alert('Note saved (mock).');
}

function simulateClaim() {
  state.data.kpis.claimsInReview++;
  log('Simulated insurance claim intake'); save(); render();
}

function exportAudit() {
  const blob = new Blob([JSON.stringify({exported: ts(), audit: state.audit}, null, 2)], {type:'application/json'});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'uch-demo-audit.json';
  a.click();
  log('Exported audit log JSON');
}

/* ── Router ── */
function render() {
  const app = $('#app'); if(!app) return;
  if (!state.authed) { app.innerHTML = viewLogin(); return; }
  const views = { dashboard:viewDashboard, patients:viewPatients, beds:viewBeds,
                  appointments:viewAppointments, telemed:viewTelemed, audit:viewAudit };
  app.innerHTML = (views[state.view] || viewDashboard)();
}

render();
