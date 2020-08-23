import React from "react";
import { Popover, Typography } from "antd";
import { StarFilled } from "@ant-design/icons";
import numeral from "numeral";

import styles from "./index.module.scss";

interface Props {
  value: number;
  count?: number;
  text?: string;
  onMouseEnter?: (e: React.MouseEvent) => void;
  onMouseLeave?: (e: React.MouseEvent) => void;
  onFocus?: (e: React.FocusEvent) => void;
  onClick?: (e: React.MouseEvent) => void;
}

const Stars: React.FC<Props> = ({
  value,
  text,
  onMouseEnter,
  onMouseLeave,
  onFocus,
  onClick,
}) => (
  <div
    className={styles.stars}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    onFocus={onFocus}
    onClick={onClick}
  >
    {text && <span>{text}</span>}
    <StarFilled data-color={value >= 1 ? "filled" : "not-filled"} />
    <StarFilled data-color={value >= 2 ? "filled" : "not-filled"} />
    <StarFilled data-color={value >= 3 ? "filled" : "not-filled"} />
    <StarFilled data-color={value >= 4 ? "filled" : "not-filled"} />
    <StarFilled data-color={value >= 5 ? "filled" : "not-filled"} />
  </div>
);

const StarRating: React.FC<Props> = ({ value, count = 0 }) => {
  return (
    <Popover
      trigger="hover"
      placement="topLeft"
      content={
        <>
          <Typography.Title level={4} style={{ marginBottom: 0 }}>
            {numeral(value).format("0.[00]")}
          </Typography.Title>
          <Stars value={value} />
          <Typography.Text>
            <Typography.Text strong>{numeral(count).format()}</Typography.Text>
            {count === 1 ? " Person" : " People"}
          </Typography.Text>
        </>
      }
    >
      <Stars value={value} text="Rating:" />
    </Popover>
  );
};

export default StarRating;
