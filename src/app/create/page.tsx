"use client";

import { useAccount, useApi } from "@gear-js/react-hooks";

import { Button } from "@/components/ui/Button";
import PlatformLayout from "../layouts/PlatformLayout";
import { ProgramMetadata } from "@gear-js/api";
import { shortAddress } from "@/lib/utils";
import { useState } from "react";
import { web3FromSource } from "@polkadot/extension-dapp";

function PageContents() {
  const { isApiReady, api } = useApi();
  const { accounts, account, isAccountReady } = useAccount();

  const [name, setName] = useState("");
  const [supply, setSupply] = useState(0);
  const [description, setDescription] = useState("");
  const [date, setDate] = useState<number>(new Date().getTime());
  const [ready, setReady] = useState(false);
  const [alert, setAlert] = useState<string | undefined>(undefined);

  const isAppReady = isApiReady && isAccountReady;

  // Add your programID
  const programIDFT =
    "0x49bafeb95356ed38775cba2b78af90796e577facf34d7d07e530536e7480fa6a";

  // Add your metadata.txt
  const meta =
    "0002000100000000000104000000010b0000000000000000010e0000001119680008246576656e74735f696f24496e69744576656e7400000801206f776e65725f696404011c4163746f7249640001306d746b5f636f6e747261637404011c4163746f72496400000410106773746418636f6d6d6f6e287072696d6974697665731c4163746f724964000004000801205b75383b2033325d000008000003200000000c000c00000503001008246576656e74735f696f2c4576656e74416374696f6e00010c1843726561746514011c63726561746f7204011c4163746f7249640001106e616d65140118537472696e6700012c6465736372697074696f6e140118537472696e670001446e756d6265725f6f665f7469636b65747318011075313238000110646174651801107531323800000010486f6c6408011c63726561746f7204011c4163746f7249640001206576656e745f696418011075313238000100284275795469636b65747310011c63726561746f7204011c4163746f7249640001206576656e745f696418011075313238000118616d6f756e74180110753132380001206d657461646174611c01685665633c4f7074696f6e3c546f6b656e4d657461646174613e3e000200001400000502001800000507001c00000220002004184f7074696f6e04045401240108104e6f6e6500000010536f6d6504002400000100002408386d756c74695f746f6b656e5f696f34546f6b656e4d6574616461746100001001147469746c652801384f7074696f6e3c537472696e673e00012c6465736372697074696f6e2801384f7074696f6e3c537472696e673e0001146d656469612801384f7074696f6e3c537472696e673e0001247265666572656e63652801384f7074696f6e3c537472696e673e00002804184f7074696f6e04045401140108104e6f6e6500000010536f6d6504001400000100002c0418526573756c740804540130044501340108084f6b040030000000000c45727204003400000100003008246576656e74735f696f2c4576656e74734576656e7400010c204372656174696f6e10011c63726561746f7204011c4163746f7249640001206576656e745f6964180110753132380001446e756d6265725f6f665f7469636b65747318011075313238000110646174651801107531323800000010486f6c6408011c63726561746f7204011c4163746f7249640001206576656e745f6964180110753132380001002050757263686173650c011c63726561746f7204011c4163746f7249640001206576656e745f696418011075313238000118616d6f756e7418011075313238000200003408246576656e74735f696f284576656e744572726f7200012044416c7265616479526567697374657265640000002c5a65726f41646472657373000100444c6573735468616e4f6e655469636b6574000200404e6f74456e6f7567685469636b657473000300444e6f74456e6f7567684d65746164617461000400284e6f7443726561746f72000500344576656e744e6f74466f756e640006003c4576656e7449644e6f74466f756e64000700003808246576656e74735f696f14537461746500000c01206f776e65725f696404011c4163746f72496400012c636f6e74726163745f696404011c4163746f72496400013465765f73746174655f696e666f3c01785665633c284163746f7249642c204576656e745374617465496e666f293e00003c000002400040000004080444004400000248004800000408184c004c08246576656e74735f696f245374617465496e666f00003401106e616d65140118537472696e6700012c6465736372697074696f6e140118537472696e6700011c63726561746f7204011c4163746f7249640001446e756d6265725f6f665f7469636b657473180110753132380001307469636b6574735f6c6566741801107531323800011064617465180110753132380001186275796572735001305665633c4163746f7249643e00011c72756e6e696e67540110626f6f6c0001206d6574616461746158015c5665633c284163746f7249642c205469636b657473293e000120746f6b656e5f69641801107531323800012869645f636f756e746572180110753132380001206576656e745f6964180110753132380001307469636b65745f66745f6964180110753132380000500000020400540000050000580000025c005c000004080460006000000264006400000408182000";
  const metadataProgram = ProgramMetadata.from(meta);

  const handleCreate = async () => {
    const localAccount = account?.address;
    const isVisibleAccount = accounts?.some(
      (visibleAccount) => visibleAccount.address === localAccount
    );

    const message = {
      destination: programIDFT,
      payload: {
        create: {
          creator: account?.decodedAddress,
          name,
          description,
          number_of_tickets: supply,
          date,
        },
      },
      gasLimit: 98998192450,
      value: 0,
    };
    console.log("message ", message);

    if (isVisibleAccount && accounts) {
      try {
        // Create a message extrinsic
        const transferExtrinsic = await api.message.send(
          // @ts-ignore
          message,
          metadataProgram
        );

        const injector = await web3FromSource(accounts[0].meta.source);

        if (!account) {
          console.log("no account");
          setAlert("No account");
          return;
        }

        transferExtrinsic
          .signAndSend(
            account?.address,
            { signer: injector.signer },
            ({ status }) => {
              if (status.isInBlock) {
                // alert.success(
                //   `Transaction included in block: ${status.asInBlock.toString()}`
                // );
                setAlert(
                  `Transaction included in block: ${status.asInBlock.toString()}`
                );
              } else {
                console.log("In Process", status);
                if (status.isFinalized) {
                  //   alert.success(
                  //     `Transaction finalized: ${status.asFinalized.toString()}`
                  //   );
                  setAlert(
                    `Transaction finalized: ${status.asFinalized.toString()}`
                  );
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
      //   alert.error("Account not available to sign");
      setAlert("Account not available to sign");
    }
  };

  return (
    <>
      <div className=" flex flex-col justify-center pt-4 ">
        <div className="w-8/12 py-8 text-left flex mx-auto text-xl">
          <p className="ml-4">New event</p>
        </div>

        <div className="w-full flex mx-auto">
          <div className="border w-8/12 flex shadow-lg rounded-lg justify-center mx-auto">
            {/* left panel */}
            <div className="w-8/12 p-4 justify-center flex flex-col">
              <p className="text-xs">Creator address</p>
              <p className="mb-4 mt-2 text-xs font-mono">
                {shortAddress(account.address)}
              </p>

              <p className="text-xs">Event name</p>
              <input
                onChange={(e) => setName(e.target.value)}
                className="mb-4 mt-2 outline-rose-300 px-3 py-1 rounded-md border "
                type="text"
                placeholder={"Enter a name..."}
              />

              <p className="text-xs">Description</p>
              <textarea
                rows={5}
                onChange={(e) => setDescription(e.target.value)}
                className="px-3 py-1 mb-4  mt-2 outline-rose-300 rounded-md border "
                placeholder={"Describe the event..."}
              />

              <p className="text-xs">Tickets supply</p>
              <input
                onChange={(e) => setSupply(parseInt(e.target.value))}
                className="px-3 py-1 mb-4  mt-2 outline-rose-300 rounded-md border "
                type="number"
                defaultValue={0}
              />

              <p className="text-xs">Date</p>
              <input
                onChange={(e) => new Date(e.target.value).getTime()}
                className="px-2 py-1  mt-2 outline-rose-300 rounded-md border "
                type="date"
              />
            </div>

            {/* right panel  */}
            <div className="w-4/12 flex flex-col p-4 gap-4">
              <div className="w-full p-4 h-40 text-stone-600 bg-rose-300 rounded-lg">
                Image placeholder
              </div>
              <div className="text-center">
                <Button className="px-3 py-1 ">Upload image</Button>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center">
          <Button
            onClick={handleCreate}
            className="px-6 py-1 mt-4 text-black bg-rose-300 "
          >
            CREATE
          </Button>

          {alert && (
            <div className="bg-rose-200 border rounded-lg p-4 m-4">
              <h1>{alert}</h1>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default function Create() {
  return (
    <PlatformLayout>
      <PageContents />
    </PlatformLayout>
  );
}
