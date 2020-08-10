import React, { FC } from "react";
import { Collapse } from "antd";

const Panel = Collapse.Panel;

const questions = [
  {
    title: "Donation Process",
    description: `You can donate for a cause by clicking on the donate button on the cause and entering the amount you want to donate and othet neccessary information that is needed. You can choose to donate as an individual or as an organization, also we allow you to choose to donate anonymously ie your name will not be publish on the page as a donor. But note that anonymous donatation is only available for individual donations.`,
  },
  {
    title: "How secure is the payment",
    description: `Our payment method is very secure and you are assured that your payment information is protected. We do not store your card or any of your payment information. Be assured that your donation will be directed to the appropriate beneficiary of the cause. We also apply two-factor authentication across the platform.`,
  },
  {
    title: "How often can I donate",
    description: `You can donate as often as you like for a cause or different cause, we do not limit your donations for any cause as long as the cause is active and open for donations. `,
  },
  {
    title: "Can I cancel a cause?",
    description: `Yes, a cause can be canceled at any point in time. The creator will need to provide the reason why the cause is being cancelled. Once the cause has been successfully cancelled, the received donations are refunded to their respective donors.`,
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
    description: `Save Plus and Save are sister products and are owned by the same company. You can sign in to both products with the same credentials seamlessly or have an account with only one product.  `,
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
        <Panel header={item.title} key={index}>
          <p>{item.description}</p>
        </Panel>
      ))}
    </Collapse>
  );
};

export default Faq;
