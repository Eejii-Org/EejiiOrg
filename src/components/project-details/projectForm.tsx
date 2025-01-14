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


export const EventForm = ({
  initialData,
  categories,
  btnText,
  eventType,
}: {
  initialData: EventType;
  categories: CategoryType;
  btnText: String;
  eventType: String;
}) => {
  const router = useRouter();
  const [form] = Form.useForm();
  const param = useSearchParams();
  const slug = param.get("slug");
  form.setFieldsValue({ type: eventType });

  const onFinish = async (values: EventType) => {
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
                  defaultValue={eventType}
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
                  disabled
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
