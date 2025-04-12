'use client';
import { api } from '@/actions';
import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
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
} from 'antd';
import { CategoryType, EventType } from '@/types';
import ImageUpload from '@/components/imageUpload';

const { TextArea } = Input;
const country = [
  {
    value: 'Монгол',
    label: 'Монгол',
  },
];

const province = [
  {
    value: 'Улаанбаатар',
    label: 'Улаанбаатар',
  },
  // {
  //   value: 'Архангай',
  //   label: 'Архангай',
  // },
  // {
  //   value: 'Баян-Өлгий',
  //   label: 'Баян-Өлгий',
  // },
  // {
  //   value: 'Баянхонгор',
  //   label: 'Баянхонгор',
  // },
  // {
  //   value: 'Булган',
  //   label: 'Булган',
  // },
  // {
  //   value: 'Говь-Алтай',
  //   label: 'Говь-Алтай',
  // },
  // {
  //   value: 'Говьсүмбэр',
  //   label: 'Говьсүмбэр',
  // },
  // {
  //   value: 'Дорноговь',
  //   label: 'Дорноговь',
  // },
  // {
  //   value: 'Дорнод',
  //   label: 'Дорнод',
  // },
  // {
  //   value: 'Дундговь',
  //   label: 'Дундговь',
  // },
  // {
  //   value: 'Завхан',
  //   label: 'Завхан',
  // },
  // {
  //   value: 'Орхон',
  //   label: 'Орхон',
  // },
  // {
  //   value: 'Өвөрхангай',
  //   label: 'Өвөрхангай',
  // },
  // {
  //   value: 'Өмнөговь',
  //   label: 'Өмнөговь',
  // },
  // {
  //   value: 'Сүхбаатар',
  //   label: 'Сүхбаатар',
  // },
  // {
  //   value: 'Сэлэнгэ',
  //   label: 'Сэлэнгэ',
  // },
  // {
  //   value: 'Төв',
  //   label: 'Төв',
  // },
  // {
  //   value: 'Увс',
  //   label: 'Увс',
  // },
  // {
  //   value: 'Ховд',
  //   label: 'Ховд',
  // },
  // {
  //   value: 'Хөвсгөл',
  //   label: 'Хөвсгөл',
  // },
  // {
  //   value: 'Хэнтий',
  //   label: 'Хэнтий',
  // },
  // {
  //   value: 'Дархан-Уул',
  //   label: 'Дархан-Уул',
  // },
  // {
  //   value: 'Дорноговь',
  //   label: 'Дорноговь',
  // },
  // {
  //   value: 'Орхон',
  //   label: 'Орхон',
  // },
];

const districts = [
  { value: 'Багануур', label: 'Багануур', regionCode: 'UB-BN' },
  { value: 'Багахангай', label: 'Багахангай', regionCode: 'UB-BKH' },
  { value: 'Баянгол', label: 'Баянгол', regionCode: 'UB-BGD' },
  { value: 'Баянзүрх', label: 'Баянзүрх', regionCode: 'UB-BZD' },
  { value: 'Налайх', label: 'Налайх', regionCode: 'UB-NLH' },
  { value: 'Сонгинохайрхан', label: 'Сонгинохайрхан', regionCode: 'UB-SKH' },
  { value: 'Сүхбаатар', label: 'Сүхбаатар', regionCode: 'UB-SBD' },
  { value: 'Хан-Уул', label: 'Хан-Уул', regionCode: 'UB-KHUD' },
  { value: 'Чингэлтэй', label: 'Чингэлтэй', regionCode: 'UB-CHD' },
];

