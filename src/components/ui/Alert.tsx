import { CSSProperties, ReactNode } from "react";

import { Button } from "./Button";
import CrossIcon from "../../app/features/wallet/assets/images/icons/cross.svg";

// import clsx from "clsx";

type Options = {
  type: "info" | "error" | "loading" | "success";
  style?: CSSProperties;
  title?: string;
  timeout?: number;
  isClosed?: boolean;
};

type Alert = {
  id: string;
  content: ReactNode;
  options: Options;
};

type AlertProps = {
  alert: Alert;
  close: () => void;
};

export default function Alert({ alert, close }: AlertProps) {
  const { content, options } = alert;
  const { type, title, style, isClosed } = options;

  return (
    <div>
      <div>{title || type}</div>
      <div>{content}</div>
      {isClosed && (
        <Button onClick={close}>
          <CrossIcon width={20} height={20} />
        </Button>
      )}
    </div>
  );
}
