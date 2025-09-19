A complete, production-ready Travel Agency Dashboard built with React + TypeScript, React Router v7, Appwrite (backend as a service), Syncfusion (UI & charts), and related tooling.
Ideal for managing travel plans, bookings, analytics, reports, and admin tasks.

Table of contents

Project overview

Key features

Tech stack

Architecture & folder structure

Getting started (local development)

Environment variables (example .env)

Appwrite setup notes (database / tables / ids)

Routing & navigation (React Router v7)

Syncfusion usage (charts, grids, UI)

API usage examples (Appwrite SDK)

Authentication & security

Testing

Build & deployment

CI/CD / recommended checks

Contributing

Troubleshooting

License

Project overview

This dashboard is designed for travel agencies to:

create, view and manage travel plans / packages / bookings

manage customers and travel agents

visualize analytics: revenue, bookings, route heatmaps, user growth

export reports (CSV/PDF)

provide role-based access: Admin / Agent / Viewer

It uses Appwrite for authentication, database (tables), file storage, and serverless functions. Syncfusion is used for polished UI components and charts.

Key features

Admin panel with role-based access

CRUD for packages, itineraries, bookings, customers

Data tables with sorting, filtering, server-side pagination (Syncfusion DataGrid)

Charts for bookings & revenue (Syncfusion Charts)

Map integration for routes & locations (optional Leaflet/Mapbox)

File upload for images, documents (Appwrite Storage)

Analytics dashboards, export CSV/PDF

Notifications & activity feed

Multi-environment support (dev/stage/prod)

Tech stack

Frontend

React (v18+)

TypeScript

React Router v7

Zustand / Redux Toolkit (state management — choose one)

Syncfusion React UI (Charts, Grid, Buttons, Inputs)

Tailwind CSS or plain CSS Modules (pick one)

Axios / Fetch for external APIs

Backend / BaaS

Appwrite (Auth, Databases → Tables, Storage, Functions)

Tooling

Vite or Create React App (Vite recommended)

ESLint + Prettier

Vitest / Jest + React Testing Library

Husky + lint-staged

Optional

Mapbox / Leaflet

Recharts (if you prefer)

Docker for local dev (optional)

Architecture & folder structure

Example layout (recommended):

/src
  /api
    appwrite.ts           # Appwrite client & helpers
    bookings.ts           # api wrappers (listBookings, createBooking)
    packages.ts
  /components
    /common
      Header.tsx
      Sidebar.tsx
      ProtectedRoute.tsx
      ConfirmModal.tsx
    /ui
      Button.tsx
      Input.tsx
  /features
    /auth
      Login.tsx
      Register.tsx
      useAuth.ts
    /dashboard
      DashboardHome.tsx
      AnalyticsPanel.tsx
    /bookings
      BookingsList.tsx
      BookingForm.tsx
  /hooks
    useFetch.ts
    useDebounce.ts
  /layouts
    AdminLayout.tsx
    AuthLayout.tsx
  /pages
    NotFound.tsx
    Settings.tsx
  /routes
    AppRoutes.tsx
  /utils
    date.ts
    format.ts
    constants.ts
  /styles
    tailwind.css
  main.tsx
  index.css


Design guidelines:

Keep API wrappers separate (/api) from components.

Feature-based folders for large features.

routes/AppRoutes.tsx contains Router v7 configuration.

Getting started (local development)

Prerequisites:

Node 18+ / npm 9+ or yarn

Appwrite running (self-hosted or cloud) — project created

Syncfusion license: for evaluation you can use the community packages; follow Syncfusion instructions for license key setup if needed.

Install dependencies:

# using pnpm/yarn/npm
pnpm install
# or
npm install
# or
yarn


Start dev server (Vite example):

pnpm dev
# or
npm run dev
# or
yarn dev


Lint & format:

pnpm lint
pnpm format


Run tests:

pnpm test

Environment variables (example .env)

Create a .env in project root (do NOT check into git). Example .env.local:

# Appwrite
VITE_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1   # or your Appwrite server endpoint
VITE_APPWRITE_PROJECT=your_project_id                  # Appwrite project ID
VITE_APPWRITE_DATABASE=your_database_id                # Appwrite database id
VITE_APPWRITE_TABLE_USERS=users                        # table id you created for users (could be 'users' or generated id)
VITE_APPWRITE_TABLE_BOOKINGS=bookings
VITE_APPWRITE_TABLE_PACKAGES=packages

