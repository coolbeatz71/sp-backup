import React from "react";
import { useTranslation } from "react-i18next";
import { capitalize } from "lodash";
import Modal from "components/common/Modal";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Typography } from "antd";
import Link from "next/link";

interface Props {
  children: React.ReactElement;
  slug: string;
}

const PreDonation: React.FC<Props> = ({ children, slug }) => {
  const { t } = useTranslation();
  return (
    <Modal
      title={capitalize(t("donate"))}
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
          {t('currently we are accepting')}
          <br />
          <Typography.Text strong>MTN Mobile Money</Typography.Text> {t("and")}{" "}
          <Typography.Text strong>Airtel Money</Typography.Text> {t("post_airtel")}.
        </Typography.Paragraph>
        <Typography.Paragraph>
          {t("visas coming soon")}
        </Typography.Paragraph>
        <Link href="/causes/[slug]/donate" as={`/causes/${slug}/donate`}>
          <a style={{ textDecoration: "underline" }} rel="noreferrer noopener">
            {t("proceed")}
          </a>
        </Link>
      </div>
    </Modal>
  );
};

export default PreDonation;
