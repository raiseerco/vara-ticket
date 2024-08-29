"use client";

import React from "react";

export default function Loader() {
  return (
    <div className="flex flex-col h-screen w-full items-center justify-center bg-transparent">
      <div className="animate-spin rounded-full h-10 w-10 border-b-4 border-rose-400"></div>
    </div>
  );
}
