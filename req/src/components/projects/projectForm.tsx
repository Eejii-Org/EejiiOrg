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

export const ProjectForm = ({
  initialData,
  categories,
  btnText,
  projectType,
}: {
  initialData: EventType;
  categories: CategoryType;
  btnText: String;
  projectType: String;
}) => {
  const router = useRouter();
  const [form] = Form.useForm();
  const param = useSearchParams();
  const slug = param.get("slug");

  if (projectType) {
    form.setFieldsValue({ type: projectType });
  }

  const onFinish = async (values: EventType) => {
    console.log("values", values);
    try {
      let result;

      if (slug) {
        result = await api.put(`/api/projects/${slug}`, values);
      } else {
        result = await api.post("/api/projects/new", values);
      }

      result = await api.post("/api/projects/new", values);

      if (!result.success) {
        message.warning(result?.message?.message);
        return;
      }

      message.success("Амжилттай!");
      router.push("/profile/projects");
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
            <Col span={24}>
              <Form.Item
                label="Төсөлийн нэр"
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
            <Col span={8}>
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
                      label: "Өгөх төсөл",
                      value: "fundraising",
                    },
                    {
                      label: "Хандив босгох төсөл",
                      value: "grant_fundraising",
                    },
                  ]}
                  disabled
                />
              </Form.Item>
            </Col>
            <Col span={8}>
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
            <Col span={8}>
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
                label="Хэрэгцээт мөнгөн дүн:"
                name="goalAmount"
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
              <Form.Item label="Холбоос" name="link">
                <Input />
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
