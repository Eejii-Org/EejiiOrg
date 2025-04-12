"use client";
import { Input } from "@/components";
import { UserType } from "@/types";

export const VolunteerStep1 = ({ userDetail }: { userDetail: UserType }) => {
  return (
    <>
      <Input
        label="Дуудах нэр"
        defaultValue={userDetail.username}
        type="text"
        name="username"
        required
      />
      <Input
        label="Имэйл"
        type="email"
        autoComplete="email"
        defaultValue={userDetail.email}
        name="email"
        required
      />
      <Input
        label="Утасны дугаар"
        type="number"
        defaultValue={userDetail.phoneNumber}
        name="phoneNumber"
        required
      />
      <Input
        label="Нууц үг"
        type="password"
        defaultValue={userDetail.plainPassword}
        autoComplete="current-password"
        name="plainPassword"
        min={6}
        required
      />
    </>
  );
};
