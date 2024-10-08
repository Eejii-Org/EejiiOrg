"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/providers";
import { useRouter, useSearchParams } from "next/navigation";
import { Typography, Divider, message } from "antd";
import { api } from "@/actions";
import { EventForm } from "@/components";
import dayjs from "dayjs";
const { Title } = Typography;

const EventEdit = () => {
  const router = useRouter();
  const param = useSearchParams();
  const slug = param.get("slug");
  const [detail, setDetail] = useState();
  const [category, setCategory] = useState([]);
  const { user, userLoading } = useAuth();
  const { eventPermit, state } = user;
  const isVerified = state === "accepted";
  const isAvalaiblePermit = eventPermit > 0;

  useEffect(() => {
    if (!isVerified) {
      router.push("/profile/result?reason=verify");
      return;
    }
    if (!isAvalaiblePermit) {
      router.push("/profile/result?reason=nopermit");
      return;
    }

    const fetchCategories = async () => {
      const result = await api.get("/api/categories");

      if (!result.success) return message.warning(result.message.message);

      const categories = result.data?.["hydra:member"];

      const updatedCategory = categories.map((cat) => ({
        label: cat.name,
        value: cat["@id"],
        key: cat.id,
      }));

      setCategory(updatedCategory);
    };

    fetchCategories();
  }, [isVerified, isAvalaiblePermit, router]);

  console.log("slug", slug);

  const fetchDetail = async () => {
    const result = await api.get(`/api/events/${slug}`);

    console.log("resultresultresultresult", result);

    if (!result.success) return message.warning(result.message.message);

    const updatedCategory = result.data?.categories.map((cat) => ({
      label: cat.name,
      value: cat["@id"],
      key: cat.id,
    }));

    const updatedData = {
      ...result.data,
      categories: updatedCategory,
      startTime: dayjs(result.data.startTime),
      endTime: dayjs(result.data.endTime),
      registrationStartTime: dayjs(result.data.registrationStartTime),
      registrationEndTime: dayjs(result.data.registrationEndTime),
    };

    setDetail(updatedData);
  };

  useEffect(() => {
    fetchDetail();
  }, []);

  if (!detail?.id) return "loading";

  return (
    <div className="bg-white p-6 rounded-md">
      <Title level={5}>Арга хэмжээ засах:</Title>
      <Divider />

      <EventForm initialData={detail} categories={category} btnText="Засах" />
    </div>
  );
};

export default EventEdit;
