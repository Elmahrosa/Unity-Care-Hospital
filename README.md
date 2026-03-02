<div align="center">

# 🏥 Unity Care Hospital (UCH)
### Institutional Digital Health Infrastructure
**License · Ownership Transfer · Sovereign Deployment**

[![API Tests](https://img.shields.io/badge/tests-passing-brightgreen?style=flat-square)](./tests)
[![Node](https://img.shields.io/badge/Node.js-20%20LTS-green?style=flat-square)](https://nodejs.org)
[![MongoDB](https://img.shields.io/badge/MongoDB-7-green?style=flat-square)](https://mongodb.com)
[![Docker](https://img.shields.io/badge/Docker-ready-2496ED?style=flat-square&logo=docker)](./docker-compose.yml)
[![License](https://img.shields.io/badge/license-Proprietary-red?style=flat-square)](./LICENSE)

**Live:** https://uch.teosegypt.com · **Demo:** https://teos-uch.space.z.ai  
**Contact:** info@uch.teosegypt.com · +20 100 616 7293

</div>

---

## What this is

UCH is **modular telehealth infrastructure** for institutional buyers — hospital groups, health operators, and sovereign digital health programs — who need **deployment control** rather than consumer SaaS lock-in.

- Deployed as a **dedicated, white-label instance** per institution
- Contracted as a **license**, **full ownership transfer**, or **sovereign stack**
- Backed by a full due-diligence package (see `/docs`)

---

## Repository structure

```
Unity-Care-Hospital/
├── backend/                   Node.js + Express + MongoDB API
│   ├── src/
│   │   ├── config/            DB + env configuration
│   │   ├── controllers/       Auth, Users, Appointments, Records, Analytics
│   │   ├── middlewares/       JWT auth + RBAC
│   │   ├── models/            User, Appointment, MedicalRecord
│   │   ├── routes/            All API routes (10 modules)
│   │   ├── services/          AuthService, UserService
│   │   └── utils/             Logger
│   ├── .env.example           Environment variable reference
│   ├── Dockerfile
│   └── package.json
├── tests/
│   └── backend/               Integration tests (auth + appointments)
├── docs/                      Board-ready diligence package
│   ├── DUE_DILIGENCE_DEFENSE.md
│   ├── DUE_DILIGENCE_QA.md
│   ├── FINANCIAL_MODEL_3Y.md
│   ├── CASHFLOW_12M.md
│   ├── SENSITIVITY_ANALYSIS.md
│   ├── PIPELINE_BLUEPRINT.md
│   ├── PILOT_DEPLOYMENT_STRUCTURE.md
│   └── INSTITUTIONAL_PROPOSAL_TEMPLATE.md
├── website/                   Institutional landing page (static HTML)
│   └── index.html
├── docker-compose.yml         Full stack: API + MongoDB + Website
├── nginx.conf                 Reverse proxy config
├── .gitignore
└── README.md
```

---

## API surface

| Method | Route | Auth | Description |
|--------|-------|------|-------------|
| POST | `/api/auth/login` | Public | Login — returns access + refresh tokens |
| POST | `/api/auth/refresh` | Public | Rotate tokens |
| POST | `/api/auth/logout` | 🔒 | Blacklist token (real logout) |
| POST | `/api/users/register` | Public | Register patient |
| GET  | `/api/users/me` | 🔒 | Current user profile |
| PUT  | `/api/users/update` | 🔒 | Update profile |
| GET  | `/api/users/` | 🔒 Admin | List all users (paginated) |
| POST | `/api/appointments` | 🔒 | Book appointment |
| GET  | `/api/appointments/patient/:id` | 🔒 | Patient's appointments |
| GET  | `/api/appointments/doctor/:id` | 🔒 | Doctor's appointments |
| PATCH | `/api/appointments/:id` | 🔒 | Update / cancel |
| DELETE | `/api/appointments/:id` | 🔒 | Delete |
| POST | `/api/records` | 🔒 Doctor/Admin | Create medical record |
| GET  | `/api/records/patient/:id` | 🔒 | Patient records |
| GET  | `/api/records/patient/:id/export` | 🔒 | GDPR data export |
| GET  | `/api/records/:id` | 🔒 | Single record |
| PATCH | `/api/records/:id` | 🔒 Doctor/Admin | Update record |
| DELETE | `/api/records/:id` | 🔒 Admin | Soft-delete (GDPR) |
| GET  | `/api/analytics/trends` | 🔒 Admin/Doctor | Appointment volume trends |
| GET  | `/api/analytics/stats` | 🔒 Admin | Status breakdown |
| GET  | `/api/analytics/diagnoses` | 🔒 Admin/Doctor | Top diagnoses |
| GET  | `/health` | Public | Health check |

Placeholder routes (milestone-gated): `/api/blockchain`, `/api/care`, `/api/chatbot`, `/api/iot`, `/api/monitoring`

---

## Quick start

### 1. Configure environment

```bash
cp backend/.env.example backend/.env
# Edit backend/.env — set MONGODB_URI, JWT_SECRET, etc.
```

### 2. Docker (recommended)

```bash
docker-compose up -d --build

# Verify
curl http://localhost:5000/health
# Open http://localhost:80 for the institutional website
```

### 3. Manual (local dev)

```bash
cd backend
npm install
npm run dev          # starts with nodemon on port 5000
```

---

## Tests

```bash
cd backend
npm test             # runs integration suite against local MongoDB
npm run test:coverage
```

Tests cover: registration, login, duplicate prevention, token refresh, real logout (blacklist), `/me` auth, appointment creation, double-booking detection, and authorization rules.

---

## Security controls

| Control | Implementation |
|---------|---------------|
| Authentication | JWT access token (1h) + refresh token (7d), separate secrets |
| Password hashing | bcrypt, 12 rounds |
| Real logout | Token blacklist in User model, checked on every request |
| RBAC | `requireRole()` middleware — patient, doctor, admin, pharmacist, nurse, emergency_responder |
| Rate limiting | Global (200 req/15min) + Auth (20 req/15min) |
| Security headers | Helmet.js |
| Input validation | express-validator on all mutation routes |
| Error handling | Proper 4-argument Express error handler |
| Graceful shutdown | SIGTERM handler |
| Secrets | `.env` — never committed (see `.gitignore`) |
| GDPR | Soft-delete + data export endpoints on MedicalRecord |

---

## Compliance posture

HIPAA-aligned architecture. SOC 2 principles applied in design.  
**Formal certification audits are scheduled post-seed funding.**  
Institution retains full data ownership. Deployments are isolated.

---

## Deployment tiers

| Tier | Price | Description |
|------|-------|-------------|
| License | $75K+ | White-label, per-region |
| Ownership Transfer | $250K+ | Full codebase + IP transfer |
| Sovereign Stack | $350K+ | Government / national program |

Maintenance/support: 15–20% of license value annually.  
Pilot entry: $40K–$60K, credited toward final tier.

---

## Diligence package

All investor and procurement documents are in `/docs`:

- `DUE_DILIGENCE_DEFENSE.md` — architecture, scope, risk register
- `DUE_DILIGENCE_QA.md` — CTO/investor Q&A talk-track
- `FINANCIAL_MODEL_3Y.md` — 3-year revenue model
- `CASHFLOW_12M.md` — month-by-month cash flow
- `SENSITIVITY_ANALYSIS.md` — delay scenarios
- `PIPELINE_BLUEPRINT.md` — institutional buyer pipeline
- `PILOT_DEPLOYMENT_STRUCTURE.md` — pilot scope and conversion path
- `INSTITUTIONAL_PROPOSAL_TEMPLATE.md` — board-ready proposal template

---

## Contact

**Ayman Seif** · Elmahrosa International  
📧 info@uch.teosegypt.com  
📞 +20 100 616 7293  
🌐 https://uch.teosegypt.com

> *Send your GitHub username to receive READ access for technical due diligence. Response within 48 hours.*

---

<div align="center">
<em>Developed by Elmahrosa International — Egypt, est. 2007</em>
</div>