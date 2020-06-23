import React, { FC, useState } from "react";
import { Dropdown, Menu } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import styles from "../causeCard.module.scss";
import StopCause from "./Stop";
import { causeStatus } from "interfaces";

enum ActionType {
  stop = "stop",
}

const isUncancellable = (status: string): boolean =>
  status !== causeStatus.active && status !== causeStatus.stopped;

const isUnstoppable = (status: string): boolean =>
  status !== causeStatus.active && status !== causeStatus.cancelled;

const isUneditable = (status: string) =>
  status !== causeStatus.active && status !== causeStatus.stopped;

const ActionIcon: FC<{ slug: string; status: string }> = ({ slug, status }) => {
  const [stopCauseModal, setStopCauseModal] = useState<boolean>(false);

  const onClick = (type: ActionType) => {
    setStopCauseModal(false);
    switch (type) {
      case ActionType.stop:
        setStopCauseModal(true);
        break;

      default:
        break;
    }
  };

  const actionMenu = (
    <Menu>
      <Menu.Item disabled={isUneditable(status)}>Edit Cause</Menu.Item>
      <Menu.Divider />

      {status === causeStatus.stopped ? (
        <Menu.Item>Reactivate Cause</Menu.Item>
      ) : (
        <Menu.Item
          onClick={() => onClick(ActionType.stop)}
          disabled={isUnstoppable(status)}
        >
          Stop Cause
        </Menu.Item>
      )}
      <Menu.Divider />

      <Menu.Item
        className={styles.causeCard__body__content__actionIcon__cancel}
        disabled={isUncancellable(status)}
      >
        Cancel Cause
      </Menu.Item>
    </Menu>
  );

  return (
    <div className={styles.causeCard__body__content__actionIcon}>
      <Dropdown
        overlayClassName="navbar__menu"
        overlay={actionMenu}
        trigger={["click"]}
        placement="bottomRight"
      >
        <MoreOutlined
          className={styles.causeCard__body__content__actionIcon__icon}
        />
      </Dropdown>
      <StopCause
        slug={slug}
        visible={stopCauseModal}
        onCancel={() => setStopCauseModal(false)}
      />
    </div>
  );
};

export default ActionIcon;
