"use client";
import Link from "next/link";
import { useState } from "react";
import UserGreeting from "@/components/greeting";
import Image from "next/image";
import { CaretDown } from "./icons";
import { MenuOutlined, UserOutlined, DownOutlined } from "@ant-design/icons";
import { useAuth } from "@/providers";
import {
  Row,
  Col,
  Layout,
  Skeleton,
  Space,
  Button,
  Dropdown,
  Drawer,
  List,
  Typography,
  Divider,
} from "antd";
const { Header: AntdHeader } = Layout;
const { Text } = Typography;

const links = [
  {
    link: "/projects",
    label: "Төсөл хөтөлбөр",
  },
  {
    link: "/events?page=1&t=event",
    label: "Сайн дурын ажилууд",
  },

  {
    link: "/medias",
    label: "Мэдээ",
  },
  { link: "/about", label: "Зорилго" },
];

const items = [
  { link: "/supporters", key: "supporters", label: "Дэмжигчид" },
  { link: "/partners", key: "partners", label: "Хамтрагчид" },
  {
    link: "/volunteers",
    key: "volunteers",
    label: <Link href="/volunteers">Сайн дурынхан</Link>,
  },
];

export const Header = () => {
  const { user, userLoading } = useAuth();
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  return (
    <AntdHeader className="shadow-sm p-0 z-50 fixed w-full bg-white top-0">
      <div className="container">
        <Row justify="space-between" align="middle">
          <Col>
            <Link href="/">
              <div className="relative w-[168px] h-[42px]">
                <Image
                  src="/assets/logo.png"
                  alt="foundation Logo"
                  fill
                  objectFit="contain"
                />
              </div>
            </Link>
          </Col>
          <Col className="hidden md:block">
            <Space>
              {links.map((link, index) => {
                return (
                  <Link
                    href={link?.link}
                    key={index}
                    className="px-4 text-lg font-semibold"
                  >
                    {link.label}
                  </Link>
                );
              })}

              <Dropdown menu={{ items }} placement="bottomRight" arrow>
                <a href="#" className="px-4 text-lg font-semibold">
                  Бид
                  <DownOutlined style={{ fontSize: "10px", paddingLeft: 5 }} />
                </a>
              </Dropdown>
            </Space>
          </Col>

          <Col className="hidden md:block">
            {userLoading ? (
              <Skeleton.Input active />
            ) : (
              <UserGreeting user={user} />
            )}
          </Col>

          <Col className="md:hidden sm:block">
            <Button onClick={showDrawer}>
              <MenuOutlined />
            </Button>
          </Col>
        </Row>
      </div>

      <Drawer title="Үндсэн цэс" open={open} onClose={onClose} width={350}>
        {userLoading ? (
          <Skeleton.Input active />
        ) : (
          <UserGreeting user={user} full />
        )}

        <List
          dataSource={links}
          renderItem={(item) => (
            <List.Item>
              <Link href={item.link}>{item.label}</Link>
            </List.Item>
          )}
        />
      </Drawer>
    </AntdHeader>
  );
};
