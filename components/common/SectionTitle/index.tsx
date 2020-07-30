import * as React from "react";
import styles from "./sectiontitle.module.scss";
import { IUnknownObject } from "interfaces/unknownObject";

export interface TitleProps {
  title: string;
  icon?: any;
  className?: string;
}

const SectionTitle: React.FC<TitleProps> = (props: IUnknownObject) => {
  return (
    <div className={styles.sectionTitle}>
      <h2>{props.title}</h2>
      <img
        src={props.icon}
        className={styles[`sectionTitle__${props.className}`]}
        alt={props.title}
      />
      {props.title === "Featured Causes" && <h5>Editors Pick</h5>}
    </div>
  );
};

export default SectionTitle;
