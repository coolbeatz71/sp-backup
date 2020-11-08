import { StepType } from "../Steps";

const handleSubmit = (
  slug: string | undefined,
  steps: StepType[],
  okay: { [key: string]: boolean },
  setIssue: (param: boolean[]) => void,
  data: any,
  cb: (param: { [key: string]: any }) => void,
) => {
  const notOk: boolean[] = [];

  Promise.all(
    steps.map((stp, index) => {
      notOk[index] = !okay[stp.id];
      return stp;
    }),
  ).then(() => {
    if (notOk.includes(true)) {
      setIssue(notOk);
    } else {
      if (!slug) {
        notOk[0] = true;
        return setIssue(notOk);
      }

      const toUpload: {
        [key: string]: any;
      } = {
        amount: data.amount,
        reason: data.reason,
        password: data.password,
      };

      cb(toUpload);
    }
  });
};

export default handleSubmit;
