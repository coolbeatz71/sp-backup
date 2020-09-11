import React from "react";

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
    alerts: React.ReactElement | null,
    categories: any[],
    data: any,
    setForm: (form: any) => void,
    cb: (data: any) => void,
    issue: boolean[],
    steps: any[],
  ) => any;
}

const defaultSteps = (
  isMed: boolean = false,
  isAff: boolean = false,
): StepType[] => [
  {
    id: "Step1",
    title: "Basic Information",
    component: (
      alerts: React.ReactElement | null,
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
  {
    id: "Step2",
    title: "Detailed Information",
    component: (
      alerts: React.ReactElement | null,
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
  {
    id: "Step3",
    title: "Contact Information",
    component: (
      alerts: React.ReactElement | null,
      categories: any[],
      data,
      setForm: (form: any) => void,
      cb,
    ) => (
      <Step3
        alerts={alerts}
        categories={categories}
        data={data}
        setForm={setForm}
        cb={cb}
      />
    ),
  },
  ...(isMed ? [medStep] : []),
  ...(isAff ? [orgStep] : []),
  {
    id: "Step4",
    title: "Payment Details",
    component: (
      alerts: React.ReactElement | null,
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
