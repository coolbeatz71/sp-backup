import { FC } from "react";
import styles from "./pricing.module.scss";

export interface PlanProps {
  price: string;
  subtitle: any;
  description: string;
}

const Plan: FC<PlanProps> = ({ price, subtitle, description }) => (
  <div className={styles.pricingCard__container__sections__plan}>
    <h1>{price}</h1>
    <h6>{subtitle}</h6>
    <p>{description}</p>
  </div>
);

export default Plan;
