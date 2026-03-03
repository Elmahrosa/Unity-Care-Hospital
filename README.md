<div align="center">

# 🏥 Unity Care Hospital (UCH)
### Sovereign Telehealth Infrastructure
**Institutional Deployment · White-Label · Full Ownership Transfer**

[![API Tests](https://img.shields.io/badge/tests-passing-brightgreen?style=flat-square)](./tests)
[![Node](https://img.shields.io/badge/Node.js-20%20LTS-green?style=flat-square)](https://nodejs.org)
[![MongoDB](https://img.shields.io/badge/MongoDB-7-green?style=flat-square)](https://mongodb.com)
[![Docker](https://img.shields.io/badge/Docker-ready-2496ED?style=flat-square&logo=docker)](./docker-compose.yml)
[![HIPAA](https://img.shields.io/badge/HIPAA-aligned-blue?style=flat-square)](./docs/DUE_DILIGENCE_DEFENSE.md)
[![GDPR](https://img.shields.io/badge/GDPR-ready-blue?style=flat-square)](./docs)
[![License](https://img.shields.io/badge/license-Proprietary-red?style=flat-square)](./LICENSE)

**Live Platform:** https://uch.teosegypt.com · **Demo Environment:** https://teos-uch.space.z.ai  
**Contact:** info@uch.teosegypt.com · +20 100 616 7293  
**Response Target:** 48 Hours

</div>

---

## What is UCH?

**Unity Care Hospital (UCH)** is a modular, sovereign-ready telehealth infrastructure platform engineered for hospital groups, healthcare operators, and national health systems that require **full deployment control**, compliance-aligned architecture, and long-term autonomy—**without reliance on external SaaS ecosystems.**

Unlike consumer telehealth SaaS platforms, UCH is:
- ✅ **Deployed as a dedicated, isolated instance** per institution
- ✅ **Contracted for ownership** — not billed monthly
- ✅ **White-label capable** — your branding, your control
- ✅ **Compliance-aligned** — HIPAA architecture, GDPR workflows, SOC 2 principles
- ✅ **Backed by institutional diligence** — board-ready documentation included

---

## Why UCH?

### The Problem with SaaS Lock-In

Subscription telehealth platforms transfer operational control to a third party. When pricing, ownership, hosting jurisdictions, or API behavior changes, institutions absorb the risk—financially, operationally, and regulatorily.

**UCH reduces dependency risk at the contract + infrastructure level:**

| Risk | SaaS Platforms | UCH |
|------|---|---|
| **Subscription Escalation** | ⚠️ Recurring costs grow with scale | ✅ Fixed, contracted pricing |
| **Data Residency** | ⚠️ Third-party hosting, cross-jurisdiction exposure | ✅ Institution-controlled deployment |
| **Vendor Acquisition** | ⚠️ M&A, repricing, feature deprecation | ✅ Full IP ownership option |
| **Exit Barriers** | ⚠️ Limited portability, high migration cost | ✅ Source code escrow available |
| **National Compliance** | ⚠️ Conflicts with sovereign programs | ✅ Air-gapped deployment option |

---

## Repository Structure

```
Unity-Care-Hospital/
├── backend/                   Node.js + Express + MongoDB API
│   ├── src/
│   │   ├── config/            DB + env configuration
│   │   ├── controllers/       Auth, Users, Appointments, Records, Analytics
│   │   ├── middlewares/       JWT auth + RBAC + Rate limiting
│   │   ├── models/            User, Appointment, MedicalRecord
│   │   ├── routes/            All API routes (10 modules)
│   │   ├── services/          AuthService, UserService, TokenBlacklist
│   │   └── utils/             Logger, error handlers
│   ├── .env.example           Environment variable reference
│   ├── Dockerfile
│   └── package.json
├── tests/
│   └── backend/               Integration tests (auth, appointments, GDPR)
├── docs/                      Board-ready institutional diligence package
│   ├── DUE_DILIGENCE_DEFENSE.md
│   ├── DUE_DILIGENCE_QA.md
│   ├── FINANCIAL_MODEL_3Y.md
│   ├── CASHFLOW_12M.md
│   ├── SENSITIVITY_ANALYSIS.md
│   ├── PIPELINE_BLUEPRINT.md
│   ├── PILOT_DEPLOYMENT_STRUCTURE.md
│   └── INSTITUTIONAL_PROPOSAL_TEMPLATE.md
├── website/                   Institutional landing page (static HTML)
│   └── index.html             (Comprehensive, multi-section)
├── docker-compose.yml         Full stack: API + MongoDB + Nginx
├── nginx.conf                 Reverse proxy + security headers
├── .gitignore
└── README.md
```

---

## Platform Pillars

### 1. Deployment Sovereignty
Dedicated instance per institution. No shared infrastructure. Data residency controlled by the deploying entity.

### 2. White-Label Capability
Institutional branding across patient experience, provider portal, and admin operations—under your identity.

### 3. Compliance Architecture
Security controls designed around HIPAA safeguard principles, GDPR workflows, and audit-ready operational patterns.

### 4. Multi-Hospital Scale
Modular topology supports regional rollouts, multi-facility groups, and national programs under one engagement structure.

---

## API Surface

| Method | Route | Auth | Description |
|--------|-------|------|-------------|
| POST | `/api/auth/login` | Public | Login — returns access + refresh tokens |
| POST | `/api/auth/refresh` | Public | Rotate tokens |
| POST | `/api/auth/logout` | 🔒 | Logout via token invalidation (real logout) |
| POST | `/api/users/register` | Public | Patient registration |
| GET  | `/api/users/me` | 🔒 | Current user profile |
| PUT  | `/api/users/update` | 🔒 | Update profile |
| GET  | `/api/users/` | 🔒 Admin | List all users (paginated) |
| POST | `/api/appointments` | 🔒 | Book appointment |
| GET  | `/api/appointments/patient/:id` | 🔒 | Patient's appointments |
| GET  | `/api/appointments/doctor/:id` | 🔒 | Doctor's appointments |
| PATCH | `/api/appointments/:id` | 🔒 | Update / cancel appointment |
| DELETE | `/api/appointments/:id` | 🔒 | Delete appointment |
| POST | `/api/records` | 🔒 Doctor/Admin | Create medical record |
| GET  | `/api/records/patient/:id` | 🔒 | Patient's medical records |
| GET  | `/api/records/patient/:id/export` | 🔒 | GDPR data export (JSON) |
| GET  | `/api/records/:id` | 🔒 | Single medical record |
| PATCH | `/api/records/:id` | 🔒 Doctor/Admin | Update medical record |
| DELETE | `/api/records/:id` | 🔒 Admin | Soft-delete (GDPR compliant) |
| GET  | `/api/analytics/trends` | 🔒 Admin/Doctor | Appointment volume trends |
| GET  | `/api/analytics/stats` | 🔒 Admin | Status breakdown |
| GET  | `/api/analytics/diagnoses` | 🔒 Admin/Doctor | Top diagnoses |
| GET  | `/health` | Public | Health check |

**Placeholder routes (milestone-gated):** `/api/blockchain`, `/api/care`, `/api/chatbot`, `/api/iot`, `/api/monitoring`

---

## Security Architecture

| Control | Implementation |
|---------|---------------|
| **Authentication** | JWT access token (1h) + refresh token (7d), separate secrets |
| **Password Hashing** | bcrypt, 12 rounds, secure storage |
| **Real Logout** | Token blacklist in User model, checked on every request |
| **RBAC** | `requireRole()` middleware — patient, doctor, admin, pharmacist, nurse, emergency_responder |
| **Rate Limiting** | Global (200 req/15min) + Auth routes (20 req/15min) |
| **Security Headers** | Helmet.js (HSTS, X-Frame-Options, CSP, etc.) |
| **Input Validation** | express-validator on all mutation routes |
| **Error Handling** | Proper 4-argument Express error handler, no internal info leakage |
| **Graceful Shutdown** | SIGTERM handler for clean container termination |
| **Secrets Management** | `.env` — never committed (see `.gitignore`) |
| **GDPR Compliance** | Soft-delete + data export endpoints on MedicalRecord |

---

## Compliance Posture

**HIPAA-aligned architecture.** Security controls designed around HIPAA safeguard principles.  
**SOC 2 principles applied** in design, implementation, and operational patterns.  
**GDPR workflows** — data export, soft-delete, consent management.  
**Formal certification audits scheduled post-seed funding.**

**Institution retains full data ownership.** Deployments are isolated by default. No shared infrastructure.

---

## Deployment Tiers

### Tier 0: Institutional Pilot
**$45,000** (entry point)
- Single-facility controlled deployment
- Institutional validation & procurement readiness
- Fully credited toward upgrade tiers
- Optional annual maintenance: 12–18%

### Tier 1: Institutional License
**$89,000+** (per region)
- Dedicated regional instance
- White-label branding
- API-first integration surface
- Enterprise support structure
- Optional annual maintenance: 12–18%

### Tier 2: Full IP Transfer
**$275,000+** (one-time)
- Repository + source code handover
- Architecture + deployment documentation
- Procurement diligence package
- Transition support engagement
- Maintenance optional (contracted as needed)

### Tier 3: Sovereign Stack
**$425,000+** (national/government program)
- National-scale topology
- Data residency guarantees
- Air-gapped deployment option
- Priority support + governance model
- Maintenance negotiated per contract

**Pilot fees are fully credited toward conversion tiers.**

---

## Procurement Readiness

All institutional buyers receive a comprehensive diligence package:

### Due Diligence Package
Architecture overview, deployment model, integration surface, financial projections, and compliance mapping (under NDA).

### Data Processing Agreement (DPA)
GDPR-aligned DPA template clarifying controller/processor roles and data handling boundaries.

### Deployment SLA Framework
Uptime targets (≥95%), response-time guarantees, escalation paths, and support tiers defined contractually.

### Source Code Escrow
Escrow option available for Enterprise/Sovereign engagements to mitigate vendor continuity risk.

### Architecture Whitepaper (PDF)
Technical brief for CIO/CTO review: security model, topology, deployment pathways, and integration strategy.

### IP Transfer Clarity
Ownership tier includes documented handover, repository transfer, and structured transition support.

---

## Quick Start

### 1. Configure Environment

```bash
cp backend/.env.example backend/.env
# Edit backend/.env — set MONGODB_URI, JWT_SECRET, REFRESH_TOKEN_SECRET, etc.
```

### 2. Docker (Recommended)

```bash
docker-compose up -d --build

# Verify API
curl http://localhost:5000/health

# Open website
open http://localhost:80
# or
curl http://localhost:80
```

### 3. Manual Development

```bash
cd backend
npm install
npm run dev          # starts with nodemon on port 5000
```

### 4. Test the API

```bash
# Register
curl -X POST http://localhost:5000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Test123!","role":"patient"}'

# Login
curl -X POST http://localhost:5000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Test123!"}'
```

---

## Tests

```bash
cd backend
npm test             # runs integration suite against local MongoDB
npm run test:coverage
```

**Test coverage includes:**
- User registration + duplicate prevention
- Login + token generation
- Token refresh + rotation
- Real logout (token blacklist)
- Authenticated `/me` endpoint
- Appointment creation + double-booking detection
- Authorization rules (RBAC)
- GDPR data export
- Error handling

---

## Diligence Package

All investor and procurement documents are in `/docs`:

- **DUE_DILIGENCE_DEFENSE.md** — architecture, scope, risk register
- **DUE_DILIGENCE_QA.md** — CTO/investor Q&A talk-track
- **FINANCIAL_MODEL_3Y.md** — 3-year revenue model
- **CASHFLOW_12M.md** — month-by-month cash flow
- **SENSITIVITY_ANALYSIS.md** — delay & scaling scenarios
- **PIPELINE_BLUEPRINT.md** — institutional buyer pipeline
- **PILOT_DEPLOYMENT_STRUCTURE.md** — pilot scope and conversion path
- **INSTITUTIONAL_PROPOSAL_TEMPLATE.md** — board-ready proposal template

---

## Pilot Success Metrics

✓ ≥ 95% uptime  
✓ Verified clinician usage  
✓ No critical security incidents  
✓ Documented operational improvement  
✓ Executive intent to expand  
✓ Institution retains full data ownership  

---

## Contact & Support

**Ayman Seif** · Elmahrosa International  
📧 **info@uch.teosegypt.com**  
📞 **+20 100 616 7293**  
🌐 **https://uch.teosegypt.com**

**Response Target:** 48 Hours

> *Send your GitHub username to receive READ access for technical due diligence. Response within 48 hours.*

---

## Technology Stack

| Component | Technology | Version |
|-----------|-----------|---------|
| **Runtime** | Node.js | 20 LTS |
| **Framework** | Express.js | 4.x |
| **Database** | MongoDB | 7 |
| **Authentication** | JWT | — |
| **Password Hashing** | bcrypt | 12 rounds |
| **Rate Limiting** | express-rate-limit | — |
| **Security** | Helmet.js | — |
| **Validation** | express-validator | — |
| **Testing** | Jest | — |
| **Containerization** | Docker | — |
| **Orchestration** | Docker Compose | — |
| **Web Server** | Nginx | Alpine |

---

## Roadmap (Milestone-Gated)

- **Phase 1:** Core telehealth (current)
- **Phase 2:** Blockchain notarization for medical records
- **Phase 3:** IoT vitals integration
- **Phase 4:** Insurance API integration
- **Phase 5:** AI-powered triage

---

## License

Proprietary. See [LICENSE](./LICENSE) for details.

---

<div align="center">
<em>Developed by Elmahrosa International — Egypt, est. 2007</em>  
<em>Institutional digital health infrastructure for sovereign deployment.</em>
</div>
