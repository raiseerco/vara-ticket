// import { WALLET, WALLET_ID_LOCAL_STORAGE_KEY } from "./consts";
// import { useEffect, useState } from "react";

// import { WalletId } from "./types";
// import { useAccount } from "@gear-js/react-hooks";

// function useWalletSync() {
//   const { account, isAccountReady } = useAccount();
//   const { address } = account || {};

//   useEffect(() => {
//     if (!isAccountReady) return;
//     if (!account) return localStorage.removeItem(WALLET_ID_LOCAL_STORAGE_KEY);

//     localStorage.setItem(WALLET_ID_LOCAL_STORAGE_KEY, account.meta.source);
//   }, [isAccountReady, address, account]);
// }

// function useWallet() {
//   const { accounts } = useAccount();

//   const [walletId, setWalletId] = useState(
//     (localStorage.getItem(WALLET_ID_LOCAL_STORAGE_KEY) as WalletId | null) ||
//       undefined
//   );

//   const wallet = walletId ? WALLET[walletId] : undefined;

//   const getWalletAccounts = (id: WalletId) =>
//     accounts?.filter(({ meta }) => meta.source === id);
//   const walletAccounts = walletId ? getWalletAccounts(walletId) : undefined;

//   const resetWalletId = () => setWalletId(undefined);

//   return {
//     wallet,
//     walletAccounts,
//     setWalletId,
//     resetWalletId,
//     getWalletAccounts,
//   };
// }

// export { useWalletSync, useWallet };

"use client";

import { WALLET, WALLET_ID_LOCAL_STORAGE_KEY } from "./consts";
import { useEffect, useState } from "react";

import { WalletId } from "./types";
import { useAccount } from "@gear-js/react-hooks";

function useWalletSync() {
  const { account, isAccountReady } = useAccount();
  const { address } = account || {};

  useEffect(() => {
    if (typeof window === "undefined") return; // Check if running in browser
    if (!isAccountReady) return;
    if (!account) return localStorage.removeItem(WALLET_ID_LOCAL_STORAGE_KEY);

    localStorage.setItem(WALLET_ID_LOCAL_STORAGE_KEY, account.meta.source);
  }, [isAccountReady, address, account]);
}

function useWallet() {
  const { accounts } = useAccount();
  const [walletId, setWalletId] = useState<WalletId | undefined>(undefined);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedWalletId = localStorage.getItem(
        WALLET_ID_LOCAL_STORAGE_KEY
      ) as WalletId | null;
      setWalletId(storedWalletId || undefined);
    }
  }, []);

  const wallet = walletId ? WALLET[walletId] : undefined;

  const getWalletAccounts = (id: WalletId) =>
    accounts?.filter(({ meta }) => meta.source === id);
  const walletAccounts = walletId ? getWalletAccounts(walletId) : undefined;

  const resetWalletId = () => {
    setWalletId(undefined);
    if (typeof window !== "undefined") {
      localStorage.removeItem(WALLET_ID_LOCAL_STORAGE_KEY);
    }
  };

  return {
    wallet,
    walletAccounts,
    setWalletId,
    resetWalletId,
    getWalletAccounts,
  };
}

export { useWalletSync, useWallet };
