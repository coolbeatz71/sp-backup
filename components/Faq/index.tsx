import React, { FC } from "react";
import { Collapse } from "antd";

const Panel = Collapse.Panel;

const questions = [
  {
    title: "Donation Process",
    description: `It is a long established fact that a reader will be distracted by the readable content of a
    page when looking at its layout. The point of using Lorem Ipsum is that it has a
    more-or-less normal distribution of letters, as opposed to using 'Content here, content
    here', making it look like readable English. Many desktop publishing packages and web
    page editors now use Lorem Ipsum as their default model text, and a search for '
    lorem ipsum' will uncover many web sites still in their infancy.

    It is a long established fact that a reader will be distracted by the readable content of a
    page when looking at its layout. The point of using Lorem Ipsum is that it has a
    more-or-less normal distribution of letters, as opposed to using 'Content here, content
    here', making it look like readable English. Many desktop publishing packages and web
    page editors now use Lorem Ipsum as their default model text, and a search for '
    lorem ipsum' will uncover many web sites still in their infancy. `,
  },
  {
    title: "How secure is the payment",
    description: `It is a long established fact that a reader will be distracted by the readable content of a
    page when looking at its layout. The point of using Lorem Ipsum is that it has a
    more-or-less normal distribution of letters, as opposed to using 'Content here, content
    here', making it look like readable English. Many desktop publishing packages and web
     page editors now use Lorem Ipsum as their default model text, and a search for '
    lorem ipsum' will uncover many web sites still in their infancy.

    It is a long established fact that a reader will be distracted by the readable content of a
    page when looking at its layout. The point of using Lorem Ipsum is that it has a
    more-or-less normal distribution of letters, as opposed to using 'Content here, content
    here', making it look like readable English. Many desktop publishing packages and web
     page editors now use Lorem Ipsum as their default model text, and a search for '
    lorem ipsum' will uncover many web sites still in their infancy. `,
  },
  {
    title: "How often can I donate",
    description: `It is a long established fact that a reader will be distracted by the readable content of a
    page when looking at its layout. The point of using Lorem Ipsum is that it has a
    more-or-less normal distribution of letters, as opposed to using 'Content here, content
    here', making it look like readable English. Many desktop publishing packages and web
     page editors now use Lorem Ipsum as their default model text, and a search for '
    lorem ipsum' will uncover many web sites still in their infancy.

    It is a long established fact that a reader will be distracted by the readable content of a
    page when looking at its layout. The point of using Lorem Ipsum is that it has a
    more-or-less normal distribution of letters, as opposed to using 'Content here, content
    here', making it look like readable English. Many desktop publishing packages and web
     page editors now use Lorem Ipsum as their default model text, and a search for '
    lorem ipsum' will uncover many web sites still in their infancy. `,
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
      defaultActiveKey={["1"]}
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
