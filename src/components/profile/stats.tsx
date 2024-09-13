"use client";

import {
  HeartOutlined,
  ClockCircleOutlined,
  FireOutlined,
  ArrowUpOutlined,
} from "@ant-design/icons";
import { Row, Col, Statistic } from "antd";

export const UserStats = ({ data }: { data: any }) => {
  return (
    <Row gutter={[10, 10]}>
      <Col span={12}>
        <Statistic
          className="bg-white p-6 rounded-md"
          title="Сайн дурын ажил"
          value={4}
          valueStyle={{
            color: "#3f8600",
          }}
          prefix={<FireOutlined />}
        />
      </Col>
      <Col span={12}>
        <Statistic
          className="bg-white p-6 rounded-md"
          title="Зарцуулсан цаг"
          value={13}
          valueStyle={{
            color: "#3f8600",
          }}
          prefix={<ClockCircleOutlined />}
        />
      </Col>
      <Col span={12}>
        <Statistic
          className="bg-white p-6 rounded-md"
          title="Идэвх"
          value={90}
          precision={2}
          valueStyle={{
            color: "#3f8600",
          }}
          prefix={<ArrowUpOutlined />}
          suffix="%"
        />
      </Col>
      <Col span={12}>
        <Statistic
          className="bg-white p-6 rounded-md"
          title="Хандив"
          value="₮20,000"
          valueStyle={{
            color: "#3f8600",
          }}
          prefix={<HeartOutlined />}
        />
      </Col>
    </Row>
  );
};
