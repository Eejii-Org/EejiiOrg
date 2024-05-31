"use client";

import { signUp } from "@/actions";
import {
  Button,
  UserTypeSelect,
  VolunteerStep1,
  VolunteerStep2,
  VolunteerStep3,
  VolunteerStep4,
} from "@/components";
import { GenderType, UserType } from "@/types";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo, useState } from "react";

type UserTypes = "supporter" | "partner" | "volunteer";

const Fallback = () => {
  return <>placeholder</>;
};

const SignUp = () => {
  return (
    <Suspense fallback={<Fallback />}>
      <Comp />
    </Suspense>
  );
};

const Comp = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [errorMessage, setErrorMessage] = useState("");
  const [signUpLoading, setSignUpLoading] = useState(false);
  const [userDetail, setUserDetail] = useState<UserType>({
    email: "",
    plainPassword: "",
    phoneNumber: "",
    username: "",
    firstName: "",
    lastName: "",
    gender: "m",
    bio: "",
    registerNumber: "",
    birthday: "",
    address: {
      country: "Mongolia",
      countryCode: "MN",
      region: "",
      regionCode: "UB-BZD",
      address: "",
    },
  });
  const [userType, setUserType] = useState<
    "supporter" | "partner" | "volunteer" | null
  >(null);
  const [step, setStep] = useState<number>(-1);
  const steps = useMemo(() => {
    if (!userType) return 3;
    return inputs[userType].length;
  }, [userType]);
  useEffect(() => {
    if (userType) return;
    const uType = searchParams.get("user");
    if (uType) {
      setUserType(uType as UserTypes);
      setStep(1);
    } else {
      setStep(0);
    }
  }, [searchParams, userType]);
  return (
    <section className="container flex flex-col flex-1 h-full pb-16">
      <div className="flex items-center justify-center">
        {step == 0 ? (
          <UserTypeSelect
            onSelect={(type) => {
              setUserType(type as UserTypes);
              setStep(1);
            }}
          />
        ) : (
          <form
            className="w-full md:min-w-[800px] flex flex-col gap-12 items-center"
            action={async (formData) => {
              setErrorMessage("");
              if (step == 1) {
                const email = formData.get("email") as string;
                const plainPassword = formData.get("plainPassword") as string;
                const phoneNumber = formData.get("phoneNumber") as string;
                const username = formData.get("username") as string;
                setUserDetail({
                  ...userDetail,
                  email,
                  plainPassword,
                  phoneNumber,
                  username,
                });
                setStep(step + 1);
                return;
              } else if (step == 2) {
                const firstName = formData.get("firstName") as string;
                const lastName = formData.get("lastName") as string;
                const birthday = formData.get("birthday") as string;
                const gender = formData.get("gender") as GenderType;
                const registerNumber = formData.get("registerNumber") as string;
                setUserDetail({
                  ...userDetail,
                  firstName,
                  lastName,
                  gender,
                  registerNumber,
                  birthday,
                });
                setStep(step + 1);
              } else if (step == 3) {
                const region = formData.get("region") as string;
                const address = formData.get("address") as string;
                setUserDetail({
                  ...userDetail,
                  address: {
                    ...userDetail.address,
                    region,
                    address,
                  },
                });
                setStep(step + 1);
              } else {
                const bio = formData.get("bio") as string;
                const newUser = { ...userDetail, bio };
                setUserDetail(newUser);
                try {
                  setSignUpLoading(true);
                  await signUp(newUser);
                  setSignUpLoading(false);
                  router.push("/auth/sign-up/success");
                } catch (e) {
                  console.log(e);
                  setSignUpLoading(false);
                  setErrorMessage(
                    "Имэйл бүртгэлтэй байна. Та дараа дахин оролдоно уу."
                  );
                }
              }
            }}
          >
            <div className="flex flex-col relative w-full">
              <div className="flex items-center justify-between">
                {userType &&
                  inputs?.[userType].map(({ label }, index: number) => (
                    <div
                      className={`flex-1 flex flex-col gap-2 items-center ${
                        index + 1 == step ? "flex" : "hidden md:flex"
                      }`}
                      key={index}
                    >
                      <div
                        className={`w-14 h-14 rounded-full flex items-center justify-center transition-all relative z-10 ${
                          index + 1 <= step
                            ? "bg-primary text-white"
                            : "bg-backgroundSecondary "
                        }`}
                        key={index}
                      >
                        {index + 1}
                      </div>
                      <label className="text-center">{label}</label>
                    </div>
                  ))}
              </div>
              <div
                className="absolute w-full top-[26px] h-1"
                style={{
                  padding: `0px ${100 / (2 * steps)}%`,
                }}
              >
                <div className={`bg-backgroundSecondary w-[calc(100%)] h-1`} />
                <div
                  className={`bg-primary h-1 transition-all -mt-1`}
                  style={{
                    width: Math.floor((100 / (steps - 1)) * (step - 1)) + "%",
                  }}
                ></div>
              </div>
            </div>
            <div className="flex flex-col gap-4 md:max-w-[600px] w-full">
              {userType == "volunteer" ? (
                <>
                  {step == 1 ? (
                    <VolunteerStep1 userDetail={userDetail} />
                  ) : step == 2 ? (
                    <VolunteerStep2 />
                  ) : step == 3 ? (
                    <VolunteerStep3 />
                  ) : (
                    <VolunteerStep4 />
                  )}
                </>
              ) : (
                <p>Supporter</p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              {errorMessage && (
                <p className="text-red-600 text-md">{errorMessage}</p>
              )}
              <div className="flex flex-row gap-4 w-full md:w-fit">
                <Button
                  className="border border-primary bg-transparent !text-primary hover:bg-gray-200 flex-1 md:flex-auto md:min-w-64"
                  type="button"
                  onClick={() =>
                    setStep(step == null ? 0 : step == 0 ? step : step - 1)
                  }
                >
                  Буцах
                </Button>
                <Button
                  type="submit"
                  className="flex-1 md:flex-auto md:min-w-64"
                >
                  {step == steps ? "Бүртгүүлэх" : "Үргэлжлүүлэх"}
                </Button>
              </div>
            </div>
          </form>
        )}
      </div>
      {signUpLoading && (
        <div className=" z-50 w-screen h-screen left-0 top-0 absolute bg-black/50 flex items-center justify-center">
          <p className="text-white font-medium text-lg">Loading...</p>
        </div>
      )}
    </section>
  );
};

export default SignUp;

/* 
  Volunteer Register
*/

// {
//   "email": "tsolmondark@gmail.com",
//   "plainPassword": "sunshine",
//   "phoneNumber": "88548411",
//   "username": "Tsolmoxn",
//   "firstName": "tsomo",
//   "lastName": "horloo",
//   "gender": "m",
//   "bio": "My name is tsolmon",
//   "registerNumber": "UP00223344",
//   "address": {
//     "country": "Mongolia",
//     "city": "Ulanbator",
//     "countryCode": "MN",
//     "province": "Bayanzurh",
//     "provinceCode": "UB-BZD",
//     "state": "Tov",
//     "street": "string",
//     "description": "string",
//     "district": "string"
//   }
// //   "skills": [
// //     {}
// //   ]
// }

/* 
  Partner Register
*/
// {
//   "email": "bgnj.mn@gmail.com",
//   "plainPassword": "sunshine",
//   "phoneNumber": "80267299",
//   "username": "Quizzy",
//   "bio": "Hi this is quizzy",
//   "organizationType": "non-profit",
//   "address": {
//     "country": "Mongolia",
//     "city": "Ulanbator",
//     "countryCode": "MN",
//     "province": "Bayanzurh",
//     "provinceCode": "UB-BZD",
//     "state": "string",
//     "street": "string",
//     "description": "string",
//     "district": "string"
//   }
// }

// const inputs = {
// supporter: [
//   {
//     label: "Таны нөхцөл байдал",
//     type: "select",
//     info: [
//       {
//         icon: <PersonIcon />,
//         label: "Хувь хүн",
//         type: "person",
//       },
//       {
//         icon: <PartnerIcon />,
//         label: "ТББ & ОУ байгууллагын салбар байгууллага",
//         type: "company",
//       },
//     ],
//   },
//   {
//     label: "Хувийн мэдээлэл",
//     type: "inputs",
//     info: [
//       {
//         label: "Нэр",
//         type: "text",
//         key: "username"
//       },
//       {
//         label: "Хаяг",
//         type: "email",
//         key: "email",
//       },
//       {
//         label: "Утасны дугаар",
//         type: "number",
//         key: "phoneNumber"
//       },
//     ],
//   },
//   ,
//   {
//     label: "Танилцуулга",
//     type: "textarea",
//     info: [
//       {
//         label: "Танилцуулга",
//         type: "textarea",
//         key: "bio"
//       },
//     ],
//   },
// ],

//   supporter: [
//     {
//       label: "Таны нөхцөл байдал",
//       type: "select",
//       info: [
//         {
//           icon: <PersonIcon />,
//           label: "Хувь хүн",
//           type: "person",
//         },
//         {
//           icon: <PartnerIcon />,
//           label: "ТББ & ОУ байгууллагын салбар байгууллага",
//           type: "company",
//         },
//       ],
//     },
//   ],
//   volunteer: [
//     {
//       label: "Холбоо барих",
//       type: "inputs",
//       info: [
//         {
//           label: "Дуудах нэр",
//           type: "text",
//           key: "username",
//         },
//         {
//           label: "Имэйл",
//           type: "email",
//           key: "email",
//         },
//         {
//           label: "Утасны дугаар",
//           type: "number",
//           key: "phoneNumber",
//         },
//       ],
//     },
//     {
//       label: "Хувийн мэдээлэл",
//       type: "inputs",
//       info: [
//         {
//           label: "Овог",
//           type: "text",
//           key: "lastName",
//         },
//         {
//           label: "Нэр",
//           type: "text",
//           key: "firstname",
//         },
//         {
//           label: "Төрсөн өдөр",
//           type: "date",
//           key: "birthDate",
//         },
//         {
//           label: "Хүйс",
//           type: "gender",
//           key: "gender",
//         },
//         {
//           label: "Регистрийн дугаар",
//           type: "register",
//           key: "registerNumber",
//         },
//       ],
//     },
//     {
//       label: "Гэрийн хаяг",
//       type: "inputs",
//       info: [
//         {
//           label: "Бүс нутаг",
//           type: "select",
//           key: "area",
//         },
//         {
//           label: "Гэрийн хаяг",
//           type: "text",
//           key: "address",
//         },
//       ],
//     },
//     {
//       label: "Танилцуулга",
//       type: "inputs",
//       info: [
//         {
//           label: "Танилцуулга",
//           type: "textarea",
//           key: "bio",
//         },
//       ],
//     },
//   ],
// };

const inputs = {
  volunteer: [
    {
      label: "Холбоо барих",
    },
    {
      label: "Хувийн мэдээлэл",
    },
    {
      label: "Гэрийн хаяг",
    },
    {
      label: "Танилцуулга",
    },
  ],
  supporter: [
    {
      label: "Холбоо барих",
    },
    {
      label: "Хувийн мэдээлэл",
    },
    {
      label: "Гэрийн хаяг",
    },
    {
      label: "Танилцуулга",
    },
  ],
  partner: [
    {
      label: "Холбоо барих",
    },
    {
      label: "Хувийн мэдээлэл",
    },
    {
      label: "Гэрийн хаяг",
    },
    {
      label: "Танилцуулга",
    },
  ],
};
