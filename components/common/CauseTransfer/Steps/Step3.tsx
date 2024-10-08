import { FC, useState } from "react";
import numeral from "numeral";
import { capitalize, isEmpty } from "lodash";
import { useTranslation } from "react-i18next";
import {
  Row,
  Col,
  Button,
  Form,
  InputNumber,
  Alert,
  Checkbox,
  Typography,
} from "antd";
import StackedLabel from "components/common/StackedLabel";
import styles from "./index.module.scss";
import { InfoCircleOutlined } from "@ant-design/icons";

const ALL = "All";
const TELCO = "Telco";
const CARD = "Visa_MasterCard";

export interface Props {
  data: any;
  setForm: (form: any) => void;
  cb: (data: any) => void;
  issue?: boolean[];
  steps?: any[];
  currentBalance?: number;
  currentBalanceTelco?: number;
  currentBalanceCards?: number;
  currency?: string;
}

const Step3: FC<Props> = ({
  data,
  setForm,
  cb,
  currentBalance = 0,
  currentBalanceTelco = 0,
  currentBalanceCards = 0,
  currency,
}) => {
  const { t } = useTranslation();
  const [channelErr, setChannelErr] = useState<boolean>(false);

  const [checkedChannel, setCheckedChannel] = useState<string[]>(
    data?.channel
      ? [data?.channel]
      : [
          currentBalanceTelco > 0 && currentBalanceCards <= 0
            ? TELCO
            : currentBalanceCards > 0 && currentBalanceTelco <= 0
            ? CARD
            : currentBalanceTelco > 0 && currentBalanceCards > 0
            ? ALL
            : TELCO,
        ],
  );

  const onCheckAllChange = (e: any) => {
    const { checked } = e.target;
    setChannelErr(false);
    setCheckedChannel(checked ? [ALL, TELCO, CARD] : []);
  };

  const onCheckChange = (e: any) => {
    const { checked, value } = e.target;

    const valuesToRemove = [ALL, value];
    const filtered = checkedChannel.filter(
      (el) => !valuesToRemove.includes(el),
    );

    setChannelErr(false);
    setCheckedChannel(checked ? [...checkedChannel, value] : filtered);
  };

  return (
    <Form
      initialValues={data}
      ref={(ref) => setForm(ref)}
      validateTrigger={["onFinish"]}
      onValuesChange={(dt) => {
        cb({ ...dt, step: 0 });
      }}
      onFinish={(dt) => {
        if (checkedChannel.length === 1) {
          setChannelErr(false);
          const data = { ...dt, channel: checkedChannel[0] };
          cb({ ...data, step: 1 });
        }

        if (checkedChannel.includes(TELCO) && checkedChannel.includes(CARD)) {
          setChannelErr(false);
          const data = { ...dt, channel: ALL };
          cb({ ...data, step: 1 });
        }

        if (isEmpty(checkedChannel)) {
          setChannelErr(true);
          const data = { ...dt, channel: "" };
          cb({ ...data, step: 0 });
        }
      }}
    >
      {channelErr ? (
        <Form.Item>
          <Alert
            closable
            showIcon
            type="error"
            message={t("select_transfer_channel")}
            onClose={() => {
              setCheckedChannel([TELCO]);
              setChannelErr(false);
            }}
          />
        </Form.Item>
      ) : (
        <Form.Item>
          <span>{t("select_transfer_channel")}</span>
        </Form.Item>
      )}

      <Row justify="space-between" className={styles.steps__checkbox_group}>
        <Form.Item name="channel">
          <>
            <Checkbox
              value="All"
              onChange={onCheckAllChange}
              disabled={currentBalanceTelco <= 0 && currentBalanceCards <= 0}
              checked={
                currentBalanceTelco > 0 &&
                currentBalanceCards > 0 &&
                (checkedChannel.length >= 2 || checkedChannel.includes(ALL))
              }
            >
              {t("all")}
            </Checkbox>

            <Checkbox
              value={TELCO}
              onChange={onCheckChange}
              disabled={currentBalanceTelco <= 0}
              checked={
                currentBalanceTelco > 0 &&
                (checkedChannel.includes(TELCO) || checkedChannel.includes(ALL))
              }
            >
              Mobile Money
            </Checkbox>

            <Checkbox
              value={CARD}
              disabled={currentBalanceCards <= 0}
              checked={
                currentBalanceCards > 0 &&
                (checkedChannel.includes(CARD) || checkedChannel.includes(ALL))
              }
              onChange={onCheckChange}
            >
              {t("credit_debit_card")}
            </Checkbox>
          </>
        </Form.Item>
      </Row>

      <Form.Item className={styles.steps__sub_title}>
        {t("the maximun transfer amount is", {
          amount: numeral(currentBalance).format("0,0.[00]"),
        })}
      </Form.Item>

      {currentBalanceTelco > 0 &&
        (checkedChannel.length === 0 ||
          checkedChannel.includes(TELCO) ||
          checkedChannel.includes(ALL)) && (
          <>
            <Typography.Text
              type="secondary"
              className={styles.steps__secondary}
            >
              {t("on mobile money you can transfer", {
                amount: numeral(currentBalanceTelco).format("0,0.[00]"),
              })}
            </Typography.Text>
            <Form.Item
              name="amount_telco"
              rules={[
                {
                  required: true,
                  message: `${t("amount")} ${t("required")}`,
                },
                {
                  pattern: /([1-9][\d,]{2,})$$/g,
                  message: t("should be 100 minimum"),
                },
                {
                  type: "number",
                  max: 2000000,
                  message: " ",
                },
              ]}
              validateTrigger={["onSubmit", "onBlur"]}
            >
              <StackedLabel
                label={`${t("amount")} (${capitalize(currency)})`}
                formatNumber
              >
                <InputNumber autoComplete="off" placeholder={t("amount")} />
              </StackedLabel>
            </Form.Item>
          </>
        )}

      {currentBalanceCards > 0 &&
        (checkedChannel.includes(CARD) || checkedChannel.includes(ALL)) && (
          <>
            <Typography.Text
              type="secondary"
              className={styles.steps__secondary}
            >
              {t("on credit/debit card you can transfer", {
                amount: numeral(currentBalanceCards).format("0,0.[00]"),
              })}
            </Typography.Text>

            <Form.Item
              name="amount_cards"
              rules={[
                {
                  required: true,
                  message: `${t("amount")} ${t("required")}`,
                },
                {
                  pattern: /([1-9][\d,]{2,})$$/g,
                  message: t("should be 100 minimum"),
                },
              ]}
              validateTrigger={["onSubmit", "onBlur"]}
            >
              <StackedLabel
                label={`${t("amount")} (${capitalize(currency)})`}
                formatNumber
              >
                <InputNumber autoComplete="off" placeholder={t("amount")} />
              </StackedLabel>
            </Form.Item>

            <Typography.Text className={styles.steps__primary}>
              <InfoCircleOutlined />
              &nbsp;
              {t("transfer_cards_notice")}
            </Typography.Text>
          </>
        )}

      <Form.Item>
        <Row gutter={20} justify="space-between">
          <Col>
            <Button onClick={() => cb({ step: -1 })}>
              {t("previous").toUpperCase()}
            </Button>
          </Col>
          <Col>
            <Button type="primary" htmlType="submit">
              {t("next").toUpperCase()}
            </Button>
          </Col>
        </Row>
      </Form.Item>
    </Form>
  );
};

export default Step3;
