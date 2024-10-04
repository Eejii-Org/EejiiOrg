"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/providers";
import { useRouter } from "next/navigation";
import { Typography, Divider, message } from "antd";
import { api } from "@/actions";
import { EventForm } from "@/components";

const { Title } = Typography;

const EventCreate = () => {
  const router = useRouter();
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

  return (
    <div className="bg-white p-6 rounded-md">
      <Title level={5}>Сайн дурын арга хэмжээ үүсгэх:</Title>
      <Divider />

      <EventForm
        initialData={{ categories: category, title: "wwwwww" }}
        categories={category}
      />
    </div>
  );
};

export default EventCreate;
