"use client";
import { MainLayout } from "@/components";
import { useAuth } from "@/providers";
import { toDateString } from "@/utils";
import axios from "axios";
import { getCookie } from "cookies-next";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

const ProfilePage = () => {
  const { user, userLoading } = useAuth();
  const [certificateData, setCertificateData] = useState(null);
  console.log(userLoading);
  useEffect(() => {
    const getCertificate = async () => {
      if (!user) return;
      const token = getCookie("token");
      if (!token) return;
      try {
        console.log(user.id);
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/certificates`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(res.data);
        if (res.data.code == 0) {
          setCertificateData(null);
        } else {
          setCertificateData(res.data);
        }
      } catch (e) {
        console.error(e);
        setCertificateData(null);
      }
    };
    getCertificate();
  }, [user]);
  if (!user) {
    if (userLoading) {
      return <div>Loading...</div>;
    }
    return redirect("/auth");
  }
  return (
    <MainLayout>
      <div className="bg-primary  text-white h-40  md:h-64 text-xl md:text-3xl lg:text-5xl font-semibold">
        <div className="container flex items-center h-full leading-normal">
          Welcome {user.username}!
          <br />
          Let&apos;s create an earth full of love together
        </div>
      </div>
      <div className="container flex flex-row gap-4 -mt-8">
        <div className=" min-h-32 min-w-32 lg:min-w-44 lg:min-h-44 rounded-full relative overflow-hidden border-[4px] border-white">
          <Image
            src={
              user.images?.find((img) => img.type == "main")?.path ||
              "/assets/placeholder.svg"
            }
            fill
            alt="userProfile"
          />
        </div>
        <div className="flex flex-col capitalize justify-center gap-3">
          <div className="text-xl lg:text-3xl font-medium">
            {user.firstName} {user.lastName}
          </div>
          <div className="text-lg lg:text-xl">{user.type}</div>
        </div>
      </div>
      <div className="container max-md:mt-5 pb-[40px] md:py-[60px] flex flex-col md:flex-row gap-8">
        {/* Left Section for Event Detail */}
        <div className="w-full md:w-[360px] flex flex-row lg:flex-col gap-4 lg:items-center bg-white p-4 lg:p-8 border rounded-2xl">
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 lg:w-24 lg:h-24 relative">
              <Image
                src={
                  user?.level
                    ? `/assets/volunteer/level_${user?.level}.png`
                    : "/assets/placeholder.svg"
                }
                alt="volunteerlevel"
                fill
                className="object-contain"
              />
            </div>
            <div
              className={`uppercase py-[2px] px-3 lg:px-7 whitespace-nowrap max-md:text-sm rounded-full text-white font-medium ${
                user?.level == 1
                  ? "bg-[#1F276F]"
                  : user?.level == 2
                  ? "bg-[#FEC01E]"
                  : user?.level == 3
                  ? "#FD3716"
                  : "#000"
              }`}
            >
              Level {user?.level}
            </div>
          </div>
          <div className="w-full flex flex-col gap-3">
            <div className="border-b w-full font-semibold pb-1 border-black/20">
              Био
            </div>
            <div className="text-md lg:text-lg">{user.bio}</div>
          </div>
        </div>
        {/* Right Section for Event Detail */}
        <div className="flex flex-1 flex-col gap-6 bg-white p-4 lg:p-8 border rounded-2xl">
          <div className="font-semibold text-lg lg:text-2xl">Сертификат</div>
          <div className="flex-1 flex items-center justify-center flex-col gap-4">
            {!certificateData ? (
              <>
                <div className="text-center font-medium">
                  Одоогоор сертификат аваагүй байна.
                  <br />
                  Арга хэмжээнд оролцсоныхоо дараа энэ хэсгээс сертификат болон
                  тодорхойлолтоо аваарай
                </div>
                <Image
                  src={"/assets/profile/certificate-not-found.webp"}
                  width={169}
                  height={149}
                  alt="Certificate Not Found"
                />
              </>
            ) : (
              <div className="flex-1 w-full max-h-[500px] overflow-y-scroll font-medium flex flex-col gap-4">
                {([...certificateData?.["hydra:member"]] as any)?.map(
                  (certificate: any, index: number) => (
                    <div
                      className="flex flex-col gap-2 items-center border p-4 rounded-2xl shadow-sm pointer"
                      key={index}
                    >
                      <div className="w-full flex flex-row gap-2 items-center">
                        <Image
                          src={
                            certificate?.event?.images.find(
                              (img: any) => img.type == "main"
                            )?.path || "/assets/placeholder.svg"
                          }
                          width={40}
                          height={40}
                          alt={certificate?.event?.title + "image"}
                        />
                        <div>{certificate?.event?.title}</div>
                      </div>
                      <div className=" text-black/70 text-md self-end">
                        {toDateString(certificate?.event?.startTime)}
                      </div>
                    </div>
                  )
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ProfilePage;
