import Step1 from "./Step1";
import Step2 from "./Step2";

export interface StepType {
  id: string;
  title: string;
  component?: (
    data: any,
    setForm: (form: any) => void,
    cb: (data: any) => void,
    issue: boolean[],
    steps: any[],
    currentBalance: number,
    currency: string,
  ) => any;
}

const title = "cash out";

const defaultSteps = (): StepType[] => [
  {
    title,
    id: "Step1",
    component: (
      data,
      setForm: (form: any) => void,
      cb,
      [],
      [],
      currentBalance,
      currency,
    ) => (
      <Step1
        data={data}
        setForm={setForm}
        cb={cb}
        currentBalance={currentBalance}
        currency={currency}
      />
    ),
  },
  {
    title,
    id: "Step2",
    component: (data, setForm: (form: any) => void, cb, issue, steps) => (
      <Step2
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
