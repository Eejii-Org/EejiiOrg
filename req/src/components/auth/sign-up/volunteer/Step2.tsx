"use client";
import { Input } from "@/components";
import { UserType } from "@/types";
export const VolunteerStep2 = ({ userDetail }: { userDetail: UserType }) => {
  return (
    <>
      <div className="flex flex-row gap-4">
        <Input
          label="Овог"
          type="text"
          defaultValue={userDetail.lastName}
          name="lastName"
          required
        />
        <Input
          label="Нэр"
          type="text"
          defaultValue={userDetail.firstName}
          name="firstName"
          required
        />
      </div>
      <Input
        label="Төрсөн өдөр"
        type="date"
        defaultValue={userDetail.birthday}
        name="birthday"
      />
      <div className="flex flex-col w-full gap-2">
        <label className="font-medium text-lg">Хүйс</label>
        <div className="flex flex-row gap-12">
          <div className="flex flex-row gap-2 items-center cursor-pointer">
            <input
              type="radio"
              id="m"
              name="gender"
              defaultChecked={userDetail.gender == "m"}
              value="m"
              className={`w-4 h-4 rounded-full  border-2 border-primary transition-all`}
            />
            <label htmlFor="m">Эр</label>
          </div>
          <div className="flex flex-row gap-2 items-center cursor-pointer">
            <input
              type="radio"
              id="f"
              name="gender"
              defaultChecked={userDetail.gender == "f"}
              value="f"
              className={`w-4 h-4 rounded-full  border-2 border-primary transition-all`}
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
        defaultValue={userDetail.registerNumber}
        required
        name="registerNumber"
      />
    </>
  );
};
