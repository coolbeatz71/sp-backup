import React, { useEffect, useState } from "react";
import styles from "./cause-donors.module.scss";
import formatNumber from "helpers/numberFormater";
import splApi from "helpers/axios";
import { Spin, Empty } from "antd";
import { isEmpty } from "lodash";

export interface CauseDonorsProps {
  slug: string | string[];
}

const CauseDonors: React.SFC<CauseDonorsProps> = ({ slug }) => {
  const [donors, setDonors] = useState<{ [key: string]: any }>([]);
  const [fetching, setFetching] = useState(true);
  useEffect(() => {
    splApi
      .get(`/causes/${slug}/donations`)
      .then((response: any) => {
        setDonors(response.data);
        setFetching(false);
      })
      .catch((error: any) => {
        console.error("here", error);
      });
  }, []);

  return (
    <div className={styles.donors}>
      <h5>List of Donors</h5>
      {fetching ? (
        <Spin />
      ) : isEmpty(donors) ? <Empty description="No Donation yet" /> :   (
        donors.map((donor: {[key: string]: any}) => (
          <div key={donor.id} className={styles.donors__details}>
            <span className={styles.donors__details__name}>
              {donor.user_names}
            </span>
            <span className={styles.donors__details__amount}>
              {formatNumber(donor.amount)} Rwf
            </span>
          </div>
        ))
      )}
    </div>
  );
};

export default CauseDonors;
