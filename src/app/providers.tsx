"use client";
import { AvailWalletProvider } from "avail-wallet-sdk";
import "avail-wallet-sdk/index.css";

export function Providers({ children }: { children: React.ReactNode }) {
  return <AvailWalletProvider>{children}</AvailWalletProvider>;
}
