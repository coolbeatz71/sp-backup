import * as React from "react";
import { Divider, Button } from "antd";
import Plan from "./Plan";
import styles from "./pricing.module.scss";
import { IRootState } from "redux/initialStates";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { CREATE_CAUSE_PATH } from "helpers/paths";
import showAuthDialog from "redux/actions/Auth/showAuthDialog";
import { useMedia } from "react-use";
import { InfoCircleOutlined } from "@ant-design/icons";

const pricingPlan = [
  {
    price: "free",
    subtitle: "For cashout above 30 days",
    description: `Lorem ipsum dolor sit amet, consec
    tetuer adipiscing elit. Aenean
    Lorem ipsum dolor sit amet, consec`,
  },
  {
    price: "2%",
    subtitle: "For cashout below 30 days",
    description: `Lorem ipsum dolor sit amet, consec
    tetuer adipiscing elit. Aenean
    Lorem ipsum dolor sit amet, consec`,
  },
];

const PricingCard: React.FC<{}> = ({}) => {
  const { push } = useRouter();
  const dispatch = useDispatch();
  const isMobile = useMedia("(max-width: 768px)");

  const { isLoggedin } = useSelector(
    ({ user: { currentUser } }: IRootState) => currentUser,
  );

  const onClick = () => {
    isLoggedin
      ? push(CREATE_CAUSE_PATH)
      : showAuthDialog(true, "signup")(dispatch);
  };

  return (
    <div className={styles.pricingCard}>
      <div className={styles.pricingCard__header}>
        <InfoCircleOutlined />
        <p>
          This pricing structure will start to apply on the 1st January 2021
          <br />
          Enjoy the free beta trial period.
        </p>
      </div>
      <div className={styles.pricingCard__container}>
        {pricingPlan.map((item, index) => (
          <div key={index} className={styles.pricingCard__container__sections}>
            <Plan
              price={item.price}
              subtitle={item.subtitle}
              description={item.description}
            />
            {index === 0 && (
              <Divider
                type={isMobile ? "horizontal" : "vertical"}
                className={isMobile ? "my-4 mx-5" : ""}
                style={{
                  width: isMobile ? "40%" : "3px",
                  minWidth: isMobile ? "0" : "initial",
                  height: "100%",
                  margin: 0,
                }}
              />
            )}
          </div>
        ))}
      </div>
      <div>
        <Button
          className="btn-secondary-outline px-4 mb-4"
          onClick={() => onClick()}
        >
          {isLoggedin ? "Create a cause" : "Get Started"}
        </Button>
      </div>
    </div>
  );
};

export default PricingCard;
