"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useAccount, useApi } from "@gear-js/react-hooks";

interface ApisContextProps {
  isApiReady: boolean;
  api: any;
  isAccountReady: boolean;
  isAppReady: boolean;
  account: any;
  accounts: any;
}

const ApisContext = createContext<ApisContextProps | undefined>(undefined);

export const ApisProvider = ({ children }: { children: React.ReactNode }) => {
  const { isApiReady, api } = useApi();
  const { isAccountReady, account, accounts } = useAccount();
  const [isAppReady, setIsAppReady] = useState(false);

  useEffect(() => {
    setIsAppReady(isApiReady && isAccountReady);
  }, [isApiReady, isAccountReady]);

  return (
    <ApisContext.Provider
      value={{ isApiReady, api, isAccountReady, isAppReady, account, accounts }}
    >
      {children}
    </ApisContext.Provider>
  );
};

export const useApisContext = () => {
  const context = useContext(ApisContext);
  if (!context) {
    throw new Error("useApisContext must be used within an ApiProvider");
  }
  return context;
};
