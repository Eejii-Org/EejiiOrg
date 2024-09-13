"use client";
import { useState, Suspense } from "react";
import { api } from "@/actions";
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

    const result = await api.post("/api/users/verificationToken", { email });

    if (result.success) {
      message.success("Баталгаажуулах холбоос амжилттай илгээгдлээ!");
    } else {
      message.error(result.message.data);
    }

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
