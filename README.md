<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# FinOps Pro — Finance Back-Office

A comprehensive finance back-office suite for managing manual refunds, chargebacks, transaction tracking, and ledger resynchronization — with intelligent insights powered by Gemini.

**Live app:** https://guilherme.stracini.com.br/finops-pro-backoffice/

## Features

- **Dashboard** — at-a-glance overview of financial operations
- **Manual Refund** — process refunds outside the standard automated flow
- **Chargebacks** — track and manage chargeback requests
- **Resubmissions** — resubmit failed or rejected transactions
- **Status Check** — look up the status of a transaction
- **Shadow Ledger** — resynchronize the shadow ledger against source-of-truth data
- **AI-powered insights** — Gemini integration surfaces intelligent summaries and suggestions

## Tech Stack

- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/) for tooling and bundling
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Recharts](https://recharts.org/) for data visualization
- [lucide-react](https://lucide.dev/) for icons
- [`@google/genai`](https://www.npmjs.com/package/@google/genai) (Gemini API) for AI features

## Run Locally

**Prerequisites:** Node.js

1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Scripts

| Command           | Description                          |
| ------------------ | ------------------------------------- |
| `npm run dev`      | Start the local dev server           |
| `npm run build`    | Type-check and build for production  |
| `npm run preview`  | Preview the production build locally |
| `npm run lint`     | Type-check the project (`tsc --noEmit`) |

## Deployment

Pushes to `main` trigger the [Build & Deploy](.github/workflows/deploy.yml) workflow, which:

1. Computes the release version with [GitVersion](https://gitversion.net/) (see [`GitVersion.yml`](GitVersion.yml))
2. Builds the app and publishes it to GitHub Pages
3. Creates a GitHub release tagged `v<version>` with auto-generated release notes

Pull requests are validated by the [Build and Test](.github/workflows/build.yml) workflow.
