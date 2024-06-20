"use client";

import React from "react";
import { ArrowLeft } from "./icons";

export const GoBack = ({ children }: { children?: React.ReactNode }) => {
  return (
    <button
      onClick={() => window.history.back()}
      className="flex flex-row gap-2 items-center"
    >
      <div className="p-2 bg-white rounded-full border">
        <ArrowLeft color="#000000" />
      </div>
      {children && children}
    </button>
  );
};
