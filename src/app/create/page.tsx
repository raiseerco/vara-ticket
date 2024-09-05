"use client";

import { META, PROGRAM_ID } from "@/utils/constants";

import { Button } from "@/components/ui/Button";
import PlatformLayout from "../layouts/PlatformLayout";
import { ProgramMetadata } from "@gear-js/api";
import { shortAddress } from "@/lib/utils";
import { useApisContext } from "@/contexts/ApisContext";
import { useState } from "react";

function PageContents() {
  const { api, account, accounts } = useApisContext();
  const [name, setName] = useState("");
  const [supply, setSupply] = useState(0);
  const [description, setDescription] = useState("");
  const [date, setDate] = useState<number>(new Date().getTime());
  const [alert, setAlert] = useState<string | undefined>(undefined);

  // ipfs
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [CID, setCID] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const selectedFile = event.target.files[0];
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    } else {
      setFile(null);
      setPreview(null);
    }
  };

  const uploadIPFS = async () => {
    if (!file) {
      // setError("Please select a file to upload.");
      return;
    }

    setUploading(true);
    setError(null);
    setCID(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setCID(data.cid);
        return data.cid;
      } else {
        setError(data.error || "Failed to upload image.");
      }
    } catch (err) {
      setError("An unexpected error occurred.");
    } finally {
      setUploading(false);
    }
  };

  const handleCreate = async () => {
    const { web3FromSource } = await import("@polkadot/extension-dapp"); // TODO this bastard needs to be dynamic
    if (!web3FromSource) return;
    const localAccount = account?.address;
    const isVisibleAccount = accounts?.some(
      (visibleAccount) => visibleAccount.address === localAccount
    );

    const uploadedCID = await uploadIPFS();

    const message = {
      destination: PROGRAM_ID,
      payload: {
        create: {
          creator: account?.decodedAddress,
          name,
          description,
          number_of_tickets: supply,
          date,
          event_img_url: uploadedCID,
        },
      },
      gasLimit: 98998192450,
      value: 0,
    };
    console.log("message ", message);

    if (isVisibleAccount && accounts) {
      try {
        // Create a message extrinsic
        const metadataProgram = ProgramMetadata.from(META);
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
            // @ts-ignore
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
                onChange={(e) => setDate(new Date(e.target.value).getTime())}
                className="px-2 py-1  mt-2 outline-rose-300 rounded-md border "
                type="date"
              />
            </div>

            {/* right panel  */}
            <div className="w-4/12 flex flex-col gap-4">
              <div className="max-w-md mx-auto p-4  rounded-lg  ">
                {/* <div > */}
                <label htmlFor="fileInput" className="block text-sm  ">
                  Cover image
                </label>
                <input
                  type="file"
                  accept="image/jpeg,image/png"
                  id="fileInput"
                  onChange={handleFileChange}
                  className="mt-2 text-sm p-2 w-full"
                />
                {/* </div> */}
                {preview && (
                  <div className="mt-4">
                    <img
                      src={preview}
                      alt="Selected preview"
                      className="w-full h-48 object-cover rounded-lg shadow-sm"
                    />
                  </div>
                )}
                {/* <Button
                  onClick={handleUpload}
                  className={`w-full py-2 px-4 mt-4 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                    uploading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={uploading}
                >
                  {uploading ? "Uploading..." : "Upload"}
                </Button> */}
                {uploading && "Uploading image to IPFS..."}
                {error && <p className="mt-4 text-red-500 text-sm">{error}</p>}
                {/* inner control  */}
                {/* {CID && (
                  <div className="mt-4">
                    <p className="text-green-600">
                      File uploaded successfully. CID:
                    </p>
                    <a
                      href={`https://ipfs.io/ipfs/${CID}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {CID}
                    </a>
                  </div>
                )} */}
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
