"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@/providers";
import { CertificateForm } from "@/components";
import { Typography, Divider, Flex, Skeleton } from "antd";
import { useRouter } from "next/navigation";

const { Title } = Typography;

const CreateCertificates = () => {
  const { user } = useAuth();
  const router = useRouter();
  const { eventPermit, state } = user;
  const checkState = state === "accepted";
  const isAvalaiblePermit = eventPermit > 0;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!checkState) {
      router.push("/profile/result?reason=verify");
      return;
    }
    if (!isAvalaiblePermit) {
      router.push("/profile/result?reason=nopermit");
      return;
    }

    setLoading(false);
  }, [checkState, isAvalaiblePermit]);

  return (
    <div className="bg-white p-6 rounded-md">
      <Flex justify="space-between">
        <Title level={5}>Сертификат үүсгэх</Title>
      </Flex>

      <Divider />

      {loading ? (
        <Skeleton active />
      ) : (
        <CertificateForm
          initialData={{ organizationName: user?.organization }}
        />
      )}
    </div>
  );
};

export default CreateCertificates;
