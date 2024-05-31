"use client";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const VerifyEmail = () => {
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
      const { data } = await axios.post(
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
  useEffect(() => {
    const verify = async () => {
      if (email && token) {
        try {
          const { data } = await axios.post(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/verifyEmail`,
            {
              email,
              token,
            }
          );
          setSuccess(true);
          setLoading(false);
        } catch (e) {
          console.log(e);
          setSuccess(false);
          setLoading(false);
        }
      }
    };
    verify();
  }, [email, token]);
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
