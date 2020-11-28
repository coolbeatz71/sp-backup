import React, { FC } from "react";
import { Collapse } from "antd";
import styles from "./faq.module.scss";
import { useTranslation } from "react-i18next";

const Panel = Collapse.Panel;

const expandIcon = (props: any) => {
  const { isActive } = props;
  return (
    <i>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 160 160"
        style={{
          transform: "scaleY(1)",
          transformOrigin: "50% 50%",
        }}
      >
        <rect
          x="70"
          style={{
            transition: "all 400ms",
            transform: `scaleY(${isActive ? 0 : 1})`,
          }}
          width="20"
          height="160"
        />
        <rect y="70" width="160" height="20" />
      </svg>
    </i>
  );
};

const Faq: FC<{}> = () => {
  const { t } = useTranslation();
  const questions = [
    {
      title: t("what is save plus bill"),
      description: t("save_plus_bill_desc", {
        link: "<a href='https://saveplus.io' target='_blank'>saveplus.io</a>",
        code: `*777*77*${t("till number")}*${t("amount")}#`,
      }),
    },
    {
      title: t("how is the donation process"),
      description: t("donation_process_desc", {
        donateButton: `<b>${t("donate").toUpperCase()}</b>`,
      }),
    },
    {
      title: t("how secure is the payment"),
      description: t("payment_security_desc"),
    },
    {
      title: t("how often can i donate"),
      description: t("how_donate_often_desc"),
    },
    {
      title: t("how to collect funds"),
      description: t("how_to_collect_funds_desc"),
    },
    {
      title: t("can i cancel a cause"),
      description: t("can_i_cancel_desc"),
    },
    {
      title: t("is save plus outside rwanda"),
      description: t("save_plus_outside_desc"),
    },
    {
      title: t("does it support banks"),
      description: t("does_it_support_banks_desc"),
    },
    {
      title: t("connection between save and plus"),
      description: t("save_and_plus_conn_desc"),
    },
  ];
  return (
    <Collapse
      bordered={false}
      defaultActiveKey={["0"]}
      expandIcon={expandIcon}
      expandIconPosition="right"
    >
      {questions.map((item, index) => (
        <Panel
          header={item.title}
          key={index}
          className={styles.faq}
          collapsible="header"
        >
          <div
            dangerouslySetInnerHTML={{
              __html: item.description,
            }}
          />
        </Panel>
      ))}
    </Collapse>
  );
};

export default Faq;
