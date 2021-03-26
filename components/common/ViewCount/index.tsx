import { FC } from "react";
import { EyeOutlined } from "@ant-design/icons";
import { Typography } from "antd";
import numeral from "numeral";
import styles from "./index.module.scss";

const ViewCount: FC<{
  count: number;
}> = ({ count }) => {
  const pluralize = (count: number) => (count !== 1 ? "views" : "view");

  return (
    <Typography.Text className={styles.views}>
      <span className={styles.views__count}>
        {numeral(count).format("0,0.[00]a")}
      </span>
      <span>{pluralize(count)}</span> <EyeOutlined />
    </Typography.Text>
  );
};

export default ViewCount;
