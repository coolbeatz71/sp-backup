import React from "react";
import { isEmpty } from "lodash";
import { useSelector, useDispatch } from "react-redux";
import styles from "./change.module.scss";
import { Form, Button, Typography } from "antd";
import { InputPassword } from "components/common/Input";
import { validateMessages } from "constants/validationMessages";
import { IRootState } from "redux/initialStates";
import change from "redux/actions/pin/change";

const { Text } = Typography;

const ChangePin: React.FC<{}> = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const { loading, error } = useSelector(
    ({ pin: { change } }: IRootState) => change,
  );

  const onSubmit = (data: { [key: string]: any }) => {
    if (isEmpty(error)) form.resetFields();

    const formData = {
      old_password: data.old_password,
      new_password: data.new_password,
    };
    change(formData)(dispatch);
  };

  return (
    <div className={styles.change}>
      <div className={styles.change__header}>
        <div className={styles.change__header__title}>
          <img src="/icons/shield.svg" alt="" />
          <h4>Change your PIN</h4>
        </div>
        <p>Make modifications to your PIN remember to keep it safe</p>
      </div>
      <div className={styles.change__body}>
        <div className={styles.change__body__form}>
          <div className="d-flex justify-content-between">
            <div className="mx-auto">
              <h4 className={styles.change__body__form__title}>Change PIN</h4>
            </div>
          </div>
          <Form
            form={form}
            validateMessages={validateMessages}
            onFinish={onSubmit}
          >
            <Text type="danger" className="mb-3 d-block text-center">
              {error.message}
            </Text>

            <Form.Item
              className="form-group pb-2"
              rules={[
                {
                  len: 5,
                  required: true,
                  pattern: /^[0-9]{5}$/,
                  message: "Old passsword must be number of 5 digits",
                },
              ]}
              validateTrigger={["onSubmit", "onBlur"]}
              name="old_password"
            >
              <InputPassword maxLength={5} placeholder="Old PIN" />
            </Form.Item>

            <Form.Item
              className="form-group pb-2"
              rules={[
                {
                  len: 5,
                  required: true,
                  pattern: /^[0-9]{5}$/,
                  message: "New password must be number of 5 digits",
                },
              ]}
              validateTrigger={["onSubmit", "onBlur"]}
              name="new_password"
            >
              <InputPassword maxLength={5} placeholder="New PIN" />
            </Form.Item>

            <Form.Item
              className="form-group pb-2"
              dependencies={["new_password"]}
              rules={[
                {
                  required: true,
                  message: "Please, confirm the password",
                },
                ({ getFieldValue }) => ({
                  validator({}, value) {
                    if (!value || getFieldValue("new_password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject("Confirm PIN do not match New PIN");
                  },
                }),
              ]}
              validateTrigger={["onSubmit", "onBlur"]}
              name="confirm_password"
            >
              <InputPassword maxLength={5} placeholder="Confirm PIN" />
            </Form.Item>

            <Button
              block
              size="large"
              className="btn-primary"
              loading={loading}
              htmlType="submit"
            >
              CHANGE PIN
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ChangePin;
