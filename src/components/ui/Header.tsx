import { CubeIcon, FileIcon, GlobeIcon, HomeIcon } from "@radix-ui/react-icons";

import { AccountInfo } from "../AccountInfo";
import Link from "next/link";
import React from "react";

type Props = {
  isAccountVisible: boolean;
};

export function Header({ isAccountVisible }: Props) {
  return (
    <header
      className="fixed top-0 left-0 right-0 h-14 z-30 flex justify-between text-black dark:text-stone-300
    dark:bg-stone-800 bg-stone-100 shadow-md items-center px-6"
    >
      <div id="logo" className="flex-shrink-0">
        <Link id="logo" href="/">
          <span className="font-black text-rose-800 dark:text-rose-500 font-mono">
            <i>vticket</i>
          </span>
        </Link>
      </div>

      {/* links */}
      <div id="links" className="flex-grow flex justify-center items-center">
        <Link
          className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-gray-500 transition-colors hover:bg-rose-100 hover:text-gray-900 focus:bg-rose-100 focus:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50"
          href="/events"
        >
          <HomeIcon />
          Events
        </Link>

        {/* // FIXME goes into profile */}
        {/* <Link
          className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-gray-500 transition-colors hover:bg-rose-100 hover:text-gray-900 focus:bg-rose-100 focus:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50"
          href="#"
        >
          <BellIcon />
          Notifications
        </Link> */}

        <Link
          className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-gray-500 transition-colors hover:bg-rose-100 hover:text-gray-900 focus:bg-rose-100 focus:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50"
          href="/create"
        >
          <FileIcon />
          Create event
        </Link>

        <Link
          className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-gray-500 transition-colors hover:bg-rose-100 hover:text-gray-900 focus:bg-rose-100 focus:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50"
          href="/holdings"
        >
          <GlobeIcon />
          My tickets
        </Link>

        <Link
          className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-gray-500 transition-colors hover:bg-rose-100 hover:text-gray-900 focus:bg-rose-100 focus:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50"
          href="/holdings"
        >
          <CubeIcon />
          My events
        </Link>
      </div>
      {isAccountVisible && (
        <div id="account" className="flex-shrink-0">
          <AccountInfo />
        </div>
      )}
    </header>
  );
}
