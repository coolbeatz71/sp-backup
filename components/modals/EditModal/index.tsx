import React from "react";
import { useTranslation } from "react-i18next";

import {
  Modal,
  Form,
  DatePicker,
  InputNumber,
  Row,
  Col,
  Button,
  Alert,
  Tag,
} from "antd";
import StackedLabel from "components/common/StackedLabel";
import { IRootState } from "redux/initialStates";
import { ExclamationCircleOutlined } from "@ant-design/icons";

import moment from "moment";
import { useDispatch, useSelector } from "react-redux";

import edit from "redux/actions/cause/edit";
import { useRouter } from "next/router";

interface Props {
  visible: boolean;
  onClose: (refresh: boolean) => void;
  slug: string;
  name: string;
  target: number;
  start: string;
  end: string;
}

const CauseEditing: React.FC<Props> = ({
  visible,
  onClose,
  slug,
  name,
  target,
  start: startDate,
  end,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { push } = useRouter();

  const { loading, error } = useSelector(
    ({ cause: { edit } }: IRootState) => edit
  );

  return (
    <Modal
      visible={visible}
      title={`${t("edit")} "${name}"`}
      onCancel={() => {
        if (!loading) onClose(false);
      }}
      destroyOnClose
      footer={null}
    >
      <Form
        initialValues={{ target, end: moment(end) }}
        validateTrigger={["onFinish"]}
        onFinish={(dt) => {
          const end_date = dt.end.format("YYYY-MM-DD");
          const current_end_date = moment(end).format("YYYY-MM-DD");

          if (dt.target !== target || end_date !== current_end_date) {
            edit(
              {
                end_date,
                target_amount: dt.target,
              },
              slug
            )(push, dispatch);
          } else {
            onClose(true);
          }
        }}
      >
        <Form.Item>
          <Tag icon={<ExclamationCircleOutlined />} color="warning">
            {t("you can edit this cause once")}
          </Tag>
        </Form.Item>
        <Form.Item
          name="target"
          rules={[
            {
              required: true,
              type: "number",
              min: 100,
              message: t("cause target is required"),
            },
          ]}
        >
          <StackedLabel label={t("cause fundraising target")} formatNumber>
            <InputNumber
              placeholder={t("cause fundraising target")}
              disabled={loading}
            />
          </StackedLabel>
        </Form.Item>
        <Form.Item
          name="end"
          rules={[
            { required: true, message: t("cause end date is required") },
            () => ({
              validator(_rule, value) {
                if ([null, undefined, ""].includes(value)) {
                  return Promise.resolve();
                }

                if (!moment(value).isValid()) {
                  return Promise.reject("Invalid date!");
                }

                const start = moment(startDate);

                if (start.isValid() && moment(value).isBefore(start)) {
                  return Promise.reject(
                    t("end date should not be before the start date")
                  );
                }

                if (moment(value).isBefore(moment().startOf("day"))) {
                  return Promise.reject(t("should not be in past"));
                }

                if (
                  moment(value).isBefore(moment().add(1, "day").endOf("day"))
                ) {
                  return Promise.reject(t("should be 2 days from now"));
                }

                return Promise.resolve();
              },
            }),
          ]}
        >
          <StackedLabel label={t("end date")} datePicker>
            <DatePicker disabled={loading} />
          </StackedLabel>
        </Form.Item>
        {!["", null, undefined].includes(error) && (
          <Form.Item>
            <Alert message="Error" description={error} type="error" />
          </Form.Item>
        )}
        <Form.Item>
          <Row gutter={20} justify="space-between">
            <Col>{/* */}</Col>
            <Col>
              <Button type="primary" htmlType="submit" loading={loading}>
                {t("update").toUpperCase()}
              </Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CauseEditing;
