"use client";
import { MainLayout } from "@/components";
import { useAuth } from "@/providers";
import axios from "axios";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

const ProfilePage = () => {
  const { user, userLoading } = useAuth();
  const [certificateData, setCertificateData] = useState(null);
  useEffect(() => {
    const getCertificate = async () => {
      if (!user) return;
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/certificates/${user.id}`
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
    return redirect("/");
  }
  return (
    <MainLayout>
      <div className="bg-primary  text-white h-64 text-5xl font-semibold">
        <div className="container flex items-center h-full leading-normal">
          Welcome {user.username}!
          <br />
          Let&apos;s create an earth full of love together
        </div>
      </div>
      <div className="container flex flex-row gap-4 -mt-8">
        <div className=" w-44 h-44 rounded-full relative overflow-hidden border-[4px] border-white">
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
          <div className="text-3xl font-medium">
            {user.firstName} {user.lastName}
          </div>
          <div className="text-xl">{user.type}</div>
        </div>
      </div>
      <div className="container max-md:mt-5 pb-[40px] md:py-[60px] flex flex-row gap-8">
        {/* Left Section for Event Detail */}
        <div className="w-[360px] flex flex-col gap-4 items-center bg-white p-8 border rounded-2xl">
          <Image
            src={
              user?.level
                ? `/assets/volunteer/level_${user?.level}.png`
                : "/assets/placeholder.svg"
            }
            alt="volunteerlevel"
            className="object-contain"
            height={98}
            width={98}
          />
          <div
            className={`uppercase py-[2px] px-7 rounded-full text-white font-medium ${
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
          <div className="w-full flex flex-col gap-3">
            <div className="border-b w-full pb-1 border-black/20">Био</div>
            <div>{user.bio}</div>
          </div>
        </div>
        {/* Right Section for Event Detail */}
        <div className="flex flex-1 flex-col gap-6 bg-white p-8 border rounded-2xl">
          <div className="font-semibold text-2xl">Сертификат</div>
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
              <div className="text-center font-medium">
                Certificate will be here
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ProfilePage;
