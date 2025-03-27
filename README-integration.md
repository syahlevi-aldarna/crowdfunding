# Pharos SDK Integration Guide

This document explains how to integrate the crowdfunding platform frontend with the Pharos SDK when it becomes available.

## 1. Install Dependencies

When Pharos SDK becomes available, install the following dependencies:

```bash
npm install @pharos/sdk @pharos/contracts
```

## 2. Update File Imports

Replace all imports from the mock implementation to the actual Pharos SDK:

### services/web3/contracts.ts

```typescript
// Replace this:
import { PharosProvider, SPNRegistry } from "./pharos-mock";
// or this (if refactored):
import { PharosProvider, SPNRegistry } from "./mock";

// With this:
import { PharosProvider, SPNRegistry } from "@pharos/sdk";
```

### hooks/useRestaking.ts

```typescript
// Replace this:
import { PharosProvider } from "../services/web3/pharos-mock";
// or this (if refactored):
import { PharosProvider } from "../services/web3/mock";

// With this:
import { PharosProvider } from "@pharos/sdk";
```

## 3. Update Contract Addresses

Update contract addresses in `services/web3/contracts.ts`:

```typescript
export const CONTRACT_ADDRESSES: { [key: string]: Address } = {
  CROWDFUNDING: "0x...", // Replace with actual contract address
  TOKEN: "0x...", // Replace with actual contract address
};
```

## 4. Update Environment Variables

Ensure environment variables in `.env` contain the correct RPC URLs:

```env
NEXT_PUBLIC_PHAROS_L1_BASE_RPC=https://rpc.pharos.base.network
NEXT_PUBLIC_PHAROS_L1_CORE_RPC=https://rpc.pharos.core.network
NEXT_PUBLIC_PHAROS_L1_EXTENSION_RPC=https://rpc.pharos.extension.network
```

## 5. Code Structure Changes

The codebase has been refactored to better separate mock and real implementations:

### New Structure:

```
services/
  └── web3/
      ├── config.ts            # Consolidated web3 config
      ├── contracts.ts         # Contract interaction logic
      ├── types.ts             # Web3-specific types
      └── mock/               # Mock implementations
          └── index.ts         # Re-exports mock classes
```

When integrating the real SDK:

1. Replace imports from `services/web3/mock` with imports from `@pharos/sdk`
2. Update the implementation of contract methods in `contracts.ts`
3. Update the `config.ts` to use real configuration values

### Types

The project uses a centralized type system in `types/index.ts`. When integrating:

1. Ensure that SDK types are compatible with the application's types
2. Update any type definitions as needed based on the actual SDK interfaces

## 6. Remove Mock Implementation

After confirming the integration works properly, remove the following files:

- `services/web3/pharos-mock.ts`
- `services/web3/mock/` directory
- References to mock data in services

## 7. Testing

After integration, perform testing to ensure:

1. Connection to Pharos network works properly
2. SPNs can be accessed
3. Parallel execution functions correctly
4. Restaking works as expected

By following the steps above, the application will be integrated with the actual Pharos SDK.
