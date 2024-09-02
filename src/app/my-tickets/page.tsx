"use client";

import { META, PROGRAM_ID } from "@/utils/constants";
import { ProgramMetadata, ReadStateParams } from "@gear-js/api";
import { useAccount, useApi } from "@gear-js/react-hooks";
import { useEffect, useState } from "react";

import EventCard from "@/components/EventCard";
import Loader from "@/components/Loader";
import PlatformLayout from "../layouts/PlatformLayout";
import TicketCard from "@/components/TicketCard";

function PageContents() {
  const { isApiReady, api } = useApi();
  const { isAccountReady, account } = useAccount();
  const [fullState, setFullState] = useState<any[]>([]);
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

            const allItems = state.evStateInfo.map(([_, arr]) => arr).flat();
            const flatItems = allItems.map((e) => e[1]);
            console.log("all items  ", flatItems);

            const filteredItems = flatItems.filter((e) =>
              e.buyers.find((f) => f === account.decodedAddress)
            );
            // @ts-ignore
            setFullState(filteredItems);
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
          return (
            <div key={k}>
              <TicketCard
                name={eventItem.name}
                description={eventItem.description}
                creator={eventItem.creator}
                date={eventItem.date}
                eventId={`${eventItem.eventId}`}
                numberOfTickets={eventItem.numberOfTickets}
                ticketsLeft={eventItem.ticketsLeft}
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
