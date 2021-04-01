import React, { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Row, Col, Button, Form, Select, Input, Alert } from "antd";
import StackedLabel from "components/common/StackedLabel";
import { banks } from "helpers/banksList";

import styles from "./index.module.scss";
import edit from "redux/actions/cause/edit";
import getSingle from "redux/actions/cause/getSingle";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "redux/initialStates";
import { isEmpty } from "lodash";

export interface Props {
  data: any;
  setForm: (form: any) => void;
  cb: (data: any) => void;
  isNoBankDetails: boolean;
  slug: string;
}

const StepBankDetails: FC<Props> = ({
  data,
  setForm,
  cb,
  isNoBankDetails = true,
  slug,
}) => {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const [isConfirmed, setConfirmed] = useState<boolean>(isNoBankDetails);

  const {
    accessCode,
    error: err,
    data: singleCause,
    loading: loadingCause,
  } = useSelector(({ cause: { single } }: IRootState) => single);

  const { loading, data: editCause, error } = useSelector(
    ({ cause: { edit } }: IRootState) => edit,
  );

  useEffect(() => {
    if (isEmpty(singleCause)) {
      getSingle(slug, accessCode ? { access_code: accessCode } : {})(dispatch);
    }
  }, [dispatch]);

  return (
    <Form
      initialValues={data}
      ref={(ref) => setForm(ref)}
      validateTrigger={["onFinish"]}
      onValuesChange={(dt) => {
        cb({ ...dt, step: 0 });
      }}
      onFinish={(dt) => {
        const { bank_name, payment_account_name, bank_account_number } = dt;

        cb({ ...dt, step: 0 });

        if (!isConfirmed) {
          edit(
            {
              bank_name,
              payment_account_name,
              bank_account_number,
              accepts_card_payments: true,
            },
            slug,
          )(false, dispatch);

          setConfirmed(!loading && !error);
        } else {
          cb({ ...dt, step: isEmpty(editCause) ? 0 : 1 });
        }
      }}
    >
      <span
        className={styles.steps__sub_title}
        style={{ marginBottom: "1.2rem" }}
      >
        {t("add recipient bank details to cashout")}
      </span>

      {error ||
        (err && (
          <Form.Item>
            <Alert message="Error" description={error || err} type="error" />
          </Form.Item>
        ))}

      <Form.Item
        name="bank_name"
        rules={[{ required: true, message: t("bank name is required") }]}
      >
        <StackedLabel label={t("select bank")} select>
          <Select placeholder={t("select bank")}>
            {banks.map((bank) => (
              <Select.Option key={bank} value={bank}>
                {bank}
              </Select.Option>
            ))}
          </Select>
        </StackedLabel>
      </Form.Item>

      <Form.Item
        name="payment_account_name"
        rules={[{ required: true, message: t("account name is required") }]}
      >
        <StackedLabel label={t("account names")}>
          <Input placeholder={t("account names")} />
        </StackedLabel>
      </Form.Item>

      <Form.Item
        name="bank_account_number"
        rules={[{ required: true, message: t("account number is required") }]}
      >
        <StackedLabel label={t("account number")}>
          <Input placeholder={t("account number")} />
        </StackedLabel>
      </Form.Item>

      <Form.Item>
        <Row gutter={20} justify="space-between">
          <Col>{}</Col>
          <Col>
            {isConfirmed ||
            singleCause.bank_name ||
            singleCause.bank_account_number ? (
              <Button type="primary" htmlType="submit">
                {t("next").toUpperCase()}
              </Button>
            ) : (
              <Button
                htmlType="submit"
                type="default"
                loading={loading || loadingCause}
              >
                {t("confirm").toUpperCase()}
              </Button>
            )}
          </Col>
        </Row>
      </Form.Item>
    </Form>
  );
};

export default StepBankDetails;
