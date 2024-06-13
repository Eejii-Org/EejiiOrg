"use client";

import { useEffect, useMemo, useState } from "react";
import { Card } from "../card";
import { Search } from "../icons";
import { useRouter } from "next/navigation";

export const MediaSearch = ({ medias }: { medias: any[] }) => {
  const [searchInput, setSearchInput] = useState("");
  const router = useRouter();
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      router.push(`/medias?page=1&q=${searchInput}`);
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [searchInput]);
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
        {medias.length == 0 && <p> Хайлт олдсонгүй</p>}
        {medias.map((media, index) => (
          <div key={index} className="flex">
            <Card cardType="media" cardData={media} />
          </div>
        ))}
      </div>
    </div>
  );
};
