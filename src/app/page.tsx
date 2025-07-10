// app/page.tsx (or Home.tsx)
"use client";
import WalletCard from "@/components/WalletCard";
import BalanceDisplay from "@/components/BalanceDisplay";
import TransferCard from "@/components/TransferCard";
import { AvailWalletConnect } from "avail-wallet-sdk";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold mb-4">sdk demo</h1>
      <p className="mb-8 text-center">Connect wallet using avail wallet sdk</p>

      <AvailWalletConnect>
        <Button>Connect Wallet</Button>
      </AvailWalletConnect>

      <WalletCard />
      <BalanceDisplay />
      <TransferCard />
    </main>
  );
}
