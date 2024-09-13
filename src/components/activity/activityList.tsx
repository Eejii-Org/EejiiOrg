"use client";
import { CertificateType } from "@/types";
import type { TableProps } from "antd";
import Link from "next/link";
import dayjs from "dayjs";
import { FilePdfOutlined, CheckCircleOutlined } from "@ant-design/icons";
import { Flex, Tag, Table, Typography, Divider, Timeline, Button } from "antd";
const { Title, Text } = Typography;

interface DataType {
  key: string;
  id: string;
  organizationName: string;
  title: string;
  grade: number;
  dateRange: string;
  volunteeringHours: string;
}

// certification columns
const TimeLineTemp = () => {
  return (
    <div>
      <Title level={5} className="pb-0">
        NGO support
      </Title>
      <Text strong>
        Герман болон Англи хэлний сургалтын багшлах сайн дурын ажилтан сонгох
      </Text>
      <br />
      <Text strong>Байгууллага: </Text>National Center for material and child
      health of mongolia
      <br /> <Text strong>Үргэлжлэх хугацаа:</Text> Oct 31, 2021 - Nov 7, 2021
      <br /> <Text strong>Төлөв:</Text>
      <Text type="warning"> Оролцох хүсэлт илгээсэн</Text>
    </div>
  );
};

const TimeLineTemp2 = () => {
  return (
    <div>
      <Title level={5} className="pb-0">
        Taught English to kids
      </Title>
      Герман болон Англи хэлний сургалтын багшлах сайн дурын ажилтан сонгох
      <br />
      Санаачлагч: National Center for material and child health of mongolia
      <br />
      Үргэлжлэх хугацаа: Oct 31, 2021 - Nov 7, 2021 <br />
      Төлөв: <Text type="success">Амжилттай дуусгасан</Text>
    </div>
  );
};

export const ActivityList = () => {
  return (
    <div
      className="rounded-md"
      style={{
        backgroundImage:
          "url(https://www.unicef.org/belarus/sites/unicef.org.belarus/files/styles/hero_mobile/public/KOST2124.jpg.webp?itok=b3CjRdpH)",
        backgroundSize: "cover",
      }}
    >
      <div className="bg-gradient-to-r from-white to-[rgba(255,255,255,0.85)] p-6 rounded-md">
        <Flex justify="space-between">
          <Title level={5}>Арга хэмжээнүүд</Title>{" "}
          <Button icon={<FilePdfOutlined />}>Тодорхойлол харах</Button>
        </Flex>

        <Divider />
        <Timeline
          items={[
            {
              children: <TimeLineTemp />,
            },
            {
              children: <TimeLineTemp />,
              dot: <CheckCircleOutlined />,
            },
            {
              children: <TimeLineTemp />,
            },
            {
              children: <TimeLineTemp />,
            },
          ]}
        />
      </div>
    </div>
  );
};
