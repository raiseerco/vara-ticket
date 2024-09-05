import { META, PROGRAM_ID } from "@/utils/constants";
import React, { useState } from "react";

import { Button } from "./ui/Button";
import Link from "next/link";
import { ProgramMetadata } from "@gear-js/api";
import { useApisContext } from "@/contexts/ApisContext";

interface MyEventCardProps {
  account: string;
  name: string;
  description: string;
  ticketsSold: number;
  ticketsLeft: number;
  date: Date;
  CIDImage: string;
  creator: string;
  eventId: number;
  source: string;
  running: boolean;
  // api: any;
  // buyers: string[] ;
  // running:boolean;
  // metadata: string[] ;
  //  tokenId: number;
  // idCounter: number;
  // ticketFtId:number;
}

const MyEventCard: React.FC<MyEventCardProps> = ({
  account,
  name,
  description,
  ticketsSold,
  ticketsLeft,
  CIDImage,
  date,
  creator,
  eventId,
  source,
  running,
  // api,
  // buyers  ,
  // running  ,
  // metadata  ,
  //  tokenId  ,
  // idCounter  ,
  // ticketFtId  ,
}) => {
  const [alert, setAlert] = useState<string | undefined>(undefined);
  const { isApiReady, api } = useApisContext();
  const imgg = `https://ipfs.io/ipfs/${CIDImage}`;

  const handleFinish = () => {
    const metadataProgram = ProgramMetadata.from(META);

    const message = {
      destination: PROGRAM_ID,
      payload: {
        Close: {
          creator: account,
          eventId: eventId,
        },
      },
      gasLimit: 98998192450,
      value: 0,
    };

    const signer = async () => {
      if (account) {
        try {
          // Create a message extrinsic

          const transferExtrinsic = await api.message.send(
            // @ts-ignore
            message,
            metadataProgram
          );
          const { web3FromSource } = await import("@polkadot/extension-dapp"); // TODO this bastard needs to be dynamic
          const injector = await web3FromSource(source);
          if (!web3FromSource) return;
          if (!account) {
            console.log("no account");
            setAlert("No account");
            return;
          }
          transferExtrinsic
            .signAndSend(
              account,
              // @ts-ignore
              { signer: injector.signer },
              ({ status }) => {
                if (status.isInBlock) {
                  setAlert(
                    `Transaction included in block: ${status.asInBlock.toString()}`
                  );
                } else {
                  console.log("In Process", status);
                  if (status.isFinalized) {
                    setAlert(
                      `Transaction finalized: ${status.asFinalized.toString()}`
                    );
                  }
                }
              }
            )
            .catch((error: any) => {
              console.error("Transaction failed", error);
              setAlert("Transaction failed");
            });
        } catch (error) {
          console.error("Error creating message extrinsic:", error);
          console.trace();
        }
      } else {
        setAlert("Account not available to sign");
      }
    };

    signer();
  };

  return (
    <>
      <div
        className="flex items-center gap-2 bg-stone-200 dark:bg-stone-800 bg-opacity-25 shadow-md rounded-lg
   text-sm font-medium text-gray-500 transition-colors dark:text-stone-400"
      >
        <div className="rounded-lg p-3 w-70 h-70">
          <Link href={`/event/${account}-${eventId}`}>
            <div
              style={{
                backgroundImage: `url(${imgg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
              className="w-72 h-40 mb-2 flex justify-end items-end rounded-lg bg-rose-300 dark:bg-rose-400 "
            >
              <span
                style={{ backgroundColor: "#c578aca1" }}
                className="px-3 py-2  rounded-tl-lg rounded-br-lg  text-black dark:text-rose-200 text-xl tracking-tight"
              >
                {name}
              </span>
            </div>
          </Link>

          <p
            className="text-md tracking-tight font-mono
           w-[280px]
          truncate overflow-hidden whitespace-nowrap"
          >
            {description}
          </p>

          <div className="flex justify-between py-2 align-mi">
            {running === true && (
              <Button
                onClick={() => handleFinish()}
                className="bg-rose-400 text-xs h-6 px-3 rounded-sm"
              >
                FINISH
              </Button>
            )}

            {ticketsLeft === 0 ? (
              <Button className="bg-rose-700 text-xs h-6 px-3 rounded-sm">
                SOLD OUT
              </Button>
            ) : (
              <Button className="bg-stone-200 text-stone-600 text-xs h-6 px-3 rounded-sm">
                {ticketsLeft} Left
              </Button>
            )}

            <small
              className="  bg-stone-200 dark:bg-rose-500 dark:text-black
            px-2 py-1 rounded-md"
            >
              {ticketsSold | 0} tickets sold
            </small>
          </div>

          <p
            style={{ fontSize: "8pt" }}
            className="text-right italic font-light mt-2"
          >
            Created at: {new Date(date).toISOString()}
          </p>
        </div>
      </div>

      {alert && (
        <div className="bg-rose-200 border rounded-lg p-4 m-4">
          <h1>{alert}</h1>
        </div>
      )}
    </>
  );
};

export default MyEventCard;
