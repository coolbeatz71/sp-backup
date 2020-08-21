import * as React from "react";
import styles from "./feature.module.scss";

export interface FeatureProps {
  icon: any;
  title?: string;
  description: string;
}

const Feature: React.FC<FeatureProps> = ({ icon, title, description }) => (
  <div className={styles.featureCard}>
    <div className={styles.featureCard__header}>
      <div className={styles.featureCard__header__right}>
        <img src="/icons/heart-group.png" alt="" />
      </div>
      <div className={styles.featureCard__icon}>
        <img src={icon} alt="" />
      </div>
      <div className={styles.featureCard__body}>
        <h4 className={styles.featureCard__title}>{title}</h4>
        <div className={styles.featureCard__description}>
          <p>{description}</p>
        </div>
      </div>
    </div>
  </div>
);

export default Feature;
