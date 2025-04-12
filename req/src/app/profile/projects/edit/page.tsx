"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/providers";
import { useRouter, useSearchParams } from "next/navigation";
import { Typography, Divider, message, Skeleton } from "antd";
import { api } from "@/actions";
import { ProjectForm } from "@/components";
import dayjs from "dayjs";
const { Title } = Typography;

const ProjectEdit = () => {
  const param = useSearchParams();
  const slug = param.get("slug");
  const [detail, setDetail] = useState();

  const fetchDetail = async () => {
    const result = await api.get(`/api/projects/${slug}`);

    if (!result.success) return message.warning(result.message.message);

    console.log("result", result);

    const updatedData = {
      ...result.data,
      startTime: dayjs(result.data.startTime),
      endTime: dayjs(result.data.endTime),
    };

    setDetail(updatedData);
  };

  useEffect(() => {
    fetchDetail();
  }, []);

  return (
    <div className="bg-white p-6 rounded-md">
      <Title level={5}>Засах:</Title>
      <Divider />

      {!detail?.id ? (
        <Skeleton active />
      ) : (
        <ProjectForm initialData={detail} btnText="Засах" />
      )}
    </div>
  );
};

export default ProjectEdit;
