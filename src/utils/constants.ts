const ADDRESS = {
  // NODE: process.env.REACT_APP_NODE_ADDRESS as string,
  NODE: "wss://testnet.vara-network.io",
};

const LOCAL_STORAGE = {
  ACCOUNT: "account",
};

export { ADDRESS, LOCAL_STORAGE };

import { HexString } from "@gear-js/api";

export const ACCOUNT_ID_LOCAL_STORAGE_KEY = "account";

export const ROUTES = {
  HOME: "/",
  GAME: "/game",
  NOTFOUND: "*",
};
