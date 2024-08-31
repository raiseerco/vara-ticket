"use client";

import { META, PROGRAM_ID } from "@/utils/constants";
import { ProgramMetadata, ReadStateParams } from "@gear-js/api";
// import { useAccount, useApi } from "@gear-js/react-hooks";
import { useEffect, useState } from "react";

import Loader from "@/components/Loader";
import MyEventCard from "@/components/MyEventCard";
import PlatformLayout from "../layouts/PlatformLayout";
import { useApisContext } from "@/contexts/ApisContext";

// import dynamic from "next/dynamic";

// const useApisContext = dynamic(() =>
//   import( "@/contexts/ApisContext").then((mod) => mod.ApisProvider), {
//     ssr: false, // Esto asegura que se cargue solo en el cliente
//   }
// );

function PageContents() {
  const { isApiReady, api, isAppReady, isAccountReady, account } =
    useApisContext();
  const [fullState, setFullState] = useState<any[]>([]);
  const [finishedEvents, setFinishedEvents] = useState<any[]>([]);
  const [showRunning, setShowRunning] = useState<boolean>(true);

  useEffect(() => {
    const metadata = ProgramMetadata.from(META);

    if (!api || !isAppReady || !metadata || !isAccountReady) return;

    const getState = () => {
      // @ts-ignore
      const params: ReadStateParams = {
        programId: PROGRAM_ID,
      };

      api.programState
        .read(params, metadata)
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

            const allItems = state.evStateInfo.map(([_, arr]) => arr).flat();
            // console.log(
            //   "all items  ",
            //   allItems.map((e) => e[1])
            // );

            // @ts-ignore
            // setFullState(state?.evStateInfo[0][1]);
            const eventsCreatedByMe = allItems
              .map((e) => e[1])
              .filter((r) => r.creator === account.decodedAddress);
            setFullState(eventsCreatedByMe.filter((i) => i.running));
            setFinishedEvents(eventsCreatedByMe.filter((i) => !i.running));
            // events i have created
            console.log("events ALL:", allItems);
            console.log("events I have created:", eventsCreatedByMe);

            // @ts-ignore
            console.log("State from contract:", state.evStateInfo);
            // @ts-ignore
            console.log("full state:", state?.evStateInfo[0][1]);
          } else {
            console.error("Unexpected state format:", state);
          }
        })
        .catch(({ message }: Error) => console.log("error ", message));
    };

    getState();
  }, [api, isAppReady]);

  if (!isAppReady) {
    return <Loader />;
  }

  return (
    <>
      <div className="w-full flex text-xs justify-center gap-6 px-4 pt-4 bg-stone-50  ">
        <button
          className="px-3 py-2 bg-rose-200 rounded-sm"
          onClick={() => setShowRunning(true)}
        >
          Active Events
        </button>
        <button
          className="px-3 py-2 bg-rose-50 rounded-sm"
          onClick={() => setShowRunning(false)}
        >
          Finished Events
        </button>
      </div>
      {showRunning ? (
        <div className="gap-6 pt-8 flex flex-wrap justify-center">
          {fullState.map((eventItem, k) => {
            return (
              <div key={k}>
                <MyEventCard
                  name={eventItem.name}
                  description={eventItem.description}
                  date={eventItem.date}
                  creator={eventItem.creator}
                  eventId={eventItem.eventId}
                  ticketsSold={
                    eventItem.numberOfTickets - eventItem.ticketsLeft
                  }
                  ticketsLeft={eventItem.ticketsLeft}
                />
              </div>
            );
          })}
        </div>
      ) : (
        <div className="gap-6 pt-8 flex flex-wrap justify-center">
          {finishedEvents.map((eventItem, k) => {
            return (
              <div key={k}>
                <MyEventCard
                  name={eventItem.name}
                  description={eventItem.description}
                  date={eventItem.date}
                  creator={eventItem.creator}
                  eventId={eventItem.eventId}
                  ticketsSold={
                    eventItem.numberOfTickets - eventItem.ticketsLeft
                  }
                  ticketsLeft={eventItem.ticketsLeft}
                />
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}

export default function MyEvents() {
  return (
    <PlatformLayout>
      <PageContents />
    </PlatformLayout>
  );
}
