import React, { FC, ReactElement } from "react";
import { Popover } from "antd";
import Share from "components/common/Share";
import styles from "./sharePopover.module.scss";

export interface SocialSharePopoverProps {
  slug: string;
  title: string;
  visible: boolean;
  tillNumber: string;
  children: ReactElement;
  hideSharePopover: () => void;
  handleVisibleChange: (openSharePopover: boolean) => void;
}

const SocialSharePopover: FC<SocialSharePopoverProps> = ({
  title,
  slug,
  tillNumber,
  children,
  visible,
  hideSharePopover,
  handleVisibleChange,
}) => {
  const content = (
    <div className={styles.sharePopover}>
      <Share
        title={title}
        slug={slug}
        tillNumber={tillNumber}
        label={false}
        hideSharePopover={hideSharePopover}
      />
    </div>
  );

  return (
    <Popover
      content={content}
      trigger="click"
      visible={visible}
      onVisibleChange={handleVisibleChange}
      placement="topRight"
    >
      {children}
    </Popover>
  );
};

export default SocialSharePopover;
