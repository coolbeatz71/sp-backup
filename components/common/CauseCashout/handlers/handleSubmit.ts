import { StepType } from "../Steps";
import { CARD, TELCO } from "../Steps/Step1";

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
        channel: data.channel,
        amount_telco: data.amount_telco,
        amount_cards: data.amount_cards,
        password: data.password,
      };

      if (!data.amount_telco) {
        delete toUpload.amount_telco;
        toUpload.channel = CARD;
      }

      if (!data.amount_cards) {
        delete toUpload.amount_cards;
        toUpload.channel = TELCO;
      }

      cb(toUpload);
    }
  });
};

export default handleSubmit;
