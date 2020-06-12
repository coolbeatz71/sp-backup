import React, { FC } from "react";
import styles from "../causeCard.module.scss";
import getCauseTagColor from "helpers/getCauseTagColor";

const StatusInfo: FC<{ status: string }> = ({ status }) => {
  const color = getCauseTagColor(status);
  return (
    <div
      className={`tag ${styles.causeCard__body__header__causeTag}`}
      style={{ backgroundColor: color }}
    >
      {status}
    </div>
  );
};

export default StatusInfo;
