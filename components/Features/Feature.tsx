import * as React from 'react';
import styles from 'components/Features/feature.module.scss';

export interface FeatureProps {
  icon:string,
  title?:string,
  description:string,
}


const Feature: React.FC<FeatureProps> = ({icon, title, description})=>{
    return <div className={styles.featureCard}>
         <div className={styles.featureCardHeader}>
            <div className={styles.featureCardHeaderRight}>
                <img src="icons/heart-group.png" alt=""/>
            </div>
            <div className={styles.featureIcon}>
                <img src={icon} alt=""/>
            </div>
            <div className={styles.featureCardBody}>
                <h4 className={styles.featureCardTitle}>{title}</h4>
                <div className={styles.featureCardDescription}>
                    <p>{description}</p>
                </div>
            </div>
         </div>
    </div>
}

export default Feature;
