import { FC, Fragment } from "react";
import { useTranslation } from "react-i18next";
import { Divider, Button } from "antd";
import Plan from "./Plan";
import styles from "./pricing.module.scss";
import { IRootState } from "redux/initialStates";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { useMedia } from "react-use";
import { InfoCircleOutlined } from "@ant-design/icons";
import showAuthDialog from "redux/actions/auth/showAuthDialog";

const PricingCard: FC<{}> = ({}) => {
  const { t } = useTranslation();
  const pricingPlan = [
    {
      price: "118 Rwf",
      subtitle: t("donation_below_equal"),
      description: t("donation_below_equal_details"),
    },
    {
      price: "2.5%",
      subtitle: t("donation_above"),
      description: t("donation_above_details"),
    },
  ];
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
          {t("pricing structure apply date")}
          <br />
          {t("day_notification")}
        </p>
      </div>
      <div className={styles.pricingCard__container}>
        {pricingPlan.map((item, index, plans) => (
          <Fragment key={index}>
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
          </Fragment>
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
          {isLoggedin
            ? t("create a cause").toUpperCase()
            : t("get started").toUpperCase()}
        </Button>
      </div>
    </div>
  );
};

export default PricingCard;
