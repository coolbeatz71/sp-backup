import StepMed from "../CreateCauseSteps/StepMed";
import { StepType } from "../CreateCauseSteps";

import i18n from "constants/locales";

export const medStep = {
  id: "StepMed",
  title: i18n.t("medical information"),
  component: (
    alerts: React.ReactElement | null,
    categories: any[],
    data: any,
    setForm: (form: any) => void,
    cb: (data: any) => void
  ) => (
    <StepMed
      alerts={alerts}
      categories={categories}
      data={data}
      setForm={setForm}
      cb={cb}
    />
  ),
};

const handleMed = (
  steps: StepType[],
  dt: any,
  setSteps: (param: StepType[]) => void
) => {
  if (
    ![null, undefined, ""].includes(dt.category) &&
    JSON.parse(dt.category).id === 1 &&
    steps[1] &&
    steps[1].id !== "StepMed"
  ) {
    const addSteps = [...steps];
    addSteps.splice(1, 0, medStep);
    setSteps(addSteps);
  } else if (
    ![null, undefined, ""].includes(dt.category) &&
    JSON.parse(dt.category).id !== 1 &&
    steps[1] &&
    steps[1].id === "StepMed"
  ) {
    const removeSteps = [...steps];
    removeSteps.splice(1, 1);
    setSteps(removeSteps);
  }
};

export default handleMed;
