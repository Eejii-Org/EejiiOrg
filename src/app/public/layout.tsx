"use client";
import React, { useEffect, useState } from "react";
import { Result, Button, Spin } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import { MainLayout, ProfileHeader } from "@/components";
import { api } from "@/actions";

const PublicProfileLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams.get("id");
  const [userData, setUserData] = useState();
  const [userLoading, setUserLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const result = await api.get(`api/userPublicProfile/${userId}`);

      if (!result.success) {
        return router.push("/");
      }
      setUserData(result.data);
      setUserLoading(false);
    };

    fetchData();
  }, [userId]);

  if (!userData)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spin spinning={userLoading} />
      </div>
    );

  return (
    <MainLayout>
      <div className="bg-[#f5f5f5] min-h-screen">
        <ProfileHeader user={userData} />
        <div className="container py-6">{children}</div>
      </div>
    </MainLayout>
  );
};

export default PublicProfileLayout;
