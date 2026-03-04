<div align="center">

# 🏥 Unity Care Hospital (UCH)
### Sovereign Telehealth Infrastructure
**Institutional Deployment · White-Label · Full Ownership Transfer**

[![API Tests](https://img.shields.io/badge/tests-passing-brightgreen?style=flat-square)](./tests)
[![Node](https://img.shields.io/badge/Node.js-20%20LTS-green?style=flat-square)](https://nodejs.org)
[![MongoDB](https://img.shields.io/badge/MongoDB-7-green?style=flat-square)](https://mongodb.com)
[![Docker](https://img.shields.io/badge/Docker-ready-2496ED?style=flat-square&logo=docker)](./docker-compose.yml)
[![HIPAA](https://img.shields.io/badge/HIPAA-aligned-blue?style=flat-square)](./docs)
[![GDPR](https://img.shields.io/badge/GDPR-ready-blue?style=flat-square)](./docs)
[![License](https://img.shields.io/badge/license-Proprietary-red?style=flat-square)](./LICENSE)

**Live Platform:** https://uch.teosegypt.com  
**Demo Environment:** https://demo-uch.teosegypt.com *(access-controlled — request required)*  
**Contact:** info@uch.teosegypt.com · +20 100 616 7293  
**Response Target:** 48 Hours

</div>

---

> **Institutional buyers** can request the full technical diligence package under NDA.  
> 📄 [Download Architecture Overview (PDF)](https://github.com/Elmahrosa/Unity-Care-Hospital/blob/main/buyer-kit/UCH-Architecture-Overview.pdf)

---

## What is UCH?

**Unity Care Hospital (UCH)** is a modular, sovereign-ready telehealth infrastructure platform engineered for hospital groups, healthcare operators, and national health systems that require **full deployment control**, compliance-aligned architecture, and long-term autonomy — **without reliance on external SaaS ecosystems.**

Unlike consumer telehealth SaaS platforms, UCH is:

- **Dedicated** institutional deployment — no shared infrastructure
- **White-label capable** — full institution branding across patient and provider experience
- **Ownership-transfer model** — source code escrow and full IP transfer available
- **Compliance-aligned** — HIPAA, GDPR, SOC 2 operational patterns
- **Procurement-ready** — full diligence documentation included

---

## Why UCH? The SaaS Lock-In Problem

Subscription telehealth platforms transfer operational control to a third party. When pricing, hosting jurisdictions, or API behavior changes — institutions absorb the risk.

**UCH eliminates that dependency at the contract and infrastructure level.**

| Risk | SaaS Platforms | UCH |
|---|---|---|
| Subscription Escalation | Recurring cost growth | Fixed institutional pricing |
| Data Residency | Third-party hosting | Institution-controlled |
| Vendor Acquisition Risk | You absorb the risk | Ownership transfer option |
| Exit Barriers | High migration cost | Source escrow available |
| National Compliance | Limited sovereignty | Air-gapped deployments possible |

---

## Demo Access (Controlled)

The demo environment is **intentionally access-controlled** — not publicly open.

**To request access:**
1. Email: **info@uch.teosegypt.com**
2. Include: organization name, your role, and intended deployment country
3. Optionally include your GitHub username for diligence repository access

> Access is granted within **48 hours** to verified institutional contacts.

---

## Buyer Kit (Procurement-Ready)

The `/buyer-kit` folder includes everything needed for CIO/CTO evaluation:

- `EXECUTIVE_SUMMARY.md` — Strategic overview and value proposition
- `ARCHITECTURE_OVERVIEW.md` — System design and component breakdown
- `PROCUREMENT_MODEL.md` — Deployment tiers, pricing, and upgrade paths
- `SECURITY_OVERVIEW.md` — Controls, compliance posture, and audit approach
- `NDA_TEMPLATE.md` — Standard NDA for full diligence access
- `UCH-Architecture-Overview.pdf` — One-page visual architecture for review

📄 [Download Architecture PDF](https://github.com/Elmahrosa/Unity-Care-Hospital/blob/main/buyer-kit/UCH-Architecture-Overview.pdf)

---

## Platform Pillars

**Deployment Sovereignty** — Dedicated instance per institution. No shared infrastructure. Air-gapped deployment available for national programs.

**White-Label Capability** — Institution branding across all patient and provider surfaces.

**Compliance Architecture** — HIPAA-aligned, GDPR workflows, SOC 2 operational patterns. Institution retains full data ownership.

**Multi-Hospital Scale** — Supports regional rollouts and national healthcare programs.

---

## Security Architecture

| Control | Implementation |
|---|---|
| Authentication | JWT access + refresh tokens |
| Password Hashing | bcrypt |
| RBAC | Role-based access middleware |
| Rate Limiting | express-rate-limit |
| Security Headers | Helmet.js |
| Input Validation | express-validator |
| Logout Security | Token blacklist |
| GDPR Export | JSON export endpoints |
| Audit Logging | Full action trail per user/session |

---

## Deployment Tiers

| Tier | Price | Includes |
|---|---|---|
| Institutional Pilot | $45,000 | Scoped deployment, onboarding, 90-day support |
| Institutional License | $89,000+ | Full platform, white-label, source escrow |
| Full IP Transfer | $275,000+ | Complete ownership transfer, all rights |
| Sovereign National Stack | $425,000+ | Air-gapped, multi-hospital, national compliance |

> Pilot fees are **credited toward upgrade tiers**.

---

## Repository Structure

```
Unity-Care-Hospital/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   └── utils/
│   ├── .env.example
│   ├── Dockerfile
│   └── package.json
│
├── tests/
│   └── backend/
│
├── docs/
│   ├── DUE_DILIGENCE_DEFENSE.md
│   ├── DUE_DILIGENCE_QA.md
│   ├── FINANCIAL_MODEL_3Y.md
│   ├── CASHFLOW_12M.md
│   ├── SENSITIVITY_ANALYSIS.md
│   ├── PIPELINE_BLUEPRINT.md
│   ├── PILOT_DEPLOYMENT_STRUCTURE.md
│   └── INSTITUTIONAL_PROPOSAL_TEMPLATE.md
│
├── buyer-kit/
│   ├── EXECUTIVE_SUMMARY.md
│   ├── ARCHITECTURE_OVERVIEW.md
│   ├── PROCUREMENT_MODEL.md
│   ├── SECURITY_OVERVIEW.md
│   ├── NDA_TEMPLATE.md
│   └── UCH-Architecture-Overview.pdf
│
├── website/
│   └── index.html
│
├── vercel.json
├── docker-compose.yml
├── nginx.conf
└── README.md
```

---

## Quick Start (Local / Evaluation)

```bash
# Clone and run with Docker
docker-compose up -d --build

# Verify API health
curl http://localhost:5000/health
```

---

## Testing

```bash
cd backend
npm test
npm run test:coverage
```

Coverage includes: Authentication · Token rotation · Appointment booking · RBAC authorization · GDPR data export · Error handling

---

## Compliance Posture

- ✅ HIPAA-aligned architecture
- ✅ SOC 2 operational principles
- ✅ GDPR export + soft deletion
- ✅ Institution retains full data ownership
- ✅ Air-gapped deployment available for sovereign/national programs

---

## Contact

**Ayman Seif** — Elmahrosa International

📧 info@uch.teosegypt.com  
📞 +20 100 616 7293  
🌐 https://uch.teosegypt.com

Response target: **48 hours**

---

## License

**Proprietary.** See [LICENSE](./LICENSE) for full terms.

Unauthorized use, reproduction, or distribution is strictly prohibited.  
For licensing, procurement, or ownership transfer: info@uch.teosegypt.com

---

<div align="center">
<em>Developed by <strong>Elmahrosa International — Egypt</strong></em><br>
<em>Sovereign digital health infrastructure for institutional deployment.</em>
</div>
