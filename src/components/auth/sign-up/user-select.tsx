"use client";
import Link from "next/link";
import { PersonIcon, PartnerIcon, VolunteerIcon } from "../../icons";
import { Button } from "@/components/button";
import { useEffect, useState } from "react";

export const UserTypeSelect = ({
  onSelect,
}: {
  onSelect: (t: string) => void;
}) => {
  const [selectedUserType, setSeletedUserType] = useState<string | null>(null);
  const userTypes = [
    {
      icon: <PersonIcon />,
      label: "Дэмжигч",
      type: "supporter",
      disabled: false,
    },
    {
      icon: <PartnerIcon />,
      label: "Хамтрагч",
      type: "partner",
      disabled: true,
    },
    {
      icon: <VolunteerIcon />,
      label: "Сайн дурын ажилтан",
      type: "volunteer",
      disabled: false,
    },
  ];
  return (
    <section className="container flex flex-col flex-1 justify-center h-full">
      <h2 className="text-2xl font-semibold text-black/65 text-center pb-16">
        Та доорх хэрэглэгчдийн төрлөөс сонгон цааш үргэлжлүүлнэ үү.
      </h2>
      <div className="flex flex-col md:flex-row gap-4 md:gap-16 items-center justify-center">
        {userTypes.map(({ icon, type, disabled }, index) => (
          <div
            onClick={() => {
              !disabled && setSeletedUserType(type);
            }}
            className={`flex flex-col gap-1.5 bg-white drop-shadow-card py-4 md:py-16 flex-1 items-center justify-center rounded-2xl border-2 transition-all cursor-pointer w-full md:w-auto relative ${
              disabled ? "opacity-50" : "hover:bg-black/5 "
            } ${type == selectedUserType ? "border-primary" : ""}`}
            key={index}
          >
            <div
              className={`absolute top-4 left-4 ${
                selectedUserType == type ? "bg-primary" : " bg-gray-100"
              } w-4 h-4 rounded-full  border-2 border-primary transition-all`}
            />
            {icon}
            <h3 className="capitalize">{type}</h3>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-8">
        <Button
          disabled={!selectedUserType}
          className={`w-80 ${
            selectedUserType === null
              ? "bg-[#8AB8BB] cursor-default"
              : "cursor-pointer"
          } `}
          onClick={() => {
            if (!selectedUserType) return;
            if (selectedUserType == "partner") {
              window.location.href = "https://www.partner.eejii.org";
              return;
            }
            onSelect(selectedUserType);
          }}
        >
          Сонгох
        </Button>
      </div>
    </section>
  );
};
