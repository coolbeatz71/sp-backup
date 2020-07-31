import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./createCause.module.scss";
import { Button, Typography, Form, Spin, Tag } from "antd";
import BasicInfoForm from "components/Cause/Create/BasicInfo";
import MedicalInfoForm from "components/Cause/Create/MedicalInfo";
import DetailedInfoForm from "components/Cause/Create/DetailedInfo";
import OrgInformation from "components/Cause/Create/OrgInformation";
import PaymentInfo from "components/Cause/Create/PaymentInfo";
import Success from "components/Cause/Create/Success";
import { formStateDefaultValue } from "interfaces/cause/create/formState";
import { validateMessages } from "constants/validationMessages";
import { remove, forEach, pick } from "lodash";
import phoneFormatter from "helpers/phoneNumberFormatter";
import createCause from "redux/actions/cause/create";
import { IRootState } from "redux/initialStates";
import { IUnknownObject } from "interfaces/unknownObject";
import editCause from "redux/actions/cause/edit";
import { useRouter } from "next/router";
import serializeFormattedNumber from "helpers/serializeFormattedNumber";
import getTelco from "helpers/getTelco";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import isCauseEditable from "helpers/isCauseEditable";

export interface CreateCauseProps {
  editFormState: IUnknownObject;
  slug: string | string[];
}

const { Title, Text } = Typography;

interface Isteps {
  title: string;
  subTitle: string;
  content: React.ReactElement;
}

