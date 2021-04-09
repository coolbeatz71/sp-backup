import React, { FC } from "react";
import numeral from "numeral";
import { IUnknownObject } from "interfaces/unknownObject";
import { Col, Collapse, Row, Typography } from "antd";
import { useTranslation } from "react-i18next/";

const { Panel } = Collapse;

const BalanceDetails: FC<{ cause: IUnknownObject }> = ({ cause }) => {
  const { t } = useTranslation();

  const balanceTelco = (
    <Row align="middle" data-telco-balance>
      <Col span={14}>
        <Typography.Paragraph ellipsis>
          {t("current balance telco")}
        </Typography.Paragraph>
      </Col>
      <Col span={10} data-value>
        <strong>
          {numeral(cause.donation_balance_telco * 1).format()} {cause.currency}
        </strong>
      </Col>
    </Row>
  );

  const balanceCards = (
    <Row align="middle" data-cards-balance>
      <Col span={14}>
        <Typography.Paragraph ellipsis>
          {t("current balance cards")}
        </Typography.Paragraph>
      </Col>
      <Col span={10} data-value>
        <strong>
          {numeral(cause.donation_balance_cards * 1).format()} {cause.currency}
        </strong>
      </Col>
    </Row>
  );

  return (
    <Collapse ghost>
      <Panel header={balanceTelco} key="1">
        <Typography.Text>
          {t("donations")}: {numeral(cause.raised_amount_telco).format()}{" "}
          {cause.currency}
        </Typography.Text>
        <Typography.Text>
          {t("fees")}: {numeral(cause.donation_fees_telco).format()}{" "}
          {cause.currency}
        </Typography.Text>
      </Panel>
      <Panel header={balanceCards} key="2">
        <Typography.Text>
          {t("donations")}: {numeral(cause.raised_amount_cards).format()}{" "}
          {cause.currency}
        </Typography.Text>
        <Typography.Text>
          {t("fees")}: {numeral(cause.donation_fees_cards).format()}{" "}
          {cause.currency}
        </Typography.Text>
      </Panel>
    </Collapse>
  );
};

export default BalanceDetails;
