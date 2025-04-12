"use client";

import { UserType } from "@/types";

export const VolunteerStep4 = ({ userDetail }: { userDetail: UserType }) => {
  return (
    <>
      <div className="flex flex-col w-full gap-2">
        <label className="font-medium text-lg">Танилцуулга</label>
        <textarea
          defaultValue={userDetail.bio}
          name="bio"
          placeholder="Намайг * гэдэг. Чөлөөт цагаараа * хийдэг."
          className="w-full rounded-2xl py-[14px] px-4 border border-[#CCCCCC] outline-primary min-h-64"
        />
      </div>
    </>
  );
};
