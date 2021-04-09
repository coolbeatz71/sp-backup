import React, { FC } from "react";
import { Skeleton } from "antd";

const CashoutSkeleton: FC<{ loading: boolean }> = ({ loading }) => (
  <>
    <Skeleton title paragraph={{ rows: 0 }} />
    <Skeleton.Input active={loading} />
    <Skeleton.Input active={loading} />
    <Skeleton.Input active={loading} />
    <Skeleton.Button active={loading} />
  </>
);

export default CashoutSkeleton;
