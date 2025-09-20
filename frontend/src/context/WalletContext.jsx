import { useMemo } from "react";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import {
  PhantomWalletAdapter,
  // CoinbaseWalletAdapter,
  // SolflareWalletAdapter,
  // BitgetWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import "@solana/wallet-adapter-react-ui/styles.css";

import { SolanaEndpoint } from "../config";

const WalletContextProvider = ({ children }) => {
  const wallets = useMemo(
    () => [
        new PhantomWalletAdapter(),
        // new CoinbaseWalletAdapter(),
        // new SolflareWalletAdapter(),
        // new BitgetWalletAdapter()
    ],
    []
  );

  return (
    <ConnectionProvider endpoint={SolanaEndpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export default WalletContextProvider;
