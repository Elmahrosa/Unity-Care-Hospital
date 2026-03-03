window.UCH_DEMO_DATA = {
  users: [
    { email: "buyer@demo.com", password: "demo123", role: "Executive", name: "Demo Buyer" },
    { email: "ops@demo.com", password: "demo123", role: "Ops Admin", name: "Ops Admin" }
  ],
  kpis: {
    occupancy: 0.75,
    avgWaitMins: 18,
    claimsInReview: 42,
    incidentsOpen: 3
  },
  patients: [
    { id: "P-1001", name: "Amina Hassan" },
    { id: "P-1002", name: "Omar Salah" }
  ],
  beds: [
    { id: "A-10", status: "Available" },
    { id: "A-11", status: "Occupied" }
  ],
  appointments: [
    { id: "A-901", patient: "Amina Hassan", status: "Scheduled" }
  ]
};
