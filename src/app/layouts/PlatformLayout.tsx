"use client";

import "../globals.css";

import {
  AccountProvider,
  AlertProvider as GearAlertProvider,
  ApiProvider as GearApiProvider,
} from "@gear-js/react-hooks";
import { useEffect, useState } from "react";

import Alert from "@/components/ui/Alert";
import { GearApi } from "@gear-js/api";
import { Header } from "@/components/ui/Header";
import { Inter } from "next/font/google";
// import EnkryptSVG from "./features/wallet/assets/images/icons/enkrypt.svg";
// import NovaSVG from "./assets/images/icons/nova.svg";
// import PolkadotSVG from "./features/wallet/assets/images/icons/polkadot.svg";
// import SubWalletSVG from "./features/wallet/assets/images/icons/subwallet.svg";
// import TalismanSVG from "./features/wallet/assets/images/icons/talisman.svg";
import { WALLET_ID_LOCAL_STORAGE_KEY } from "../features/wallet/consts";
// import { WalletId } from "../features/wallet/types";
import { useAccount } from "@gear-js/react-hooks";
import { useApi } from "@gear-js/react-hooks";
import { useWalletSync } from "../features/wallet/hooks";

// function useWalletSync() {
//   async function ss() {
//     const gearApi = await GearApi.create({
//       providerAddress: "wss://testnet.vara-network.io",
//     });

//     console.log("ejecutando ", gearApi);
//   }

//   ss();

//   // const { account, isAccountReady } = useAccount();
//   // const { address } = account || {};

//   // useEffect(() => {
//   // console.log("xxxxx isAccountReady", isAccountReady);
//   //   if (!isAccountReady) return;
//   //   if (!account) return localStorage.removeItem(WALLET_ID_LOCAL_STORAGE_KEY);
//   //   localStorage.setItem(WALLET_ID_LOCAL_STORAGE_KEY, account.meta.source);
//   // }, [isAccountReady, address, account]);
// }

// function useWallet() {
//   const { accounts } = useAccount();

//   const [walletId, setWalletId] = useState(
//     (localStorage.getItem(WALLET_ID_LOCAL_STORAGE_KEY) as WalletId | null) ||
//       undefined
//   );

//   const WALLET = {
//     "polkadot-js": {
//       name: "Polkadot JS",
//       SVG: PolkadotSVG,
//     },
//     "subwallet-js": { name: "SubWallet", SVG: SubWalletSVG },
//     talisman: { name: "Talisman", SVG: TalismanSVG },
//     enkrypt: { name: "Enkrypt", SVG: EnkryptSVG },
//   };

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

const ADDRESS = {
  NODE: "wss://testnet.vara-network.io",
  // NODE: "wss://testnet.vara.network/",
  // mainnet
  // NODE: "wss://rpc.vara.network/",
};

function AppContent({ children }: { children: React.ReactNode }) {
  const { isApiReady } = useApi();
  const { isAccountReady } = useAccount();

  useWalletSync();

  const isAppReady = isApiReady && isAccountReady;

  if (!isAppReady) {
    return (
      <div className="flex flex-col h-screen w-full items-center justify-center bg-transparent">
        <div className="animate-spin rounded-full h-10 w-10 border-b-4 border-rose-500"></div>
      </div>
    );
  }

  return (
    <>
      <Header isAccountVisible={true} />
      <main className="w-full mt-14 ">{children}</main>
    </>
  );
}

function PlatformLayout({
  children,
}: Readonly<{ children: React.ReactNode }>): JSX.Element {
  // useEffect(() => {
  //   console.log("xxxxx isApiReady", isApiReady, isAccountReady);
  //   // if (!isAccountReady) return;
  //   // if (!account) return localStorage.removeItem(WALLET_ID_LOCAL_STORAGE_KEY);
  // }, []);

  return (
    <GearApiProvider initialArgs={{ endpoint: ADDRESS.NODE }}>
      <AccountProvider>
        <GearAlertProvider template={Alert}>
          {/* <Header isAccountVisible={isAccountReady} /> */}
          <Header isAccountVisible={true} />
          {/* {isAppReady ? (
            <div className="flex min-h-screen">
              <main className="ml-44 w-full flex overflow-y-auto">
                {children}
              </main>
            </div>
          ) : (
            <>
              <div className="flex flex-col h-screen w-full items-center justify-center bg-transparent">
                <div className="animate-spin rounded-full h-8 w-8 border-b-4 border-rose-500"></div>
              </div>
            </>
          )} */}

          <AppContent>{children}</AppContent>
        </GearAlertProvider>
      </AccountProvider>
    </GearApiProvider>
  );
}

export default PlatformLayout;
