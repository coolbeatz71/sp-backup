import * as React from "react";
import styles from "./pricing.module.scss";
import PricingCard from "../../components/Pricing";
import Swipeable from "react-swipeable-views";
import Faq from "./../../components/Faq/index";

const pricingPlan = [
  {
    type: "free plan",
    description: [
      "Lorem ipsum another text that comes in my mind",
      "Text of the printing ",
      "And typesetting industry.",
      "Lorem Ipsum has been the",
      "Industry's standard dummy",
      "Text ever since",
    ],
  },
  {
    type: "standard",
    description: [
      "Lorem ipsum another text that comes in my mind",
      "Text of the printing ",
      "And typesetting industry.",
      "Lorem Ipsum has been the",
      "Industry's standard dummy",
      "Text ever since",
    ],
  },
  {
    type: "premium",
    description: [
      "Lorem ipsum another text that comes in my mind",
      "Text of the printing ",
      "And typesetting industry.",
      "Lorem Ipsum has been the",
      "Industry's standard dummy",
      "Text ever since",
    ],
  },
];

const PricingPage = () => {
  return (
    <div title="Pricing | Save Plus">
      <div className={styles.pricing__overlay} />
      <div className={styles.pricing__container}>
        <div className={styles.pricing__container__header}>
          <h1>Simple Plans For Everyone!</h1>
          <div className={styles.pricing__container__header__desc}>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since
            </p>
          </div>
        </div>
        <div className={styles.pricing__container__cards}>
          <div
            className={styles.pricing__container__cards__grid__mobile}
            id="mobile-swipeable"
          >
            <Swipeable>
              {pricingPlan.map((plan, index) => (
                <PricingCard
                  key={index}
                  plan={plan.type}
                  description={plan.description}
                />
              ))}
            </Swipeable>
          </div>
          <div className={styles.pricing__container__cards__grid__lg}>
            {pricingPlan.map((plan, index) => (
              <PricingCard
                key={index}
                plan={plan.type}
                description={plan.description}
              />
            ))}
          </div>
        </div>
        <div className={styles.pricing__container__faq}>
          <h1>FAQ</h1>
          <Faq />
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
