"use client";

import { META, PROGRAM_ID } from "@/utils/constants";
import { ProgramMetadata, ReadStateParams } from "@gear-js/api";
import { useAccount, useApi } from "@gear-js/react-hooks";

import { Button } from "@/components/ui/Button";
import Loader from "@/components/Loader";
import PlatformLayout from "../layouts/PlatformLayout";
import { useEffect } from "react";

function PageContents() {
  const { isApiReady, api } = useApi();
  const { isAccountReady } = useAccount();
  const isAppReady = isApiReady && isAccountReady;

  useEffect(() => {
    const metadataProgram = ProgramMetadata.from(META);
    if (!api || !isAppReady || !metadataProgram) return;

    const getState = () => {
      // @ts-ignore
      const params: ReadStateParams = {
        programId: PROGRAM_ID,
      };

      api.programState
        .read(params, metadataProgram)
        .then((result) => {
          console.log("State from result:", result);

          const state = result.toJSON();
          if (!state) {
            console.log("vacio");
            return;
          }
          // @ts-ignore
          if (Array.isArray(state.evStateInfo[0])) {
            // @ts-ignore
            setFullState(state?.evStateInfo[0][1]);
            // @ts-ignore
            console.log("State from contrac1t:", state.evStateInfo);
            // @ts-ignore
            console.log("full state:", state?.evStateInfo[0][1]);
          } else {
            console.error("Unexpected state format:", state);
          }
        })
        .catch(({ message }: Error) => console.log("error ", message));
    };

    getState();
    console.log("ejecutando ", api, isAppReady, metadataProgram);
  }, [api, isAppReady]);

  if (!isAppReady) {
    return <Loader />;
  }

  return (
    <>
      <div className="flex min-h-screen">
        <main className="ml-44 w-full flex overflow-y-auto">
          <div className=" flex flex-col justify-center pt-4 ">
            <div className="w-8/12 py-8 text-left flex mx-auto text-xl">
              <p className="ml-4">Hold ticket</p>
            </div>

            <div className="w-full flex mx-auto">
              <div className="border w-8/12 flex rounded-lg justify-center mx-auto">
                {/* left panel */}
                <div className="w-8/12 p-4 justify-center flex flex-col">
                  <p className="mb-4">Creator address: []</p>

                  <p className="text-xs">Event ID</p>
                  <input
                    className="mb-4 mt-2 outline-rose-300 px-3 py-1 rounded-md border "
                    type="number"
                    placeholder={"Enter an ID..."}
                  />
                </div>

                {/* right panel  */}
                <div className="w-4/12 flex flex-col p-4 gap-4">
                  <div className="w-full p-4 h-40 text-stone-600 bg-rose-300 rounded-lg">
                    Image placeholder
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center">
              <Button className="px-6 py-1 mt-4 bg-rose-300 ">HOLD</Button>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default function Hold() {
  return (
    <PlatformLayout>
      <PageContents />
    </PlatformLayout>
  );
}
