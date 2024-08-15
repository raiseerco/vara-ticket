import {
  useAccount,
  useApi,
  useBalance,
  useBalanceFormat,
} from "@gear-js/react-hooks";
import { useEffect, useState } from "react";

import { ACCOUNT_ID_LOCAL_STORAGE_KEY } from "@/utils/constants";
import { AccountsModal } from "./AccountsModal";
import { Button } from "./ui/Button";
import { Wallet } from "./Wallet";

export function AccountInfo() {
  const { isApiReady } = useApi();
  const { account, accounts, logout } = useAccount();
  const { balance } = useBalance(account?.address);
  const { getFormattedBalance } = useBalanceFormat();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  console.log("balance ", balance, account?.address);

  const formattedBalance =
    isApiReady && balance ? getFormattedBalance(balance) : undefined;

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleLogout = () =>
    // account: InjectedAccountWithMeta
    {
      // login(account);
      localStorage.setItem(ACCOUNT_ID_LOCAL_STORAGE_KEY, "");
      logout();
      console.log("logged out");
    };

  useEffect(() => {
    console.log("xxxxx balance", balance);
    // if (!isAccountReady) return;
    // if (!account) return localStorage.removeItem(WALLET_ID_LOCAL_STORAGE_KEY);
  }, [balance]);

  return (
    <>
      {account ? (
        <div className="relative flex self-center flex-col">
          <div className=" self-start  flex gap-2 ">
            <Wallet
              balance={formattedBalance}
              address={account.address}
              name={account.meta.name}
              onClick={openModal}
            />
            {/* <Button onClick={handleLogout}>Logout</Button> */}
            <Button
              variant={"ghost"}
              size={"sm"}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              ≡
            </Button>
          </div>
          {isMenuOpen && (
            <div className="absolute mt-10 self-end shadow-lg rounded-lg bg-stone-300 dark:bg-stone-800 px-4 py-2">
              <Button variant={"link"} onClick={handleLogout}>
                Logout
              </Button>
            </div>
          )}
        </div>
      ) : (
        <Button variant={"default"} size={"sm"} onClick={openModal}>
          Login
        </Button>
      )}
      {isModalOpen && <AccountsModal accounts={accounts} close={closeModal} />}
    </>
  );
}
