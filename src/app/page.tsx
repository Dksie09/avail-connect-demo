"use client";
import WalletCard from "@/components/WalletCard";
import BalanceDisplay from "@/components/BalanceDisplay";
import TransferCard from "@/components/TransferCard";
import { AvailWalletConnect, useAvailAccount } from "avail-wallet-sdk";
import { Button } from "@/components/ui/button";

export default function Home() {
  const { selected } = useAvailAccount();
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold mb-4">avail-connect sdk demo</h1>
      <p className="mb-8 text-center">
        {selected
          ? "Connected wallet using avail-connect sdk"
          : "Connect wallet using avail-connect sdk"}
      </p>

      <AvailWalletConnect>
        <Button>Connect Wallet</Button>
      </AvailWalletConnect>

      <WalletCard />
      <BalanceDisplay />
      <TransferCard />
    </main>
  );
}
