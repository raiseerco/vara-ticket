import EnkryptSVG from "./assets/images/icons/enkrypt.svg";
// import NovaSVG from "./assets/images/icons/nova.svg";
import PolkadotSVG from "./assets/images/icons/polkadot.svg";
import SubWalletSVG from "./assets/images/icons/subwallet.svg";
import TalismanSVG from "./assets/images/icons/talisman.svg";

type Entries<T extends object> = [keyof T, T[keyof T]][];
export const WALLET_ID_LOCAL_STORAGE_KEY = "wallet";

export const WALLET = {
  "polkadot-js": {
    name: "Polkadot JS",
    SVG: PolkadotSVG,
  },
  "subwallet-js": { name: "SubWallet", SVG: SubWalletSVG },
  talisman: { name: "Talisman", SVG: TalismanSVG },
  enkrypt: { name: "Enkrypt", SVG: EnkryptSVG },
};

export const WALLETS = Object.entries(WALLET) as Entries<typeof WALLET>;
