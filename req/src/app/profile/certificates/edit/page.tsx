"use client";
import Link from "next/link";
import { useAuth } from "@/providers";
import { useEffect, useState } from "react";
import { api } from "@/actions";
import { CertificateForm } from "@/components";
import { Typography, Divider, Flex, message, Skeleton } from "antd";
import { useSearchParams } from "next/navigation";

const { Title } = Typography;

const EditCertificates = () => {
  const { user } = useAuth();
  const [data, setData] = useState();
  const searchParams = useSearchParams();
  const slug = searchParams.get("slug");

  const fetchData = async () => {
    const result = await api.get(`/api/events/${slug}/certificateTemplate`);

    if (!result.success) {
      message.warning(result.message.message);
    }

    const updatedData = {
      eventSlug: slug,
      ...result?.data,
    };
    setData(updatedData);
  };

  useEffect(() => {
    fetchData();
  }, [user]);

  return (
    <div className="bg-white p-6 rounded-md">
      <Flex justify="space-between">
        <Title level={5}>Сертификат Засар</Title>
      </Flex>

      <Divider />

      {!data ? (
        <Skeleton active />
      ) : (
        <CertificateForm edit initialData={data} />
      )}
    </div>
  );
};

export default EditCertificates;
