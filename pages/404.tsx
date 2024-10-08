import { FC, ReactElement } from "react";
import { Result } from "antd";
import styles from "./404.module.scss";

import Icon from "components/common/CustomIcon";
import Layout from "components/LayoutWrapper";

interface Props {
  noWrapper?: boolean;
  message?: string;
}

const NotFound: FC<Props> = ({
  noWrapper = false,
  message = "Page not found!",
}) => {
  const Wrap: FC<{ children: ReactElement }> = ({ children }) =>
    !noWrapper ? (
      <Layout title={message} noFooter isError>
        {children}
      </Layout>
    ) : (
      children
    );
  return (
    <Wrap>
      <Result
        className={styles.not_found}
        title={message}
        icon={<Icon type="404" style={{ fontSize: 240 }} />}
      />
    </Wrap>
  );
};

export default NotFound;