# Storage buckets / IDs (optional)
VITE_APPWRITE_BUCKET_IMAGES=images_bucket_id

# Syncfusion license key (if required)
VITE_SYNCFUSION_LICENSE_KEY=your_key_here

# Other
VITE_MAPBOX_API_KEY=xxx


Note: Vite requires VITE_ prefix to expose variables to the client. If you use CRA, use REACT_APP_ prefix instead.

Appwrite setup notes (database / tables / ids)

Important Appwrite notes (addresses your earlier confusion with collections/tables):

Appwrite renamed Collections → Tables in newer versions. Table is the conceptual equivalent of Collection.

Each table has:

A table id (you can set it manually like users or let Appwrite auto-generate one)

Fields (columns) that you define (string, integer, boolean, email, dateTime, etc.)

In SDK calls you must pass the databaseId and tableId. Example:

const { databases } = client;
databases.listDocuments(databaseId, tableId, [...]);


If you set the table id to users when creating the table, the ID you use in your .env and in SDK calls is "users". If you left it blank and Appwrite generated a long id (63d2...), use that generated id.

Example environment mapping:

VITE_APPWRITE_DATABASE=64a1234567890
VITE_APPWRITE_TABLE_USERS=users   # if you named it users


Common tables for this project:

users — customers, agents, admins (roles as attribute)

packages — travel packages

itineraries — per-package day-wise plans

bookings — booking records

transactions — payments & refunds

analytics — aggregated metrics (optional)

Routing & navigation (React Router v7)

Use nested routes for layout separation. Example AppRoutes.tsx skeleton:

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AdminLayout from "@/layouts/AdminLayout";
import AuthLayout from "@/layouts/AuthLayout";
import Login from "@/features/auth/Login";
import DashboardHome from "@/features/dashboard/DashboardHome";
import BookingsList from "@/features/bookings/BookingsList";
import NotFound from "@/pages/NotFound";

const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
    ],
  },
  {
    path: "/app",
    element: <AdminLayout />,
    children: [
      { path: "/", element: <DashboardHome /> },
      { path: "bookings", element: <BookingsList /> },
      { path: "packages", element: <PackagesList /> },
      { path: "settings", element: <Settings /> },
    ],
  },
  { path: "*", element: <NotFound /> },
]);

export default function AppRoutes() {
  return <RouterProvider router={router} />;
}


Use ProtectedRoute wrapper on admin routes to check Appwrite session and role.

Syncfusion usage (charts, grids, UI)

Syncfusion components to include:

GridComponent for lists (bookings, packages) — supports virtualization, filtering, grouping.

ChartComponent (Column, Line, Pie) — bookings by date, revenue by package.

Scheduler or Calendar (if you need calendar views).

Popup & Dialogs for confirm / forms.

Basic Syncfusion example:

import { ChartComponent, SeriesCollectionDirective, SeriesDirective, ColumnSeries } from "@syncfusion/ej2-react-charts";

<ChartComponent title="Monthly Bookings">
  <SeriesCollectionDirective>
    <SeriesDirective dataSource={data} xName="month" yName="bookings" type="Column" />
  </SeriesCollectionDirective>
</ChartComponent>


Follow Syncfusion docs to register licensing if needed:

import { registerLicense } from "@syncfusion/ej2-base";
registerLicense(process.env.VITE_SYNCFUSION_LICENSE_KEY || "");

API usage examples (Appwrite SDK)

Initialize Appwrite client (example src/api/appwrite.ts):

import { Client, Databases, Account, Storage } from "appwrite";

const client = new Client()
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT!)
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT!);

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export default client;


List documents (TypeScript example):

import { databases } from "./appwrite";

export const listBookings = async (query = []) => {
  const dbId = import.meta.env.VITE_APPWRITE_DATABASE!;
  const bookingsTable = import.meta.env.VITE_APPWRITE_TABLE_BOOKINGS!;
  const res = await databases.listDocuments(dbId, bookingsTable, query);
  return res; // contains documents
}


Create document (booking):

await databases.createDocument(dbId, bookingsTable, 'unique()', {
  packageId,
  userId,
  startDate,
  endDate,
  status
});


Note: Appwrite requires a unique document ID — use 'unique()' for auto-generation.

File upload (Appwrite Storage):

const bucketId = import.meta.env.VITE_APPWRITE_BUCKET_IMAGES!;
const uploaded = await storage.createFile(bucketId, 'unique()', file);

