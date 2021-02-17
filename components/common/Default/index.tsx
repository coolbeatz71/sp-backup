import React, { FC } from "react";
import LayoutWrapper from "components/LayoutWrapper";
import styles from "./index.module.scss";

const DefaultComponent: FC<{}> = () => (
  <LayoutWrapper noFooter noHeader>
    <div className={styles.default} />
  </LayoutWrapper>
);

export default DefaultComponent;
