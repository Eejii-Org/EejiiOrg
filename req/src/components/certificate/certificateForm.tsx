"use client";
import { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { api } from "@/actions";
import { Select, Upload, Input, Button, Form, message } from "antd";
import { useRouter } from "next/navigation";
const { TextArea } = Input;

export const CertificateForm = ({ edit, initialData }) => {
  const router = useRouter();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const result = await api.get("/api/events?myCreated=true");

      if (result?.data?.["hydra:member"] as any) {
        const eventResult = result.data?.["hydra:member"];

        const updatedevents = eventResult.map((item) => ({
          label: item.title,
          value: item.slug,
          key: item.id,
        }));

        setEvents(updatedevents);
      }
    };

    fetchEvents();
  }, []);

  const handleSave = async (val) => {
    const url = `/api/events/${val.eventSlug}/certificateTemplate`;
    const data = {
      description: val.shortDescription,
      shortDescription: val.shortDescription,
      organizationName: val.organizationName,
    };
    const result = edit ? await api.put(url, data) : await api.post(url, data);

    if (!result.success) {
      return message.warning(result?.message?.message);
    }

    router.push("/profile/certificates");
    return message.success("Амжилттай хадгалагдлаа!");
  };

  console.log("initialData", initialData);

  return (
    <Form
      name="basic"
      autoComplete="off"
      layout="vertical"
      onFinish={handleSave}
      initialValues={initialData}
    >
      <Form.Item
        label="Сертификат үүсгэх арга хэмжээ"
        name="eventSlug"
        rules={[
          {
            required: true,
            message: "заавал бөглөх!",
          },
        ]}
      >
        <Select
          style={{ width: "100%" }}
          options={events}
          placeholder="Арга хэмжээ сонгоно уу..."
          disabled={initialData?.eventSlug ? true : false}
        />
      </Form.Item>

      <Form.Item
        label="Байгууллагын нэр"
        name="organizationName"
        rules={[
          {
            required: true,
            message: "заавал бөглөх!",
          },
        ]}
      >
        <Input disabled />
      </Form.Item>

      <Form.Item
        label="Сертификатын тайлбар (155 тэмдэгт)"
        name="shortDescription"
        rules={[
          {
            required: true,
            message: "заавал бөглөх!",
          },
        ]}
      >
        <TextArea rows={5} maxLength={155} />
      </Form.Item>

      <Form.Item label="Сертификат дээр харагдах лого" valuePropName="fileList">
        <Upload action="/upload.do" listType="picture-card">
          <button
            style={{
              border: 0,
              background: "none",
            }}
            type="button"
          >
            <PlusOutlined />
            <div
              style={{
                marginTop: 8,
              }}
            >
              хуулах
            </div>
          </button>
        </Upload>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Хадгалах
        </Button>
      </Form.Item>
    </Form>
  );
};
