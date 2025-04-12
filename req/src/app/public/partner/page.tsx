"use client";
import React from "react";
import { AboutMe, UserStats, ActivityList } from "@/components";
import { useEffect, useState } from "react";
import { api } from "@/actions";
import { Row, Col, Skeleton } from "antd";
import { useSearchParams } from "next/navigation";

const PublicPartner = () => {
  const [userData, setUserData] = useState();
  const searchParams = useSearchParams();
  const userId = searchParams.get("id");

  useEffect(() => {
    const fetchData = async () => {
      const result = await api.get(`/api/userPublicProfile/${userId}`);
      setUserData(result.data);
    };

    fetchData();
  }, [userId]);

  // Early return if user is undefined
  if (!userData) {
    return <Skeleton active />;
  }

  return (
    <Row gutter={[15, 15]} align="stretch">
      <Col span={12}>
        <AboutMe user={userData} />
      </Col>
      <Col span={12}>
        <UserStats user={userData} />
      </Col>
      <Col span={24}>
        <ActivityList />
      </Col>
    </Row>
  );
};

export default PublicPartner;
