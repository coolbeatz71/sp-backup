import * as React from "react";
import styles from "./sectiontitle.module.scss";

export interface TitleProps {
  title: string;
  icon?: any;
}

const SectionTitle: React.FC<TitleProps> = (props) => {
  return (
    <div className={styles.sectionTitle}>
      <h2>{props.title}</h2>
      <img src={props.icon} alt={props.title} />
    </div>
  );
};

export default SectionTitle;
