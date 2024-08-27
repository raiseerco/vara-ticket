import { localTime, shortAddress } from "@/lib/utils";

import { Button } from "./ui/Button";
import Link from "next/link";
import React from "react";

interface EventCardProps {
  name: string;
  description: string;
  creator: string;
  numberOfTickets: number;
  ticketsLeft: number;
  date: number;
  eventId: string;
  // buyers: string[] ;
  // running:boolean;
  // metadata: string[] ;
  //  tokenId: number;
  // idCounter: number;
  // ticketFtId:number;
}

const EventCard: React.FC<EventCardProps> = ({
  name,
  description,
  creator,
  numberOfTickets,
  ticketsLeft,
  date,
  eventId,
  // buyers  ,
  // running  ,
  // metadata  ,
  //  tokenId  ,
  // idCounter  ,
  // ticketFtId  ,
}) => {
  return (
    <>
      <Link
        className="flex items-center gap-2 bg-stone-200 dark:bg-stone-800 bg-opacity-25 shadow-md rounded-lg
   text-sm font-medium text-gray-500 transition-colors dark:text-stone-400"
        href={`/event/${eventId}`}
      >
        <div className="rounded-lg p-3 w-70 h-70">
          <div className="w-72 h-40 mb-2 flex justify-end items-end rounded-lg bg-rose-300 dark:bg-rose-400 ">
            <span className="px-3 py-2 text-black dark:text-rose-200 text-xl tracking-tight">
              {name}
            </span>
          </div>

          <p className="text-md tracking-tight font-mono">{description}</p>

          <div className="flex justify-between py-2 align-mi">
            <Button className="bg-rose-400 text-xs h-6 px-3 rounded-sm">
              BUY
            </Button>
            <small
              className="  bg-stone-200 dark:bg-rose-500 dark:text-black
            px-2 py-1 rounded-md"
            >
              {ticketsLeft | 0}/{numberOfTickets} tickets left
            </small>
          </div>

          <p className="text-right text-xs italic font-light mt-2">
            Creator: {shortAddress(creator)} at{" "}
            {localTime(date.toString(), "America/Montevideo")}
          </p>
        </div>
      </Link>
    </>
  );
};

export default EventCard;
