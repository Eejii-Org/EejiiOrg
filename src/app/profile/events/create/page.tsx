"use client";
import { useEffect } from "react";
import { useAuth } from "@/providers";
import { useState } from "react";
import { api } from "@/actions";
import { useRouter } from "next/navigation";

import { Typography, Divider, message } from "antd";

import { EventForm } from "@/components";

const { Title } = Typography;

const EventCreate = () => {
  const router = useRouter();
  const [category, setCategory] = useState([]);
  const { user, userLoading } = useAuth();
  const { eventPermit, state } = user;
  const isVerified = state === "accepted";
  const isAvalaiblePermit = eventPermit > 0;

  console.log("user", user);

  if (!isVerified) {
    router.push("/profile/result?reason=verify");
    return;
  }

  if (!isAvalaiblePermit) {
    router.push("/profile/result?reason=nopermit");
    return;
  }

  useEffect(() => {
    const fetchCategories = async () => {
      const result = await api.get("/api/categories");

      if (!result.success) return message.warning(result.message.message);

      const categories = result.data?.["hydra:member"];

      console.log("categories", categories);

      const updatedCategory = categories.map((cat) => {
        const updatedCat = {
          label: cat.name,
          value: cat["@id"],
          key: cat.id,
        };

        return updatedCat;
      });

      setCategory(updatedCategory);
      console.log("category result", result);
    };

    fetchCategories();
  }, [user]);

  console.log("category", category);

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
