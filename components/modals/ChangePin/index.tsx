import { FC, useEffect, useState } from "react";
import { Row, Col, Button, Input, Form, Alert } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

import Modal from "components/common/Modal";
import StackedLabel from "components/common/StackedLabel";
import formPinValidator from "utils/validators/form-pin-validator";
import formPinMatchValidator from "utils//validators/form-pin-match-validator";

import change from "redux/actions/pin/change";

import { IRootState } from "redux/initialStates";
import { useRouter } from "next/router";

interface Props {
  visible: boolean;
  onVisible: () => void;
  onCancel: () => void;
}

const ChangePin: FC<Props> = ({ visible, onVisible, onCancel }) => {
  const dispatch = useDispatch();

  const [vis, setVis] = useState(visible);

  const router = useRouter();
  const { t } = useTranslation();

  const {
    loading,
    error: { message: error = null },
  } = useSelector(({ pin: { change: ch } }: IRootState) => ch);

  useEffect(() => {
    setVis(visible);
  }, [visible]);

  return (
    <Modal
      title={t("change pin")}
      visible={vis}
      onVisible={() => {
        setVis(true);
        onVisible();
      }}
      onCancel={() => {
        setVis(false);
        onCancel();
      }}
    >
      <Form
        initialValues={{}}
        validateTrigger={["onFinish"]}
        onFinish={({ old_pin: old_password, new_pin: new_password }) => {
          change(
            () => {
              setVis(false);
              router.reload();
            },
            { old_password, new_password },
          )(dispatch);
        }}
      >
        <Form.Item name="old_pin" rules={formPinValidator(t("old pin"))}>
          <StackedLabel label={t("old pin")}>
            <Input.Password
              maxLength={5}
              placeholder={t("old pin")}
              type="password"
              disabled={loading}
            />
          </StackedLabel>
        </Form.Item>
        <Form.Item name="new_pin" rules={formPinValidator(t("new pin"))}>
          <StackedLabel label={t("new pin")}>
            <Input.Password
              maxLength={5}
              placeholder={t("new pin")}
              type="password"
              disabled={loading}
            />
          </StackedLabel>
        </Form.Item>
        <Form.Item
          name="confirm_pin"
          rules={formPinMatchValidator("new_pin", "pin_and_confirm")}
        >
          <StackedLabel label={t("confirm pin")}>
            <Input.Password
              maxLength={5}
              placeholder={t("confirm pin")}
              type="password"
              disabled={loading}
            />
          </StackedLabel>
        </Form.Item>
        {error && (
          <Form.Item>
            <Alert message={error} type="error" />
          </Form.Item>
        )}
        <Form.Item>
          <Row gutter={20} justify="space-between">
            <Col>{/* */}</Col>
            <Col>
              <Button type="primary" htmlType="submit" loading={loading}>
                {t("change pin").toUpperCase()}
              </Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ChangePin;
