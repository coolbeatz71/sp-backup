import { phone } from "dev-rw-phone";
import { fixedLineFormatter } from "helpers/phoneNumberFormatter";
import { find } from "lodash";
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

      const hasMed = find(steps, { id: "StepMed" });
      const hasOrg = find(steps, { id: "StepOrg" });

      const toUpload: {
        [key: string]: any;
      } = {
        category_id: JSON.parse(data.category).id,
        name: data.name,
        payment_method:
          phone(data.account).telco === "MTN" ? "MTN_Rwanda" : "Airtel_Rwanda",
        payment_account_number: phone(data.account).normalized,
        summary: data.summary,
        description: data.details,
        target_amount: data.target,
        access: data.isPrivate ? "private" : "public",
        start_date: data.start.format("YYYY-MM-DD"),
        end_date: data.end.format("YYYY-MM-DD"),
        affiliated: data.affiliated ? true : false,
        contact_information: {
          email: data.contact_email,
          phone_number: fixedLineFormatter(data.contact_phone_number),
        },
        accepts_card_payments: data.accepts_card_payments,
        bank_name: data.bank_name,
        bank_account_number: data.bank_account_number,
        payment_account_name: data.payment_account_name,
      };

      if (!["", null, undefined].includes(data.video)) {
        toUpload.video = data.video.trim();
      }

      if (!data.accepts_card_payments) {
        delete toUpload.bank_name;
        delete toUpload.bank_account_number;
        delete toUpload.payment_account_name;

        toUpload.accepts_card_payments = false;
      }

      if (hasOrg) {
        toUpload.organization = {
          name: data.org_name,
          phone_number: fixedLineFormatter(data.org_phone_number),
          email: data.org_email,
          field: data.org_field,
        };
        toUpload.contact_information = {};
      }

      if (hasMed) {
        toUpload.institution = {
          name: data.hospital,
          phone_number: fixedLineFormatter(data.hospital_phone_number),
          email: data.hospital_email,
        };
        toUpload.next_keen_names = data.nok_name;
        toUpload.next_keen_phone_number = fixedLineFormatter(
          data.nok_phone_number,
        );

        if (!["", null, undefined].includes(data.nok_email)) {
          toUpload.next_keen_email = data.nok_email;
        }
        toUpload.next_keen_relationship = data.nok_relationship;
      }

      cb(toUpload);
    }
  });
};

export default handleSubmit;
