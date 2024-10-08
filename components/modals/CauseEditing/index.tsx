import { FC } from "react";
import dayjs from "dayjs";
import PhoneUtils from "@exuus/rwanda-phone-utils";

import Modal from "components/common/Modal";
import { SvpType } from "helpers/context";

import { useSelector } from "react-redux";

import CauseEdit from "pages/causes/create";

interface Props {
  visible: boolean;
  onClose: (refresh: boolean) => void;
  cause: { [key: string]: any };
  svpProps: SvpType;
}

const CauseEditing: FC<Props> = ({ visible, onClose, cause, svpProps }) => {
  const { loading } = useSelector((state: any) => state.createCause);

  return (
    <Modal
      visible={visible && cause.slug}
      title={`Edit "${cause.name}"`}
      onCancel={() => {
        if (!loading) onClose(false);
      }}
    >
      <CauseEdit
        edit
        svpProps={svpProps}
        slug={cause.slug}
        data={{
          category_id: cause.category?.id,
          name: cause.name,
          category: JSON.stringify({
            id: cause.category?.id,
            slug: cause.category?.slug,
          }),
          target: cause.target_amount * 1,
          start: dayjs(cause.start_date),
          end: dayjs(cause.end_date),
          image: cause.image,
          summary: cause.summary,
          video: cause.video,
          details: cause.description,
          account: PhoneUtils(cause.phone_number).short,
          isPrivate: cause.access === "private",
          hospital: cause.institution?.name,
          hospital_phone_number: PhoneUtils(cause.institution?.phone_number).short,
          hospital_email: cause.institution?.email,
          nok_name: cause.next_keen_names,
          nok_relationship: cause.next_keen_relationship,
          nok_phone_number: PhoneUtils(cause.next_keen_phone_number).short,
          nok_email: cause.next_keen_email,
          affiliated: typeof (cause.organization_id * 1) === "number",
          org_name: cause.organization?.name,
          org_email: cause.organization?.email,
          org_phone_number: PhoneUtils(cause.organization?.phone_number).short,
          org_field: cause.organization?.field,
        }}
      />
    </Modal>
  );
};

export default CauseEditing;
