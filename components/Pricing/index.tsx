import * as React from "react";
import { Divider, Button } from "antd";
import Plan from "./Plan";
import styles from "./pricing.module.scss";
import { IRootState } from "redux/initialStates";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { useMedia } from "react-use";
import { InfoCircleOutlined } from "@ant-design/icons";
import showAuthDialog from "redux/actions/Auth/showAuthDialog";

const pricingPlan = [
  {
    price: "free",
    subtitle: "For cashout above 30 days",
    description: `For causes whose duration period is greater than 30 days. Note that cash-out only happens when the cause ends.`,
  },
  {
    price: "2%",
    subtitle: "For cashout below 30 days",
    description: `For causes whose duration period is
     below 30 days. A 2% fee applies while the remainder is remitted to the cause creator.`,
  },
];

const PricingCard: React.FC<{}> = ({}) => {
  const { push } = useRouter();
  const isMobile = useMedia("(max-width: 768px)");
  const dispatch = useDispatch();

  const { isLoggedin } = useSelector(
    ({ user: { currentUser } }: IRootState) => currentUser,
  );

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
        {pricingPlan.map((item, index, plans) => (
          <React.Fragment key={index}>
            <div
              key={index}
              className={styles.pricingCard__container__sections}
            >
              <Plan
                price={item.price}
                subtitle={item.subtitle}
                description={item.description}
              />
            </div>
            {plans.length - 1 > index && (
              <Divider
                type={isMobile ? "horizontal" : "vertical"}
                className={isMobile ? "my-4 mx-5" : ""}
                style={{
                  display: "flex",
                  alignSelf: "center",
                  width: isMobile ? "60%" : "3px",
                  minWidth: isMobile ? "0" : "initial",
                  height: isMobile ? "100%" : "160px",
                  marginTop: isMobile ? "2rem" : 0,
                  borderTop: isMobile ? "1px solid rgba(0, 0, 0, 0.1)" : "",
                }}
              />
            )}
          </React.Fragment>
        ))}
      </div>
      <div>
        <Button
          type="primary"
          ghost
          onClick={() => {
            if (isLoggedin) push("/causes/create");
            else showAuthDialog(true, "signup")(dispatch);
          }}
        >
          {isLoggedin ? "CREATE A CAUSE" : "GET STARTED"}
        </Button>
      </div>
    </div>
  );
};

export default PricingCard;
