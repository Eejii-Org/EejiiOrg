"use client";
import axios from "axios";
import { verifyEmail } from "@/actions";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  Row,
  Col,
  Form,
  Input,
  Button,
  Select,
  Divider,
  Typography,
  message,
  Checkbox,
  Result,
} from "antd";
const { Title } = Typography;

const Fallback = () => {
  return <>placeholder</>;
};

const Success = () => {
  return (
    <Result
      status="success"
      title="Таны бүртгэл амжилттай баталгаажлаа!"
      subTitle="Манай нийгэмлэгт нэгдсэнд баярлалаа! Таны бүртгэл амжилттай болсон бөгөөд манай платформын санал болгож буй бүх зүйлийг судлахад бэлэн боллоо.."
      extra={[
        <Link href="/auth/sign-in">
          <Button type="primary" key="console">
            Нэвтрэх
          </Button>
        </Link>,
      ]}
    />
  );
};

const VerifyEmail = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const token = searchParams.get("token");

  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(true);
  const [requestLoading, setRequestLoading] = useState(false);
  const [requestSuccess, setRequestSuccess] = useState<boolean | null>(null);

  useEffect(() => {
    const checkEmailApproval = async () => {
      const result = await verifyEmail(email, token);

      console.log("result", result);
    };

    checkEmailApproval();
  }, [searchParams]);

  // Old
  const requestNewVerification = async () => {
    setRequestLoading(true);
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/verificationToken`,
        {
          email,
        }
      );
      setRequestLoading(false);
      setRequestSuccess(true);
    } catch (e) {
      setRequestLoading(false);
      setRequestSuccess(false);
    }
  };
  const combined = useMemo(() => {
    if (!email || !token) return null;
    return { email, token };
  }, [email, token]);

  console.log("combined", combined);

  console.log("success", success);

  useEffect(() => {
    const verify = async () => {
      if (!combined) return;
      try {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/verifyEmail`,
          {
            email: combined.email,
            token: combined.token,
          }
        );
        setSuccess(true);
        setLoading(false);
      } catch (e) {
        setSuccess(false);
        setLoading(false);
      }
    };
    if (combined) {
      verify();
    }
  }, [combined]);

  return <Success />;
};

{
  /* <section className="flex flex-col gap-4 items-center justify-center">
      {loading ? (
        <p>Loading...</p>
      ) : success ? (
        <p>Амжилттай баталгаажлаа</p>
      ) : (
        <p>Баталгаажуулахад алдаа гарлаа. Дахин оролдоно уу</p>
      )}
      {requestLoading ? (
        <p>Loading...</p>
      ) : requestSuccess ? (
        <p>Амжилттай баталгаажуулах имэйл явууллаа.</p>
      ) : (
        <>
          {requestSuccess == false && <p>Алдаа гарлаа. Дахин оролдоно уу</p>}
          {!success && (
            <button
              className="text-primary underline"
              onClick={requestNewVerification}
            >
              Шинээр баталгаажуулах имэйл авах
            </button>
          )}
        </>
      )}
    </section> */
}

export default VerifyEmail;
