"use client";
import { useApi, useAvailAccount } from "avail-wallet-sdk";
import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Button } from "@/components/ui/button";
import { BN } from "avail-js-sdk";

export default function TransferCard() {
  const { selected, selectedWallet } = useAvailAccount();
  const { api, isReady } = useApi();

  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSend = async () => {
    if (!selected || !selectedWallet || !api || !isReady || !recipient || !amount) return;
    try {
      setStatus("loading");

      const plancks = new BN((BigInt(Number(amount) * 1e18)).toString());

      const unsub = await api.tx.balances
        .transferKeepAlive(recipient, plancks)
        .signAndSend(selected.address, { signer: selectedWallet.signer }, (result) => {
          if (result.status.isInBlock || result.status.isFinalized) {
            setStatus("success");
            setTimeout(() => setStatus("idle"), 3000);
            unsub();
          }
        });
    } catch (err) {
      console.error("Transaction failed:", err);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  if (!selected) return null;

  return (
    <Card className="w-full max-w-sm mt-10">
      <CardHeader>
        <CardTitle>Send transaction</CardTitle>
        <CardDescription>Send AVAIL to another address</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-2">
          <Label htmlFor="address">Recipient address</Label>
          <Input id="address" value={recipient} onChange={(e) => setRecipient(e.target.value)} />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="amount">Amount</Label>
          <Input id="amount" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
          <span className="text-xs text-muted-foreground">in AVAIL (1 AVAIL = 1e18 planck)</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          onClick={handleSend}
          disabled={status === "loading" || status === "success"}
          className={`w-full transition-all duration-300 ${
            status === "success" ? "bg-green-500" : ""
          }`}
        >
          {status === "loading" ? "Sending..." : status === "success" ? "✓ Sent" : "Send"}
        </Button>
      </CardFooter>
    </Card>
  );
}
