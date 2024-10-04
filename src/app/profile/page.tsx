"use client";

import { useAuth } from "@/providers";
import { getCookie } from "cookies-next";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { getEventUsers } from "@/actions";
import {
  HeartOutlined,
  ClockCircleOutlined,
  FireOutlined,
  ArrowUpOutlined,
} from "@ant-design/icons";
import { Row, Col, Statistic, Typography, Button, Result } from "antd";
import { ActivityList, UserStats } from "@/components";

const { Title } = Typography;

// Empty Bio alert

const EmptyBio = () => {
  return (
    <Result
      status="warning"
      subTitle="Та өөрийн миний тухай хэсгийг оруулна уу."
      extra={[
        <Button type="primary" key="console">
          Засах
        </Button>,
      ]}
    />
  );
};

const ProfilePage = () => {
  const { user, userLoading } = useAuth();
  const [userEvents, setUserEvents] = useState([]);

  useEffect(() => {
    const fetchCertificateData = async () => {
      if (!user) return;
      const token = getCookie("token");
      if (!token) return;

      const result = await getEventUsers(token);

      if (result?.["hydra:member"] as any) {
        setUserEvents(result?.["hydra:member"]);
      }
    };

    fetchCertificateData();
  }, [user]);

  console.log("user", user);

  return (
    <>
      <UserStats user={user} />
      <div className="mt-4">
        <ActivityList />
      </div>
    </>
  );
};

export default ProfilePage;
