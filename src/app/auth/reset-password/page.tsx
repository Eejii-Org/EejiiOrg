"use client";
import { ChangePasswordType } from "@/types";
import { verifyResetCode, changePassword } from "@/actions";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import Link from "next/link";

// Antd
import type { FormProps } from "antd";
import {
  Form,
  Divider,
  Typography,
  Input,
  Button,
  message,
  Skeleton,
  Result,
} from "antd";
const { Title } = Typography;

const Failed = () => {
  return (
    <Result
      status="warning"
      title="Нууц үг солих явцад алдаа гарлаа!"
      subTitle="Нууц үг баталгаажуулах имэйл илгээгдсэнээс хойш 10 минут байдаг бөгөөд та уг хугацаанд амжиж нууц үгээ шинчлэх хэрэгтэйг анхаарна уу!"
      extra={[
        <Link href="/auth/forgot-password" key="failed">
          <Button type="primary">Нууц үг сэргээх</Button>
        </Link>,
      ]}
    />
  );
};

const Comp = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const resetCode = searchParams.get("resetCode");
  const [loading, setLoading] = useState(true);
  const [btnLoading, setBtnLoading] = useState(false);
  const [success, setSuccess] = useState<boolean>(false);

  useEffect(() => {
    const fetchCheckToken = async () => {
      if (!email || !resetCode) {
        setLoading(false);
        return;
      }

      const result = await verifyResetCode(email, resetCode);

      // Update isVerified based on the result
      if (result.success) {
        setSuccess(true);
      } else {
        message.error("Invalid reset code.");
      }

      setLoading(false);
    };

    fetchCheckToken();
  }, [email, resetCode]);

  const onFinish: FormProps<ChangePasswordType>["onFinish"] = async (
    values
  ) => {
    setBtnLoading(true);
    const result = await changePassword(values);

    if (!result.success) {
      message.warning(result?.message?.data);
      setBtnLoading(false);
      return;
    }

    router.push("/auth/sign-in");
    message.success("Нууц үг амжиллтай солигдлоо. Та нэвтэрч орно уу!");
    setBtnLoading(false);
  };

  if (loading) return <Skeleton active />;

  if (!success) return <Failed />;

  return (
    <Form
      name="forgot-password"
      layout="vertical"
      onFinish={onFinish}
      initialValues={{ email: email }}
    >
      <Title level={4}>Нууц үг солих</Title>
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
        <Input type="email" disabled />
      </Form.Item>
      <Form.Item
        name="newPassword"
        label="Шинэ нууц үг:"
        hasFeedback
        rules={[
          {
            required: true,
            message: "Заавал бөглөх!",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        name="confirmPassword"
        label="Нууц үг давтах:"
        dependencies={["newPassword"]}
        hasFeedback
        rules={[
          {
            required: true,
            message: "Заавал бөглөх!",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("newPassword") === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error("Таны нууц үг, өмнөх нууц үгтэй тохирохгүй байна!")
              );
            },
          }),
        ]}
      >
        <Input.Password value="wwww" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" block loading={btnLoading}>
          Солих
        </Button>
      </Form.Item>
    </Form>
  );
};

const ResetPassword = () => {
  return (
    <Suspense fallback="loading">
      <Comp />
    </Suspense>
  );
};

export default ResetPassword;
