import React, { FC } from "react";
import { Collapse } from "antd";
import styles from "./faq.module.scss";

const Panel = Collapse.Panel;

const questions = [
  {
    title: "What is Save Plus Till?",
    description: `Save Plus Till is a unique six digit Till number that's associated to a cause on Save plus. This Till is used by donors to donate via <a href='http://www.saveplus.io' target='_blank'>
    saveplus.io</a> or our USSD code *777*77*Save Plus Till*Amount#.`,
  },
  {
    title: "What's the donation process like?",
    description: `You can donate to a cause by clicking on the donate button on that cause ,enter the amount you want to donate and other necessary information needed.You can choose to donate as an individual or as an organization. You are also allowed to choose to donate anonymously, i.e. your name will not be published on the page as a donor. Note that anonymous donation is only available for individual donations.`,
  },
  {
    title: "How secure is the payment",
    description: `Our payment method is very secure, Worry not, your payment information is protected. We do not store your card or any of your payment information.Your donation will be directed to the appropriate beneficiary of the cause. A two-factor authentication is applied across the platform.`,
  },
  {
    title: "How often can I donate",
    description: `You can donate as often as you like for a cause or different cause, we do not limit your donations for any cause as long as the cause is active and open for donations. `,
  },
  {
    title: "How do I collect funds for my cause?",
    description: `The funds disbursment is automated. Once the cause hits the target the funds are automatically sent to the creator's account (MoMo, Airtel Money or Bank Account).`,
  },
  {
    title: "Can I cancel a cause?",
    description: `Yes, a cause can be canceled any time and the creator will need to provide the reason why the cause is being cancelled. Once the cause has been successfully cancelled, the received donations are refunded to their respective donors.`,
  },
  {
    title: "Is Save Plus accessible outside of Rwanda?",
    description: `Currently, Save Plus is only accessible in Rwanda and will be rolled out to other countries in the near future.`,
  },
  {
    title: "Does Save Plus accept bank transfers or Visa Cards?",
    description: `At the moment we're only accepting payments from MTN Mobile Money and Airtel Money. Soon, we'll start accepting other payment methods (Bank transfers, Visa payment, PayPal, etc.)`,
  },
  {
    title: "What's the connection between Save Plus and Save?",
    description: `Save Plus and Save are sister products owned by the same company. You can sign in to both products with the same credentials seamlessly or have an account with only one product.`,
  },
];

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
  return (
    <Collapse
      bordered={false}
      defaultActiveKey={["0"]}
      expandIcon={expandIcon}
      expandIconPosition="right"
    >
      {questions.map((item, index) => (
        <Panel header={item.title} key={index} className={styles.faq}>
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
