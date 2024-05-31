"use client";

import { useMemo, useState } from "react";
import { Card } from "../card";
import { Search } from "../icons";

export const MediaSearch = ({ medias }: { medias: any[] }) => {
  const [searchInput, setSearchInput] = useState("");
  const results = useMemo(() => {
    if (searchInput == "") return medias;
    return medias.filter(
      (media) =>
        media.title.includes(searchInput) || media.body.includes(searchInput)
    );
  }, [searchInput, medias]);
  return (
    <div className="w-full">
      <div className="flex justify-between mb-3 md:mb-8 mx-3 px-4 py-5 md:py-5 md:px-6 bg-white shadow-md rounded-full">
        <input
          className="w-full outline-none text-lg"
          placeholder="Хайх"
          onChange={(e) => {
            setSearchInput(e.target.value);
          }}
        />
        <Search />
      </div>
      <div className="w-full grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6  gap-y-12">
        {results.length == 0 && <p> Хайлт олдсонгүй</p>}
        {results.map((media, index) => (
          <div key={index} className="flex">
            <Card cardType="media" cardData={media} />
          </div>
        ))}
      </div>
    </div>
  );
};
