import { StepType } from "../CreateCauseSteps";

import handleMed from "./handleMed";
import handleOrg from "./handleOrg";
import handleSubmit from "./handleSubmit";

const handleData = (
  slug: string | undefined,
  steps: StepType[],
  dt: any,
  data: { [key: string]: any },
  _refreshKey: number,
  index: number,
  step: number,
  setSteps: (param: StepType[]) => void,
  okay: { [key: string]: boolean },
  notSubmit: boolean,
  form: any,
  _setRefreshKey: (param: number) => void,
  setIndex: (param: number) => void,
  setIssue: (param: boolean[]) => void,
  setData: (param: { [key: string]: any }) => void,
  setOkay: (param: { [key: string]: boolean }) => void,
  cb: (param: { [key: string]: any }) => void,
) => {
  handleMed(steps, dt, setSteps);
  handleOrg(steps, dt, setSteps);

  if (notSubmit) {
    setIndex(index + step);
    setData({ ...data, ...dt });

    if (step !== 0) {
      form
        ?.validateFields()
        .then(() => {
          setOkay({ ...okay, [steps[index].id]: true });
        })
        .catch(() => {
          setOkay({
            ...okay,
            [steps[index].id]: false,
          });
        });
    }
  } else {
    const __okay = { ...okay };

    form
      ?.validateFields()
      .then(() => {
        __okay[steps[index].id] = true;
      })
      .catch(() => {
        __okay[steps[index].id] = false;
      })
      .finally(() => {
        setOkay(__okay);

        handleSubmit(slug, steps, __okay, setIssue, data, (formattedData) => {
          cb(formattedData);
        });
      });
  }
};

export default handleData;
