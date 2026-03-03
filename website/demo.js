const $ = s => document.querySelector(s);
const KEY = "uch_demo_state_v1";

let state = load();

function load() {
  const raw = localStorage.getItem(KEY);
  if (raw) return JSON.parse(raw);
  return {
    authed: false,
    user: null,
    view: "login",
    audit: [],
    data: structuredClone(window.UCH_DEMO_DATA)
  };
}

function save() {
  localStorage.setItem(KEY, JSON.stringify(state));
}

function ts() {
  return new Date().toISOString().slice(0,19).replace("T"," ");
}

function log(action) {
  state.audit.unshift({ time: ts(), actor: state.user?.email || "guest", action });
  save();
}

function render() {
  if (!state.authed) return renderLogin();

  const views = {
    dashboard: renderDashboard,
    patients: renderPatients,
    beds: renderBeds,
    appointments: renderAppointments,
    audit: renderAudit
  };

  views[state.view]();
}

function renderLogin() {
  $("#app").innerHTML = `
  <div class="flex items-center justify-center h-screen">
    <div class="bg-slate-900 p-6 rounded-xl border border-slate-800 w-96">
      <div class="text-lg font-semibold mb-4">UCH Demo Login</div>
      <input id="email" placeholder="buyer@demo.com"
        class="w-full mb-3 px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg"/>
      <input id="pass" type="password" placeholder="demo123"
        class="w-full mb-4 px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg"/>
      <button onclick="login()"
        class="w-full py-2 bg-indigo-600/20 border border-indigo-500/40 rounded-lg">
        Enter Demo
      </button>
    </div>
  </div>`;
}

function login() {
  const email = $("#email").value;
  const pass = $("#pass").value;

  const user = state.data.users.find(u => u.email === email && u.password === pass);
  if (!user) return alert("Use buyer@demo.com / demo123");

  state.authed = true;
  state.user = user;
  state.view = "dashboard";
  log("Logged in");
  save();
  render();
}

function nav() {
  return `
  <div class="flex gap-2 mb-4">
    ${["dashboard","patients","beds","appointments","audit"]
      .map(v => `<button onclick="go('${v}')"
        class="px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 hover:bg-slate-800">
        ${v}
      </button>`).join("")}
    <button onclick="logout()" class="ml-auto text-xs text-rose-400">Logout</button>
  </div>`;
}

function go(v) { state.view = v; log("View " + v); render(); }
function logout() { state.authed = false; state.user = null; save(); render(); }

function renderDashboard() {
  const k = state.data.kpis;

  $("#app").innerHTML = `
  <div class="p-6 max-w-5xl mx-auto">
    ${nav()}
    <div class="grid md:grid-cols-4 gap-3">
      ${card("Occupancy", Math.round(k.occupancy*100)+"%")}
      ${card("Avg Wait", k.avgWaitMins+" mins")}
      ${card("Claims", k.claimsInReview)}
      ${card("Incidents", k.incidentsOpen)}
    </div>
  </div>`;
}

function card(label,val){
  return `<div class="bg-slate-900 border border-slate-800 p-4 rounded-xl">
    <div class="text-xs text-slate-400">${label}</div>
    <div class="text-xl font-semibold mt-1">${val}</div>
  </div>`;
}

function renderPatients(){
  $("#app").innerHTML = `
  <div class="p-6 max-w-5xl mx-auto">
    ${nav()}
    <button onclick="addPatient()"
      class="mb-3 px-3 py-2 bg-emerald-600/20 border border-emerald-500/40 rounded-lg">
      + Admit Patient
    </button>
    ${state.data.patients.map(p => `
      <div class="bg-slate-900 p-3 rounded-lg border border-slate-800 mb-2 flex justify-between">
        <div>${p.name} (${p.id})</div>
        <button onclick="discharge('${p.id}')"
          class="text-xs text-rose-400">Discharge</button>
      </div>
    `).join("")}
  </div>`;
}

function addPatient(){
  const id = "P-" + Math.floor(Math.random()*9999);
  state.data.patients.unshift({ id, name: "Mock "+id });
  log("Admitted "+id);
  save();
  render();
}

function discharge(id){
  state.data.patients = state.data.patients.filter(p => p.id !== id);
  log("Discharged "+id);
  save();
  render();
}

function renderBeds(){
  $("#app").innerHTML = `
  <div class="p-6 max-w-5xl mx-auto">
    ${nav()}
    ${state.data.beds.map(b => `
      <div class="bg-slate-900 p-3 rounded-lg border border-slate-800 mb-2">
        ${b.id} — ${b.status}
        <button onclick="toggleBed('${b.id}')"
          class="ml-4 text-xs text-indigo-400">Toggle</button>
      </div>
    `).join("")}
  </div>`;
}

function toggleBed(id){
  const b = state.data.beds.find(x => x.id === id);
  b.status = b.status === "Available" ? "Occupied" : "Available";
  log("Bed "+id+" → "+b.status);
  save();
  render();
}

function renderAppointments(){
  $("#app").innerHTML = `
  <div class="p-6 max-w-5xl mx-auto">
    ${nav()}
    ${state.data.appointments.map(a => `
      <div class="bg-slate-900 p-3 rounded-lg border border-slate-800 mb-2">
        ${a.patient} — ${a.status}
      </div>
    `).join("")}
  </div>`;
}

function renderAudit(){
  $("#app").innerHTML = `
  <div class="p-6 max-w-5xl mx-auto">
    ${nav()}
    ${state.audit.map(a => `
      <div class="text-xs text-slate-400 mb-1">
        ${a.time} — ${a.actor} — ${a.action}
      </div>
    `).join("")}
  </div>`;
}

render();
