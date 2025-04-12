"use client";
import { MainLayout, ProfileHeader } from "@/components";
import { useAuth } from "@/providers";
import { toDateString } from "@/utils";
import axios from "axios";
import { getCookie } from "cookies-next";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { api, getCertificate } from "@/actions";
import dayjs from "dayjs";

import { MailOutlined, PhoneOutlined, EditOutlined } from "@ant-design/icons";
import {
  Row,
  Col,
  Divider,
  Typography,
  Button,
  Space,
  message,
  Upload,
  Flex,
  Form,
  Input,
  Select,
  DatePicker,
} from "antd";
import { UserType } from "@/types";
const { TextArea } = Input;
const { Text, Title } = Typography;

const { Dragger } = Upload;

const ProfileEdit = () => {
  const { user, userLoading } = useAuth();
  const [certificateData, setCertificateData] = useState([]);

  useEffect(() => {
    const fetchCertificateData = async () => {
      if (!user) return;
      const token = getCookie("token");
      if (!token) return;

      const result = await getCertificate(token);

      if (result?.["hydra:member"] as any) {
        setCertificateData(result?.["hydra:member"]);
      }
    };

    fetchCertificateData();
  }, [user]);

  if (!user) {
    if (userLoading) {
      return <div>Loading...</div>;
    }
    return redirect("/auth");
  }

  const handleOnFinish = async (val: UserType) => {
    const url = `/api/user/${user?.id}/edit`;
    const result = await api.put(url, val);

    if (!result.success) {
      return message.warning(result.message.message);
    }

    return message.success("Амжилттай хадгалагдлаа!");
  };

  const handleChangePassword = async (val: UserType) => {
    const url = `/api/users/changePassword`;
    const data = {
      email: user?.email,
      oldPassword: val.oldPassword,
      newPassword: val.newPassword,
      confirmPassword: val.confirmPassword,
    };
    const result = await api.post(url, data);

    if (!result.success) {
      return message.warning(result.message.message);
    }

    return message.success("Амжилттай хадгалагдлаа!");
  };

  return (
    <div>
      <Form
        name="register"
        layout="vertical"
        initialValues={user}
        className="bg-white p-8 rounded-md"
        onFinish={handleOnFinish}
      >
        <Title level={5}>
          {user?.type !== "volunteer" ? "Байгууллагын тухай" : "Миний тухай"}
        </Title>
        <Divider />
        <Form.Item name="bio" rules={[{ max: 560 }]}>
          <TextArea rows={6} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Хадгалах
          </Button>
        </Form.Item>
      </Form>

      <Form
        name="register"
        layout="vertical"
        initialValues={user}
        className="bg-white p-8 rounded-md my-6"
        onFinish={handleOnFinish}
      >
        <Title level={5}>Ерөнхий мэдээлэл</Title>
        <Divider />

        <Row gutter={15}>
          <Col span={8}>
            <Form.Item label="Овог:" name="lastName">
              <Input
                placeholder="Овогоо оруулна уу..."
                disabled={user?.type !== "volunteer"}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Нэр:" name="firstName">
              <Input
                placeholder="Нэрээ оруулна уу..."
                disabled={user?.type !== "volunteer"}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="email"
              label="Имэйл:"
              rules={[
                {
                  required: true,
                  message: "Заавал бөглөх!",
                },
              ]}
            >
              <Input
                prefix={<MailOutlined />}
                placeholder="Таны имэйл хаяг..."
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="phoneNumber"
              label="Утас:"
              rules={[
                {
                  required: true,
                  message: "Заавал бөглөх!",
                },
              ]}
            >
              <Input
                prefix={<PhoneOutlined />}
                placeholder="Таны утасны дугаар..."
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="birthdate" label="Төрсөн өдөр:">
              <DatePicker
                style={{ width: "100%" }}
                disabled={user?.type !== "volunteer"}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="gender" label="Хүйс:">
              <Select
                placeholder="Хүйс"
                style={{ width: "100%" }}
                disabled={user?.type !== "volunteer"}
              >
                <Select.Option value="m">Эрэгтэй</Select.Option>
                <Select.Option value="f">эмэгтэй</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="registerNumber" label="Рэгистер:">
              <Input disabled={user?.type !== "volunteer"} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="organizationType" label="Байгууллагын төрөл:">
              <Select
                placeholder="Та Байгууллагын төрөл"
                style={{ width: "100%" }}
                disabled={user?.type === "volunteer"}
              >
                <Select.Option value="supporter">ХХК</Select.Option>
                <Select.Option value="volunteer">
                  Төрийн бус байгууллага
                </Select.Option>

                <Select.Option value="volunteer">
                  Төрийн байгууллага
                </Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="organization" label="Байгууллагын нэр:">
              <Input
                placeholder="Та байгууллагын нэрээ оруулна уу..."
                disabled={user?.type === "volunteer"}
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item name="address" label="Хаяг:">
              <TextArea rows={4} />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Хадгалах
          </Button>
        </Form.Item>
      </Form>

      <Form
        name="forgot-password"
        layout="vertical"
        className="bg-white p-8 rounded-md"
        onFinish={handleChangePassword}
      >
        <Title level={5}>Нууц үг солих</Title>
        <Divider />

        <Form.Item
          name="oldPassword"
          label="Хуучин нууц үг:"
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
          <Button type="primary" htmlType="submit">
            Солих
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ProfileEdit;
