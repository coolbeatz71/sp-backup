import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";

export interface StepType {
  id: string;
  title: string;
  component?: (
    slug: string,
    data: any,
    setForm: (form: any) => void,
    cb: (data: any) => void,
    issue: boolean[],
    steps: any[],
    currentBalance: number,
    currentBalanceTelco: number,
    currentBalanceCards: number,
    currency: string,
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
    component: (
      _slug,
      data,
      setForm: (form: any) => void,
      cb,
      issue,
      steps,
      currentBalance,
      currentBalanceTelco,
      currentBalanceCards,
      currency,
    ) => (
      <Step3
        data={data}
        setForm={setForm}
        cb={cb}
        issue={issue}
        steps={steps}
        currentBalance={currentBalance}
        currentBalanceTelco={currentBalanceTelco}
        currentBalanceCards={currentBalanceCards}
        currency={currency}
      />
    ),
  },
  {
    title,
    id: "Step4",
    component: (slug, data, setForm: (form: any) => void, cb) => (
      <Step4 slug={slug} data={data} setForm={setForm} cb={cb} />
    ),
  },
];

export default defaultSteps;
