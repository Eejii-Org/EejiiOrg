"use client";
import { useEffect, useState } from "react";
import { api } from "@/actions";
import DonateModal from "@/components/donate/donateModal";
import { useAuth } from "@/providers";
import {
  Button,
  message,
  Typography,
  Space,
  Flex,
  Row,
  Col,
  Tag,
  Skeleton,
} from "antd";
import Statistic from "antd/es/statistic/Statistic";

const formatPrice = (priceInCents: string) => {
  return (parseFloat(priceInCents) / 100).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

const { Title, Text } = Typography;

const ProfilePermit = () => {
  const { user, getUser } = useAuth();
  const [permitData, setPermitData] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [qpayResult, setQpayResult] = useState();
  const [btnLoading, setBtnLoading] = useState<boolean>(false);

  useEffect(() => {
    const getPermits = async () => {
      const result = await api.get("/api/permits");

      if (!result.success) {
        message.warning(result.message.message);
        return;
      }

      if (result?.data?.["hydra:member"] as any) {
        setPermitData(result?.data?.["hydra:member"]);
      }
    };

    getPermits();
  }, []);

  useEffect(() => {
    console.log("qpayResult", qpayResult);
    if (qpayResult) {
      setIsModalOpen(true);
    }
  }, [qpayResult]);

  const handleBuy = async (code: string) => {
    setBtnLoading(true);
    const result = await api.post("/api/permits/buy", { permitCode: code });

    if (!result.success) {
      message.warning(result?.message?.message);
      setBtnLoading(false);
      return;
    }

    setBtnLoading(false);
    setQpayResult(result.data);
  };

  if (!permitData) return <Skeleton />;

  const renderType = (type: string, quantity: number) => {
    switch (type) {
      case "event":
        return `Арга хэмжээ үүсгэх эрх ${quantity}`;
      case "volunteering_event":
        return `Сайн дурын арга хэмжээ үүсгэх эрх ${quantity}`;
      case "fundraising":
        return `Төсөл хөтөлбөр үүсгэх эрх ${quantity}`;
      case "grant_fundraising":
        return `Хандивын төсөл хөтөлбөр үүсгэх эрх ${quantity}`;
      default:
        return "";
    }
  };

  return (
    <div>
      {user && (
        <div className="bg-white rounded-md p-6 grid grid-cols-6 gap-4 mb-4">
          <div className="col-span-2">
            <Statistic
              className=""
              title="Сайн дурын ажил үүсгэх эрх"
              value={user?.volunteeringEventPermit}
              valueStyle={{
                color: "#3f8600",
              }}
              suffix="ш"
            />
          </div>
          <div className="col-span-2">
            <Statistic
              className=""
              title="Арга хэмжээ үүсгэх эрх"
              value={user?.eventPermit}
              valueStyle={{
                color: "#3f8600",
              }}
              suffix="ш"
            />
          </div>
          <div className="col-span-2">
            <Statistic
              className=""
              title="Өгөх төсөл үүсгэх эрх"
              value={user?.fundraisingPermit}
              valueStyle={{
                color: "#3f8600",
              }}
              suffix="ш"
            />
          </div>
          <div className="col-span-3">
            <Statistic
              className=""
              title="Хандив босгох төсөл үүсгэх эрх"
              value={user?.grantFundraisingPermit}
              valueStyle={{
                color: "#3f8600",
              }}
              suffix="ш"
            />
          </div>
          <div className="col-span-3">
            <Statistic
              className=""
              title="Нийтлэл үүсгэх эрх"
              value={user?.mediaPermit}
              valueStyle={{
                color: "#3f8600",
              }}
              suffix="ш"
            />
          </div>
        </div>
      )}
      <Row gutter={[15, 15]}>
        {permitData.map((item, index) => (
          <Col span={24} key={index}>
            <div className="flex justify-between flex-col md:flex-row bg-white p-6 rounded-md">
              <div>
                <Title level={5}>
                  <div className="flex flex-col md:flex-row md:gap-2">
                    {item.name}
                    <Tag color="green" className="mt-2 md:mt-0">
                      {renderType(item.type, item.quantity)}
                    </Tag>
                  </div>
                </Title>

                <Text type="secondary">
                  <div
                    className="w-full"
                    dangerouslySetInnerHTML={{ __html: item.description }}
                  />
                </Text>
              </div>
              <Space direction="vertical" className="mt-2 md:mt-0">
                <div className="flex flex-col">
                  {item.price < item.originalPrice && (
                    <del className="text-gray-500 text-sm font-medium">
                      {item?.originalPrice &&
                        `₮${formatPrice(item?.originalPrice)}`}
                    </del>
                  )}
                  <strong>
                    {item?.price > 0
                      ? `₮${formatPrice(item?.price)}`
                      : "Үнэгүй"}
                  </strong>
                </div>
                <Button
                  loading={btnLoading}
                  block
                  type="primary"
                  onClick={() => handleBuy(item?.code)} // Pass the selected option's value
                >
                  Эрх авах
                </Button>
              </Space>
            </div>
          </Col>
        ))}
      </Row>

      <DonateModal
        openModal={isModalOpen}
        qpayResult={qpayResult}
        closeModal={() => setIsModalOpen(false)}
        onSuccess={() => getUser()}
        isDonate={false}
      />
    </div>
  );
};

export default ProfilePermit;
