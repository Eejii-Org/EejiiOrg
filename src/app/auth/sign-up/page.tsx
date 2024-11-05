"use client";
import { api } from "@/actions";
import { UserType } from "@/types";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
// Antd
import type { FormProps } from "antd";
import { LockOutlined, PhoneOutlined, MailOutlined } from "@ant-design/icons";
import {
  Row,
  Col,
  Form,
  Input,
  Button,
  Select,
  Divider,
  Typography,
  message,
  Checkbox,
} from "antd";
const { Title } = Typography;

const SignUp = () => {
  const router = useRouter();
  const [form] = Form.useForm();
  const [selectedUserType, setSelectedUserType] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);

  // Handle user type
  const handleUserType = (val: string) => {
    if (!val) return;
    setSelectedUserType(val);
  };

  // Handle Submit Registration
  const onFinish: FormProps<UserType>["onFinish"] = async (values) => {
    setLoading(true);
    const result = await api.post("/api/register", { ...values });

    console.log("result", result);

    if (!result?.success) {
      message.error(result.message.message);
    } else {
      message.success("Бүртгэл амжилттай");
      router.push(`/auth/sign-up/success?email=${result.data.email}`);
    }

    setLoading(false);
  };

  return (
    <Form form={form} name="register" layout="vertical" onFinish={onFinish}>
      <Title level={4}>Бүтгүүлэх</Title>
      <Divider />
      <Form.Item
        label="Хэрэглэгчийн төрлөө сонгоно уу!"
        name="type"
        rules={[
          {
            required: true,
            message: "Заавал сонгох!",
          },
        ]}
      >
        <Select
          onChange={handleUserType}
          placeholder="Та эхлээд хэрэглэгчийн төрлөө сонгоно уу!"
          style={{ width: "100%" }}
        >
          <Select.Option value="volunteer">Сайн дурын ажилтан</Select.Option>
          <Select.Option value="supporter">Аж ахуй нэгж</Select.Option>
          <Select.Option value="partner">Төрийн бус байгууллага</Select.Option>
        </Select>
      </Form.Item>
      <Row gutter={15}>
        <Col span={12}>
          <Form.Item
            label="Овог:"
            name="lastName"
            rules={[
              {
                required: true,
                message: "Заавал бөглөх!",
              },
            ]}
          >
            <Input placeholder="Овогоо оруулна уу..." />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Нэр:"
            name="firstName"
            rules={[
              {
                required: true,
                message: "Заавал бөглөх!",
              },
            ]}
          >
            <Input placeholder="Нэрээ оруулна уу..." />
          </Form.Item>
        </Col>
      </Row>

      {selectedUserType !== "volunteer" && selectedUserType && (
        <Row gutter={15}>
          <Col span={12}>
            <Form.Item name="organizationType" label="Байгууллагын төрөл:">
              <Select
                placeholder="Та Байгууллагын төрөл"
                style={{ width: "100%" }}
              >
                <Select.Option value="private">Хувын хэвшил</Select.Option>
                <Select.Option value="international">
                  Олон улсын байгууллага
                </Select.Option>
                <Select.Option value="goverment">
                  Төрийн байгууллага
                </Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="organization" label="Байгууллагын нэр:">
              <Input placeholder="Та байгууллагын нэрээ оруулна уу..." />
            </Form.Item>
          </Col>
        </Row>
      )}

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
        <Input prefix={<MailOutlined />} placeholder="Таны имэйл хаяг..." />
      </Form.Item>
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
        <Input prefix={<PhoneOutlined />} placeholder="Таны утасны дугаар..." />
      </Form.Item>
      <Form.Item
        name="plainPassword"
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
      <Form.Item
        name="confirm"
        label="Нууц үг давтах:"
        dependencies={["plainPassword"]}
        hasFeedback
        rules={[
          {
            required: true,
            message: "Заавал бөглөх!",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("plainPassword") === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error("Таны нууц үг, өмнөх нууц үгтэй тохирохгүй байна!")
              );
            },
          }),
        ]}
      >
        <Input.Password
          prefix={<LockOutlined />}
          placeholder="Нууц үгээ давтана уу..."
        />
      </Form.Item>

      <Form.Item
        name="agreement"
        valuePropName="checked"
        rules={[
          {
            validator: (_, value) =>
              value
                ? Promise.resolve()
                : Promise.reject(
                    new Error("Та үүнийг заавал зөвшөөрч байж бүртгүүлнэ!")
                  ),
          },
        ]}
      >
        <Checkbox>
          Би үйлчилгээний
          <Link href="/"> нөхцөлийг </Link>
          зөвшөөрч байна.
        </Checkbox>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" block loading={loading}>
          Бүртгүүлэх
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SignUp;
