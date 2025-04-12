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

const formatPrice = (priceInCents: string) => {
  return (parseFloat(priceInCents) / 100).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

const { Title, Text } = Typography;

const ProfilePermit = () => {
  const { user } = useAuth();
  const [permitData, setPermitData] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [qpayResult, setQpayResult] = useState();
  const [btnLoading, setBtnLoading] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string>(
    "createVolunteeringEvent",
  );

  useEffect(() => {
    const getPermits = async () => {
      const result = await api.get("/api/permits");

      console.log("result", result);

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

  console.log("user", user);

  const displayMyPermits = (permit: any) => {};

  return (
    <div>
      <Row gutter={[15, 15]}>
        {permitData.map((item, index) => (
          <Col span={24} key={index}>
            <Flex justify="space-between" className="bg-white p-6 rounded-md">
              <div>
                <Title level={5}>
                  <Space>
                    {item.name}
                    <Tag color="green">
                      Танд нийт {(user as any)?.[item.code]} эрх байна
                    </Tag>
                  </Space>
                </Title>

                <Text type="secondary">
                  <div
                    className="w-full"
                    dangerouslySetInnerHTML={{ __html: item.description }}
                  />
                </Text>
              </div>
              <Space direction="vertical">
                Эрх авах
                {item?.originalPrice > 0 ? (
                  <Button
                    loading={btnLoading}
                    block
                    type="primary"
                    onClick={() => handleBuy(item?.code)} // Pass the selected option's value
                  >
                    {item?.originalPrice
                      ? `₮${formatPrice(item?.originalPrice)}`
                      : "Эрх авах"}
                    {/* Show price or default text */}
                  </Button>
                ) : (
                  <Button
                    loading={btnLoading}
                    block
                    type="primary"
                    onClick={() => handleBuy(item?.code)} // Pass the selected option's value
                  >
                    Үнэгүй
                  </Button>
                )}
              </Space>
            </Flex>
          </Col>
        ))}
      </Row>

      <DonateModal
        openModal={isModalOpen}
        qpayResult={qpayResult}
        closeModal={() => setIsModalOpen(false)}
        isDonate={false}
      />
    </div>
  );
};

export default ProfilePermit;
