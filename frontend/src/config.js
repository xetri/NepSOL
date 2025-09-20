export const ServerURL = import.meta.env.VITE_BACKEND_ENDPOINT

export const SolanaEndpoint = import.meta.env.VITE_NODE_ENV === "production" ? import.meta.env.VITE_SOLANA_MAINNET : import.meta.env.VITE_SOLANA_TESTNET;