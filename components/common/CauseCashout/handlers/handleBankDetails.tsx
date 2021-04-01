import { StepType } from "../Steps";
import StepBankDetails from "./../Steps/StepBankDetails";

export const bankStep = {
  id: "StepBankDetails",
  title: "cash out",
  component: (
    data: any,
    setForm: (form: any) => void,
    cb: (data: any) => void,
    _issue: boolean[],
    _steps: any[],
    _currentBalance: number,
    _currentBalanceTelco: number,
    _currentBalanceCards: number,
    _currency: string,
    isNoBankDetails: boolean,
    slug: string,
  ) => (
    <StepBankDetails
      cb={cb}
      data={data}
      slug={slug}
      setForm={setForm}
      isNoBankDetails={isNoBankDetails}
    />
  ),
};

const handleBankDetails = (
  steps: StepType[],
  setSteps: (param: StepType[]) => void,
  isNoBankDetails: boolean,
) => {
  if (!isNoBankDetails && steps[1] && steps[1].id !== "StepBankDetails") {
    const addSteps = [...steps];
    addSteps.splice(1, 0, bankStep);

    setSteps(addSteps);
  } else if (isNoBankDetails && steps[1] && steps[1].id === "StepBankDetails") {
    const removeSteps = [...steps];
    removeSteps.splice(1, 1);

    setSteps(removeSteps);
  }
};

export default handleBankDetails;
