import { FC, useEffect, useState } from "react";
import numeral from "numeral";
import Img from "react-optimized-image";
import { Row, Col, Card } from "antd";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { RESET_TRANSFER_ERROR } from "redux/action-types/cause/transfer";
import { RESET_SINGLE_CAUSE_ERROR } from "redux/action-types/cause/getSingle";

import styles from "./index.module.scss";

import defaultSteps from "./Steps";
import Buttons from "./Steps/Buttons";

import handleData from "./handlers";
import { Store } from "antd/lib/form/interface";

import checkedIcon from "public/icons/checked-round.svg";
interface Props {
  data?: { [key: string]: any };
  slug: string;
  actionSuccessful: boolean;
  handleSubmit: (data: Store) => void;
}

const CauseTransfer: FC<Props> = ({
  data: dt = {},
  slug,
  actionSuccessful,
  handleSubmit,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [steps] = useState(defaultSteps());
  const [index, setIndex] = useState<number>(0);
  const [data, setData] = useState<{ [key: string]: any }>(dt);
  const [refreshKey, setRefreshKey] = useState<number>(0);
  const [form, setForm] = useState<any>();
  const [okay, setOkay] = useState<{ [key: string]: boolean }>({});
  const [issue, setIssue] = useState<boolean[]>([]);

  useEffect(() => {
    dispatch({ type: RESET_TRANSFER_ERROR });
    dispatch({ type: RESET_SINGLE_CAUSE_ERROR });
  }, [dispatch]);

  return (
    <div className={styles.transfer}>
      {actionSuccessful ? (
        <div className={styles.transfer__success}>
          <h4>{t("donation transfer initiated")}</h4>
          <p>
            {t("donation_transfer_success_description", {
              amount: numeral(data.amount).format("0,0.[00]"),
              tillNumber: JSON.parse(data?.cause).till_number,
            })}
          </p>
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
            slug,
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
            steps
          )}
        </Card>
      )}
    </div>
  );
};

export default CauseTransfer;
