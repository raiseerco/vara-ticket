import { ACCOUNT_ID_LOCAL_STORAGE_KEY } from "@/utils/constants";
import { AccountButton } from "./AccountButton";
import type { InjectedAccountWithMeta } from "@polkadot/extension-inject/types";
import { isLoggedIn } from "@/utils";
// import styles from "./Accounts.module.scss";
import { useAccount } from "@gear-js/react-hooks";

type Props = {
  list: InjectedAccountWithMeta[];
  onChange: () => void;
};

function Accounts({ list, onChange }: Props) {
  const { login } = useAccount();
  const isAnyAccount = list.length > 0;

  const handleAccountButtonClick = (account: InjectedAccountWithMeta) => {
    login(account);
    console.log("logged in");
    localStorage.setItem(ACCOUNT_ID_LOCAL_STORAGE_KEY, account.address);
    onChange();
  };

  const getAccounts = () =>
    list.map((account) => (
      <li key={account.address}>
        <AccountButton
          address={account.address}
          name={account.meta.name}
          isActive={isLoggedIn(account)}
          onClick={() => handleAccountButtonClick(account)}
          block
        />
      </li>
    ));

  return isAnyAccount ? (
    <ul>{getAccounts()}</ul>
  ) : (
    <p>
      No accounts found. Please open Polkadot extension, create a new account or
      import existing one and reload the page.
    </p>
  );
}

export { Accounts };
