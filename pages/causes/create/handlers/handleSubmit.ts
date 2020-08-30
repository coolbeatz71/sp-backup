import { phone } from "dev-rw-phone";
import _ from "lodash";
import { StepType } from "../CreateCauseSteps";

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
      if (!slug && !data.uploadFile) {
        notOk[0] = true;
        return setIssue(notOk);
      }

      const hasMed = _.find(steps, { id: "StepMed" });
      const hasOrg = _.find(steps, { id: "StepOrg" });

      const toUpload: {
        [key: string]: any;
      } = {
        category_id: JSON.parse(data.category).id,
        name: data.name,
        payment_method:
          phone(data.account).telco === "MTN" ? "MTN_Rwanda" : "Airtel_Rwanda",
        payment_account_number: phone(data.account).normalized,
        payment_account_name: data.account_name,
        summary: data.summary,
        video: data.video,
        description: data.details,
        target_amount: data.target,
        access: data.isPrivate ? "private" : "public",
        start_date: data.start.format("YYYY-MM-DD"),
        end_date: data.end.format("YYYY-MM-DD"),
        affiliated: data.affiliated ? true : false,
      };

      if (hasOrg) {
        toUpload.organization = {
          name: data.org_name,
          phone_number: phone(data.org_phone_number).normalized,
          email: data.org_email,
          field: data.org_field,
        };
      }

      if (hasMed) {
        toUpload.institution = {
          name: data.hospital,
          phone_number: phone(data.hospital_phone_number).normalized,
          email: data.hospital_email,
        };
        toUpload.next_keen_names = data.nok_name;
        toUpload.next_keen_phone_number = phone(
          data.nok_phone_number,
        ).normalized;
        toUpload.next_keen_email = data.nok_email;
        toUpload.next_keen_relationship = data.nok_relationship;
      }

      cb(toUpload);
    }
  });
};

export default handleSubmit;
