import React from "react";
import { Popover, Typography } from "antd";
import { StarFilled } from "@ant-design/icons";
import numeral from "numeral";
import { useTranslation } from "react-i18next";

import styles from "./index.module.scss";
import { isInactive } from "components/cards/Cause";

interface Props {
  value: number;
  status: string;
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
  status,
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
    <StarFilled
      data-color={
        !isInactive(status)
          ? value >= 1
            ? "filled"
            : "not-filled"
          : value >= 1
          ? "filled-mono"
          : "not-filled-mono"
      }
    />
    <StarFilled
      data-color={
        !isInactive(status)
          ? value >= 2
            ? "filled"
            : "not-filled"
          : value >= 2
          ? "filled-mono"
          : "not-filled-mono"
      }
    />
    <StarFilled
      data-color={
        !isInactive(status)
          ? value >= 3
            ? "filled"
            : "not-filled"
          : value >= 3
          ? "filled-mono"
          : "not-filled-mono"
      }
    />
    <StarFilled
      data-color={
        !isInactive(status)
          ? value >= 4
            ? "filled"
            : "not-filled"
          : value >= 4
          ? "filled-mono"
          : "not-filled-mono"
      }
    />
    <StarFilled
      data-color={
        !isInactive(status)
          ? value >= 5
            ? "filled"
            : "not-filled"
          : value >= 5
          ? "filled-mono"
          : "not-filled-mono"
      }
    />
  </div>
);

const StarRating: React.FC<Props> = ({
  value,
  status,
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
            <Stars value={value} status={status} />
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
      <Stars
        value={value}
        text={noAction ? "" : `${t("rating")}:`}
        status={status}
      />
    </Wrap>
  );
};

export default StarRating;
