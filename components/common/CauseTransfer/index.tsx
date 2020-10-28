import React from "react";
import numeral from "numeral";
import { Row, Col, Card } from "antd";
import { useDispatch } from "react-redux";
import { RESET_TRANSFER_ERROR } from "redux/action-types/cause/transfer";
import { RESET_SINGLE_CAUSE_ERROR } from "redux/action-types/cause/getSingle";

import styles from "./index.module.scss";

import defaultSteps from "./Steps";
import Buttons from "./Steps/Buttons";

import handleData from "./handlers";
import { Store } from "antd/lib/form/interface";
interface Props {
  data?: { [key: string]: any };
  slug: string;
  actionSuccessful: boolean;
  handleSubmit: (data: Store) => void;
}

const CauseTransfer: React.FC<Props> = ({
  data: dt = {},
  slug,
  actionSuccessful,
  handleSubmit,
}) => {
  const dispatch = useDispatch();

  const [steps] = React.useState(defaultSteps());
  const [index, setIndex] = React.useState<number>(0);
  const [data, setData] = React.useState<{ [key: string]: any }>(dt);
  const [refreshKey, setRefreshKey] = React.useState<number>(0);
  const [form, setForm] = React.useState<any>();
  const [okay, setOkay] = React.useState<{ [key: string]: boolean }>({});
  const [issue, setIssue] = React.useState<boolean[]>([]);

  React.useEffect(() => {
    dispatch({ type: RESET_TRANSFER_ERROR });
    dispatch({ type: RESET_SINGLE_CAUSE_ERROR });
  }, [dispatch]);

  return (
    <div className={styles.transfer}>
      {actionSuccessful ? (
        <div className={styles.transfer__success}>
          <h4>Donation Transfer successfully initiated</h4>
          <p>
            The donation of {numeral(data.amount).format("0,0.[00]")} Rwf was
            transfered to a cause with the following till number{" "}
            {JSON.parse(data?.cause).tillNumber}
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
                {steps[index].title}
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
                },
              );
            },
            issue,
            steps,
          )}
        </Card>
      )}
    </div>
  );
};

export default CauseTransfer;
