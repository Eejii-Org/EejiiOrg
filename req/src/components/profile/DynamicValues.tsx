"use client";
import { useState } from "react";
import { Typography, Drawer, Space, Tabs, Checkbox } from "antd";

const states = [
  {
    label: "Apple",
    value: "Apple",
  },
  {
    label: "Pear",
    value: "Pear",
  },
  {
    label: "Orange",
    value: "Orange",
  },
];

const items = [
  {
    key: "2",
    label: "Page states",
    children: <Checkbox.Group options={states} defaultValue={["Apple"]} />,
  },
  {
    key: "3",
    label: "Event Values",
    children: "Event States",
  },
  {
    key: "1",
    label: "Global States",
    children: "Global States",
  },
];

const DynamicValues = ({ openDrawer, closeDrawer }) => {
  const onChange = (key) => {
    console.log(key);
  };

  return (
    <Drawer
      title="Drawer with extra actions"
      width={500}
      onClose={closeDrawer}
      open={openDrawer}
    >
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    </Drawer>
  );
};

export default DynamicValues;
