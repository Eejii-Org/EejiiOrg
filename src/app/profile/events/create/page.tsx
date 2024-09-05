"use client";
import Link from "next/link";
import { useAuth } from "@/providers";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import { getCertificate } from "@/actions";
import dayjs from "dayjs";

import { CloudDownloadOutlined, PlusCircleOutlined } from "@ant-design/icons";
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
  const [isSubmit, setIsSubmit] = useState(0);
  const [form] = Form.useForm();

  const steps = [
    {
      title: "Ерөнхий мэдээлэл",
      content: (
        <Row gutter={15}>
          <Col span={12}>
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
              name="eventType"
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
                    value: "1",
                  },
                  {
                    label: "Хандив өгөх цуглуулах",
                    value: "2",
                  },
                ]}
              />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label="Үргэлжлэх хугацаа"
              name="date"
              rules={[
                {
                  required: true,
                  message: "Заавал бөглөх!",
                },
              ]}
            >
              <RangePicker
                style={{
                  width: "100%",
                }}
              />
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

          <Col span={12}>
            <Form.Item
              label="Хариуцсан хүний нэр"
              name="eventUser"
              rules={[
                {
                  required: true,
                  message: "Заавал бөглөх!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Холбогдох утасны дугаар"
              name="eventUserPhone"
              rules={[
                {
                  required: true,
                  message: "Заавал бөглөх!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
      ),
    },
    {
      title: "Байршил",
      content: (
        <>
          <Row gutter={[15, 15]}>
            <Col span={8}>
              <Form.Item
                label="Аймаг/хот"
                name="province"
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
            <Col span={8}>
              <Form.Item
                label="Дүүрэг/Сум"
                name="district"
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
            <Col span={8}>
              <Form.Item label="Хороо/баг" name="khoroo">
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            label="Дэлгэрэнгүй хаяг"
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
        </>
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

  const next = () => {
    form
      .validateFields()
      .then(() => {
        setCurrent(current + 1);
      })
      .catch((info) => {
        console.log("Validation Failed:", info);
      });
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        console.log("Form Values:", values);
        message.success("Processing complete!");
        setIsSubmit(true);
      })
      .catch((info) => {
        console.log("Validation Failed:", info);
      });
  };

  const SuccesResult = () => {
    return (
      <Result
        status="success"
        title="Таны хүсэлт амжилттай илгээгдлээ."
        subTitle="Бид таны оруулсан мэдээллийг нягталж үзээд зөвшөөрсөн тохиолдолд нийтлэгдэх болно. Тэр болтол хүлээлгийн горимд шилжихийг анхаарна уу. Энд дарж өөрийн арга хэмжээнүүдийг харах боломжтой"
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
              <Button type="primary" onClick={() => handleSubmit()}>
                Хүсэлт илгээх
              </Button>
            )}
            {current < steps.length - 1 && (
              <Button type="primary" onClick={() => next()}>
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

      {isSubmit ? <SuccesResult /> : <StepForm />}
    </div>
  );
};

export default EventCreate;
