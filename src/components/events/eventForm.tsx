"use client";
import { api } from "@/actions";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Button,
  Form,
  Input,
  Row,
  Col,
  Select,
  DatePicker,
  message,
  InputNumber,
} from "antd";
import { CategoryType, EventType } from "@/types";
import ImageUpload from "@/components/imageUpload";

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

export const EventForm = ({
  initialData,
  categories,
  btnText,
}: {
  initialData: EventType;
  categories: CategoryType;
  btnText: String;
}) => {
  const router = useRouter();
  const [form] = Form.useForm();
  const param = useSearchParams();
  const slug = param.get("slug");

  const onFinish = async (values: EventType) => {
    console.log("values", values);
    try {
      let result;

      if (slug) {
        result = await api.put(`/api/events/${slug}`, values);
      } else {
        result = await api.post("/api/events/new", values);
      }

      if (!result.success) {
        message.warning(result?.message?.message);
        return;
      }

      message.success("Амжилттай!");
      router.push("/profile/events");
    } catch (info) {
      console.log("Validation Failed:", info);
    }
  };

  const handleUploadSuccess = (data: any) => {
    console.log("handleUploadSuccess data", data);
  };

  return (
    <>
      <Form
        form={form}
        layout="vertical"
        initialValues={initialData}
        onFinish={onFinish}
      >
        <div>
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
            <Col span={12}>
              <Form.Item
                label="Төрөл"
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
                      label: "Арга хэмжээ",
                      value: "event",
                    },
                    {
                      label: "Сайн дурын ажил",
                      value: "volunteering_event",
                    },
                  ]}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label="Бүртгэл эхлэх хугацаа"
                name="registrationStartTime"
                rules={[
                  {
                    required: true,
                    message: "Заавал бөглөх!",
                  },
                ]}
              >
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label="Бүртгэл дуусах хугацаа"
                name="registrationEndTime"
                rules={[
                  {
                    required: true,
                    message: "Заавал бөглөх!",
                  },
                ]}
              >
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col span={6}>
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
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col span={6}>
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
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item label="Зураг хуулах:">
                <ImageUpload
                  imageType="event"
                  onUploadSuccess={handleUploadSuccess}
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
              <Form.Item
                label="Хамаарах ангилал"
                name="categories"
                rules={[
                  {
                    required: true,
                    message: "Заавал бөглөх!",
                  },
                ]}
              >
                <Select
                  mode="multiple"
                  allowClear
                  style={{
                    width: "100%",
                  }}
                  placeholder="сонгох"
                  options={categories}
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
            <Col span={24}>
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
                  </Row>
                )}
              </Form.List>
            </Col>
            <Col span={12}>
              <Form.Item
                name="maxVolunteers"
                label="Хэрэгтэй байгаа сайн дурыхан:"
                rules={[{ required: true, message: "Тоо оруулна уу" }]}
              >
                <InputNumber
                  placeholder="Тоо оруулах"
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="ageRestriction"
                label="Доод насны хязгаар"
                rules={[{ required: true, message: "Тоо оруулна уу" }]}
              >
                <InputNumber
                  placeholder="Тоо оруулна уу"
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
          </Row>
        </div>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            {btnText ? btnText : "Үүсгэх"}
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
