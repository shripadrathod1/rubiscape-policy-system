<div align="center">

<img src="https://img.shields.io/badge/Stack-Full%20Stack-1D4ED8?style=for-the-badge" alt="Full Stack"/>
<img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" alt="License"/>
<img src="https://img.shields.io/badge/Status-Active-brightgreen?style=for-the-badge" alt="Status"/>

<br/><br/>

# 🛡️ Policy Definition & Management System

### with Rule-Based Governance UI

<p align="center">
  A full-stack enterprise governance platform that allows administrators to define,<br/>
  manage, and monitor organizational policies using a <strong>visual Rule Builder</strong> — <em>no coding required.</em>
</p>

<p align="center">
  <a href="#-demo">Demo</a> •
  <a href="#-features">Features</a> •
  <a href="#-tech-stack">Tech Stack</a> •
  <a href="#-getting-started">Getting Started</a> •
  <a href="#-api-reference">API Reference</a> •
  <a href="#-project-structure">Structure</a> •
</p>

---

![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-16+-339933?style=flat-square&logo=node.js)
![Express](https://img.shields.io/badge/Express-4.x-000000?style=flat-square&logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-7.x-47A248?style=flat-square&logo=mongodb)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.x-38BDF8?style=flat-square&logo=tailwindcss)
![Axios](https://img.shields.io/badge/Axios-HTTP%20Client-5A29E4?style=flat-square)

</div>

---

## 📌 Table of Contents

- [Overview](#-overview)
- [Problem Statement](#-problem-statement)
- [Demo](#-demo)
- [Features](#-features)
- [Rule Builder — Core Feature](#-rule-builder--core-feature)
- [Tech Stack](#-tech-stack)
- [System Architecture](#-system-architecture)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [API Reference](#-api-reference)
- [Policy Schema](#-policy-schema)
- [Seed Data](#-seed-data)
- [Screenshots](#-screenshots)
- [Team](#-team)
- [Acknowledgements](#-acknowledgements)
- [License](#-license)

---

## 🌐 Overview

The **Policy Definition and Management System** is an industry-level full-stack web application 

The system enables organizational administrators to **create, manage, and monitor governance policies** through a clean visual interface, without writing a single line of code.

Each policy is stored as a structured JSON document and follows the pattern:

```
IF [conditions] → THEN [action]
```

Policies can govern:
- **Data Access** — who can access what
- **Data Quality** — enforce completeness rules
- **Compliance** — enforce regulations like GDPR

---

## ❗ Problem Statement

| Problem | Impact |
|---------|--------|
| Manual policy management | Slow, error-prone, and hard to audit |
| No visual interface | Non-technical admins depend on developers |
| Complex existing tools | XACML, Drools require specialist knowledge |
| No centralized monitoring | No single view of active vs inactive policies |



---

## 🎥 Demo

> **Run locally** using the setup instructions below.

| Route | Description |
|-------|-------------|
| `http://localhost:5173/dashboard` | Stats overview |
| `http://localhost:5173/policies` | Full policy list |
| `http://localhost:5173/policies/create` | Create new policy |
| `http://localhost:5173/policies/:id` | Policy detail view |
| `http://localhost:5173/policies/:id/edit` | Edit policy |

---

## ✨ Features

### ✅ Implemented

| Feature | Description |
|---------|-------------|
| 🔨 **Create Policy** | Form with Rule Builder, frontend + backend validation, POST API |
| ✏️ **Edit Policy** | Pre-filled form, live JSON preview, PUT API, version auto-increment |
| 🗑️ **Delete Policy** | Confirmation modal before deletion, safe removal |
| 🔄 **Toggle Status** | Switch `active ↔ inactive` with a single PATCH call |
| 📊 **Dashboard** | Live stat cards: Total, Active, Inactive counts |
| 🔍 **Filter & Search** | Filter by type and status, debounced search, server-side pagination (10/page) |
| 📋 **Policy Detail** | Full view with rule visualization and raw JSON display |
| 🧱 **Rule Builder** | Dynamic condition creator — field, operator, value with AND/OR logic |
| 🔔 **Toast Notifications** | Success and error toasts on all operations |
| ⚠️ **Validation** | Frontend form validation + backend `express-validator` middleware |

---

## 🧱 Rule Builder — Core Feature

The **Rule Builder** is the heart of this system. It transforms a form interaction into a machine-readable JSON policy rule.

### How It Works

```
Step 1 → Select a FIELD     (e.g. user_role, dataset_type)
Step 2 → Pick an OPERATOR   (= | != | > | < | >= | <= | contains)
Step 3 → Enter a VALUE      (e.g. "admin", "sensitive")
Step 4 → Choose LOGIC       (AND → all must match | OR → any must match)
Step 5 → Assign ACTION      (allow | deny | alert)
```

### Generated JSON (Live Preview in UI)

```json
{
  "logic": "AND",
  "conditions": [
    {
      "field": "user_role",
      "operator": "!=",
      "value": "admin"
    },
    {
      "field": "dataset_type",
      "operator": "=",
      "value": "sensitive"
    }
  ],
  "action": "deny"
}
```

This JSON is validated by the backend and stored directly in MongoDB.

---

## 🛠️ Tech Stack

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| **React.js** | 18.x | UI framework — functional components + hooks |
| **React Router v6** | 6.x | Client-side navigation |
| **Tailwind CSS** | 3.x | Utility-first styling |
| **Axios** | latest | HTTP client with response interceptor |
| **Context API** | built-in | Global state management |
| **lucide-react** | latest | UI icons |

### Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| **Node.js** | ≥16.x | Server runtime |
| **Express.js** | 4.x | REST API framework |
| **Mongoose** | 7.x | MongoDB ODM |
| **express-validator** | latest | Input validation middleware |
| **morgan** | latest | HTTP request logger |
| **helmet** | latest | Security headers |
| **cors** | latest | Cross-origin resource sharing |
| **dotenv** | latest | Environment variable management |
| **nodemon** | latest | Hot reload in development |

### Database
| Technology | Purpose |
|------------|---------|
| **MongoDB** | Document store — supports nested JSON rule objects natively |

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        FRONTEND                             │
│   React · Tailwind CSS · Axios · Context API                │
│   ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐  │
│   │Dashboard │  │PolicyList│  │CreateForm│  │RuleBuilder│  │
│   └──────────┘  └──────────┘  └──────────┘  └──────────┘  │
└──────────────────────────┬──────────────────────────────────┘
                           │ HTTP (Axios)
                           ↓
┌─────────────────────────────────────────────────────────────┐
│                      BACKEND API                            │
│   Node.js · Express · REST                                  │
│                                                             │
│   Routes → Validator → Controller → Service → Model        │
│                                                             │
│   GET  /api/policies          (list + filter + paginate)   │
│   GET  /api/policies/:id      (single policy)              │
│   POST /api/policies          (create)                     │
│   PUT  /api/policies/:id      (update)                     │
│   DEL  /api/policies/:id      (delete)                     │
│   PATCH /api/policies/:id/toggle (toggle status)           │
└──────────────────────────┬──────────────────────────────────┘
                           │ Mongoose
                           ↓
┌─────────────────────────────────────────────────────────────┐
│                       DATABASE                              │
│   MongoDB · Mongoose ODM                                    │
│   Policy { name, description, type, rule, action, status } │
│   Rule   { logic: AND|OR, conditions: [{field,op,value}] } │
└─────────────────────────────────────────────────────────────┘
```

### Data Flow

```
User fills form
    → React validates locally
        → Axios sends POST request
            → express-validator checks payload
                → Controller delegates to Service
                    → Service calls Mongoose
                        → MongoDB stores document
                            → 201 response returns
                                → Toast notification shown
                                    → Redirect to policy list
```

---

## 📁 Project Structure

```
policy-management/
│
├── frontend/
│   └── src/
│       ├── components/
│       │   ├── layout/
│       │   │   ├── Sidebar.jsx          # Navigation sidebar
│       │   │   ├── Topbar.jsx           # Top header bar
│       │   │   └── PageWrapper.jsx      # Page fade-in wrapper
│       │   ├── ui/
│       │   │   ├── Button.jsx           # Reusable button (5 variants)
│       │   │   ├── Input.jsx            # Form input with error
│       │   │   ├── Select.jsx           # Dropdown selector
│       │   │   ├── Textarea.jsx         # Multi-line input
│       │   │   ├── Modal.jsx            # Blur-backdrop modal
│       │   │   ├── Toast.jsx            # Auto-dismiss notification
│       │   │   ├── Loader.jsx           # Skeleton / spinner
│       │   │   └── EmptyState.jsx       # Empty state component
│       │   ├── policy/
│       │   │   ├── PolicyCard.jsx       # Dashboard stat card
│       │   │   ├── PolicyTable.jsx      # Paginated policy table
│       │   │   ├── PolicyStatusBadge.jsx
│       │   │   └── PolicyTypeBadge.jsx
│       │   └── rulebuilder/
│       │       ├── RuleBuilder.jsx      # Main rule builder
│       │       ├── ConditionRow.jsx     # Single condition row
│       │       └── LogicSelector.jsx    # AND / OR toggle
│       │
│       ├── pages/
│       │   ├── Dashboard.jsx            # Stats + recent policies
│       │   ├── PolicyList.jsx           # Table with filter/search
│       │   ├── CreatePolicy.jsx         # Create form page
│       │   ├── EditPolicy.jsx           # Edit form page
│       │   └── PolicyDetail.jsx         # Detail + JSON view
│       │
│       ├── forms/
│       │   └── PolicyForm.jsx           # Shared create/edit form
│       │
│       ├── context/
│       │   ├── PolicyContext.jsx        # Global policy state
│       │   └── ToastContext.jsx         # Toast state
│       │
│       ├── services/
│       │   ├── api.js                   # Axios instance + interceptor
│       │   └── policyService.js        # API call functions
│       │
│       ├── hooks/
│       │   ├── usePolicies.js
│       │   ├── usePolicy.js
│       │   └── useToast.js
│       │
│       ├── utils/
│       │   ├── constants.js            # Enums: types, operators, actions
│       │   └── validators.js           # Frontend validation logic
│       │
│       └── routes/
│           └── AppRoutes.jsx           # React Router configuration
│
└── backend/
    ├── config/
    │   ├── db.js                       # MongoDB connection
    │   └── env.js                      # Fail-fast env validation
    │
    ├── models/
    │   └── Policy.js                   # Mongoose schema (nested rule)
    │
    ├── controllers/
    │   └── policyController.js         # HTTP handlers (thin layer)
    │
    ├── services/
    │   └── policyService.js            # Business logic + DB operations
    │
    ├── routes/
    │   ├── policyRoutes.js             # Express router
    │   └── policyValidators.js        # express-validator rule sets
    │
    ├── middlewares/
    │   ├── validate.js                 # Validation error normalizer
    │   ├── errorHandler.js             # Global error handler
    │   └── notFound.js                 # 404 catch-all
    │
    ├── utils/
    │   └── responseHelper.js          # success() / error() envelope
    │
    ├── seed.js                         # Database seed script
    ├── server.js                       # Express app entry point
    └── .env                            # Environment variables
```

---

## 🚀 Getting Started

### Prerequisites

| Requirement | Version |
|-------------|---------|
| Node.js | ≥ 16.0.0 |
| MongoDB | Running locally or Atlas URI |
| npm | ≥ 7.x |

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/policy-management-system.git
cd policy-management-system
```

### 2. Setup Backend

```bash
cd backend
npm install
```

Create a `.env` file (see [Environment Variables](#-environment-variables)):

```bash
cp .env.example .env
# Edit .env with your MongoDB URI
```

Start the backend:

```bash
npm run dev          # development (nodemon)
# or
npm start            # production
```

✅ Backend running at: `http://localhost:5000`

### 3. Seed the Database (Optional but Recommended)

```bash
npm run seed
```

This inserts **8 realistic sample policies** covering all types and statuses.

### 4. Setup Frontend

Open a new terminal:

```bash
cd frontend
npm install
npm run dev
```

✅ Frontend running at: `http://localhost:5173`

### 5. Verify Everything Works

```bash
# Test API health check
curl http://localhost:5000/health
# Expected: {"success":true,"message":"Rubiscape API is running"}

# Test policies endpoint
curl http://localhost:5000/api/policies
# Expected: {"success":true,"data":{"policies":[...],"total":8,...}}
```

---

## 🔐 Environment Variables

### Backend `.env`

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/policy_management
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
```

### Frontend `.env`

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

---

## 📡 API Reference

### Base URL
```
http://localhost:5000/api
```

### Standard Response Format

```json
// Success
{
  "success": true,
  "data": { ... },
  "message": "Policy created successfully"
}

// Error
{
  "success": false,
  "error": "Validation failed",
  "details": ["name is required"]
}
```

---

### Endpoints

#### `GET /policies`
Get all policies with optional filters and pagination.

**Query Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `type` | string | Filter by type (`access_control`, `data_quality`, `compliance`) |
| `status` | string | Filter by status (`active`, `inactive`) |
| `search` | string | Search in name and description |
| `page` | number | Page number (default: `1`) |
| `limit` | number | Items per page (default: `10`) |

**Example:**
```bash
curl "http://localhost:5000/api/policies?type=access_control&status=active&page=1&limit=10"
```

**Response:**
```json
{
  "success": true,
  "data": {
    "policies": [...],
    "total": 3,
    "page": 1,
    "totalPages": 1
  }
}
```

---

#### `GET /policies/:id`
Get a single policy by MongoDB ObjectId.

```bash
curl http://localhost:5000/api/policies/64a1f2c3d4e5f6789abc1234
```

---

#### `POST /policies`
Create a new policy.

```bash
curl -X POST http://localhost:5000/api/policies \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Block Non-Admin Access",
    "description": "Deny sensitive data access for non-admin users",
    "type": "access_control",
    "rule": {
      "logic": "AND",
      "conditions": [
        { "field": "user_role", "operator": "!=", "value": "admin" },
        { "field": "dataset_type", "operator": "=", "value": "sensitive" }
      ]
    },
    "action": "deny",
    "status": "active"
  }'
```

---

#### `PUT /policies/:id`
Update an existing policy (all fields, version auto-increments).

```bash
curl -X PUT http://localhost:5000/api/policies/64a1f2c3d4e5f6789abc1234 \
  -H "Content-Type: application/json" \
  -d '{ "name": "Updated Policy Name", "action": "alert", ... }'
```

---

#### `DELETE /policies/:id`
Delete a policy permanently.

```bash
curl -X DELETE http://localhost:5000/api/policies/64a1f2c3d4e5f6789abc1234
```

---

#### `PATCH /policies/:id/toggle`
Toggle status between `active` and `inactive`.

```bash
curl -X PATCH http://localhost:5000/api/policies/64a1f2c3d4e5f6789abc1234/toggle
```

---

## 🗃️ Policy Schema

```javascript
{
  name:        String,    // required, unique, max 100 chars
  description: String,    // optional, max 500 chars
  type:        String,    // enum: 'access_control' | 'data_quality' | 'compliance'
  rule: {
    logic:      String,   // enum: 'AND' | 'OR'
    conditions: [{
      field:    String,   // required — data attribute name
      operator: String,   // enum: '=' | '!=' | '>' | '<' | '>=' | '<=' | 'contains'
      value:    String,   // required — comparison target
    }]
  },
  action:   String,       // enum: 'allow' | 'deny' | 'alert'
  status:   String,       // enum: 'active' | 'inactive' (default: 'inactive')
  version:  Number,       // auto-increments on each PUT (default: 1)
  createdAt: Date,        // auto (Mongoose timestamps)
  updatedAt: Date,        // auto (Mongoose timestamps)
}
```

---

## 🌱 Seed Data

Running `npm run seed` inserts these 8 sample policies:

| # | Name | Type | Action | Status |
|---|------|------|--------|--------|
| 1 | Block Non-Admin Access to Sensitive Data | `access_control` | deny | active |
| 2 | Allow Finance Department Read Access | `access_control` | allow | active |
| 3 | Restrict Cross-Region Data Access | `access_control` | deny | active |
| 4 | Flag Incomplete Customer Records | `data_quality` | alert | active |
| 5 | Reject Null Financial Transactions | `data_quality` | deny | active |
| 6 | Validate PII Data Format | `data_quality` | alert | inactive |
| 7 | GDPR — EU Personal Data Export Block | `compliance` | deny | active |
| 8 | HIPAA — Healthcare Data Access Audit | `compliance` | alert | inactive |

---

## 📸 Screenshots

> _Screenshots of the running application go here._

| Page | Description |
|------|-------------|
| **Dashboard** | Stat cards showing policy counts |
| **Policy List** | Table with type/status filters and search |
| **Create Policy** | Form with live Rule Builder and JSON preview |
| **Policy Detail** | Full policy view with rule breakdown |

---

## 📄 License

This project is licensed under the **MIT License**.

```
MIT License — Copyright (c) 2025 Shripad Rathod, Atharv Mandhare

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

---

<div align="center">

**Built with ❤️ for Rubiscape Industry Project**

[![GitHub Stars](https://img.shields.io/github/stars/YOUR_USERNAME/policy-management-system?style=social)](https://github.com/YOUR_USERNAME/policy-management-system)

</div>
