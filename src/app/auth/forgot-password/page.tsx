"use client";
import { ForgotPasswordType } from "@/types";
import { forgotPassword } from "@/actions";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

// Antd
import type { FormProps } from "antd";
import { Form, Divider, Typography, Input, Button, message } from "antd";
const { Title } = Typography;

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);

  const onFinish: FormProps<ForgotPasswordType>["onFinish"] = async (
    values
  ) => {
    const updatedVale = {
      ...values,
      callbackUri: `${process.env.NEXT_PUBLIC_DOMAIN}/auth/reset-password`,
      sendResetCodeAgain: false,
    };

    setLoading(true);
    const result = await forgotPassword(updatedVale);

    if (!result.success) {
      message.warning(result?.message?.data);
      setLoading(false);
      return;
    }

    message.success(
      "Нууц үг солих хүсэлт амжиллтай илгээгдлээ. Та имэйлээ хаягаа шалгана уу"
    );
    setLoading(false);
  };

  return (
    <Form name="forgot-password" layout="vertical" onFinish={onFinish}>
      <Title level={4}>Нууц үг сэргээх</Title>
      <Divider />
      <Form.Item
        name="email"
        label="Таны имэйл:"
        rules={[
          {
            required: true,
            message: "Заавал бөглөх!",
          },
        ]}
      >
        <Input type="email" placeholder="Имэйл хаягаа оруулна уу" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" block loading={loading}>
          Илгээх
        </Button>
      </Form.Item>

      <Link href="/auth/sign-in">
        <Button block type="primary" ghost>
          Буцах
        </Button>
      </Link>
    </Form>
  );
};

export default ForgotPassword;
