import React, { FC, useState } from "react";
import { Dropdown, Menu, Button, Badge } from "antd";
import { isEmpty } from "lodash";
import { MoreOutlined } from "@ant-design/icons";
import styles from "../causeCard.module.scss";
import ActionModal from "./ActionModal";
import { causeStatus } from "interfaces";
import Link from "next/link";

export interface ActionProps {
  slug: string;
  status: string;
  access?: string;
  plainAccessCode?: string;
}

export enum ActionType {
  accessCode = "accessCode",
  pause = "pause",
  cancel = "cancel",
  resume = "resume",
}

const isUncancellable = (status: string): boolean =>
  status !== causeStatus.active && status !== causeStatus.paused;

const isUnpausable = (status: string): boolean => status !== causeStatus.active;

const isUneditable = (status: string) => status !== causeStatus.active;

const Action: FC<ActionProps> = ({
  slug,
  status,
  access = "public",
  plainAccessCode = "",
}) => {
  const [causeModal, setCauseModal] = useState<{
    isVisible: boolean;
    context?: ActionType | "";
    plainAccessCode?: string;
  }>({ isVisible: false, context: "" });

  const handleAction = (type: ActionType, plainAccessCode: string = "") => {
    setCauseModal({ plainAccessCode, isVisible: true, context: type });
  };

  const actionMenu = (
    <Menu>
      {access === "private" && plainAccessCode && (
        <Menu.Item onClick={() => handleAction(ActionType.accessCode)}>
          View Access Code
        </Menu.Item>
      )}
      {access === "private" && <Menu.Divider />}
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
        className={styles.causeCard__body__content__head__actionIcon__cancel}
        onClick={() => handleAction(ActionType.cancel)}
        disabled={isUncancellable(status)}
      >
        Cancel Cause
      </Menu.Item>
    </Menu>
  );

  return (
    <div className={styles.causeCard__body__content__head}>
      {access === "private" && (
        <div className={styles.causeCard__body__content__head__private}>
          <Badge color="#e150fd" text="Private" />
        </div>
      )}
      <div className={styles.causeCard__body__content__head__actionIcon}>
        <Dropdown
          overlayClassName="causeCard__menu"
          overlay={actionMenu}
          trigger={["click"]}
          placement="bottomRight"
        >
          <MoreOutlined
            className={styles.causeCard__body__content__head__actionIcon__icon}
          />
        </Dropdown>
        <ActionModal
          slug={slug}
          plainAccessCode={plainAccessCode}
          visible={causeModal.isVisible}
          context={causeModal.context}
          closeModal={() => setCauseModal({ isVisible: false })}
        />
      </div>
    </div>
  );
};

export default Action;
