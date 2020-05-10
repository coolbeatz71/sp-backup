import * as React from "react";
import styles from "./pricing.module.scss";

export interface PlanProps {
  color: string;
  icon: any;
  title: string;
}

const Plan: React.FC<PlanProps> = (props) => (
    <div className={styles.pricing__plan} style={{ backgroundColor: props.color }}>
        <div>
            <div className={styles.pricing__plan__icon}>
                <img src={props.icon} alt=""/>
            </div>
            <div className={styles.pricing__plan__title}>
                <h2>{props.title}</h2>
            </div>
        </div>
    </div>
);

export default Plan;
