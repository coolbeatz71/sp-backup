import React from "react";
import { Popover, Typography } from "antd";
import { StarFilled } from "@ant-design/icons";
import numeral from "numeral";
import { useTranslation } from "react-i18next";

import styles from "./index.module.scss";

interface Props {
  value: number;
  count?: number;
  text?: string;
  noAction?: boolean;
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

const StarRating: React.FC<Props> = ({
  value,
  count = 0,
  noAction = false,
}) => {
  const { t } = useTranslation();
  const Wrap: React.FC<{ children: React.ReactElement }> = ({ children }) =>
    noAction ? (
      <React.Fragment>{children}</React.Fragment>
    ) : (
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
              <Typography.Text strong>
                {numeral(count).format()} &nbsp;
              </Typography.Text>
              {count === 1 ? t("person") : t("people")}
            </Typography.Text>
          </>
        }
      >
        {children}
      </Popover>
    );
  return (
    <Wrap>
      <Stars value={value} text={noAction ? "" : `${t("rating")}:`} />
    </Wrap>
  );
};

export default StarRating;
