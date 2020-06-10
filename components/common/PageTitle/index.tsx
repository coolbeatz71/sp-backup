import * as React from "react";
import styles from "./pagetitle.module.scss";

export interface TitleProps {
  title: string;
  icon?: any;
}

const PageTitle: React.FC<TitleProps> = (props) => {
  return (
    <div className={styles.pageTitle}>
      <h2 className={styles.pageTitle__title}>{props.title}</h2>
      <img src={props.icon} alt={props.title} />
    </div>
  );
};

export default PageTitle;
