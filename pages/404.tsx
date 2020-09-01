import React from "react";
import { Result } from "antd";
import Icon from "components/common/CustomIcon";

import Layout from "components/LayoutWrapper";

const NotFound = () => (
  <Layout title="Not Found" noFooter isError>
    <Result icon={<Icon type="404" style={{ fontSize: 240 }} />} />
  </Layout>
);

export default NotFound;
