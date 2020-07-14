import React from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import styles from "./reset.module.scss";
import AuthLayout from "components/Auth/Layout";
import { IRootState } from "redux/initialStates";
import reset from "redux/actions/pin/reset";

const PinReset: React.FC<{}> = () => {
  const { push } = useRouter();
  const dispatch = useDispatch();

  const { loading, error } = useSelector(
    ({ pin: { reset } }: IRootState) => reset,
  );

  const handleSubmit = (form: { [key: string]: any }) => {
    const phone_number = form.phone_number;
    reset({ phone_number })(push, dispatch);
  };

  return (
    <div className={styles.pinReset}>
      <AuthLayout
        context="pin-reset"
        formState={{ loading, error: error.message }}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default PinReset;
