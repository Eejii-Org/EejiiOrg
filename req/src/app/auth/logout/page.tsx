"use client";
import { useEffect } from "react";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";

const Logout = () => {
  const router = useRouter();

  useEffect(() => {
    deleteCookie("token");
    window.location.href = "/";
  }, []);

  return <div>Logout please wait...</div>;
};

export default Logout;
