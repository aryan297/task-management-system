# Task Management Application

A full-stack task management application built with NestJS and React.

## Prerequisites

- Node.js v22.16.0 or above
- PostgreSQL (latest)
- npm or yarn

## Setup Instructions

### 1. Database Setup
Ensure PostgreSQL is running on `localhost:5432` with user `postgres` and password `postgres`.
The application expects a database named `task_management`.

```bash
# Create database (Linux/Mac/WSL)
createdb -U postgres task_management
```

### 2. Backend Setup

```bash
cd backend
npm install
# Create .env file (already provided)
npm run start:dev
```
The backend runs on `http://localhost:3000`.
Swagger Documentation: `http://localhost:3000/api/docs`

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```
The frontend runs on `http://localhost:5173`.

## Architecture

- **Backend**: NestJS with Vertical Slice Architecture.
  - Features located in `src/modules/tasks/apps/features/v1/`.
  - TypeORM for database interactions.
  - Validation via Zod (frontend) and Class-Validator (backend).
- **Frontend**: React, Vite, TanStack Router, Zustand.
  - Shadcn UI for components.
  - Tailwind CSS for styling.

## Testing

Backend unit tests:
```bash
cd backend
npm install -D tsx sinon # (One-time setup if not installed)
npx tsx tests/unit/services/createTask.service.test.ts
```

## Features
- Create, Read, Update, Delete Tasks.
- Search and Filter Tasks.
- Priority and Status management.
