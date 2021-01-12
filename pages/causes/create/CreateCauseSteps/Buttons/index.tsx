import { FC } from "react";
import { Tooltip } from "antd";
import { useSelector } from "react-redux";
import { IRootState } from "redux/initialStates";

import { StepType } from "../index";
import styles from "./index.module.scss";

interface Props {
  steps: StepType[];
  index: number;
  form: any;
  okay: { [key: string]: boolean };
  setOkay: (param: { [key: string]: boolean }) => void;
  setIssue: (param: boolean[]) => void;
  setIndex: (param: number) => void;
}

const TT: FC<{ loading: boolean; title: string; children: any }> = ({
  loading,
  title,
  children,
}) => {
  return loading ? children : <Tooltip title={title}>{children}</Tooltip>;
};

const Buttons: FC<Props> = ({
  steps,
  index,
  form,
  okay,
  setOkay,
  setIssue,
  setIndex,
}) => {
  const { loading } = useSelector((state: IRootState) => state.cause.create);

  return (
    <div className={styles.steps}>
      {steps.map(({ title }, i) => (
        <TT key={title} title={title} loading={loading}>
          <button
            disabled={loading}
            className={styles.steps__step}
            data-active={i <= index ? "is_active" : ""}
            onClick={() => {
              if (!loading) {
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
                  })
                  .finally(() => {
                    setIssue([]);
                    setIndex(i);
                  });
              }
            }}
          >
            &nbsp;
          </button>
        </TT>
      ))}
    </div>
  );
};

export default Buttons;
