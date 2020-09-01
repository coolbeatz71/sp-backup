import React from "react";
import Modal from "components/common/Modal";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Typography } from "antd";
import Link from "next/link";

interface Props {
  children: React.ReactElement;
  slug: string;
}

const PreDonation: React.FC<Props> = ({ children, slug }) => {
  return (
    <Modal
      title="Donate"
      noTitle
      icon="/images/pre-donation.svg"
      iconStyle={{
        width: 140,
        height: 180,
        objectFit: "cover",
        objectPosition: "center",
      }}
      trigger={children}
    >
      <div style={{ textAlign: "center", paddingBottom: 40 }}>
        <Typography.Paragraph>
          <Typography.Link>
            <ExclamationCircleOutlined />
          </Typography.Link>
        </Typography.Paragraph>
        <Typography.Paragraph>
          Currently we are accepting
          <br />
          <Typography.Text strong>MTN Mobile Money</Typography.Text> and{" "}
          <Typography.Text strong>Airtel Money</Typography.Text> payments.
        </Typography.Paragraph>
        <Typography.Paragraph>
          VISA, Mastercard & PayPal coming soon!
        </Typography.Paragraph>
        <Link href="/causes/[slug]/donate" as={`/causes/${slug}/donate`}>
          <a style={{ textDecoration: "underline" }}>Proceed</a>
        </Link>
      </div>
    </Modal>
  );
};

export default PreDonation;
