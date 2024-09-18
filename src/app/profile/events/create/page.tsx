"use client";
import { useAuth } from "@/providers";
import { useState } from "react";
import { api } from "@/actions";
import { useRouter } from "next/navigation";

import {
  Button,
  Form,
  Typography,
  Input,
  Divider,
  Row,
  Col,
  Select,
  DatePicker,
  message,
  Steps,
  Flex,
} from "antd";
import { EventType } from "@/types";

const { Step } = Steps;

interface DataType {
  key: string;
  id: string;
  organizationName: string;
  title: string;
  grade: number;
  dateRange: string;
  volunteeringHours: string;
}

const { Title } = Typography;

const province = [
  {
    value: "Улаанбаатар",
    label: "Улаанбаатар",
  },
  {
    value: "Архангай",
    label: "Архангай",
  },
  {
    value: "Баян-Өлгий",
    label: "Баян-Өлгий",
  },
  {
    value: "Баянхонгор",
    label: "Баянхонгор",
  },
  {
    value: "Булган",
    label: "Булган",
  },
  {
    value: "Говь-Алтай",
    label: "Говь-Алтай",
  },
  {
    value: "Говьсүмбэр",
    label: "Говьсүмбэр",
  },
  {
    value: "Дорноговь",
    label: "Дорноговь",
  },
  {
    value: "Дорнод",
    label: "Дорнод",
  },
  {
    value: "Дундговь",
    label: "Дундговь",
  },
  {
    value: "Завхан",
    label: "Завхан",
  },
  {
    value: "Орхон",
    label: "Орхон",
  },
  {
    value: "Өвөрхангай",
    label: "Өвөрхангай",
  },
  {
    value: "Өмнөговь",
    label: "Өмнөговь",
  },
  {
    value: "Сүхбаатар",
    label: "Сүхбаатар",
  },
  {
    value: "Сэлэнгэ",
    label: "Сэлэнгэ",
  },
  {
    value: "Төв",
    label: "Төв",
  },
  {
    value: "Увс",
    label: "Увс",
  },
  {
    value: "Ховд",
    label: "Ховд",
  },
  {
    value: "Хөвсгөл",
    label: "Хөвсгөл",
  },
  {
    value: "Хэнтий",
    label: "Хэнтий",
  },
  {
    value: "Дархан-Уул",
    label: "Дархан-Уул",
  },
  {
    value: "Дорноговь",
    label: "Дорноговь",
  },
  {
    value: "Орхон",
    label: "Орхон",
  },
];

const districts = [
  {
    value: "Багануур",
    label: "Багануур",
  },
  {
    value: "Багахангай",
    label: "Багахангай",
  },
  {
    value: "Баянгол",
    label: "Баянгол",
  },
  {
    value: "Баянзүрх",
    label: "Баянзүрх",
  },
  {
    value: "Налайх",
    label: "Налайх",
  },
  {
    value: "Сонгинохайрхан",
    label: "Сонгинохайрхан",
  },
  {
    value: "Сүхбаатар",
    label: "Сүхбаатар",
  },
  {
    value: "Хан-Уул",
    label: "Хан-Уул",
  },
  {
    value: "Чингэлтэй",
    label: "Чингэлтэй",
  },
];

