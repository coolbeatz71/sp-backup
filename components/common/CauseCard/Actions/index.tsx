import React, { FC, useState } from "react";
import { Dropdown, Menu, Button } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import styles from "../causeCard.module.scss";
import ActionModal from "./ActionModal";
import { causeStatus } from "interfaces";
import Link from "next/link";

export enum ActionType {
  pause = "pause",
  cancel = "cancel",
  resume = "resume",
}

const isUncancellable = (status: string): boolean =>
  status !== causeStatus.active && status !== causeStatus.paused;

const isUnpausable = (status: string): boolean => status !== causeStatus.active;

const isUneditable = (status: string) => status !== causeStatus.active;

const ActionIcon: FC<{ slug: string; status: string; viewing?: boolean }> = ({
  slug,
  status,
  viewing = false,
}) => {
  const [causeModal, setCauseModal] = useState<{
    isVisible: boolean;
    context?: ActionType | "";
  }>({ isVisible: false, context: "" });

  const handleAction = (type: ActionType) => {
    switch (type) {
      case ActionType.pause:
        setCauseModal({ isVisible: true, context: type });
        break;
      case ActionType.cancel:
        setCauseModal({ isVisible: true, context: type });
        break;
      case ActionType.resume:
        setCauseModal({ isVisible: true, context: type });
        break;
      default:
        break;
    }
  };

  const actionMenu = (
    <Menu>
      <Menu.Item>
        <Link href="/causes/[slug]/edit" as={`/causes/${slug}/edit`}>
          <Button
            type="link"
            disabled={isUneditable(status)}
            className="m-0 p-0 h-25"
          >
            Edit Cause
          </Button>
        </Link>
      </Menu.Item>
      <Menu.Divider />

      {status === causeStatus.paused ? (
        <Menu.Item onClick={() => handleAction(ActionType.resume)}>
          Resume Cause
        </Menu.Item>
      ) : (
        <Menu.Item
          onClick={() => handleAction(ActionType.pause)}
          disabled={isUnpausable(status)}
        >
          Pause Cause
        </Menu.Item>
      )}
      <Menu.Divider />

      <Menu.Item
        className={styles.causeCard__body__content__actionIcon__cancel}
        onClick={() => handleAction(ActionType.cancel)}
        disabled={isUncancellable(status)}
      >
        Cancel Cause
      </Menu.Item>
    </Menu>
  );

  return (
    <div className={styles.causeCard__body__content__actionIcon}>
      <Dropdown
        overlayClassName="causeCard__menu"
        overlay={actionMenu}
        trigger={["click"]}
        placement="bottomRight"
      >
        <Button type={viewing ? "dashed" : "text"} icon={<MoreOutlined />} />
      </Dropdown>
      <ActionModal
        slug={slug}
        visible={causeModal.isVisible}
        context={causeModal.context}
        closeModal={() => setCauseModal({ isVisible: false })}
      />
    </div>
  );
};

export default ActionIcon;
