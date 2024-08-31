"use client";

import { META, PROGRAM_ID } from "@/utils/constants";
import { useAccount, useApi } from "@gear-js/react-hooks";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/Button";
import Loader from "@/components/Loader";
import PlatformLayout from "@/app/layouts/PlatformLayout";
import { ProgramMetadata } from "@gear-js/api";
import { shortAddress } from "@/lib/utils";
import { useParams } from "next/navigation";
import { web3FromSource } from "@polkadot/extension-dapp";

function PageContents(idEvent: any) {
  const { isApiReady, api } = useApi();
  const { isAccountReady, accounts, account } = useAccount();
  const [eventDetails, setEventDetails] = useState<any>();
  const [amount, setAmount] = useState(0);
  const [alert, setAlert] = useState<string | undefined>(undefined);
  const isAppReady = isApiReady && isAccountReady;

  useEffect(() => {
    const metadataProgram = ProgramMetadata.from(META);
    if (!api || !isAppReady || !metadataProgram || !idEvent) return;
    const getState = () => {
      // @ts-ignore
      const params: ReadStateParams = {
        programId: PROGRAM_ID,
      };
      api.programState
        .read(params, metadataProgram)
        .then((result) => {
          const state = result.toJSON();
          if (!state) {
            console.log("vacio");
            return;
          }

          // @ts-ignore
          if (Array.isArray(state.evStateInfo[0])) {
            // @ts-ignore
            const allItems = state.evStateInfo.map(([_, arr]) => arr).flat();
            const pEvent = idEvent.id.split("-");
            const EE = allItems
              .map((e) => e[1])
              .find(
                (e: any) =>
                  e.creator === pEvent[0] && e.eventId === parseInt(pEvent[1])
              );

            setEventDetails(EE);
          } else {
            console.error("Unexpected state format:", state);
          }
        })
        .catch(({ message }: Error) => console.log("error ", message));
    };

    getState();
  }, [api, isAppReady, idEvent]);

  if (!isAppReady) {
    return <Loader />;
  }

  const handleBuy = async () => {
    if (amount < 1 || amount > eventDetails.ticketsLeft) return;

    let ticket = {
      title: eventDetails.name,
      description: eventDetails.description,
      media: "vticket platform",
      reference: "NONE",
    };

    const ticketsArray = Array.from({ length: amount }, () => ({ ...ticket }));
    const metadataProgram = ProgramMetadata.from(META);
    const multitokenMetadata = metadataProgram.createType(7, ticketsArray);

    const message = {
      destination: PROGRAM_ID,
      payload: {
        buytickets: {
          creator: eventDetails.creator,
          eventId: eventDetails.eventId,
          amount,
          metadata: multitokenMetadata,
        },
      },
      gasLimit: 98998192450,
      value: 0,
    };

    const localaccount = account?.address;
    const isVisibleAccount = accounts?.some(
      (visibleAccount) => visibleAccount.address === localaccount
    );

    if (isVisibleAccount && accounts) {
      try {
        // Create a message extrinsic
        // @ts-ignore
        const transferExtrinsic = api.message.send(message, metadataProgram);
        console.log(message);
        const injector = await web3FromSource(accounts[0].meta.source);

        if (!account) {
          console.log("no account");
          setAlert("No account");
          return;
        }
        transferExtrinsic
          .signAndSend(
            account.address,
            // @ts-ignore
            { signer: injector.signer },
            ({ status }) => {
              if (status.isInBlock) {
                setAlert(
                  `Transaction included in block: ${status.asInBlock.toString()}`
                );

                // alert.success(
                //   `Transaction included in block: ${status.asInBlock.toString()}`
                // );
              } else {
                console.log("In Process", status);
                if (status.isFinalized) {
                  setAlert(
                    `Transaction finalized: ${status.asFinalized.toString()}`
                  );
                  // alert.success(
                  //   `Transaction finalized: ${status.asFinalized.toString()}`
                  // );
                }
              }
            }
          )
          .catch((error: any) => {
            console.error("Transaction failed", error);

            // alert.error("Transaction failed");
            setAlert("Transaction failed");
          });
      } catch (error) {
        console.error("Error creating message extrinsic:", error);
      }
    } else {
      // alert.error("Account not available to sign");
      setAlert("Account not available to sign");
    }
  };

  return (
    eventDetails && (
      <div className="p-6">
        <span className=" text-4xl">{eventDetails.name}</span>
        <div className="gap-6 pt-8 flex flex-wrap justify-center">
          <>
            <div className="rounded-lg p-3 w-8/12 h-70S mx-auto">
              <div className="w-full h-60 mb-2 flex justify-end items-end rounded-lg bg-rose-200 dark:bg-rose-300 ">
                <span className="px-3 py-2 text-black dark:text-rose-200 text-xl tracking-tight"></span>
              </div>

              <p className="text-md tracking-tight font-mono">
                {eventDetails.description}
              </p>
              <div className="text-right mt-2">
                {eventDetails.numberOfTickets - eventDetails.ticketsLeft <
                10 ? (
                  <button className="px-3 py-1 rounded-md mr-2 text-white bg-rose-500">
                    Hurry up!
                  </button>
                ) : (
                  <></>
                )}

                <small
                  className="  bg-stone-300 dark:bg-rose-400
                  px-2 py-1 rounded-md"
                >
                  {eventDetails.ticketsLeft | 0}/{eventDetails.numberOfTickets}{" "}
                  tickets left
                </small>
              </div>
              <p className="text-right text-xs italic font-light mt-2">
                Creator: {shortAddress(eventDetails.creator)} on{" "}
                {eventDetails.date}
              </p>

              <div className="text-left flex my-4 text-xl">
                <p className="ml-4">Buy tickets</p>
              </div>

              {eventDetails.ticketsLeft === 0 ? (
                <div className="w-full text-center p-4 border rounded-lg">
                  <button className="px-3 py-1 rounded-md mr-2 text-white bg-stone-500">
                    Event sold out!
                  </button>
                </div>
              ) : (
                <div className="w-full text-center p-4 border rounded-lg">
                  <input
                    className="mb-4 mt-2  outline-rose-300 px-3 py-2 text-l rounded-md border "
                    type="text"
                    onChange={(e) => setAmount(parseInt(e.target.value, 10))}
                    placeholder={"Amount of tickets..."}
                  />

                  <Button onClick={handleBuy} className="ml-2 bg-rose-400 py-1">
                    CONFIRM!
                  </Button>
                </div>
              )}

              {alert && (
                <div className="bg-rose-200 border rounded-lg p-4 m-4">
                  <h1>{alert}</h1>
                </div>
              )}
            </div>
          </>
        </div>
      </div>
    )
  );
}

export default function Events() {
  const par = useParams();

  return (
    <PlatformLayout>
      {/* <div className="py-16 mt-20 gap-6 flex flex-wrap bg-gree content-start justify-right min-h-screen "> */}
      {/* {!isFullyReady ? (
          <div className="flex flex-col h-screen w-full items-center justify-center bg-transparent">
            Loading API...
          </div>
        ) : (
          <>
        
            <p>Full state length: {fullState.length}</p>
            <p>Resto del contenido</p>
          </>
        )} */}
      <PageContents id={par.id} />
    </PlatformLayout>
  );
}
