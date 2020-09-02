import React from "react";
import { Result } from "antd";
import Icon from "components/common/CustomIcon";

import Layout from "components/LayoutWrapper";

interface Props {
  noWrapper?: boolean;
}

const NotFound: React.FC<Props> = ({ noWrapper = false }) => {
  const Wrap: React.FC<{ children: React.ReactElement }> = ({ children }) =>
    !noWrapper ? (
      <Layout title="Not Found" noFooter isError>
        {children}
      </Layout>
    ) : (
      children
    );
  return (
    <Wrap>
      <Result icon={<Icon type="404" style={{ fontSize: 240 }} />} />
    </Wrap>
  );
};

export default NotFound;
