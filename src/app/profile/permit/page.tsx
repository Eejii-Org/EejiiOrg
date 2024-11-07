"use client";
import { useEffect, useState } from "react";
import { api } from "@/actions";
import DonateModal from "@/components/donate/donateModal";
import {
  Button,
  message,
  Typography,
  Space,
  Flex,
  Select,
  Skeleton,
} from "antd";

const formatPrice = (priceInCents) => {
  return (parseFloat(priceInCents) / 100).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

const { Title } = Typography;

const ProfilePermit = () => {
  const [permitData, setPermitData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [qpayResult, setQpayResult] = useState();
  const [btnLoading, setBtnLoading] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string>(
    "createVolunteeringEvent"
  );

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

  const volunteerEventQuantity = () =>
    permitData
      .filter((item) => item?.type === "volunteering_event")
      .map((item) => ({
        label: `${item.quantity} удаагын эрх`,
        value: item?.code,
        price: item?.price,
      }));

  const options = volunteerEventQuantity();
  const selectedPrice = options.find(
    (item) => item.value === selectedOption
  )?.price;

  if (!selectedPrice) return <Skeleton />;

  return (
    <div>
      <div>
        <Space direction="vertical" style={{ width: "100%" }}>
          <Flex justify="space-between" className="bg-white p-6 rounded-md">
            <div>
              <Title level={5}>"Сайн дурын ажил" үүсгэх эрх</Title>
              Та уг эрхийг авсанаар "Сайн дурын ажил" үүсгэх эрхтэй болно
            </div>
            <Space direction="vertical">
              <Select
                options={volunteerEventQuantity()}
                onChange={(value) => setSelectedOption(value)}
                defaultValue="createVolunteeringEvent"
              />
              <Button
                loading={btnLoading}
                block
                type="primary"
                onClick={() => handleBuy(selectedOption)} // Pass the selected option's value
              >
                {selectedPrice ? `₮${formatPrice(selectedPrice)}` : "Эрх авах"}
                {/* Show price or default text */}
              </Button>
            </Space>
          </Flex>
        </Space>
      </div>

      <DonateModal
        openModal={isModalOpen}
        qpayResult={qpayResult}
        closeModal={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default ProfilePermit;
