"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/providers";
import { useRouter, useSearchParams } from "next/navigation";
import { Typography, Divider, message, Skeleton } from "antd";
import { api } from "@/actions";
import { ProjectForm } from "@/components";

const { Title } = Typography;

const ProjectCreate = () => {
  const router = useRouter();
  const [category, setCategory] = useState([]);
  const { user } = useAuth();
  const { eventPermit, volunteeringEventPermit, state } = user;
  const checkState = state === "accepted";
  const isEventPermit = eventPermit > 0;
  const isVolPermit = volunteeringEventPermit > 0;
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const eventType = searchParams.get("type");

  useEffect(() => {
    if (!checkState) {
      router.push("/profile/result?reason=verify");
      return;
    }
    if (
      (!isVolPermit && eventType === "volunteering_event") ||
      (!isEventPermit && eventType === "event")
    ) {
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
  }, [checkState, isVolPermit, eventType, isEventPermit, router]);

  useEffect(() => {}, [state]);

  return (
    <div className="bg-white p-6 rounded-md">
      <Title level={5}>
        {eventType === "volunteering_event"
          ? "Хандив авах төсөл үүсгэх:"
          : "Хандив өгөх төсөл үүсгэх:"}
      </Title>
      <Divider />

      {loading ? (
        <Skeleton active />
      ) : (
        <ProjectForm categories={category} eventType={eventType} />
      )}
    </div>
  );
};

export default ProjectCreate;
