# 📌 Chat App - Frontend

This is the Next.js frontend for the real-time chat application. It is structured for scalability and maintainability.

## 🚀 Getting Started

### 1️⃣ Prerequisites

Ensure you have the following installed:

- Node.js (LTS recommended)
- npm or yarn

### 2️⃣ Install Dependencies

Run the following command:

```bash
npm install
```

or

```bash
yarn install
```

### 3️⃣ Start the Development Server

```bash
npm run dev
```

The frontend will be available at <http://localhost:3000>.

4️⃣ Build for Production

```bash
npm run build
npm run start
```

---

## 📂 Folder Structure

```git
client/
│── .next/                # Next.js build folder (auto-generated)
│── node_modules/         # Installed dependencies
│── public/               # Static assets (logos, icons, images)
│── src/
│   ├── app/              # Application routes (Next.js App Router)
│   │   ├── auth/         # Authentication pages
│   │   │   ├── page.tsx  # Login/Register UI
│   │   ├── chat/         # Chat pages
│   │   │   ├── page.tsx  # Main chat interface
│   │   ├── settings/     # User settings pages
│   │   │   ├── page.tsx  # Settings UI
│   ├── components/       # Reusable UI components
│   ├── hooks/            # Custom React hooks (e.g., API calls, WebSocket)
│   ├── types/            # TypeScript type definitions
│── .env.local            # Environment variables
│── .gitignore            # Ignored files for Git
│── next.config.ts        # Next.js configuration
│── package.json          # Project dependencies & scripts
│── README.md             # Project documentation
│── tsconfig.json         # TypeScript configuration
```

---

## 📜 Folder Guidelines

1️⃣ src/app/ (Application Pages)

- Uses the App Router of Next.js.
- Every subfolder inside app/ is a route (e.g., app/chat/page.tsx → /chat).
- page.tsx files define pages.

2️⃣ src/components/ (Reusable Components)

- Contains small, reusable UI components (e.g., Button.tsx, ChatBox.tsx).
- Components should be named using PascalCase (e.g., Message.tsx).

3️⃣ src/hooks/ (Custom Hooks)

- Custom React hooks for reusing logic (e.g., API fetching, WebSocket connections).
- Naming convention: use[Feature].ts (e.g., useSocket.ts).

4️⃣ src/types/ (TypeScript Types)

- Contains TypeScript interfaces and types.
- Helps maintain strong typing across the app.

5️⃣ public/ (Static Files)

- Stores assets like images, icons, and fonts.
- Files can be directly accessed via /favicon.ico.

---

## 🔧 Naming Conventions

✅ Files & Folders:

- Use camelCase for files inside hooks/, utils/, types/.
- Use PascalCase for React components (ChatBox.tsx).
- Use lowercase-dash for CSS files (globals.css).

✅ Variables & Functions:

- Use camelCase for variables and functions (fetchMessages).
- Use UPPER_CASE for environment variables (NEXT_PUBLIC_API_URL).
