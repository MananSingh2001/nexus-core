# Secure-Nexus: Distributed IAM & Event Streaming Architecture

A dual-service ecosystem demonstrating a modern **Microservices Architecture**. This repository integrates an **Enterprise Identity Layer** with a **High-Concurrency Event Streaming Backend**, utilizing **Next.js 15**, **Node.js**, **Keycloak**, and **Redis**.

---

## 🏗️ System Architecture

The system is split into two independent services that communicate via asynchronous event patterns:

1.  **Project 1: Secure-IAM (Frontend)**
    * **Role:** Identity & Access Management (IAM) Dashboard.
    * **Stack:** Next.js 15 (App Router), Auth.js v5, Tailwind CSS.
    * **Key Feature:** OIDC Federated Logout and RBAC session handling.

2.  **Project 2: Nexus-Core (Backend)**
    * **Role:** High-speed audit logging and event processing.
    * **Stack:** Node.js, Express, TypeScript, Redis (Message Broker).
    * **Key Feature:** Producer-Consumer pattern for non-blocking I/O.

---

## 🛠️ Infrastructure (Docker)

The infrastructure is containerized to ensure environment parity across development and production.

- **Keycloak:** Handles OIDC authentication and user realm management.
- **Redis:** Acts as the high-speed message broker for the backend event queue.

### Spin up Infrastructure:
```bash
docker-compose up -d

```

---

## 🚀 SDE-2 Technical Implementation Details

### 1. Federated Logout & SSO Sync

Implemented **OpenID Connect RP-Initiated Logout**. When a user logs out of the dashboard, a Server Action captures the `id_token_hint` and informs Keycloak to terminate the global SSO session, preventing "ghost logins".

### 2. Event-Driven Audit Logging

To maintain high performance, the Dashboard (Project 1) offloads logging tasks to the Core API (Project 2). The API acts as a **Producer**, pushing logs into a **Redis Queue**, while a background **Worker** acts as a **Consumer** to process data asynchronously.

### 3. Type-Safe Schema Enforcement

Utilized **Zod** for runtime schema validation on the backend, ensuring that all security events flowing through the microservices adhere to strict data contracts.

---

## 🚦 Getting Started

### 1. Project 1 Setup (Dashboard)

```bash
cd secure-IAM
npm install
npm run dev # Runs on http://localhost:3000

```

### 2. Project 2 Setup (Core API & Worker)

```bash
cd nexus-core
npm install
npm run dev:api    # Port 4000
npm run dev:worker # Background process

```

---

## 👨‍💻 Key Achievements

* **Containerization:** Orchestrated a multi-container environment using Docker Compose.
* **Security:** Implemented secure OIDC handshakes and RBAC callbacks.
* **Scalability:** Designed an asynchronous pipeline capable of handling high-volume audit logs without UI blocking.

```

---

### What to do next:
1.  **Screenshots:** Take a screenshot of your **Keycloak Console**, your **Next.js Dashboard**, and your **Terminal** showing the Worker processing a log. Add these to a `docs/` folder and link them in the README.
2.  **GitHub Pin:** Pin this repository to your GitHub profile so recruiters see the "Full-Stack Distributed System" immediately.

**Would you like me to help you write a LinkedIn post that summarizes these technical challenges for your network?**

```
