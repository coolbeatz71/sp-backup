import React from "react";
import { Row, Col, Button, Form, Select, Alert, Input, message } from "antd";
import { getAllCauses } from "redux/actions/cause/getAll";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "redux/initialStates";
import StackedLabel from "components/common/StackedLabel";
import formNumericValidator from "utils/validators/form-numeric-validator";
import { isEmpty, truncate } from "lodash";
import getSingle from "redux/actions/cause/getSingle";

export interface Props {
  slug: string;
  data: any;
  setForm: (form: any) => void;
  cb: (data: any) => void;
  issue?: boolean[];
  steps?: any[];
}

const Step1: React.FC<Props> = ({ slug, data, setForm, cb }) => {
  const CAUSES_URL: string = "/causes?purpose=donation_transfer&status=active";

  const dispatch = useDispatch();
  const [isPrivate, setPrivate] = React.useState<boolean>(false);
  const [isConfirmed, setConfirmed] = React.useState<boolean>(true);

  const { loading: loadingUser, data: user } = useSelector(
    ({ user: { currentUser } }: IRootState) => currentUser,
  );

  const { data: causes, loading, error, fetched } = useSelector(
    ({ cause: { all } }: IRootState) => all,
  );

  const { loading: loadingCause, data: singleCause, error: _err } = useSelector(
    ({ cause: { single } }: IRootState) => single,
  );

  React.useEffect(() => {
    if (!isEmpty(data.cause)) {
      const { access, userId } = JSON.parse(data?.cause);
      setPrivate(access === "private" && userId !== user.id);
    }
  }, []);

  React.useEffect(() => {
    getAllCauses(CAUSES_URL)(dispatch);
  }, [dispatch]);

  const onCauseChange = (value: any) => {
    setConfirmed(false);
    const { access, userId } = JSON.parse(value);
    setPrivate(access === "private" && userId !== user.id);

    if (access === "private" && userId !== user.id) {
      message.config({ maxCount: 1, duration: 5 });
      message.warning("An access code is required for private cause");
    }
  };

  return (
    <Form
      ref={(ref) => setForm(ref)}
      initialValues={data}
      validateTrigger={["onFinish"]}
      onValuesChange={(dt) => {
        cb({ ...dt, step: 0 });
      }}
      onFinish={(dt) => {
        if (!isConfirmed) {
          const { slug, access } = JSON.parse(dt.cause);
          const { access_code } = dt;

          cb({ ...dt, step: 0 });

          getSingle(
            slug,
            access === "private" && access_code ? { access_code } : {},
          )(dispatch);

          setConfirmed(true);
        } else {
          if (!isEmpty(singleCause)) {
            const data = { ...dt, transferTo: singleCause };
            cb({ ...data, step: 1 });
          } else {
            cb({ ...dt, step: 0 });
          }
        }
      }}
    >
      <Form.Item>
        <span>
          Start by providing the cause till number you want to transfer
          donations to
        </span>
      </Form.Item>

      {(error || _err) && (
        <Form.Item>
          <Alert
            message="Error"
            description={_err.message || error.message}
            type="error"
          />
        </Form.Item>
      )}

      <Form.Item
        name="cause"
        rules={[{ required: true, message: "Cause till number is required!" }]}
        validateTrigger={["onSubmit", "onBlur"]}
      >
        <Select
          showSearch
          placeholder="Search Cause till number"
          optionFilterProp="children"
          onChange={onCauseChange}
          disabled={loading}
          loading={loading || loadingUser}
        >
          {fetched &&
            causes.data
              ?.filter((cause: { [key: string]: any }) => cause.slug !== slug)
              .map((cause: { [key: string]: any }) => (
                <Select.Option
                  key={cause.id}
                  value={JSON.stringify({
                    id: cause.id,
                    slug: cause.slug,
                    access: cause.access,
                    userId: cause.user_id,
                    tillNumber: cause.till_number,
                  })}
                >
                  {cause.till_number} - {truncate(cause.name, { length: 49 })}
                </Select.Option>
              ))}
        </Select>
      </Form.Item>

      {isPrivate && (
        <Form.Item
          name="access_code"
          rules={[
            { required: true, message: `Access code is required!` },
            { min: 4, max: 4, message: `Access code must be 4 digits!` },
            formNumericValidator("Access code"),
          ]}
        >
          <StackedLabel label="Access code">
            <Input.Password
              maxLength={4}
              placeholder="Access code"
              type="password"
              disabled={loading}
              onKeyPress={() => setConfirmed(false)}
            />
          </StackedLabel>
        </Form.Item>
      )}

      <Form.Item>
        <Row gutter={20} justify="space-between">
          <Col>{/* */}</Col>
          <Col>
            {!isConfirmed ? (
              <Button
                type="default"
                loading={loadingCause || loadingUser}
                htmlType="submit"
              >
                CONFIRM CAUSE
              </Button>
            ) : (
              <Button
                type="primary"
                htmlType="submit"
                loading={loadingCause || loadingUser}
                disabled={error || _err}
              >
                NEXT
              </Button>
            )}
          </Col>
        </Row>
      </Form.Item>
    </Form>
  );
};

export default Step1;
