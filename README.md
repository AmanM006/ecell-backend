# E-Cell Backend

A clean and production-ready server built with Express.js and TypeScript, for backend operations of Entrepreneurship
Cell, MIT Manipal.

---

### **Response Structure** (Strictly Followed)

The response format is strictly enforced and will always follow the structure outlined below:

* **`success`**: A boolean flag indicating the success or failure of the operation.
* **`message`**: A string providing additional context or details about the operation, such as status messages or error
  descriptions.
* **`payload`**: A field that may contain a defined TypeScript schema, representing the data returned from the
  operation. If there is no data, this will be `null`.
* **`error`**: This field will be included only if `success` is `false`

---

## Table of Contents

1. [Project Organisation](#project-organisation)
2. [First-Time Setup](#first-time-setup)
3. [Running Locally](#running-locally)
4. [Running Tests](#running-tests)
5. [How to Contribute](#how-to-contribute)

## Project Organisation

Here’s how the codebase is organised:

| Directory       | Purpose                                       |
|-----------------|-----------------------------------------------|
| `src/`          | Main application code                         |
| `src/api/`      | Feature modules (e.g., `healthCheck`, `user`) |
| `src/common/`   | Shared utilities, middleware, models          |
| `index.ts`      | Entry point for development mode              |
| `server.ts`     | Bootstrapping of Express app                  |
| `.env.template` | Sample environment configuration              |

Key files to note:

* `src/api/<route, for eg.: user>`
    * `/userRouter`: handle only routes
    * `/userController`: handle only request and response functionality
    * `/userService`: handle business logic
    * `/userModel` or `/userRepository`: contain database (e.g. MongoDb through Mongoose or SQL) models, preferably with
      TypeScript Schemas and request zod schemas
* `src/common/middleware/requestLogger.ts`: logging setup.
* `src/common/utils/envConfig.ts`: environment schema with Zod.

---

## First-Time Setup

### Dependencies

* Node.js (preferably LTS version)
* pnpm (or NPM/Yarn, but `pnpm` is used by default)

### Setup Steps

```bash
# Clone repository
git clone https://github.com/E-Cell-MIT-MPL/e-cell-backend.git
cd e-cell-backend

# Install dependencies
npm install
# or
pnpm install

# Copy the environment template
cp .env.template .env
# Then edit `.env` to fill in any required variables (see `.env.template`)
```

---

## Running Locally

For development:

```bash
pnpm dev
```

This runs in watch mode, recompiling on changes.

For build & production simulation:

```bash
pnpm build
# Remember to set NODE_ENV to "production"
pnpm start
```

The server listens (by default) on the port specified in your `.env` (e.g., `PORT=8080`). Health Check endpoint is
available at `/health-check`.

---

## Running Tests

(Not implemented yet)

---

## How to Contribute

1. Fork this repository.
2. Create a new branch: `git checkout -b feature/your-feature`.
3. Make your changes, ensure tests pass, if implemented.
4. Follow the existing code style (passing lints `npm run lint` or `pnpm lint`; formatted code `npm run format` or
   `pnpm format`)
5. Commit with clear message and push your branch.
6. Open a pull request describing your change and why it’s beneficial.
7. The head will review and merge once CI (if configured) is passing.

Keep changes minimal and focused, and document any major additions.

---

Kudos to you for being a backend contributor for E-Cell. Thanks and hope to see your code powering our technical
infrastructure.