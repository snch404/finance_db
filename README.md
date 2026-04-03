# Finance Dashboard

A clean, responsive, and interactive finance tracking dashboard built to evaluate frontend development skills.

## File Structure

```text
finance_dashboard/
├── app/
│   ├── dashboard/
│   │   └── page.tsx
│   ├── insights/
│   │   └── page.tsx
│   ├── transactions/
│   │   └── page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ui/
│   ├── add-transaction-modal.tsx
│   ├── dashboard-layout.tsx
│   ├── header.tsx
│   ├── sidebar.tsx
│   ├── summary-card.tsx
│   └── theme-provider.tsx
├── context/
│   └── finance-context.tsx
└── public/
```

## Features

- **Dashboard Overview:** Summary cards showing Total Balance, Income, and Expenses, alongside time-based and categorical visualizations.
- **Transactions Management:** View a comprehensive list of transactions with their descriptions, categories, types (income/expense), and amounts. Includes search and filtering capabilities.
- **Role-Based UI Simulation:** Easily toggle between `Viewer` (read-only data access) and `Admin` (ability to add, edit, or delete transactions).
- **Insights Engine:** Analyzes spending to display the highest spending categories, monthly income vs. expense trends, average monthly expenses, and percentage savings rate.
- **State Management:** Powered by React Context, which handles transactions, current active role, and authentication states without relying on external libraries.
- **Data Persistence:** Integrates with your browser's `localStorage` so that your transaction data and edits persist safely across page reloads.
- **Modern UI/UX:** Features a sleek dark theme implementation styled with Tailwind CSS, responsive layouts, intuitive modals, and fluid empty states.

## Tech Stack

- **Framework:** Next.js (App Router)
- **UI Library:** React
- **Styling:** Tailwind CSS with `oklch` theme variables.
- **Charts:** Recharts
- **Icons:** Lucide React
- **Components:** Radix UI primitives / shadcn-like components

## Setup Instructions

1.  **Clone the repository** (if applicable) and open the project directory.
2.  **Install the dependencies:**
    ```bash
    npm install
    ```
3.  **Run the development server:**
    ```bash
    npm run dev
    ```
4.  **View the application:** Open [http://localhost:3000](http://localhost:3000) in your web browser.

## Overview of Approach

This project focuses heavily on creating a modular, readable, and highly intuitive frontend experience while avoiding unnecessary complexity.

- **State Management:** I opted for the native React `Context API` (`finance-context.tsx`). Given the scope of managing an array of transactions and simplistic role toggling, introducing Redux or Zustand would be overkill. Context provides a perfectly balanced global state that makes it simple to feed data to sibling dashboard components.
- **Data Visualization:** `Recharts` was ultimately chosen for its straightforward React component API and the ease with which it can be styled using Tailwind's CSS custom properties.
- **Component Modularity:** I decomposed the UI into functional blocks. Components like `SummaryCard`, `AddTransactionModal`, and chart sections behave autonomously across the Dashboard and Insights pages. Forms are cleanly decoupled, ensuring the codebase gracefully scales.
- **Local Storage Sync:** I utilized a combination of `useEffect` hooks in the context provider. It acts almost like a headless client-side database, hydrating the application state upon initial load and syncing silently whenever changes (add/edit/delete) mutate the transaction array.
