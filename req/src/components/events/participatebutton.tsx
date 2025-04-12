"use client";

import { useState } from "react";
// import { Button } from "../button";
import axios from "axios";
import { getCookie } from "cookies-next";
import { Button, Alert, Typography } from "antd";
const { Text } = Typography;

export const ParticipateButton = ({ slug }: { slug: string }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const participate = async () => {
    setError(null);
    setLoading(true);
    const token = getCookie("token");
    if (!token) {
      setError("Эхлээд бүртгүүлнэ үү.");
      setLoading(false);
      return;
    }
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/events/${slug}/eventUsers/join`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSuccess("Амжилттай бүртгүүллээ. Бид таньд удахгүй хариу хэлэх болно.");
    } catch (e: any) {
      if (e.response.data.code == 2002) {
        setError("Бүртгүүлсэн байна.");
      } else {
        setError("Алдаа гарлаа! Та бидэнд яаралтай мэдэгдэнэ үү. Баярлалаа.");
      }
    }
    setLoading(false);
  };

  if (error) {
    return (
      <Alert
        type="warning"
        message={<Text strong>{error}</Text>}
        className="text-center"
      />
    );
  }
  if (success) {
    return <Alert type="success" description={success} icon />;
  }
  return (
    <Button
      type="primary"
      block
      size="large"
      onClick={() => participate()}
      loading={loading}
    >
      Оролцох
    </Button>
  );
};
