import React, { FC } from "react";
import styles from "../causeCard.module.scss";
import { Avatar } from "antd";
import abName from "helpers/abName";
import ColorHash from "color-hash";

const color = new ColorHash();
export interface OwnerInfoProps {
  category: string;
  avatar?: string;
  verified?: boolean;
  name?: string;
  userId?: string;
}
const OwnerInfo: FC<OwnerInfoProps> = ({
  category,
  avatar,
  verified,
  name,
}) => {
  const names: any = name?.split(" ");
  return (
    <>
      <div className={styles.causeCard__body__header__causeOwner}>
        <div className={styles.top}>
          {avatar ? (
            <img
              src={avatar}
              alt="owner avatar"
              className={styles.causeCard__body__header__causeOwner__avatar}
            />
          ) : (
            <Avatar
              size="large"
              className={
                styles.causeCard__body__header__causeOwner__abNameAvatar
              }
              style={{
                backgroundColor: color.hex(names),
              }}
              alt={name}
            >
              {names && abName(names[0], names[1])}
            </Avatar>
          )}

          {verified && (
            <img
              alt="verified icon"
              src="/icons/verified-icon.svg"
              className={styles.causeCard__body__header__causeOwner__verified}
            />
          )}
        </div>
      </div>
      <div className={`tag ${styles.causeCard__body__header__causeTag}`}>
        {category}
      </div>
    </>
  );
};

export default OwnerInfo;