const CreateCause: React.FC<CreateCauseProps> = ({ editFormState, slug }) => {
  const dispatch = useDispatch();
  const { push } = useRouter();
  const editing = !!editFormState;
  const defaultSteps: Isteps[] = [
    {
      title: "Basic Information",
      subTitle: "Start by giving us the basic information on the Cause",
      content: <BasicInfoForm />,
    },
    {
      title: "Detailed Information",
      subTitle: "Gives us detailed and elaborate information on your cause",
      content: <DetailedInfoForm />,
    },
    {
      title: "Payment Details",
      subTitle: "",
      content: <PaymentInfo />,
    },
  ];
  const orgInformation = {
    title: "Organization/NGO Details",
    subTitle: "",
    content: <OrgInformation />,
  };

  const medicalInformation = {
    title: "Medical Information",
    subTitle: "",
    content: <MedicalInfoForm />,
  };

  const [form] = Form.useForm();
  const {
    data: { phone_number },
  } = useSelector(({ user: { currentUser } }: IRootState) => currentUser);
  const [currentStep, setCurrentStep] = useState(0);
  const [formState, setFormState] = useState(
    editFormState || formStateDefaultValue,
  );
  const [editFormValues, setEditFormValues] = useState<IUnknownObject>();
  const [steps, setSteps] = useState(defaultSteps);
  const [successStep, setSuccessStep] = useState<boolean>(false);
  const [isFormDataReady, setFormDataReadiness] = useState<boolean>(false);

  const stepsCount = steps.length - 1;

  const { loading, data, error } = useSelector(
    ({ cause: { create } }: IRootState) => create,
  );

  const { loading: loadingEdit, error: errorEdit } = useSelector(
    ({ cause: { edit } }: IRootState) => edit,
  );

  useEffect(() => {
    if (editing) {
      if (editFormState.category_id === 1) {
        const indexToInsert =
          steps.findIndex((step) => step.title === "Basic Information") + 1;
        steps.splice(indexToInsert, 0, medicalInformation);
        setSteps([...steps]);
      }
      if (editFormState.affiliated === true) {
        const indexToInsert =
          steps.findIndex((step) => step.title === "Detailed Information") + 1;
        steps.splice(indexToInsert, 0, orgInformation);
        setSteps([...steps]);
      }
    }
  }, []);

  useEffect(() => {
    if (!editing && phone_number && !formState.payment_account_number) {
      setFormState({
        ...formStateDefaultValue,
        payment_method: getTelco(phone_number),
        payment_account_number: phoneFormatter(phone_number),
      });
      setFormDataReadiness(true);
    }
  }, [phone_number]);

  const formatFlatObject = (data: { [key: string]: any }) => {
    forEach(data, (value, key) => {
      if (key.includes("phone") || key.includes("account_number")) {
        data[key] = phoneFormatter(value);
        return;
      }
      if (key.includes("image")) {
        data[key] = data[key][0].originFileObj;
        return;
      }
      if (key.includes("access")) {
        data[key] = data[key] === true ? "private" : "public";
        return;
      }
      if (key.includes("duration")) {
        data.start_date = data[key][0].toISOString();
        data.end_date = data[key][1].toISOString();
        return;
      }
      if (key.includes("target_amount")) {
        data.target_amount = Number(
          serializeFormattedNumber(data.target_amount),
        );
        return;
      }
    });
    return data;
  };

  const groupData = (data: { [key: string]: any }) => {
    const groupList = ["organization", "institution"];
    const groupedObject: { [key: string]: any } = {};
    groupList.map((groupKey) => {
      groupedObject[groupKey] = {};
    });
    Object.keys(data).map((key) => {
      groupList.map((name) => {
        if (key.startsWith(name)) {
          const childElement = key.split("_").slice(1).join("_");
          groupedObject[name][childElement] = data[key];
        } else if (!groupList.some((el) => key.startsWith(el))) {
          groupedObject[key] = data[key];
        }
      });
    });
    delete groupedObject.duration;
    return groupedObject;
  };

  const getTouchedFields = (values: IUnknownObject) => {
    const touchedKeys = Object.keys(values).filter((key) =>
      form.isFieldTouched(key),
    );
    const touchedFields = pick(values, touchedKeys);
    return touchedFields;
  };

  const handleSubmit = (values: any) => {
    setFormState({ ...formState, ...values });
    if (editing) {
      const touchedFields = getTouchedFields(values);
      setEditFormValues({ ...editFormValues, ...touchedFields });
    }
    if (currentStep === stepsCount) {
      const finalData = editing
        ? { ...editFormValues, ...getTouchedFields(values) }
        : { ...formState, ...values };
      const formattedData = groupData(formatFlatObject(finalData));
      const form = new FormData();
      Object.keys(formattedData).forEach((key) => {
        const value =
          key === "image" || typeof formattedData[key] === "string"
            ? formattedData[key]
            : JSON.stringify(formattedData[key]);
        form.append(key, value);
      });
      if (editing) return editCause(form, slug)(push, dispatch);
      createCause(form)(dispatch, setSuccessStep);
    } else {
      const current = currentStep + 1;
      setCurrentStep(current);
    }
  };

  const handleValueChange = (changedFields: any) => {
    switch (Object.keys(changedFields)[0]) {
      case "affiliated":
        if (changedFields.affiliated === true) {
          const indexToInsert =
            steps.findIndex((step) => step.title === "Detailed Information") +
            1;
          steps.splice(indexToInsert, 0, orgInformation);
          setSteps([...steps]);
        } else {
          remove(steps, (step) => step.title === "Organization/NGO Details");
          setSteps([...steps]);
        }
        break;
      case "category_id":
        if (changedFields.category_id === 1) {
          const indexToInsert =
            steps.findIndex((step) => step.title === "Basic Information") + 1;
          steps.splice(indexToInsert, 0, medicalInformation);
          setSteps([...steps]);
        } else {
          remove(steps, (step) => step.title === "Medical Information");
          setSteps([...steps]);
        }
        break;
      default:
        break;
    }
  };

  const prev = () => {
    const current = currentStep - 1;
    setCurrentStep(current);
  };

  return (
    <div className={styles.createCause}>
      <h4 className={styles.createCause__title}>
        {successStep
          ? "Cause Created Succesfully"
          : editing
          ? "Edit cause"
          : "Create a new cause"}
      </h4>
      <div className={styles.createCause__content}>
        {!successStep ? (
          <>
            <div className={styles.createCause__content__header}>
              <div className={styles.createCause__content__header__title}>
                <Title level={4}>{steps[currentStep].title}</Title>
                <p>{steps[currentStep].subTitle}</p>
                {editing && (
                  <Tag
                    className="mb-2 edit-warning"
                    icon={<ExclamationCircleOutlined />}
                    color="warning"
                  >
                    You can edit this cause only once
                  </Tag>
                )}
              </div>
              <div className={styles.createCause__content__header__steps}>
                {steps.map((step, index) => (
                  <div
                    key={step.title}
                    onClick={() => setCurrentStep(index)}
                    onKeyUp={({ keyCode }) => {
                      if (keyCode === 13) setCurrentStep(index);
                    }}
                    role="button"
                    className={`
                    ${styles.createCause__content__header__steps__step}
                    ${
                      index <= currentStep
                        ? styles.createCause__content__header__steps__stepActive
                        : ""
                    }`}
                  />
                ))}
              </div>
            </div>
            <div className={styles.createCause__content__form}>
              {isFormDataReady || editing ? (
                <Form
                  form={form}
                  initialValues={formState}
                  validateMessages={validateMessages}
                  onValuesChange={handleValueChange}
                  onFinish={handleSubmit}
                >
                  <Text type="danger" className="mb-3 d-block">
                    {error || errorEdit}
                  </Text>
                  {steps[currentStep].content}
                  <div className={styles.createCause__content__actions}>
                    {currentStep > 0 && (
                      <Button className="btn-primary mr-2" onClick={prev}>
                        PREVIOUS
                      </Button>
                    )}
                    <Button
                      loading={loading || loadingEdit}
                      className="btn-primary"
                      htmlType="submit"
                      disabled={
                        editing && !isCauseEditable(editFormState.edit_count)
                      }
                    >
                      {currentStep !== stepsCount
                        ? "CONTINUE"
                        : editing
                        ? "EDIT CAUSE"
                        : "CREATE A CAUSE"}
                    </Button>
                  </div>
                </Form>
              ) : (
                <div className="text-center">
                  <Spin />
                </div>
              )}
            </div>
          </>
        ) : (
          <Success
            till_number={data.till_number}
            slug={data.slug}
            summary={data.name}
          />
        )}
      </div>
    </div>
  );
};

export default CreateCause;
