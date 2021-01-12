import { FC, ReactElement, useState, useEffect, Fragment } from "react";
import Link from "next/link";
import { short } from "dev-rw-phone";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import i18n from "constants/locales";
import { Row, Col, Card, Typography, message, Tag } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "redux/initialStates";
import createCause, { clear } from "redux/actions/cause/create";
import styles from "./index.module.scss";
import { SvpType } from "helpers/context";
import handleData from "./handlers";
import defaultSteps from "./CreateCauseSteps";

import Layout from "components/LayoutWrapper";
import Buttons from "./CreateCauseSteps/Buttons";

const Wrapper: FC<{ children: ReactElement; edit: boolean }> = ({
  children,
  edit,
}) => {
  const { t } = useTranslation();
  return edit ? (
    <Fragment>{children}</Fragment>
  ) : (
    <Layout title={t("create a cause")} isForm>
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
              {t("create a new cause")}
            </Typography.Title>
            {children}
          </Col>
        </Row>
      </div>
    </Layout>
  );
};

const alerts = (editing: boolean, userData: any) => {
  return editing ? (
    <Tag icon={<ExclamationCircleOutlined />} color="warning">
      {i18n.t("you can edit this cause once")}
    </Tag>
  ) : !userData.avatar ? (
    <Tag icon={<ExclamationCircleOutlined />} color="warning">
      <Link href="/profile">
        <a rel="noreferrer noopener">
          {i18n.t("you need to update your profile first")}
        </a>
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

const Create: FC<Props> = ({ data: dt = {}, edit = false, slug, svpProps }) => {
  const { data: userData } = useSelector(
    ({ user: { currentUser } }: IRootState) => currentUser,
  );

  const { t } = useTranslation();

  const [steps, setSteps] = useState(
    defaultSteps(edit && dt.category_id === 1, edit && dt.affiliated),
  );
  const [index, setIndex] = useState<number>(0);
  const [data, setData] = useState<{ [key: string]: any }>(dt);
  const [refreshKey, setRefreshKey] = useState<number>(0);
  const [form, setForm] = useState<any>();
  const [okay, setOkay] = useState<{ [key: string]: boolean }>({});
  const [issue, setIssue] = useState<boolean[]>([]);

  const [success, setSuccess] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (success && !data.slug) {
      router.replace("/causes/create/success");
    }
    if (success && data.slug) {
      message.success(
        t("successfully edited", {
          name: data.name,
        }),
      );
      router.replace(`/user/causes/${data.slug}`);
    }
  }, [success, router]);

  const dispatch = useDispatch();

  useEffect(() => {
    clear()(dispatch);
  }, [dispatch]);

  useEffect(() => {
    setData({
      ...data,
      account: short(userData.phone_number),
      contact_email: userData.email,
      contact_phone_number: short(userData.phone_number),
    });
  }, [userData]);

  return (
    <div className={styles.create} key={dt.name}>
      <Wrapper edit={edit}>
        <Card
          key={refreshKey}
          title={
            <Row>
              <Col flex={1}>{t(steps[index].title)}</Col>
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
