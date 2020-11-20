import React from "react";

import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";

export interface StepType {
  id: string;
  title: string;
  component?: (
    slug: string,
    data: any,
    setForm: (form: any) => void,
    cb: (data: any) => void,
    issue: boolean[],
    steps: any[]
  ) => any;
}

const title = "transfer donations";

const defaultSteps = (): StepType[] => [
  {
    title,
    id: "Step1",
    component: (slug, data, setForm: (form: any) => void, cb) => (
      <Step1 slug={slug} data={data} setForm={setForm} cb={cb} />
    ),
  },
  {
    title,
    id: "Step2",
    component: (slug, data, setForm: (form: any) => void, cb) => (
      <Step2 slug={slug} data={data} setForm={setForm} cb={cb} />
    ),
  },
  {
    title,
    id: "Step3",
    component: (slug, data, setForm: (form: any) => void, cb, issue, steps) => (
      <Step3
        slug={slug}
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
