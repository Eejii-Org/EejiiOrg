"use client";
import { useState, Suspense } from "react";
import { getVerifyEmail } from "@/actions";
import { Button, message, Result } from "antd";
import { useSearchParams } from "next/navigation";

const Comp = () => {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState<boolean>(false);

  // Handle Submit Resend email
  const resend = async () => {
    const email = searchParams.get("email");
    if (!email) return;
    setLoading(true);
    await getVerifyEmail(email);
    message.success("Баталгаажуулах холбоос амжилттай илгээгдлээ!");
    setLoading(false);
  };

  return (
    <Result
      status="warning"
      title="Та эхлээд имэйлээ баталгаажуулах шаардлагатай!"
      subTitle="Бид таны бүртгэлтэй имэйл хаяг луу баталгаажуулах холбоос илгээх болно."
      extra={[
        <Button
          type="primary"
          loading={loading}
          onClick={resend}
          key="resendBtn"
        >
          Баталгаажуулах
        </Button>,
      ]}
    />
  );
};

const ResendEmail = () => {
  return (
    <Suspense fallback="loading">
      <Comp />
    </Suspense>
  );
};

export default ResendEmail;
