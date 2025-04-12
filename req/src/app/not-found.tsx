"use client";

import { AuthHeader } from "@/components";
import { useRouter } from "next/navigation";

const NotFoundPage = () => {
  const router = useRouter();
  return (
    <>
      <AuthHeader />
      <div className="my-8 flex items-center justify-center text-primary font-medium text-2xl">
        <h1>Тун удахгүй</h1>
      </div>
      <button className="underline" onClick={() => router.back()}>
        Буцах
      </button>
    </>
  );
};
export default NotFoundPage;
