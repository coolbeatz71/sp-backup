import * as React from 'react';
import Plan from './Plan';
import styles from './pricing.module.scss';

export interface PricingCardProps {
    plan:"free plan" | "standard" | "premium",
    description:string,
}

const PricingCard: React.FC<PricingCardProps> = (props) => {

    const getColor = (planType:string): string => {
        switch(planType){
            case 'free plan':
                return '#6881FB';
            case 'standard':
                return '#5DD8FD';
            case 'premium':
                return '#B776FC';
            default:
                return '#6881FB';
        }
    };

    const getPlanFee = (planType: string): string => {
        switch(planType){
            case 'free plan':
                return 'free';
            case 'standard':
                return '5,000 RWF';
            case 'premium':
                return '20,000 RWF';
            default:
                return 'free';
        }
    };

    const getIcon = (planType: string): string => {
        switch(planType){
            case 'free plan':
                return 'icons/free.png';
            case 'standard':
                return 'icons/standard.png';
            case 'premium':
                return 'icons/premium.png';
            default:
                return 'icons/free.png';
        };
    };

    return (
        <div className={styles.pricingCard}>
           <Plan
           icon={getIcon(props.plan)}
           title={props.plan}
           color={getColor(props.plan)}
            />
            <div className={styles.pricingCard__details}>
                <h2 className={styles.pricingCard__fee}>{getPlanFee(props.plan)}</h2>
                <hr className={styles.pricingCard__hr}/>
                <div className={styles.pricingCard__description}>
                  <p>{props.description}</p>
                </div>
            </div>
        </div>
    );
}

export default PricingCard;
