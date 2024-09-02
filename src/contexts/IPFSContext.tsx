import { IPFSHTTPClient, create } from "ipfs-http-client";
import { createContext, useRef } from "react";

import { ProviderProps } from "@gear-js/react-hooks";
// import {  IPFS_ADDRESS } from 'consts';

const IPFSContext = createContext<IPFSHTTPClient>({} as IPFSHTTPClient);

function IPFSProvider({ children }: ProviderProps) {
  const ipfsRef = useRef(
    create({ url: "lime-electoral-gayal-921.mypinata.cloud" })
  );

  const { Provider } = IPFSContext;

  return <Provider value={ipfsRef.current}>{children}</Provider>;
}

export { IPFSContext, IPFSProvider };
