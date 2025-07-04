"use client";
import { useApi, useAvailAccount } from "avail-wallet-sdk";
import { useEffect, useState } from "react";

export default function BalanceDisplay() {
  const { selected } = useAvailAccount();
  const { api, isReady } = useApi();
  const [balance, setBalance] = useState<string | null>(null);
  const [timer, setTimer] = useState(10);

  const fetchBalance = async () => {
    if (isReady && api && selected?.address) {
      try {
        const result = await api.query.system.account(selected.address);
const accountData = result.toJSON() as {
  data: {
    free: string;
  };
};

const avails = Number(accountData.data.free) / 1e18;

        setBalance(avails.toFixed(6));
      } catch (err) {
        console.error("Error fetching balance:", err);
      }
    }
  };

  useEffect(() => {
    fetchBalance(); // initial fetch

    const refreshInterval = setInterval(() => {
      fetchBalance();
      setTimer(10);
    }, 10_000); // every 10 seconds

    const countdown = setInterval(() => {
      setTimer((t) => (t > 0 ? t - 1 : 10));
    }, 1_000); // tick every second

    return () => {
      clearInterval(refreshInterval);
      clearInterval(countdown);
    };
  }, [api, isReady, selected]);

  if (!selected || balance === null) return null;

  return (
    <div className="mt-5 text-center">
      <p className="text-3xl">
        {balance} <span className="text-sm text-gray-400">AVAIL</span>
      </p>
      <p className="text-xs text-muted-foreground mt-1">
        ↻ Refreshes in {timer}s
      </p>
    </div>
  );
}
