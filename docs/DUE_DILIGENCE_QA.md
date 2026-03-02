# Due Diligence Q&A Defense Set (Investor / CTO / Compliance)

This is a **talk-track + written defense** designed to survive institutional diligence.

---

## A) Technical Architecture

### 1) What is the core stack?
**Answer:** Node.js backend, PostgreSQL database, GraphQL API layer, modular service extensions. Containerized deployment with horizontal scalability.

### 2) Is the platform multi-tenant?
**Answer:** UCH is designed for **dedicated per-institution deployments** (isolation by default). Multi-tenancy can be supported, but institutional deployments prioritize isolation.

### 3) What’s the deployment model?
**Answer:** Cloud-native and containerized. Each customer gets a dedicated environment with separate configuration, secrets, and operational controls.

### 4) Do you support integrations (EHR/insurance/IoT) today?
**Answer:** Integration surfaces are planned and API-ready patterns exist. **Live integrations are milestone-gated** (Insurance API, IoT vitals, EHR connectors) and are not claimed as fully deployed unless demonstrated.

### 5) Is blockchain medical record storage live?
**Answer:** The current system supports secure digital records. **Blockchain notarization** is positioned as an **attestation layer** and is delivered as a roadmap module.

---

## B) Security & Compliance

### 6) Are you HIPAA certified?
**Answer:** We implement a **HIPAA-aligned architecture**. We do **not** claim certification prematurely; formal audit engagements are scheduled post‑seed.

### 7) Are you SOC 2 compliant?
**Answer:** SOC 2 controls are applied in design and evidence is being packaged. Formal SOC 2 audit is planned post‑seed.

### 8) How do you protect patient data?
**Answer:** Role-based access control, audit logging, secure secret handling, and encrypted storage assumptions. Dedicated deployments reduce lateral risk across customers.

### 9) How do you manage keys and secrets?
**Answer:** No secrets in repo. Environment variables and secret managers in production. Rotation policies are enforced during deployment.

### 10) What is your incident response posture?
**Answer:** Defined escalation path, log retention, and evidence packaging. Pre-audit checklist exists to reduce institutional risk.

---

## C) Product Scope & Roadmap Integrity

### 11) What is live today?
**Answer:** Teleconsultation, video consult, RBAC foundation, secure records, and admin workflows.

### 12) What is explicitly NOT in the pilot?
**Answer:** Blockchain notarization, IoT vitals, insurance API, and AI triage are **excluded** from pilot unless scoped and priced.

### 13) How do you prevent scope creep?
**Answer:** Fixed pilot scope + change order process. Roadmap modules are priced separately.

---

## D) Market & Differentiation

### 14) Why not Teladoc / Amwell?
**Answer:** We don’t compete on consumer scale. UCH is **infrastructure-as-an-asset** with **ownership transfer** and sovereign deployment options.

### 15) Who is the buyer?
**Answer:** Hospital groups, operators, ministries, and health-tech startups needing infrastructure control.

### 16) Why would an institution buy vs build?
**Answer:** Internal builds typically take 18–24 months and require a specialized team. UCH deploys in <6 months with defined scope.

---

## E) Commercial & Financial

### 17) Pricing tiers?
**Answer:** License ($75K+), Ownership transfer ($250K+), Sovereign stack ($350K+). Maintenance/support typically 15–20% of license value.

### 18) What is recurring revenue?
**Answer:** Maintenance contracts + module upgrades + integration services.

### 19) What funding do you need and why?
**Answer:** Seed to fund security hardening, compliance evidence packaging, and enterprise pipeline execution.

---

## F) Risk Management

### 20) What are the top risks?
**Answer:** Institutional sales cycle risk, regulatory/payment variability, compliance execution.

### 21) Mitigation plan?
**Answer:** Paid pilots, clear conversion path, modular deployment, fiat fallback, audit schedule.

---

## G) Procurement / Legal

### 22) Who owns data?
**Answer:** The institution retains full ownership. UCH acts as the deployment operator / technology provider.

### 23) IP terms?
**Answer:** License provides usage rights; ownership tier transfers full codebase rights per agreement.

### 24) SLAs?
**Answer:** SLAs are negotiated per deployment; pilot targets ≥95% uptime and operational KPIs.