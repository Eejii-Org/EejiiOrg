// Updated EventForm component with district -> newDistrict mapping
'use client';
import { api } from '@/actions';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  message,
  Row,
  Select,
} from 'antd';
import ImageUpload from '@/components/imageUpload';
import { useEffect } from 'react';

const provinces = [
  { value: 'Улаанбаатар', label: 'Улаанбаатар' },
  { value: 'Архангай', label: 'Архангай' },
  // ... other provinces
];

const newDistricts = [
  { regionCode: 'UB-BZD', region: 'Улаанбаатар-Баянзүрх', countryCode: 'MN' },
  { regionCode: 'UB-BGD', region: 'Улаанбаатар-Баянгол', countryCode: 'MN' },
  { regionCode: 'UB-CHD', region: 'Улаанбаатар-Чингэлтэй', countryCode: 'MN' },
  { regionCode: 'UB-SBD', region: 'Улаанбаатар-Сүхбаатар', countryCode: 'MN' },
  { regionCode: 'UB-SHD', region: 'Улаанбаатар-Сонгинохайрхан', countryCode: 'MN' },
  { regionCode: 'UB-HUD', region: 'Улаанбаатар-Хан-Уул', countryCode: 'MN' },
  { regionCode: 'UB-NAD', region: 'Улаанбаатар-Налайх', countryCode: 'MN' },
  { regionCode: 'UB-BND', region: 'Улаанбаатар-Багануур', countryCode: 'MN' },
  { regionCode: 'UB-BHD', region: 'Улаанбаатар-Багахангай', countryCode: 'MN' },
];

export const EventForm = ({ initialData, categories, btnText, eventType }) => {
  const router = useRouter();
  const [form] = Form.useForm();
  const param = useSearchParams();
  const slug = param.get('slug');

  useEffect(() => {
    if (eventType) {
      form.setFieldsValue({ type: eventType });
    }
  }, [eventType, form]);

  const onFinish = async (values) => {
    try {
      const result = slug
        ? await api.put(`/api/events/${slug}`, values)
        : await api.post('/api/events/new', values);

      if (!result.success) {
        message.warning(result?.message?.message);
        return;
      }

      message.success('Амжилттай!');
      router.push('/profile/events');
    } catch (error) {
      console.log('Validation Failed:', error);
    }
  };

  const handleUploadSuccess = (data) => {
    console.log('Uploaded image:', data);
  };

  const handleDistrictChange = (value) => {
    const selected = newDistricts.find((d) => d.region === value);
    if (selected) {
      form.setFieldsValue({
        regionCode: selected.regionCode,
        countryCode: selected.countryCode,
      });
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={{
        ...initialData,
      }}
      onFinish={onFinish}
    >
      <Row gutter={15}>
        <Col span={12}>
          <Form.Item
            label="Арга хэмжээний нэр"
            name="title"
            rules={[{ required: true, message: 'Заавал бөглөх!' }]}
          >
            <Input placeholder="нэрээ оруулна уу..." />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            label="Төрөл"
            name="type"
            rules={[{ required: true, message: 'Заавал бөглөх!' }]}
          >
            <Select
              allowClear
              disabled
              placeholder="сонгох"
              options={[
                { label: 'Арга хэмжээ', value: 'event' },
                { label: 'Сайн дурын ажил', value: 'volunteering_event' },
              ]}
            />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            label="Дүүрэг сонгох"
            name="region"
            rules={[{ required: true, message: 'Заавал бөглөх!' }]}
          >
            <Select
              placeholder="Дүүрэг сонгох"
              options={newDistricts.map((d) => ({ label: d.region, value: d.region }))}
              onChange={handleDistrictChange}
            />
          </Form.Item>
        </Col>

        <Col span={6}>
          <Form.Item name="regionCode" label="Region Code">
            <Input disabled />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="countryCode" label="Country Code">
            <Input disabled />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            label="Бүртгэл эхлэх хугацаа"
            name="registrationStartTime"
            rules={[{ required: true, message: 'Заавал бөглөх!' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Бүртгэл дуусах хугацаа"
            name="registrationEndTime"
            rules={[{ required: true, message: 'Заавал бөглөх!' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            label="Эхлэх хугацаа"
            name="startTime"
            rules={[{ required: true, message: 'Заавал бөглөх!' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Дуусах хугацаа"
            name="endTime"
            rules={[{ required: true, message: 'Заавал бөглөх!' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
        </Col>

        <Col span={24}>
          <Form.Item label="Зураг хуулах">
            <ImageUpload imageType="event" onUploadSuccess={handleUploadSuccess} />
          </Form.Item>
        </Col>

        <Col span={24}>
          <Form.Item
            label="Дэлгэрэнгүй тайлбар"
            name="description"
            rules={[{ required: true, message: 'Заавал бөглөх!' }]}
          >
            <Input.TextArea rows={6} />
          </Form.Item>
        </Col>

        <Col span={24}>
          <Form.Item
            label="Хамаарах ангилал"
            name="categories"
            rules={[{ required: true, message: 'Заавал бөглөх!' }]}
          >
            <Select
              mode="multiple"
              allowClear
              placeholder="сонгох"
              options={categories}
            />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            label="Хариуцсан хүний имэйл"
            name="email"
            rules={[{ required: true, message: 'Заавал бөглөх!' }]}
          >
            <Input />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            label="Холбогдох утасны дугаар"
            name="phoneNumber"
            rules={[{ required: true, message: 'Заавал бөглөх!' }]}
          >
            <Input />
          </Form.Item>
        </Col>

        <Col span={24} style={{ textAlign: 'right' }}>
          <Button type="primary" htmlType="submit">
            {btnText}
          </Button>
        </Col>
      </Row>
    </Form>
  );
};