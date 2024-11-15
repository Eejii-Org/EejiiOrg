"use client";
import { useState, Suspense } from "react";
import { ThankYouIllustration } from "@/components";
import { api } from "@/actions";
import { Button, message } from "antd";
import { useSearchParams } from "next/navigation";

const Comp = () => {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState<boolean>(false);

  // Handle Submit Resend email
  const resend = async () => {
    const email = searchParams.get("email");

    setLoading(true);
    if (!email) return;

    console.log("email", email);

    await api.post("/api/users/verificationToken", { email: email });
    message.success("Амжилттай илгээгдлээ!");
    setLoading(false);
  };

  return (
    <section className="flex items-center justify-center flex-col gap-4 px-4">
      <div className="w-[256px] md:w-[384px]">
        <ThankYouIllustration />
      </div>
      <h1 className="text-xl md:text-3xl text-center font-medium text-[#1E1E1E]">
        Имэйлээ баталгаажуулна уу!
      </h1>
      <p className="text-md md:text-[18px] leading-normal text-tertiary max-w-[640px] text-center">
        Манай нийгэмлэгт нэгдсэнд баярлалаа! Таны бүртгэл амжилттай болсон
        бөгөөд бид таны бүртгүүлсэн имэйл хаяг уруу баталгаажуулах холбоос
        илгээлээ.
      </p>
      <Button onClick={resend} loading={loading}>
        Дахин илгээх
      </Button>
    </section>
  );
};

const SuccessPage = () => {
  return (
    <Suspense fallback="loading">
      <Comp />
    </Suspense>
  );
};

export default SuccessPage;
