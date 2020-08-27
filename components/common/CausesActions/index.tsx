import React from "react";
import { Dropdown, Menu, Button } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import CancelModal from "components/modals/CancelModal";
import PauseModal from "components/modals/PauseModal";

import styles from "./index.module.scss";

interface Props {
  record: { [key: string]: any };
  reload: (del: boolean) => void;
  viewing?: boolean;
  edit?: () => void;
}

const CausesActions: React.FC<Props> = ({
  record,
  reload,
  viewing = false,
  edit = () => {
    //
  },
}) => {
  const router = useRouter();
  const [visible, setVisible] = React.useState(false);

  return (
    <>
      <Dropdown
        className={styles.actions}
        trigger={["click"]}
        visible={visible}
        onVisibleChange={(v) => setVisible(v)}
        overlay={
          <Menu>
            {!viewing && (
              <Button
                className={styles.actions__menu_button}
                type="text"
                onClick={() => router.push(`/causes/${record.slug}`)}
              >
                View Cause
              </Button>
            )}
            {record.edit_count === 0 && (
              <Button
                className={styles.actions__menu_button}
                type="text"
                onClick={() => {
                  if (viewing) edit();
                  else router.push(`/causes/${record.slug}/edit`);
                }}
              >
                Edit Cause
              </Button>
            )}
            <PauseModal
              record={record}
              reload={() => reload(false)}
              className={styles.actions__menu_button}
            />
            <CancelModal
              record={record}
              reload={() => reload(true)}
              className={styles.actions__menu_button}
            />
          </Menu>
        }
      >
        <Button type={viewing ? "dashed" : "text"} icon={<MoreOutlined />} />
      </Dropdown>
    </>
  );
};

export default CausesActions;
