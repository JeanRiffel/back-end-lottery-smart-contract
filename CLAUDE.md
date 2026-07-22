# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

NestJS backend that bridges a web front-end to an Ethereum lottery smart contract via web3.js. It is the middle piece of a 3-repo system:

- [Lottery Smart Contract](https://github.com/JeanRiffel/lottery-smart-contract) — Solidity contract handling bets and winner selection.
- **This repo** — REST API that receives requests and forwards them to the smart contract via web3.
- [Front-end Lottery Smart Contract](https://github.com/JeanRiffel/front-end-lottery-smart-contract) — user-facing UI.

## Commands

```bash
yarn install          # install deps (Node version pinned in .nvmrc: v20.9.0)

yarn start             # run app
yarn start:dev         # run app in watch mode
yarn start:prod        # run compiled app (dist/main)
yarn build              # nest build

yarn lint               # eslint --fix on src/apps/libs/test
yarn format              # prettier --write on src/**/*.ts and test/**/*.ts

yarn test                # unit tests (jest, rootDir: src, pattern *.spec.ts)
yarn test:watch          # unit tests in watch mode
yarn test:cov            # unit tests with coverage
yarn test:e2e            # e2e tests (jest config in test/jest-e2e.json)
```

To run a single unit test file: `yarn test <path-or-pattern>` (e.g. `yarn test lottery.service.spec.ts`).

Swagger docs are served at `http://localhost:3001/api-docs#/` once the app is running.

## Configuration

Environment variables are loaded via `dotenv` in `src/main.ts` from a `.env` file at the repo root:

- `LOCAL_PORT` — port the Nest app listens on.
- `CONTRACT_ADDRESS` — deployed lottery contract address.
- `GANACHE_ADDRESS` — HTTP RPC endpoint (Ganache locally) used to build the web3 connection.
- `ABI` — JSON-stringified contract ABI, parsed at runtime in `LotteryContract`.
- `FRONT_END_ADDRESS` — allowed CORS origin, applied globally in `GeneralModule`.

## Architecture

The code under `src/domain/lottery-smart-contract/` follows a layered/DDD-ish structure with an interface + factory pattern to decouple the NestJS service layer from the concrete web3 implementation:

- **`entity/LotterySmartContract.ts`** — interface defining the contract-facing operations (`enter`, `pickWinner`, `getPlayers`, `contractName`). This is the abstraction the rest of the app depends on.
- **`entity/LotteryContract.ts`** — concrete implementation of `LotterySmartContract`, wrapping a `web3.eth.Contract` instance built from `CONTRACT_ADDRESS` and `ABI` env vars. All actual contract calls (`.methods.xxx().call()/.send()`) live here.
- **`entity/Web3Connection.ts`** — thin interface abstracting the web3 provider connection (`getConnection()`), implemented in `src/infra/Web3ConnectionSmartContractLottery.ts` (wraps `Web3` + `HttpProvider`).
- **`factory/LotterySmartContractFactory.ts`** — builds a `LotteryContract` wired to a `Web3ConnectionSmartContractLottery` using `GANACHE_ADDRESS`. This is the only place that wires the infra implementation to the domain interface.
- **`service/lottery.service.ts`** — NestJS `@Injectable` service. Constructs the factory directly (not via NestJS DI/providers) and delegates all business calls to the resulting `LotterySmartContract` instance. Catches errors and maps them to `DefaultErrors` enum messages (`utils/enumHelper.ts`).
- **`controller/lottery.controller.ts`** — REST endpoints under `/lottery`: `POST place-bet`, `GET winner`, `GET contract-name`, `GET players`. Each handler wraps the service call in try/catch and returns a raw `Response` via `@Res()`, responding with `500` and `{ message, error }` on failure.
- **`module/lotery.module.ts`** — wires `LotteryController` + `LotteryService` (note the module filename typo: `lotery.module.ts`).

`src/general.modules.ts` is the app's root module, importing `LotteryModule` and applying `cors()` middleware globally scoped to `FRONT_END_ADDRESS`.

Since `LotteryService` builds its dependencies manually via `new LotterySmartContractFactory()` rather than through Nest's DI container, there's no provider binding to override for tests — `service/test/lottery.service.spec.ts` is the reference for how existing tests approach this (mocking at the object level).
