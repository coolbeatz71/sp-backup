import { FC, useEffect, useState } from "react";
import numeral from "numeral";
import { Row, Col, Card } from "antd";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { RESET_CASHOUT_ERROR } from "redux/action-types/cause/cashout";

import styles from "./index.module.scss";

import defaultSteps from "./Steps";
import Buttons from "./Steps/Buttons";

import handleData from "./handlers";
import { format } from "dev-rw-phone";
import { Store } from "antd/lib/form/interface";
interface Props {
  data?: { [key: string]: any };
  slug: string;
  actionSuccessful: boolean;
  handleSubmit: (data: Store) => void;
  paymentAccountNumber?: string;
  currentBalance: number;
  currency: string;
}

const CauseCashout: FC<Props> = ({
  data: dt = {},
  slug,
  actionSuccessful,
  paymentAccountNumber = "",
  currentBalance = 0,
  currency,
  handleSubmit,
}) => {
  const dispatch = useDispatch();

  const { t } = useTranslation();

  const [steps] = useState(defaultSteps());
  const [index, setIndex] = useState<number>(0);
  const [data, setData] = useState<{ [key: string]: any }>(dt);
  const [refreshKey, setRefreshKey] = useState<number>(0);
  const [form, setForm] = useState<any>();
  const [okay, setOkay] = useState<{ [key: string]: boolean }>({});
  const [issue, setIssue] = useState<boolean[]>([]);

  useEffect(() => {
    dispatch({ type: RESET_CASHOUT_ERROR });
  }, [dispatch]);

  return (
    <div className={styles.cashout}>
      {actionSuccessful ? (
        <div className={styles.cashout__success}>
          <h4>Cashout successfully initiated</h4>
          <p>
            The amount of {numeral(data.amount).format("0,0.[00]")} Rwf was
            deposited to your mobile money account <br />
            {format(paymentAccountNumber)}
          </p>
          <img src="/icons/checked-round.svg" alt="check" />
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
            </Row>
          }
        >
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
                },
              );
            },
            issue,
            steps,
            currentBalance,
            currency,
          )}
        </Card>
      )}
    </div>
  );
};

export default CauseCashout;
