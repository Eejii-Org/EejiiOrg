"use client";
import { useEffect, useState, Suspense } from "react";
import { api } from "@/actions";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button, Skeleton, Result } from "antd";

interface SuccessProps {
  countdown: number; // or string if countdown is a string
}

const Success = ({ countdown }: SuccessProps) => {
  return (
    <Result
      status="success"
      title="Таны бүртгэл амжилттай баталгаажлаа!"
      subTitle={`Та ${countdown} секундын дараа автоматаар нэвртэх хэсэглүү илгээгдэх болно. Хэрэв удах юумуу ямар нэг алдаа гарсан тохиолдолд та доорх товчлуур дээр дарж нэвтэрнэ үү!`}
      extra={[
        <Link href="/auth/sign-in" key="success">
          <Button type="primary">Нэвтрэх</Button>
        </Link>,
      ]}
    />
  );
};

const Failed = () => {
  return (
    <Result
      status="warning"
      title="Имэйл баталгаажуулах хугацаа дууссан байна!"
      subTitle="Имэйлийн баталгаажуулах хугацаа илгээгдсэнээс хойш 10 минут байдаг бөгөөд та уг хугацаанд амжиж имэйлээ баталгаажуулах хэрэгтэйг анхаарна уу!"
      extra={[
        <Link href="/auth/sign-in" key="failed">
          <Button type="primary">Шинээр холбоос авах</Button>
        </Link>,
      ]}
    />
  );
};

const Comp = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const token = searchParams.get("token");
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    const checkEmailApproval = async () => {
      if (!email || !token) {
        setLoading(false);
        return;
      }

      const result = await api.post("/api/users/verifyEmail", { email, token });

      console.log("result", result);

      if (result.success) {
        setSuccess(true);
      } else if (result?.message?.code === 2006) {
        router.push("/auth/sign-in");
        return;
      }

      setLoading(false);
    };

    checkEmailApproval();
  }, [email, token, router]);

  useEffect(() => {
    if (success) {
      const timer = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);

      const redirectTimeout = setTimeout(() => {
        router.push("/auth/sign-in");
      }, 10000);

      return () => {
        clearInterval(timer);
        clearTimeout(redirectTimeout);
      };
    }
  }, [success, router]);

  if (loading) return <Skeleton />;

  return success ? <Success countdown={countdown} /> : <Failed />;
};

const VerifyEmail = () => {
  return (
    <Suspense fallback="loading">
      <Comp />
    </Suspense>
  );
};

export default VerifyEmail;
