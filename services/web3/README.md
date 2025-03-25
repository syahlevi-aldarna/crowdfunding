# Web3 Services Architecture

## User Flow

User -> Connect Wallet -> Browse Projects -> Invest -> Track Investment

## Business Flow

Business -> Create Project -> Set Parameters -> Launch -> Monitor

## Data Flow

Blockchain <-> Web3 Services <-> Frontend <-> External APIs

## Services Structure

- provider.ts: Setup web3 provider & wallet connection
- contracts.ts: Smart contract interactions
- types.ts: Type definitions for blockchain data
