# LobbyLog API

## Description

LobbyLog is a package delivery management system designed for residential complexes. It allows residents to know when their packages have arrived, and serves as an official record for receptionists who receive and hand over deliveries — providing accountability and traceability for every package.

## Tech Stack

- Node.js + Express + TypeScript
- Prisma ORM + SQLite
- JWT Authentication
- Jest + Supertest for testing

## Requirements

- Node.js v18+
- pnpm

## Local Setup

1. Clone the repository

```bash
git clone https://github.com/jhonatanrp05/lobbylog-api.git
cd lobbylog-api
```

2. Install dependencies

```bash
pnpm install
```

3. Create a `.env` file in the root with:

```
DATABASE_URL="file:./dev.db"
JWT_SECRET="your_secret_key"
```

4. Run migrations

```bash
pnpm prisma migrate dev
```

5. Seed the admin user

```bash
pnpm seed
```

## Running the app

```bash
pnpm ts-node src/server.ts
```

## Running the tests

```bash
pnpm test
```

## Demo credentials

Run `pnpm seed` to populate the database with the following test accounts and sample packages.

| Name           | Email              | Password | Role         | Unit |
| -------------- | ------------------ | -------- | ------------ | ---- |
| Admin User     | admin@lobbylog.com | admin123 | ADMIN        | -    |
| Carlos Portero | recep@lobbylog.com | recep123 | RECEPTIONIST | -    |
| María García   | maria@lobbylog.com | res1pass | RESIDENT     | 101  |
| Juan Pérez     | juan@lobbylog.com  | res2pass | RESIDENT     | 202  |

Sample packages are created for both residents in different statuses (PENDING, DELIVERED, CONFIRMED).

## Roles

- **ADMIN** — Has full visibility over all records and users. Can create and delete receptionist and resident accounts, and can delete package records that were registered by mistake.

- **RECEPTIONIST** — The security personnel at the building entrance. When a package arrives, they create a new package record and assign it to the corresponding resident. Once the resident picks it up, they mark it as delivered.

- **RESIDENT** — The person who owns the package. Can only see their own packages and confirm reception once the receptionist has marked the package as delivered.

## API Endpoints

| Method | Route                 | Auth | Required Role | Description                |
| ------ | --------------------- | ---- | ------------- | -------------------------- |
| GET    | /health               | No   | -             | Health check               |
| POST   | /auth/login           | No   | -             | Login                      |
| GET    | /users                | Yes  | ADMIN         | List all users             |
| POST   | /users                | Yes  | ADMIN         | Create user                |
| DELETE | /users/:id            | Yes  | ADMIN         | Delete user                |
| GET    | /packages             | Yes  | ADMIN         | View all packages          |
| POST   | /packages             | Yes  | RECEPTIONIST  | Register a new package     |
| PATCH  | /packages/:id/deliver | Yes  | RECEPTIONIST  | Mark package as delivered  |
| GET    | /packages/my-logged   | Yes  | RECEPTIONIST  | View packages I registered |
| GET    | /packages/my          | Yes  | RESIDENT      | View my packages           |
| PATCH  | /packages/:id/confirm | Yes  | RESIDENT      | Confirm package reception  |
| DELETE | /packages/:id         | Yes  | ADMIN         | Delete a package record    |
