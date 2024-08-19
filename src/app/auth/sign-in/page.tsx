"use client";
import { UserType } from "@/types";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { setCookie } from "cookies-next";
import { useAuth } from "@/providers";
import { signIn } from "@/actions";

// Antd
import type { FormProps } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Form, Input, Button, Divider, Typography, message, Space } from "antd";

const { Title } = Typography;

const SignIn = () => {
  const { getUser } = useAuth();
  const router = useRouter();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>();

  // Handle Submit Registration
  const onFinish: FormProps<UserType>["onFinish"] = async (values) => {
    setLoading(true);
    const result = await signIn(values);

    if (!result.token) {
      if (result.code === 3001) {
        router.push(`/auth/resend-email?email=${email}`);
        message.error(result.data);
        setLoading(false);
        return;
      }

      message.error(result.message);
      setLoading(false);
      return;
    }

    message.success("Амжилттай нэвтэрлээ...");
    setCookie("token", result.token);
    getUser();
    router.push("/profile");

    setLoading(false);
  };

  const onValuesChange = (values: any, allValues: any) => {
    const { email } = allValues;
    setEmail(email);
  };

  return (
    <Form
      form={form}
      name="login"
      layout="vertical"
      onFinish={onFinish}
      onValuesChange={onValuesChange}
    >
      <Title level={4}>Хэрэглэгч нэвтрэх</Title>
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
        <Input prefix={<MailOutlined />} placeholder="Таны имэйл хаяг..." />
      </Form.Item>

      <Form.Item
        name="password"
        label="Нууц үг:"
        hasFeedback
        rules={[
          {
            required: true,
            message: "Заавал бөглөх!",
          },
        ]}
      >
        <Input.Password
          prefix={<LockOutlined />}
          placeholder="Нууц үгээ оруулна уу..."
        />
      </Form.Item>
      <Form.Item>
        <Link href="/auth/forgot-password">Нууц үгээ мартсан!</Link>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" block loading={loading}>
          Нэвтрэх
        </Button>
      </Form.Item>

      <Link href="/auth/sign-up">
        <Button type="primary" ghost block>
          Бүртгүүлэх
        </Button>
      </Link>
    </Form>
  );
};

export default SignIn;
