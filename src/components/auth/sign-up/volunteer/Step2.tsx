"use client";
import { Input } from "@/components";
import { GenderType } from "@/types";
import { useState } from "react";
export const VolunteerStep2 = () => {
  const [gender, setGender] = useState<GenderType>("m");
  return (
    <>
      <div className="flex flex-row gap-4">
        <Input label="Овог" type="text" name="lastName" required />
        <Input label="Нэр" type="text" name="firstName" required />
      </div>
      <Input label="Төрсөн өдөр" type="date" name="birthday" />
      <div className="flex flex-col w-full gap-2">
        <label className="font-medium text-lg">Хүйс</label>
        <div className="flex flex-row gap-12">
          <div
            className="flex flex-row gap-2 items-center cursor-pointer"
            onClick={() => setGender("m")}
          >
            <input
              type="radio"
              id="m"
              name="gender"
              value="m"
              className={`${
                gender == "m" ? "bg-primary" : ""
              } w-4 h-4 rounded-full  border-2 border-primary transition-all`}
            />
            <label htmlFor="m">Эр</label>
          </div>
          <div
            className="flex flex-row gap-2 items-center cursor-pointer"
            onClick={() => setGender("f")}
          >
            <input
              type="radio"
              id="f"
              name="gender"
              value="f"
              className={`${
                gender == "f" ? "bg-primary" : ""
              } w-4 h-4 rounded-full  border-2 border-primary transition-all`}
            />
            <label>Эм</label>
          </div>
          {/* <div
            className="flex flex-row gap-2 items-center cursor-pointer"
            onClick={() => setGender("other")}
          >
            <input
              type="radio"
              id="other"
              name="gender"
              value="other"
              className={`${
                gender == "other" ? "bg-primary" : ""
              } w-4 h-4 rounded-full  border-2 border-primary transition-all`}
            />
            <label>Бусад</label>
          </div> */}
        </div>
      </div>
      <Input
        label="Регистрийн дугаар"
        placeholder="АА12341234"
        title="Регистрийн дугаараа бүрэн бөглөнө үү. АА12341234 байх ёстой"
        type="text"
        pattern="[a-zA-Z]{2}\d{8}"
        required
        name="registerNumber"
      />
    </>
  );
};
