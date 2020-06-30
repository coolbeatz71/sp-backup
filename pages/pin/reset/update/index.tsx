import React from "react";
import { useRouter } from "next/router";
import { AES, enc } from "crypto-js";
import { useDispatch, useSelector } from "react-redux";
import styles from "./update.module.scss";
import AuthLayout from "components/Auth/Layout";
import { IRootState } from "redux/initialStates";
import resetUpdate from "redux/actions/pin/reset-update";

const PinResetUpdate: React.FC<{}> = () => {
  const {
    query: { id },
    replace,
  } = useRouter();
  const dispatch = useDispatch();
  const { loading, error } = useSelector(
    ({ pin: { reset_update } }: IRootState) => reset_update,
  );

  const plainPhone = AES.decrypt(id.toString(), "").toString(enc.Utf8);
  const handleSubmit = (form: { [key: string]: any }) => {
    const data = { ...form, phone_number: plainPhone };
    resetUpdate(data)(replace, dispatch);
  };

  return (
    <div className={styles.pinUpdate}>
      <AuthLayout
        context="pin-reset-update"
        formState={{ loading, error: error.message }}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default PinResetUpdate;