Authentication & security

Use Appwrite Account for sign-in, sessions, and user management.

Use Appwrite JWT or session tokens to protect API calls if you have serverless functions.

Role-based checks:

Store role on user document (admin, agent, viewer) or use Appwrite teams.

Protect client-side routes with a ProtectedRoute component and re-check on each route load.

Sensitive keys (service keys) must NEVER be exposed client-side. Use Appwrite Functions for sensitive server operations.

Testing

Unit tests: Vitest / Jest + React Testing Library

Component tests for critical components (Header, BookingsList)

Integration tests for API wrappers (mock Appwrite client)

End-to-end: Playwright or Cypress — simulate flows: login → create booking → view analytics

Example test command:

pnpm test
pnpm test:watch
pnpm test:coverage

Build & deployment

Production build (Vite):

pnpm build


Deployment targets:

Vercel / Netlify / Cloudflare Pages — static site hosting for frontend

Appwrite should be running on a reachable endpoint (self-hosted or Appwrite Cloud)

Environment variables:

Configure VITE_* envs in your host (Vercel/Netlify dashboard).

Syncfusion license on production (if required).

If using serverless functions (Appwrite Functions):

Upload function code in Appwrite console and secure with service key/scopes.

CI/CD / recommended checks

Pre-commit hooks: lint, format

GitHub Actions / GitLab CI:

lint step

test step

build step

deploy step (only on main branch)

Secret scanning for exposed keys

Contributing

Fork repo

Create feature branch: git checkout -b feat/awesome-feature

Commit with clear message and create PR

Follow code style (ESLint + Prettier)

Add tests for new features

Reviewer will run CI; after passing, we merge.

Troubleshooting / FAQ

Q: What do I put as table id in .env?
A: If you set the table id manually when creating the table (for example users), use that value in .env. If Appwrite auto-generated an id (like 64a2...), use that generated id. Use VITE_APPWRITE_TABLE_USERS=users or the generated ID.

Q: Appwrite SDK error not found or permission denied
A: Check:

Database/table IDs are correct

Your API call includes the correct project ID and endpoint

Permissions/Rules on the table allow the current action (read/create) for your user or role

Q: Syncfusion components not rendering
A: Remember to register the license (if required) and import component CSS / themes. Also ensure correct component props (dataSource, height, width).

Example .env.example (ready to copy)
# Appwrite
VITE_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
VITE_APPWRITE_PROJECT=abcdef1234567890
VITE_APPWRITE_DATABASE=64a1234567890
VITE_APPWRITE_TABLE_USERS=users
VITE_APPWRITE_TABLE_BOOKINGS=bookings
VITE_APPWRITE_TABLE_PACKAGES=packages
VITE_APPWRITE_BUCKET_IMAGES=images_bucket_id

# Syncfusion
VITE_SYNCFUSION_LICENSE_KEY=

# Map (optional)
VITE_MAPBOX_API_KEY=

# Feature flags
VITE_ENABLE_ANALYTICS=true

Useful dev tips & best practices

Use unique() for Appwrite document IDs to avoid collisions. For references, store the ID strings.

Keep small API wrappers so the rest of the app uses simple typed functions (e.g., createBooking(data), getBookings(query)).

Use TypeScript types for Appwrite documents:

type UserDoc = {
  $id?: string;
  name: string;
  email: string;
  role: 'admin'|'agent'|'viewer';
}


Implement server-side aggregation using Appwrite Functions for large analytics jobs (generate cached reports).

Use Syncfusion DataGrid virtualization for large lists.

Example code snippets

Create Booking (API wrapper):

// src/api/bookings.ts
import client, { databases } from './appwrite';

const DB = import.meta.env.VITE_APPWRITE_DATABASE!;
const BOOKINGS = import.meta.env.VITE_APPWRITE_TABLE_BOOKINGS!;

export const createBooking = async (payload: any) => {
  return await databases.createDocument(DB, BOOKINGS, 'unique()', payload);
}

export const fetchBookings = async (limit = 20, offset = 0) => {
  const queries = [
    // Appwrite queries, e.g., limit, offset, order
  ];
  return await databases.listDocuments(DB, BOOKINGS, queries);
}


Protected route example:

// src/components/common/ProtectedRoute.tsx
import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "@/features/auth/useAuth";

const ProtectedRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;
  return children;
};

export default ProtectedRoute;
