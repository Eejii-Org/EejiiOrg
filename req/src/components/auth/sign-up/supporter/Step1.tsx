"use client";
import { PartnerIcon, PersonIcon } from "@/components";
import { UserType } from "@/types";
import { useState } from "react";

export const SupporterStep1 = ({ userDetail }: { userDetail: UserType }) => {
  const [selectedUser, setSelectedUser] = useState("");
  const userTypes = [
    {
      icon: <PersonIcon />,
      type: "Хувь хүн",
      value: "individual",
    },
    {
      icon: <PartnerIcon />,
      type: "ТББ & ОУ байгууллагын салбар байгууллага",
      value: "company",
    },
  ];
  return (
    <>
      <div className="flex flex-col gap-4 md:gap-8 items-center justify-center w-full">
        {userTypes.map((ut, index) => (
          <div
            key={index}
            className="flex flex-col gap-1.5 bg-white drop-shadow-card py-4 md:py-14 flex-1 items-center justify-center rounded-2xl border hover:bg-black/5 transition-all cursor-pointer w-full"
            onClick={() => setSelectedUser(ut.value)}
          >
            <div
              className={`absolute top-4 left-4 ${
                selectedUser == ut.value ? "bg-primary" : " bg-gray-100"
              } w-4 h-4 rounded-full  border-2 border-primary transition-all`}
            />
            {ut.icon}
            <h3 className="capitalize text-center">{ut.type}</h3>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center">
        <select
          name="organizationType"
          required
          value={userDetail.organizationType || selectedUser}
          className="w-[1px] h-[1px] outline-none opacity-0"
        >
          <option value="">--Select UserType--</option>
          {userTypes.map((ut, index) => (
            <option value={ut.value} key={index}>
              {ut.value}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};
