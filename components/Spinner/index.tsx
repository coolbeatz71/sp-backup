import React from "react";
import ScaleLoader from "react-spinners/ScaleLoader";
import styles from "./spinner.module.scss";

const Spinner: React.FC<{}> = () => {
  return (
    <div className={styles.spinner}>
          <ScaleLoader
              color="#6CB8C8"
          />
    </div>
  );
};

export default Spinner;