const newDistricts = [
  {
    regionCode: 'UB-BZD',
    region: 'Улаанбаатар-Баянзүрх',
    countryCode: 'MN',
  },
  {
    regionCode: 'UB-BGD',
    region: 'Улаанбаатар-Баянгол',
    countryCode: 'MN',
  },
  {
    regionCode: 'UB-CHD',
    region: 'Улаанбаатар-Чингэлтэй',
    countryCode: 'MN',
  },
  {
    regionCode: 'UB-SBD',
    region: 'Улаанбаатар-Сүхбаатар',
    countryCode: 'MN',
  },
  {
    regionCode: 'UB-SHD',
    region: 'Улаанбаатар-Сонгинохайрхан',
    countryCode: 'MN',
  },
  {
    regionCode: 'UB-HUD',
    region: 'Улаанбаатар-Хан-Уул',
    countryCode: 'MN',
  },
  {
    regionCode: 'UB-NAD',
    region: 'Улаанбаатар-Налайх',
    countryCode: 'MN',
  },
  {
    regionCode: 'UB-BND',
    region: 'Улаанбаатар-Багануур',
    countryCode: 'MN',
  },
  {
    regionCode: 'UB-BHD',
    region: 'Улаанбаатар-Багахангай',
    countryCode: 'MN',
  },
];

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
  const slug = param.get('slug');

  useEffect(() => {
    if (eventType) {
      form.setFieldsValue({ type: eventType });
    }
  }, [eventType, form]);

  const onFinish = async (values: EventType) => {
    try {
      let result;

      const region = form.getFieldValue(['address', 'region']);
      const matchedDistrict = newDistricts.find(
        (district) => district.region === region
      );

      const selectedCategoryValues =
        values.categories?.map((cat: { value: string }) => cat.value) || [];

      const finalValues: EventType = {
        ...values,
        categories: selectedCategoryValues,
        address: {
          ...values.address,
          regionCode: matchedDistrict?.regionCode,
          countryCode: 'MN',
        },
      };

      if (slug) {
        result = await api.put(`/api/events/${slug}`, finalValues);
      } else {
        result = await api.post('/api/events/new', finalValues);
      }

      if (!result.success) {
        message.warning(result?.message?.message);
        return;
      }

      message.success('Амжилттай!');
      router.push('/profile/events');
    } catch (info) {
      console.log('Validation Failed:', info);
    }
  };

  const handleUploadSuccess = (data: any) => {
    console.log('handleUploadSuccess data', data);
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
                    message: 'Заавал бөглөх!',
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
                    message: 'Заавал бөглөх!',
                  },
                ]}
              >
                <Select
                  allowClear
                  style={{
                    width: '100%',
                  }}
                  placeholder="сонгох"
                  options={[
                    {
                      label: 'Арга хэмжээ',
                      value: 'event',
                    },
                    {
                      label: 'Сайн дурын ажил',
                      value: 'volunteering_event',
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
                    message: 'Заавал бөглөх!',
                  },
                ]}
              >
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label="Бүртгэл дуусах хугацаа"
                name="registrationEndTime"
                rules={[
                  {
                    required: true,
                    message: 'Заавал бөглөх!',
                  },
                ]}
              >
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label="Эхлэх хугацаа"
                name="startTime"
                rules={[
                  {
                    required: true,
                    message: 'Заавал бөглөх!',
                  },
                ]}
              >
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label="Дуусах хугацаа"
                name="endTime"
                rules={[
                  {
                    required: true,
                    message: 'Заавал бөглөх!',
                  },
                ]}
              >
                <DatePicker style={{ width: '100%' }} />
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
                    message: 'Заавал бөглөх!',
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
                    message: 'Заавал бөглөх!',
                  },
                ]}
              >
                <Select
                  mode="multiple"
                  allowClear
                  style={{
                    width: '100%',
                  }}
                  placeholder="сонгох"
                  options={categories}
                />
              </Form.Item>
            </Col>

            <Form.List name="contact">
              {(fields) => (
                <>
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
                </>
              )}
            </Form.List>
            <Col span={24}>
              <Form.List name="address">
                {() => (
                  <Row gutter={[15, 15]}>
                    <Col span={12}>
                      <Form.Item
                        label="Улс"
                        name="country"
                        rules={[
                          {
                            required: true,
                            message: 'Заавал бөглөх!',
                          },
                        ]}
                      >
                        <Select
                          style={{
                            width: '100%',
                          }}
                          options={country}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        label="Дүүрэг/Сум"
                        name="region"
                        rules={[
                          {
                            required: true,
                            message: 'Заавал бөглөх!',
                          },
                        ]}
                      >
                        <Select
                          style={{
                            width: '100%',
                          }}
                          options={newDistricts.map((d) => ({
                            label: d.region,
                            value: d.region,
                          }))}
                        />
                      </Form.Item>
                    </Col>

                    <Col span={0}>
                      <Form.Item label="Дүүрэг Code" name="regionCode" hidden>
                        <Select
                          style={{
                            width: '100%',
                          }}
                        />
                      </Form.Item>
                    </Col>

                    <Col span={0}>
                      <Form.Item label="Country Code" name="countryCode" hidden>
                        <Select
                          style={{
                            width: '100%',
                          }}
                        />
                      </Form.Item>
                    </Col>

                    <Col span={24}>
                      <Form.Item
                        rules={[
                          {
                            required: true,
                            message: 'Дэлгэрэнгүй хаяг оруулна уу',
                          },
                        ]}
                        label="Дэлгэрэнгүй хаяг"
                        name="address"
                      >
                        <TextArea autoSize={{ minRows: 3, maxRows: 5 }} />
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
                rules={[{ required: true, message: 'Тоо оруулна уу' }]}
              >
                <InputNumber
                  placeholder="Тоо оруулах"
                  style={{ width: '100%' }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="ageRestriction"
                label="Доод насны хязгаар"
                rules={[{ required: true, message: 'Тоо оруулна уу' }]}
              >
                <InputNumber
                  placeholder="Тоо оруулна уу"
                  style={{ width: '100%' }}
                />
              </Form.Item>
            </Col>
          </Row>
        </div>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            {btnText ? btnText : 'Үүсгэх'}
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
