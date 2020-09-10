import React from "react";
import { Button, Typography } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import CustomIcon from "components/common/CustomIcon";

import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "redux/initialStates";
import { getAllBroadcasts } from "redux/actions/broadcasts/getAll";

interface Props {
  className: any;
  webkitBackdrop: boolean;
  backdrop: boolean;
  hasBannerCallback: (hb: boolean) => void;
}

const Banner: React.FC<Props> = ({
  className,
  webkitBackdrop,
  backdrop,
  hasBannerCallback,
}) => {
  const dispatch = useDispatch();
  const [banner, setBanner] = React.useState<{ [key: string]: any } | null>(
    null,
  );
  const [closed, setClosed] = React.useState<number[]>([]);

  const { data } = useSelector(
    ({ broadcasts: { broadcasts } }: IRootState) => broadcasts,
  );

  React.useEffect(() => {
    hasBannerCallback(banner !== null);
  }, [banner]);

  React.useEffect(() => {
    if (process.browser) {
      const closedBroadcastIds =
        localStorage.getItem("save-closedBroadcastIds") || "[]";
      setClosed(JSON.parse(closedBroadcastIds));
    }
    getAllBroadcasts()(dispatch);
  }, [dispatch]);

  React.useEffect(() => {
    if (data && data.data && data.data.length > 0) {
      setBanner(data.data[0]);
    }
  }, [data]);

  return banner !== null && !closed.includes(banner.id) ? (
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
          const newClosed = [...closed, banner.id];
          setClosed(newClosed);
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
