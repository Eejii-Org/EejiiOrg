"use client";

import {
  HeartOutlined,
  ClockCircleOutlined,
  FireOutlined,
  ArrowUpOutlined,
} from "@ant-design/icons";
import { Row, Col, Statistic } from "antd";

export const UserStats = ({ user }: { user: any }) => {
  const isVolunteer = user?.type === "volunteer";
  if (isVolunteer) {
    return (
      <Row gutter={[10, 10]} className="mb-4">
        <Col span={6}>
          <Statistic
            className="bg-white p-6 rounded-md"
            title="Сайн дурын ажил"
            value={user?.successVolunteering}
            valueStyle={{
              color: "#3f8600",
            }}
            prefix={<FireOutlined />}
          />
        </Col>
        <Col span={6}>
          <Statistic
            className="bg-white p-6 rounded-md"
            title="Зарцуулсан цаг"
            value={user?.totalHours}
            valueStyle={{
              color: "#3f8600",
            }}
            prefix={<ClockCircleOutlined />}
          />
        </Col>
        <Col span={6}>
          <Statistic
            className="bg-white p-6 rounded-md"
            title="Идэвх"
            value={user.suggestionPercent}
            precision={2}
            valueStyle={{
              color: "#3f8600",
            }}
            prefix={<ArrowUpOutlined />}
          />
        </Col>
        <Col span={6}>
          <Statistic
            className="bg-white p-6 rounded-md"
            title="Хандив"
            value={user?.totalDonation}
            valueStyle={{
              color: "#3f8600",
            }}
            prefix={<HeartOutlined />}
            suffix="₮"
          />
        </Col>
      </Row>
    );
  }

  console.log("user", user);

  return (
    <Row gutter={[10, 10]}>
      <Col span={8}>
        <Statistic
          className="bg-white p-6 rounded-md"
          title="Арга хэмжээ"
          value={user?.partnerEventCount}
          valueStyle={{
            color: "#3f8600",
          }}
          prefix={<FireOutlined />}
        />
      </Col>

      <Col span={8}>
        <Statistic
          className="bg-white p-6 rounded-md"
          title="Төсөл хөтөлбөүүд"
          value={user?.partnerProjectCount}
          valueStyle={{
            color: "#3f8600",
          }}
          prefix={<FireOutlined />}
        />
      </Col>
      <Col span={8}>
        <Statistic
          className="bg-white p-6 rounded-md"
          title="Илгээсэн Хандив"
          value={user?.partnerDonations}
          valueStyle={{
            color: "#3f8600",
          }}
          prefix={<HeartOutlined />}
        />
      </Col>
      <Col span={8}>
        <Statistic
          className="bg-white p-6 rounded-md"
          title="Цуглуулсан Хандив"
          value={user?.partnerCollectedDonation}
          valueStyle={{
            color: "#3f8600",
          }}
          prefix={<HeartOutlined />}
        />
      </Col>
      <Col span={8}>
        <Statistic
          className="bg-white p-6 rounded-md"
          title="Хамтарсан сайн дурыхан"
          value={user?.partnerVolunteerCount}
          valueStyle={{
            color: "#3f8600",
          }}
          prefix={<FireOutlined />}
        />
      </Col>
      <Col span={8}>
        <Statistic
          className="bg-white p-6 rounded-md"
          title="Олгосон Батлаж"
          value="2000"
          valueStyle={{
            color: "#3f8600",
          }}
          prefix={<HeartOutlined />}
        />
      </Col>
    </Row>
  );
};
