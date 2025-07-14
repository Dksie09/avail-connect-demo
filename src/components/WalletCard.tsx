"use client";
import { useAvailAccount } from "avail-connect";

export default function WalletCard() {
  const { selected } = useAvailAccount();

  if (!selected) return null;

  return (
    <div className="mt-10 flex flex-col items-center">
      <img
        src={`https://api.dicebear.com/9.x/glass/svg?seed=${selected.address}`}
        className="rounded-full h-6 w-6"
        alt="Wallet Avatar"
      />
      <p>
        Connected as <span className="text-green-400">{selected.name}</span>
      </p>
      <span className="text-gray-400 text-xs">{selected.address}</span>
    </div>
  );
}
