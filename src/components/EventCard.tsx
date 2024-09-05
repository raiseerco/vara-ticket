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
  CIDImage: string;
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
  CIDImage,
  date,
  eventId,
  // buyers  ,
  // running  ,
  // metadata  ,
  //  tokenId  ,
  // idCounter  ,
  // ticketFtId  ,
}) => {
  const imgg = `https://ipfs.io/ipfs/${CIDImage}`;
  return (
    <Link
      className="flex h-70 items-center gap-2 bg-stone-200 dark:bg-stone-800 bg-opacity-25 shadow-md rounded-lg
        text-sm font-medium text-gray-500 transition-colors dark:text-stone-400"
      href={`/event/${creator}-${eventId}`}
    >
      <div className="rounded-lg p-3">
        <div
          style={{
            backgroundImage: `url(${imgg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
          className="w-72 h-40 mb-2 flex justify-end items-end rounded-lg bg-rose-300 dark:bg-rose-400"
        >
          <span
            style={{ backgroundColor: "#c578aca1" }}
            className="px-3 py-2  rounded-tl-lg rounded-br-lg text-black dark:text-rose-200 text-xl tracking-tight"
          >
            {name}
          </span>
        </div>

        <div
          className="text-xs tracking-tight
        w-[280px]
        font-mono truncate overflow-hidden whitespace-nowrap"
        >
          {description || <i>no description set</i>}
        </div>

        <div className="flex justify-between py-2 align-mi">
          <Button className="bg-rose-400 text-xs h-6 px-3 rounded-sm">
            BUY
          </Button>
          <small
            className="bg-stone-200 dark:bg-rose-500 dark:text-black
              px-2 py-1 rounded-md"
          >
            {ticketsLeft | 0}/{numberOfTickets} tickets left
          </small>
        </div>

        <p className="text-right text-xs italic font-light mt-2">
          Creator: {shortAddress(creator)}
          {date.toString() === "0" ||
            (!date && <>at {new Date(date)?.toISOString()}</>)}
        </p>
      </div>
    </Link>
  );
};

export default EventCard;
