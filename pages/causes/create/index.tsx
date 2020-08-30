import React from "react";
import { Row, Col, Card, Typography, message, Tag } from "antd";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";

import Layout from "components/LayoutWrapper";
import { IRootState } from "redux/initialStates";

import styles from "./index.module.scss";

import defaultSteps from "./CreateCauseSteps";
import Buttons from "./CreateCauseSteps/Buttons";
import { SvpType } from "helpers/context";

import handleData from "./handlers";
import { useRouter } from "next/router";
import createCause, { clear } from "redux/actions/cause/create";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import Link from "next/link";

const Wrapper: React.FC<{ children: React.ReactElement; edit: boolean }> = ({
  children,
  edit,
}) =>
  edit ? (
    <React.Fragment>{children}</React.Fragment>
  ) : (
    <Layout title="Create a Cause" isForm>
      <div data-content-padding>
        <Row>
          <Col
            xxl={{ span: 8, offset: 8 }}
            xl={{ span: 10, offset: 7 }}
            lg={{ span: 14, offset: 5 }}
            md={{ span: 18, offset: 3 }}
            sm={{ span: 24, offset: 0 }}
            xs={{ span: 24, offset: 0 }}
          >
            <Typography.Title level={4} className={styles.create__title}>
              Create a new Cause
            </Typography.Title>
            {children}
          </Col>
        </Row>
      </div>
    </Layout>
  );

const alerts = (editing: boolean, userData: any) => {
  return editing ? (
    <Tag icon={<ExclamationCircleOutlined />} color="warning">
      You can edit this cause only once
    </Tag>
  ) : !userData.avatar ? (
    <Tag icon={<ExclamationCircleOutlined />} color="warning">
      <Link href="/profile">
        <a>You need to update your profile picture first</a>
      </Link>
    </Tag>
  ) : null;
};

interface Props {
  data?: { [key: string]: any };
  edit?: boolean;
  slug?: string;
  svpProps: SvpType;
}

const Create: React.FC<Props> = ({
  data: dt = {},
  edit = false,
  slug,
  svpProps,
}) => {
  const [steps, setSteps] = React.useState(
    defaultSteps(edit && dt.category_id === 1, edit && dt.affiliated),
  );
  const [index, setIndex] = React.useState<number>(0);
  const [data, setData] = React.useState<{ [key: string]: any }>(dt);
  const [refreshKey, setRefreshKey] = React.useState<number>(0);
  const [form, setForm] = React.useState<any>();
  const [okay, setOkay] = React.useState<{ [key: string]: boolean }>({});
  const [issue, setIssue] = React.useState<boolean[]>([]);

  const { data: userData } = useSelector(
    ({ user: { currentUser } }: IRootState) => currentUser,
  );

  const [success, setSuccess] = React.useState(false);

  const router = useRouter();

  React.useEffect(() => {
    if (success && !data.slug) {
      router.replace("/causes/create/success");
    }
    if (success && data.slug) {
      message.success(`Successfully edited "${data.name}"`);
      router.replace(`/user/causes/${data.slug}`);
    }
  }, [success, router]);

  const dispatch = useDispatch();

  React.useEffect(() => {
    clear()(dispatch);
  }, [dispatch]);

  return (
    <div className={styles.create} key={dt.name}>
      <Wrapper edit={edit}>
        <Card
          key={refreshKey}
          title={
            <Row>
              <Col flex={1}>{steps[index].title}</Col>
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
            alerts(edit, userData),
            svpProps.categories,
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
                setSteps,
                okay,
                !submit,
                form,
                setRefreshKey,
                setIndex,
                setIssue,
                setData,
                setOkay,
                (formattedData) => {
                  const formData = new FormData();

                  if (data.uploadFile) {
                    formData.append("image", data.uploadFile);
                  }

                  for (const key in formattedData) {
                    if (formattedData.hasOwnProperty(key)) {
                      formData.append(
                        key,
                        typeof formattedData[key] === "string"
                          ? formattedData[key]
                          : JSON.stringify(formattedData[key]),
                      );
                    }
                  }

                  createCause(formData)(dispatch, () => {
                    setSuccess(true);
                  });
                },
              );
            },
            issue,
            steps,
          )}
        </Card>
      </Wrapper>
    </div>
  );
};

export default Create;
