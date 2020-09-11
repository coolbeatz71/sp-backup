import React from "react";
import { Button, Typography } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import CustomIcon from "components/common/CustomIcon";

import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "redux/initialStates";
import {
  getAllBroadcasts,
  clearAllBroadcasts,
} from "redux/actions/broadcasts/getAll";

interface Props {
  className: any;
  webkitBackdrop: boolean;
  backdrop: boolean;
}

const Banner: React.FC<Props> = ({ className, webkitBackdrop, backdrop }) => {
  const dispatch = useDispatch();

  const { data: banner } = useSelector(
    ({ broadcasts: { broadcasts } }: IRootState) => broadcasts,
  );

  React.useEffect(() => {
    getAllBroadcasts()(dispatch);
  }, [dispatch]);

  return typeof banner.id !== "undefined" ? (
    <div
      className={className}
      data-backdrop-not-supported={!webkitBackdrop && !backdrop}
    >
      <CustomIcon type="bell" />
      <Typography.Paragraph ellipsis={{ rows: 2 }}>
        <span
          dangerouslySetInnerHTML={{
            __html: banner.text,
          }}
        />
      </Typography.Paragraph>
      <Button
        type="text"
        icon={<CloseOutlined />}
        onClick={() => {
          const closedBroadcastIds = JSON.parse(
            localStorage.getItem("save-closedBroadcastIds") || "[]",
          );
          const newClosed = [...closedBroadcastIds, banner.id];
          clearAllBroadcasts()(dispatch);
          localStorage.setItem(
            "save-closedBroadcastIds",
            JSON.stringify(newClosed),
          );
        }}
      />
    </div>
  ) : null;
};

export default Banner;
