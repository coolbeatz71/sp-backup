import React from "react";
import { Dropdown, Menu, Button } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";

import ActionModal from "components/common/CauseCard/Actions/ActionModal";
import { causeStatus } from "interfaces";

import styles from "./index.module.scss";

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

interface Props {
  record: { [key: string]: any };
  reload: (del: boolean) => void;
  viewing?: boolean;
  edit?: () => void;
}

const CausesActions: React.FC<Props> = ({ record, viewing = false }) => {
  const router = useRouter();
  const [visible, setVisible] = React.useState(false);

  const [causeModal, setCauseModal] = React.useState<{
    isVisible: boolean;
    context?: ActionType | "";
    plainAccessCode?: string;
  }>({ isVisible: false, context: "" });

  const handleAction = (type: ActionType, plainAccessCode: string = "") => {
    setVisible(false);
    setCauseModal({ plainAccessCode, isVisible: true, context: type });
  };

  return (
    <>
      <Dropdown
        className={styles.actions}
        trigger={["click"]}
        visible={visible}
        onVisibleChange={(v) => setVisible(v)}
        overlay={
          <Menu>
            {record.access === "private" && record.plain_access_code && (
              <>
                <Button
                  className={styles.actions__menu_button}
                  type="text"
                  onClick={() => handleAction(ActionType.accessCode)}
                >
                  View Access Code
                </Button>
                <Menu.Divider />
              </>
            )}
            {!viewing && (
              <Button
                className={styles.actions__menu_button}
                type="text"
                onClick={() => router.push(`/causes/${record.slug}`)}
              >
                View Cause
              </Button>
            )}
            {!isUneditable(record.status) && (
              <Button
                className={styles.actions__menu_button}
                type="text"
                onClick={() => {
                  router.push(`/causes/${record.slug}/edit`);
                }}
              >
                Edit Cause
              </Button>
            )}
            {status === causeStatus.paused ? (
              <Button
                className={styles.actions__menu_button}
                type="text"
                onClick={() => handleAction(ActionType.resume)}
              >
                Resume Cause
              </Button>
            ) : (
              !isUnpausable(record.status) && (
                <Button
                  className={styles.actions__menu_button}
                  type="text"
                  onClick={() => handleAction(ActionType.pause)}
                >
                  Pause Cause
                </Button>
              )
            )}
            {!isUncancellable(record.status) && (
              <Button
                className={styles.actions__menu_button}
                type="text"
                onClick={() => handleAction(ActionType.cancel)}
                danger
              >
                Cancel Cause
              </Button>
            )}
          </Menu>
        }
      >
        <Button type={viewing ? "dashed" : "text"} icon={<MoreOutlined />} />
      </Dropdown>
      <ActionModal
        slug={record.slug}
        plainAccessCode={record.plain_access_code}
        visible={causeModal.isVisible}
        context={causeModal.context}
        closeModal={() => setCauseModal({ isVisible: false })}
      />
    </>
  );
};

export default CausesActions;
