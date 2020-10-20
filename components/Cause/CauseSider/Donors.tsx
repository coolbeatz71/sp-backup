import React from "react";
import { Input, Skeleton, Alert, Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "redux/initialStates";
import getDonors from "redux/actions/cause/getDonors";
import numeral from "numeral";

import styles from "./Donors.module.scss";

interface Props {
  slug: string;
}

const Donors: React.FC<Props> = ({ slug }) => {
  const dispatch = useDispatch();

  const [search, setSearch] = React.useState("");
  const [causeDonors, setCauseDonors] = React.useState<any[]>([]);

  const { data, loading, error } = useSelector(
    ({ cause: { donors } }: IRootState) => donors
  );

  React.useEffect(() => {
    getDonors(slug)(dispatch);
  }, [dispatch]);

  React.useEffect(() => {
    setCauseDonors(data);
  }, [data]);

  const fetchData = (dt: any = null) => {
    getDonors(slug, dt ? dt : { search })(dispatch);
  };

  return (
    <div className={styles.donors}>
      <Input
        placeholder="Search"
        disabled={loading || error}
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          if (e.type !== "change") fetchData({ search: "" });
        }}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            if ([null, "", undefined].includes(search)) {
              setSearch("");
            } else {
              fetchData();
            }
          }
        }}
      />
      <div className={styles.donors__content}>
        {loading && <Skeleton active />}
        {error?.message && (
          <Alert
            message={error?.message}
            type="error"
            closeText="RETRY"
            onClose={() => getDonors(slug)(dispatch)}
            showIcon
          />
        )}
        {causeDonors.map((d) => (
          <div key={d.id} className={styles.donors__content__donor}>
            <Typography.Text>{d.user_names}</Typography.Text>
            <Typography.Text>{numeral(d.amount).format()} RWF</Typography.Text>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Donors;
