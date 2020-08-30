import StepOrg from "../CreateCauseSteps/StepOrg";
import { StepType } from "../CreateCauseSteps";

export const orgStep = {
  id: "StepOrg",
  title: "Organization/NGO Details",
  component: (
    alerts: React.ReactElement | null,
    categories: any[],
    data: any,
    setForm: (form: any) => void,
    cb: (data: any) => void,
  ) => (
    <StepOrg
      alerts={alerts}
      categories={categories}
      data={data}
      setForm={setForm}
      cb={cb}
    />
  ),
};

const handleOrg = (
  steps: StepType[],
  dt: any,
  setSteps: (param: StepType[]) => void,
) => {
  if (
    ![null, undefined, ""].includes(dt.affiliated) &&
    dt.affiliated === true &&
    ((steps.length === 3 && steps[2] && steps[2].id !== "StepOrg") ||
      (steps.length === 4 && steps[3] && steps[3].id !== "StepOrg"))
  ) {
    const addSteps = [...steps];
    addSteps.splice(steps.length === 3 ? 2 : 3, 0, orgStep);
    setSteps(addSteps);
  } else if (
    ![null, undefined, ""].includes(dt.affiliated) &&
    dt.affiliated !== true &&
    ((steps.length === 4 && steps[2] && steps[2].id === "StepOrg") ||
      (steps.length === 5 && steps[3] && steps[3].id === "StepOrg"))
  ) {
    const removeSteps = [...steps];
    removeSteps.splice(steps.length === 4 ? 2 : 3, 1);
    setSteps(removeSteps);
  }
};

export default handleOrg;
