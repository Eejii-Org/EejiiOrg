"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/providers";
import { useRouter } from "next/navigation";
import { Typography, Divider, message, Skeleton } from "antd";
import { api } from "@/actions";
import { EventForm } from "@/components";

const { Title } = Typography;

const EventCreate = () => {
  const router = useRouter();
  const [category, setCategory] = useState([]);
  const { user } = useAuth();
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
      setLoading(false);
    };

    fetchCategories();
  }, [checkState, isAvalaiblePermit, router]);

  useEffect(() => {}, [state]);

  return (
    <div className="bg-white p-6 rounded-md">
      <Title level={5}>Сайн дурын арга хэмжээ үүсгэх:</Title>
      <Divider />

      {loading ? <Skeleton active /> : <EventForm categories={category} />}
    </div>
  );
};

export default EventCreate;
