"use client";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo, useState } from "react";

const Fallback = () => {
  return <>placeholder</>;
};

const VerifyEmail = () => {
  return (
    <Suspense fallback={<Fallback />}>
      <Comp />
    </Suspense>
  );
};

const Comp = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const token = searchParams.get("token");
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(true);
  const [requestLoading, setRequestLoading] = useState(false);
  const [requestSuccess, setRequestSuccess] = useState<boolean | null>(null);
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
  return (
    <section className="flex flex-col gap-4 items-center justify-center">
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
    </section>
  );
};

export default VerifyEmail;
