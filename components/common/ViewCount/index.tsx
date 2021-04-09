import { FC } from "react";
import { EyeOutlined } from "@ant-design/icons";
import { Typography } from "antd";
import numeral from "numeral";
import { useTranslation } from "react-i18next";
import styles from "./index.module.scss";

const ViewCount: FC<{
  count: number;
}> = ({ count }) => {
  const { t } = useTranslation();
  const pluralize = (count: number) =>
    count !== 1 ? t("views_many") : t("views_one");

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
