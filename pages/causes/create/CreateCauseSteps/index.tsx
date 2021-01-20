import { ReactElement } from "react";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";

import { orgStep } from "../handlers/handleOrg";
import { medStep } from "../handlers/handleMed";

export interface StepType {
  id: string;
  title: string;
  component?: (
    alerts: ReactElement | null,
    categories: any[],
    data: any,
    setForm: (form: any) => void,
    cb: (data: any) => void,
    issue: boolean[],
    steps: any[],
  ) => any;
}

export const contactStep = {
  id: "Step3",
  title: "contact information",
  component: (
    alerts: ReactElement | null,
    categories: any[],
    data: { [key: string]: any },
    setForm: (form: any) => void,
    cb: (data: any) => void,
  ) => (
    <Step3
      alerts={alerts}
      categories={categories}
      data={data}
      setForm={setForm}
      cb={cb}
    />
  ),
};

const defaultSteps = (
  isMed: boolean = false,
  isAff: boolean = false,
): StepType[] => [
  {
    id: "Step1",
    title: "basic information",
    component: (
      alerts: ReactElement | null,
      categories: any[],
      data,
      setForm: (form: any) => void,
      cb,
    ) => (
      <Step1
        alerts={alerts}
        categories={categories}
        data={data}
        setForm={setForm}
        cb={cb}
      />
    ),
  },
  ...(isMed ? [medStep] : []),
  {
    id: "Step2",
    title: "detailed information",
    component: (
      alerts: ReactElement | null,
      categories: any[],
      data,
      setForm: (form: any) => void,
      cb,
    ) => (
      <Step2
        alerts={alerts}
        categories={categories}
        data={data}
        setForm={setForm}
        cb={cb}
      />
    ),
  },
  contactStep,
  ...(isAff ? [orgStep] : []),
  {
    id: "Step4",
    title: "payment details",
    component: (
      alerts: ReactElement | null,
      categories: any[],
      data,
      setForm: (form: any) => void,
      cb,
      issue,
      steps,
    ) => (
      <Step4
        alerts={alerts}
        categories={categories}
        data={data}
        setForm={setForm}
        cb={cb}
        issue={issue}
        steps={steps}
      />
    ),
  },
];

export default defaultSteps;