const EventCreate = () => {
  const router = useRouter();
  const { user, userLoading } = useAuth();
  const [current, setCurrent] = useState(0);
  const [formData, setFormData] = useState();
  const [form] = Form.useForm();
  const { eventPermit, state } = user;
  const isVerified = state === "accepted";
  const isAvalaiblePermit = eventPermit > 0;

  if (!isVerified) {
    router.push("/profile/result?reason=verify");
    return;
  }

  if (!isAvalaiblePermit) {
    router.push("/profile/result?reason=nopermit");
    return;
  }

  const steps = [
    {
      title: "Ерөнхий мэдээлэл",
      content: (
        <Row gutter={15}>
          <Col span={10}>
            <Form.Item
              label="Арга хэмжээний нэр"
              name="title"
              rules={[
                {
                  required: true,
                  message: "Заавал бөглөх!",
                },
              ]}
            >
              <Input placeholder="нэрээ оруулна уу..." />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label="Хандивын төрөл"
              name="type"
              rules={[
                {
                  required: true,
                  message: "Заавал бөглөх!",
                },
              ]}
            >
              <Select
                allowClear
                style={{
                  width: "100%",
                }}
                placeholder="сонгох"
                options={[
                  {
                    label: "Хандив олох",
                    value: "event",
                  },
                  {
                    label: "Хандив өгөх цуглуулах",
                    value: "event",
                  },
                ]}
              />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item
              label="Эхлэх хугацаа"
              name="startTime"
              rules={[
                {
                  required: true,
                  message: "Заавал бөглөх!",
                },
              ]}
            >
              <DatePicker />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item
              label="Дуусах хугацаа"
              name="endTime"
              rules={[
                {
                  required: true,
                  message: "Заавал бөглөх!",
                },
              ]}
            >
              <DatePicker />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              label="Дэлгэрэнгүй тайлбар:"
              name="description"
              rules={[
                {
                  required: true,
                  message: "Заавал бөглөх!",
                },
              ]}
            >
              <Input.TextArea rows={6} />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item label="Хамаарах ангилал" name="category">
              <Select
                mode="multiple"
                allowClear
                style={{
                  width: "100%",
                }}
                placeholder="сонгох"
                defaultValue={["Багшлах", "Багшлах", "Багшлах"]}
              />
            </Form.Item>
          </Col>

          <Form.List name="contact">
            {() => (
              <>
                <Col span={12}>
                  <Form.Item
                    label="Хариуцсан хүний имэйл"
                    name="email"
                    rules={[{ required: true, message: "Заавал бөглөх!" }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Холбогдох утасны дугаар"
                    name="phoneNumber"
                    rules={[{ required: true, message: "Заавал бөглөх!" }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </>
            )}
          </Form.List>
        </Row>
      ),
    },
    {
      title: "Байршил",
      content: (
        <Form.List name="address">
          {() => (
            <Row gutter={[15, 15]}>
              <Col span={6}>
                <Form.Item
                  label="Улс"
                  name="country"
                  rules={[
                    {
                      required: true,
                      message: "Заавал бөглөх!",
                    },
                  ]}
                >
                  <Select
                    style={{
                      width: "100%",
                    }}
                    options={province}
                  />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label="Аймаг/хот"
                  name="address"
                  rules={[
                    {
                      required: true,
                      message: "Заавал бөглөх!",
                    },
                  ]}
                >
                  <Select
                    style={{
                      width: "100%",
                    }}
                    options={province}
                  />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label="Дүүрэг/Сум"
                  name="region"
                  rules={[
                    {
                      required: true,
                      message: "Заавал бөглөх!",
                    },
                  ]}
                >
                  <Select
                    style={{
                      width: "100%",
                    }}
                    options={districts}
                  />
                </Form.Item>
              </Col>

              <Col span={6}>
                <Form.Item
                  label="Дүүрэг Code"
                  name="regionCode"
                  rules={[
                    {
                      required: true,
                      message: "Заавал бөглөх!",
                    },
                  ]}
                >
                  <Select
                    style={{
                      width: "100%",
                    }}
                    options={[{ label: "MN", value: "Mn" }]}
                  />
                </Form.Item>
              </Col>

              <Col span={6}>
                <Form.Item
                  label="Country Code"
                  name="countryCode"
                  rules={[
                    {
                      required: true,
                      message: "Заавал бөглөх!",
                    },
                  ]}
                >
                  <Select
                    style={{
                      width: "100%",
                    }}
                    options={[{ label: "MN", value: "Mn" }]}
                  />
                </Form.Item>
              </Col>

              <Col span={6}>
                <Form.Item label="Хороо/баг" name="khoroo">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  label="Дэлгэрэнгүй хаяг"
                  name="noName"
                  rules={[
                    {
                      required: true,
                      message: "Заавал бөглөх!",
                    },
                  ]}
                >
                  <Input.TextArea rows={4} />
                </Form.Item>
              </Col>
            </Row>
          )}
        </Form.List>
      ),
    },
    {
      title: "Сайн дурын ажилтан сонгох",
      content: (
        <>
          <Row gutter={15}>
            <Col span={8}>
              <Form.Item
                name="requiredVolunteer"
                label="Хэрэгтэй байгаа сайн дурыхан:"
                rules={[{ required: true, message: "Тоо оруулна уу" }]}
              >
                <Input placeholder="Тоо оруулах" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="ageRestriction"
                label="Доод насны хязгаар"
                rules={[{ required: true, message: "Тоо оруулна уу" }]}
              >
                <Input placeholder="Тоо оруулна уу" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="registerEndDate"
                label="Бүртгэл хаагдах огноо"
                rules={[{ required: true, message: "Тоо оруулна уу" }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            label="Сайн дурын ажилтан юу хийх талаарх товч мэдээлэл оруулна уу."
            name="volunteerDescription"
            rules={[
              {
                required: true,
                message: "Заавал бөглөх!",
              },
            ]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>

          <Form.Item
            label="Ямар чадвартай байвал илүү тохирох вэ."
            name="volunteerRequirements"
            rules={[
              {
                required: true,
                message: "Заавал бөглөх!",
              },
            ]}
          >
            <Select
              mode="multiple"
              style={{ width: "100%" }}
              placeholder="сонгох"
            />
          </Form.Item>
        </>
      ),
    },
  ];

  const next = async () => {
    try {
      const values = await form.validateFields();

      // Merge current step values into formData
      setFormData((prevValues) => ({
        ...prevValues,
        ...values,
      }));

      setCurrent(current + 1);
    } catch (info) {
      console.log("Validation Failed:", info);
    }
  };

  const prev = () => {
    setCurrent(current - 1);
  };
  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      setFormData((prevValues) => ({
        ...prevValues,
        ...values,
      }));

      const result = await api.post("/api/events/new", formData);

      if (!result.success) {
        message.warning(result?.message?.message);
        return;
      }

      message.success("Амжилттай үүсгэлээ!");
      router.push("/profile/events");
    } catch (info) {
      console.log("Validation Failed:", info);
    }
  };

  console.log("setFormData", formData);
  const StepForm = () => (
    <>
      <Steps current={current} size="small" className="mb-8">
        {steps.map((item) => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>

      <Form form={form} layout="vertical">
        <div className="bg-[#f5f5f5] p-6 rounded-lg mb-6">
          {steps[current].content}
        </div>

        <Flex justify="space-between">
          {current > 0 && (
            <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
              Буцах
            </Button>
          )}

          <div>
            {current === steps.length - 1 && (
              <Button type="primary" onClick={handleSubmit}>
                Хүсэлт илгээх
              </Button>
            )}
            {current < steps.length - 1 && (
              <Button type="primary" onClick={next}>
                Үргэлжлүүлэх
              </Button>
            )}
          </div>
        </Flex>
      </Form>
    </>
  );

  return (
    <div className="bg-white p-6 rounded-md">
      <Title level={5}>Сайн дурын арга хэмжээ үүсгэх:</Title>
      <Divider />

      <StepForm />
    </div>
  );
};

export default EventCreate;
