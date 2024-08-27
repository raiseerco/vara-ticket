"use client";

import { useAccount, useAlert, useApi } from "@gear-js/react-hooks";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/Button";
import PlatformLayout from "@/app/layouts/PlatformLayout";
import { ProgramMetadata } from "@gear-js/api";
import { shortAddress } from "@/lib/utils";
import { useParams } from "next/navigation";
import { web3FromSource } from "@polkadot/extension-dapp";

function PageContents(idEvent: any) {
  const { isApiReady, api } = useApi();
  const { isAccountReady, accounts, account } = useAccount();
  // const alert = useAlert();
  const [eventDetails, setEventDetails] = useState<any>();
  const [amount, setAmount] = useState(0);
  const [alert, setAlert] = useState<string | undefined>(undefined);

  const isAppReady = isApiReady && isAccountReady;
  // Add your programID
  const programIDFT =
    "0x49bafeb95356ed38775cba2b78af90796e577facf34d7d07e530536e7480fa6a";
  // Add your metadata.txt
  const meta =
    "0002000100000000000104000000010b0000000000000000010e0000001119680008246576656e74735f696f24496e69744576656e7400000801206f776e65725f696404011c4163746f7249640001306d746b5f636f6e747261637404011c4163746f72496400000410106773746418636f6d6d6f6e287072696d6974697665731c4163746f724964000004000801205b75383b2033325d000008000003200000000c000c00000503001008246576656e74735f696f2c4576656e74416374696f6e00010c1843726561746514011c63726561746f7204011c4163746f7249640001106e616d65140118537472696e6700012c6465736372697074696f6e140118537472696e670001446e756d6265725f6f665f7469636b65747318011075313238000110646174651801107531323800000010486f6c6408011c63726561746f7204011c4163746f7249640001206576656e745f696418011075313238000100284275795469636b65747310011c63726561746f7204011c4163746f7249640001206576656e745f696418011075313238000118616d6f756e74180110753132380001206d657461646174611c01685665633c4f7074696f6e3c546f6b656e4d657461646174613e3e000200001400000502001800000507001c00000220002004184f7074696f6e04045401240108104e6f6e6500000010536f6d6504002400000100002408386d756c74695f746f6b656e5f696f34546f6b656e4d6574616461746100001001147469746c652801384f7074696f6e3c537472696e673e00012c6465736372697074696f6e2801384f7074696f6e3c537472696e673e0001146d656469612801384f7074696f6e3c537472696e673e0001247265666572656e63652801384f7074696f6e3c537472696e673e00002804184f7074696f6e04045401140108104e6f6e6500000010536f6d6504001400000100002c0418526573756c740804540130044501340108084f6b040030000000000c45727204003400000100003008246576656e74735f696f2c4576656e74734576656e7400010c204372656174696f6e10011c63726561746f7204011c4163746f7249640001206576656e745f6964180110753132380001446e756d6265725f6f665f7469636b65747318011075313238000110646174651801107531323800000010486f6c6408011c63726561746f7204011c4163746f7249640001206576656e745f6964180110753132380001002050757263686173650c011c63726561746f7204011c4163746f7249640001206576656e745f696418011075313238000118616d6f756e7418011075313238000200003408246576656e74735f696f284576656e744572726f7200012044416c7265616479526567697374657265640000002c5a65726f41646472657373000100444c6573735468616e4f6e655469636b6574000200404e6f74456e6f7567685469636b657473000300444e6f74456e6f7567684d65746164617461000400284e6f7443726561746f72000500344576656e744e6f74466f756e640006003c4576656e7449644e6f74466f756e64000700003808246576656e74735f696f14537461746500000c01206f776e65725f696404011c4163746f72496400012c636f6e74726163745f696404011c4163746f72496400013465765f73746174655f696e666f3c01785665633c284163746f7249642c204576656e745374617465496e666f293e00003c000002400040000004080444004400000248004800000408184c004c08246576656e74735f696f245374617465496e666f00003401106e616d65140118537472696e6700012c6465736372697074696f6e140118537472696e6700011c63726561746f7204011c4163746f7249640001446e756d6265725f6f665f7469636b657473180110753132380001307469636b6574735f6c6566741801107531323800011064617465180110753132380001186275796572735001305665633c4163746f7249643e00011c72756e6e696e67540110626f6f6c0001206d6574616461746158015c5665633c284163746f7249642c205469636b657473293e000120746f6b656e5f69641801107531323800012869645f636f756e746572180110753132380001206576656e745f6964180110753132380001307469636b65745f66745f6964180110753132380000500000020400540000050000580000025c005c000004080460006000000264006400000408182000";
  const metadataProgram = ProgramMetadata.from(meta);

  useEffect(() => {
    if (!api || !isAppReady || !metadataProgram || !idEvent) return;

    const getState = () => {
      // @ts-ignore
      const params: ReadStateParams = {
        programId: programIDFT,
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
            // @ts-ignore

            console.log("eeee ", allItems);
            // const tt = state?.evStateInfo[0][1].map((x: any) => x[1]);
            // const EE = tt.find((e: any) => e.eventId === parseInt(idEvent.id));
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
    // console.log("ejecutando ", api, isAppReady, metadata);
  }, [api, isAppReady, idEvent]);

  if (!isAppReady) {
    return (
      <div className="flex flex-col h-screen w-full items-center justify-center bg-transparent">
        not ready yet
      </div>
    );
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

    const multitokenMetadata = metadataProgram.createType(7, ticketsArray);

    const message = {
      destination: programIDFT,
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
