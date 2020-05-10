import * as React from "react";
import Plan from "./Plan";
import styles from "./pricing.module.scss";

import { getPlanFee, getIcon, getColor } from "../../helpers/pricingHelper";

export interface PricingCardProps {
  plan: "free plan" | "standard" | "premium";
  description: string;
}

const PricingCard: React.FC<PricingCardProps> = ({ plan, description }) => (
    <div className={styles.pricingCard}>
       <Plan
        icon={getIcon(plan)}
        title={plan}
        color={getColor(plan)}
       />
        <div className={styles.pricingCard__details}>
            <h2 className={styles.pricingCard__details__fee}>{getPlanFee(plan)}</h2>
            <hr className={styles.pricingCard__hr}/>
            <div className={styles.pricingCard__details__description}>
              <p>{description}</p>
            </div>
        </div>
    </div>
);

export default PricingCard;
