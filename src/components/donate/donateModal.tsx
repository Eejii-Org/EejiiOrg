"use client";
import Image from "next/image";
import { Row, Col, Divider, Modal, Form, Input, Select } from "antd";

const amountOptions = [
  {
    label: "5,000₮",
    value: 5000,
  },
  {
    label: "10,000₮",
    value: 10000,
  },
  {
    label: "20,000₮",
    value: 20000,
  },
  {
    label: "50,000₮",
    value: 50000,
  },
  {
    label: "100,000₮",
    value: 100000,
  },
  {
    label: "500,000₮",
    value: 500000,
  },
  {
    label: "Дурын мөнгөн дүн",
    value: null,
  },
];

const DonateModal = ({ openModal, closeModal, qpayResult, isDonate }) => {
  return (
    <Modal
      title={isDonate ? `Хандив өгөх` : `Эрх авах`}
      open={openModal}
      onCancel={closeModal}
      footer={false}
      width={400}
    >
      <Divider />
      <Image
        src={`data:image/jpeg;base64,${qpayResult?.qr_image}`}
        width={400}
        height={400}
        alt="Picture of the author"
      />
      <Divider>Гар утасны апп ашиглах</Divider>
      <Row gutter={[10, 10]}>
        {qpayResult?.urls?.map((bank, idx) => (
          <Col span={3} key={idx}>
            <a data-app={bank.link}>
              <img
                src={bank.logo}
                width={180}
                height={180}
                className="rounded-lg shadow-[0_5px_28px_0_rgba(0,0,0,0.1)] border border-[#e2e2e2]"
              />
            </a>
          </Col>
        ))}
      </Row>
    </Modal>
  );
};

export default DonateModal;
