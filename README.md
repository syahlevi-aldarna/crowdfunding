# Crowdfunding Platform

This is a decentralized crowdfunding platform built with Next.js and blockchain technology.

## Project Overview

The platform allows:

- Investors to browse and fund projects
- Creators to create and manage funding campaigns
- Transparent tracking of investments through blockchain

## Tech Stack

- **Frontend:** Next.js, React, TailwindCSS, DaisyUI
- **Blockchain Integration:** viem, wagmi, Rainbow Kit
- **State Management:** React Query
- **Authentication:** Wallet Connect

## Getting Started

First, install dependencies:

```bash
npm install
# or
yarn install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `/app` - Next.js app router pages
- `/components` - Reusable React components
- `/contracts` - Smart contract ABIs
- `/hooks` - Custom React hooks
- `/services` - API and blockchain service functions
  - `/api` - REST API calls
  - `/web3` - Blockchain interactions
  - `/queries` - React Query setup
- `/utils` - Utility functions
- `/public` - Static assets

## Smart Contract Integration

This frontend is designed to work with a smart contract that's not yet implemented. The following features are ready for integration:

- Wallet connection
- Project browsing/viewing
- Investment UI
- Project creation UI

The backend integration points are prepared as placeholder functions in:

- `services/web3/contracts.ts`
- `services/api/projects.ts`
- `services/api/tokens.ts`

## Development Status

This project is in active development. The UI and frontend functionality are largely complete, but integration with smart contracts is pending.

## Deployment

Deploy on Vercel or any other hosting service that supports Next.js apps.
