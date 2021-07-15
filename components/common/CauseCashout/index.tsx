import React, { FC, useEffect, useState } from "react";
import numeral from "numeral";
import Img from "react-optimized-image";
import { Row, Col, Card, Typography, Form, Alert } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { RESET_CASHOUT_ERROR } from "redux/action-types/cause/cashout";
import getSingle from "redux/actions/cause/getSingle";

import styles from "./index.module.scss";

import defaultSteps from "./Steps";
import Buttons from "./Steps/Buttons";
import CashoutSkeleton from "./skeleton/";

import handleData from "./handlers";
import { format } from "@exuus/rwanda-phone-utils";
import { Store } from "antd/lib/form/interface";

import checkedIcon from "public/icons/checked-round.svg";
import { IRootState } from "redux/initialStates";
interface Props {
  data?: { [key: string]: any };
  slug: string;
  actionSuccessful: boolean;
  handleSubmit: (data: Store) => void;
  paymentAccountNumber?: string;
  currentBalance: number;
  currentBalanceTelco: number;
  currentBalanceCards: number;
  currency: string;
}

const CauseCashout: FC<Props> = ({
  data: dt = {},
  slug,
  actionSuccessful,
  paymentAccountNumber = "",
  currentBalance = 0,
  currentBalanceTelco = 0,
  currentBalanceCards = 0,
  currency,
  handleSubmit,
}) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const {
    accessCode,
    error,
    loading,
    data: singleCause,
  } = useSelector(
    ({ cause: { single_cashout } }: IRootState) => single_cashout
  );

  const isNoBankDetails =
    currentBalanceCards > 0 &&
    !singleCause.bank_name &&
    !singleCause.bank_account_number;

  const [steps, setSteps] = useState(defaultSteps(isNoBankDetails));
  const [index, setIndex] = useState<number>(0);
  const [data, setData] = useState<{ [key: string]: any }>(dt);
  const [refreshKey, setRefreshKey] = useState<number>(0);
  const [form, setForm] = useState<any>();
  const [okay, setOkay] = useState<{ [key: string]: boolean }>({});
  const [issue, setIssue] = useState<boolean[]>([]);

  useEffect(() => {
    dispatch({ type: RESET_CASHOUT_ERROR });
  }, [dispatch]);

  useEffect(() => {
    setSteps(defaultSteps(isNoBankDetails));
  }, [dispatch, singleCause]);

  useEffect(() => {
    getSingle(
      slug,
      accessCode ? { access_code: accessCode } : {},
      "cashout"
    )(dispatch);
  }, [dispatch]);

  return (
    <div className={styles.cashout}>
      {actionSuccessful ? (
        <div className={styles.cashout__success}>
          <Typography.Title>{t("cashout initiated")}</Typography.Title>
          {data.amount_telco && (
            <Typography.Paragraph
              className={styles.cashout__success__paragraph}
            >
              {t("cashout_success_description", {
                amount: numeral(data.amount_telco).format("0,0.[00]"),
                phoneNumber: format(paymentAccountNumber),
              })}
            </Typography.Paragraph>
          )}
          {data.amount_cards && (
            <Typography.Paragraph
              className={styles.cashout__success__paragraph}
            >
              {t("cashout_success_card_description", {
                amount: numeral(data.amount_cards).format("0,0.[00]"),
              })}
            </Typography.Paragraph>
          )}
          <Img src={checkedIcon} alt="check" />
        </div>
      ) : (
        <Card
          key={refreshKey}
          bordered={false}
          title={
            <Row>
              <Col
                flex={1}
                style={{
                  fontWeight: "bold",
                  fontSize: "1.5rem",
                }}
              >
                {t(steps[index].title)}
              </Col>
              {!error && !loading && (
                <Col>
                  <Buttons
                    steps={steps}
                    index={index}
                    form={form}
                    okay={okay}
                    setOkay={setOkay}
                    setIssue={setIssue}
                    setIndex={setIndex}
                  />
                </Col>
              )}
            </Row>
          }
        >
          {singleCause && !loading && !error ? (
            <>
              {steps[index].component!(
                data,
                setForm,
                ({ step, submit = false, ...dt }) => {
                  handleData(
                    slug,
                    steps,
                    dt,
                    data,
                    refreshKey,
                    index,
                    step,
                    okay,
                    !submit,
                    form,
                    setRefreshKey,
                    setIndex,
                    setIssue,
                    setData,
                    setOkay,
                    (formattedData) => {
                      handleSubmit(formattedData);
                    }
                  );
                },
                issue,
                steps,
                currentBalance,
                currentBalanceTelco,
                currentBalanceCards,
                currency,
                isNoBankDetails,
                slug
              )}
            </>
          ) : loading ? (
            <CashoutSkeleton loading={loading} />
          ) : (
            error && (
              <Form.Item>
                <Alert
                  message="Error"
                  description={error}
                  type="error"
                  closeText="RETRY"
                  onClose={() =>
                    getSingle(
                      slug,
                      accessCode ? { access_code: accessCode } : {},
                      "cashout"
                    )(dispatch)
                  }
                  showIcon
                />
              </Form.Item>
            )
          )}
        </Card>
      )}
    </div>
  );
};

export default CauseCashout;
