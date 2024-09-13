"use client";
import Link from "next/link";
import { useAuth } from "@/providers";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import { api } from "@/actions";
import dayjs from "dayjs";

import {
  Button,
  Form,
  Typography,
  Result,
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

const { Text } = Typography;
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
const { RangePicker } = DatePicker;

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
  const { user } = useAuth();
  const [current, setCurrent] = useState(0);
  const [formData, setFormData] = useState();
  const [isSubmit, setIsSubmit] = useState(false);
  const [form] = Form.useForm();
  const isPartner = user?.type === "partner";
  const isApproved = true;

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
              label="Үргэлжлэх хугацаа"
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
              <Row gutter={15}>
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
              </Row>
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
            <Col span={12}>
              <Form.Item
                name="requiredVolunteer"
                label="Хэдэн сайн дурыг ажилтан хэрэгтэй байгаа тоогоо оруулна уу."
                rules={[{ required: true, message: "Тоо оруулна уу" }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="requiredVolunteer"
                label="Доод насны хязгаар"
                rules={[{ required: true, message: "Тоо оруулна уу" }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            label="Сайн дурын ажилтан юу хийх талаарх товч мэдээлэл оруулна уу."
            name="title"
            rules={[
              {
                required: true,
                message: "Заавал бөглөх!",
              },
            ]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>

          <Form.Item label="Тавигдах шаардлага." name="title">
            <Input.TextArea rows={4} />
          </Form.Item>

          <Form.Item
            label="Ямар чадвартай байвал илүү тохирох вэ."
            name="title"
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

      if (result.success) {
        message.success("Processing complete!");
        setIsSubmit(true);
      } else {
        console.log("why", result);
      }

      console.log("result", result);
    } catch (info) {
      console.log("Validation Failed:", info);
    }
  };

  const WarninResult = () => {
    return (
      <Result
        status="warning"
        title="Та эхлээд байгууллагаа баталгаажуулна уу!"
        subTitle="Та арга хэмжээ оруулахын тулд эхлээд бидэнтэй холбогдож зохих гэрээ хийх хэрэгтэй"
      />
    );
  };

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

  const Render = () => (isSubmit ? <SuccesResult /> : <StepForm />);

  return (
    <div className="bg-white p-6 rounded-md">
      <Title level={5}>Сайн дурын арга хэмжээ үүсгэх:</Title>
      <Divider />

      {isApproved && isPartner ? <Render /> : <WarninResult />}
    </div>
  );
};

export default EventCreate;
