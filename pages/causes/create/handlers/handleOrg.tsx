import { ReactElement } from "react";
import StepOrg from "../CreateCauseSteps/StepOrg";
import { contactStep, StepType } from "../CreateCauseSteps";

import i18n from "constants/locales";

export const orgStep = {
  id: "StepOrg",
  title: i18n.t("organization details"),
  component: (
    alerts: ReactElement | null,
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
    ((steps.length === 4 && steps[2] && steps[2].id !== "StepOrg") ||
      (steps.length === 5 && steps[3] && steps[3].id !== "StepOrg"))
  ) {
    const addSteps = [...steps];
    addSteps.splice(steps.length === 4 ? 2 : 3, 1, orgStep);
    setSteps(addSteps);
  } else if (
    ![null, undefined, ""].includes(dt.affiliated) &&
    dt.affiliated !== true &&
    ((steps.length === 4 && steps[2] && steps[2].id === "StepOrg") ||
      (steps.length === 5 && steps[3] && steps[3].id === "StepOrg"))
  ) {
    const removeSteps = [...steps];
    removeSteps.splice(steps.length === 4 ? 2 : 3, 1, contactStep);
    setSteps(removeSteps);
  }
};

export default handleOrg;
