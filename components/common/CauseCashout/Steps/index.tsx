import Step1 from "./Step1";
import Step2 from "./Step2";
import { bankStep } from "./../handlers/handleBankDetails";

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
    currentBalanceTelco: number,
    currentBalanceCards: number,
    currency: string,
    isNoBankDetails: boolean,
    slug: string,
  ) => any;
}

const title = "cash out";

const defaultSteps = (isNoBank: boolean): StepType[] => [
  ...(isNoBank ? [bankStep] : []),
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
      currentBalanceTelco,
      currentBalanceCards,
      currency,
    ) => (
      <Step1
        data={data}
        setForm={setForm}
        cb={cb}
        currentBalance={currentBalance}
        currentBalanceTelco={currentBalanceTelco}
        currentBalanceCards={currentBalanceCards}
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
