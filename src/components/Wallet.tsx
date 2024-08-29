import { AccountButton } from "./AccountButton";

type Props = {
  balance:
    | {
        value: string;
        unit: string;
      }
    | undefined; //Account['balance'];
  address: string;
  name: string | undefined;
  onClick: () => void;
};

function Wallet({ balance, address, name, onClick }: Props) {
  return (
    <div className="flex items-center relative self-center justify-center">
      <p className="mr-4 text-xs h-full font-mono mb-0">
        {balance?.value} {balance?.unit}
      </p>
      <AccountButton address={address} name={name} onClick={onClick} />
    </div>
  );
}

export { Wallet };
