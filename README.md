📄 Document Management API
A concise, production-ready RESTful API for structured document management, built using Node.js, TypeScript, and MongoDB. The project demonstrates a strict layered architecture with decoupled business logic and custom infrastructure tools.

🛠️ Tech Stack
Backend: Node.js, TypeScript, Express 5

Database: MongoDB (Official Driver)

Libraries: PDFKit (On-the-fly generation), UUID

✨ Key Features
3-Layer Architecture — Clean separation of concerns into API (routes/HTTP), Service (business logic), and DAL (database interactions) for high testability.

Automated Audit Log — Custom middleware (historyMiddleware) that transparently captures all mutations (CREATE, UPDATE, DELETE) with metadata.

Centralized Error Handling — Global error-catching middleware for unified, production-safe JSON diagnostics.

Dynamic PDF Export — On-the-fly secure PDF document rendering on demand.

Advanced Queries — Server-side filtering and offset pagination built directly into history logs.

🚀 Quick Start
Prerequisites
Node.js (v18+) & MongoDB

Installation & Run
Bash

# 1. Clone & Install
git clone https://github.com/efrat46101/document-management-api.git
cd document-management-api
npm install

# 2. Run Server
npx ts-node main.ts
The server will be live at http://localhost:5000

📬 Postman
A ready-to-use API testing collection is available in the root folder: final_project.postman_collection.json.

Licensed under the ISC License.