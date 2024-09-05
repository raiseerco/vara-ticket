"use client";

import {
  META,
  META_MULTI,
  PROGRAM_ID,
  PROGRAM_ID_MULTI,
} from "@/utils/constants";
import { ProgramMetadata, ReadStateParams } from "@gear-js/api";
import { useEffect, useState } from "react";

import EventCard from "@/components/EventCard";
import Loader from "@/components/Loader";
import PlatformLayout from "../layouts/PlatformLayout";
import { useApisContext } from "@/contexts/ApisContext";

// import dynamic from "next/dynamic";

// const useApisContext = dynamic(() =>
//   import( "@/contexts/ApisContext").then((mod) => mod.ApisProvider), {
//     ssr: false, // Esto asegura que se cargue solo en el cliente
//   }
// );

function PageContents() {
  const { api, isAppReady } = useApisContext();
  const [fullState, setFullState] = useState<any[]>([]);

  useEffect(() => {
    const metadata = ProgramMetadata.from(META);

    if (!api || !isAppReady || !metadata) return;

    const getState = () => {
      // @ts-ignore
      const params: ReadStateParams = {
        programId: PROGRAM_ID,
      };

      api.programState
        .read(params, metadata)
        .then((result) => {
          const state = result.toJSON();
          if (!state) {
            console.log("vacio");
            return;
          }
          console.log("State from result:", state);

          // @ts-ignore
          if (Array.isArray(state.evStateInfo[0])) {
            // @ts-ignore

            const allItems = state.evStateInfo.map(([_, arr]) => arr).flat();
            console.log(
              "all items  ",
              allItems.map((e) => e[1])
            );
            // @ts-ignore
            // setFullState(state?.evStateInfo[0][1]);
            setFullState(allItems.map((e) => e[1]));
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
  }, [api, isAppReady]);

  if (!isAppReady) {
    return <Loader />;
  }

  return (
    <>
      <div className="gap-6 pt-8 flex flex-wrap justify-center">
        {fullState.map((eventItem, k) => {
          console.log("eventItem ", eventItem);
          return (
            <div key={k}>
              <EventCard
                name={eventItem.name}
                description={eventItem.description}
                creator={eventItem.creator}
                numberOfTickets={eventItem.numberOfTickets}
                ticketsLeft={eventItem.ticketsLeft}
                date={eventItem.eventInitDate}
                CIDImage={eventItem.eventImgUrl}
                eventId={`${eventItem.eventId}`}
              />
            </div>
          );
        })}
      </div>
    </>
  );
}

export default function Events() {
  return (
    <PlatformLayout>
      <PageContents />
    </PlatformLayout>
  );
}
