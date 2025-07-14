"use client";
import { AvailWalletProvider } from "avail-connect";
import "avail-connect/index.css";

export function Providers({ children }: { children: React.ReactNode }) {
  return <AvailWalletProvider>{children}</AvailWalletProvider>;
}
