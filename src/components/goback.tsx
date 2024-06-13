"use client";

import { ArrowLeft } from "./icons";

export const GoBack = () => {
  return (
    <button
      onClick={() => window.history.back()}
      className="p-2 bg-white rounded-full border"
    >
      <ArrowLeft color="#000000" />
    </button>
  );
};
