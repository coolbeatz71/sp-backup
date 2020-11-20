import React from "react";
import { useDispatch, useSelector } from "react-redux";
import numeral from "numeral";
import { Input, Skeleton, Alert, Typography, Spin, Empty } from "antd";
import ReactCustomScrollbar from "react-scrollbars-custom";
import { IRootState } from "redux/initialStates";
import getDonors from "redux/actions/cause/donors";
import moreDonors from "redux/actions/cause/moreDonors";
import { CLEAR_SEARCH_DONORS } from "redux/action-types/cause/donors";

import styles from "./Donors.module.scss";
import { isEmpty } from "lodash";
import Link from "next/link";
import { ALL_CAUSES_PATH } from "helpers/paths";

import { useTranslation } from "react-i18next";

interface Props {
  slug: string;
}

const Donors: React.FC<Props> = ({ slug }) => {
  const limit = 15;
  const dispatch = useDispatch();

  const { t } = useTranslation();

  const [page, setPage] = React.useState<number>(2);
  const [search, setSearch] = React.useState<string>("");
  const [donors, setDonors] = React.useState<any[]>([]);
  const [hasMoreDonors, setHasMoreDonors] = React.useState<boolean>(true);

  const {
    data: { search: donorsList },
    loading: { search: loading },
    error: { search: searchError },
    meta: {
      search: { total, pages },
    },
  } = useSelector(({ cause: { donors } }: IRootState) => donors);

  const { data: moreDonorsList, loading: loadingMore } = useSelector(
    ({ cause: { moreDonors } }: IRootState) => moreDonors,
  );

  const searchDonors = (dt: any = null) => {
    getDonors(slug, true, dt ? dt : { limit, search })(dispatch);
  };

  React.useEffect(() => {
    const delayTimer = setTimeout(() => {
      if (!isEmpty(search.trim())) return searchDonors();
    }, 500);

    return () => clearTimeout(delayTimer);
  }, [dispatch, search]);

  React.useEffect(() => {
    dispatch({ type: CLEAR_SEARCH_DONORS });
    getDonors(slug, true, { limit })(dispatch);
  }, [dispatch]);

  React.useEffect(() => {
    setDonors(donorsList);
  }, [donorsList]);

  React.useEffect(() => {
    if (moreDonorsList.length !== 0) {
      setDonors([...donorsList, ...moreDonorsList]);
    }
  }, [moreDonorsList]);

  const fetchMoreDonors = () => {
    if (donors.length >= total || page > pages) {
      setHasMoreDonors(false);
      return;
    }

    setPage((prev) => prev + 1);
    moreDonors(
      slug,
      search ? { limit, page, search } : { limit, page },
    )(dispatch);
  };

  return (
    <div className={styles.donors}>
      <Input
        style={{
          marginBottom: "1.5rem",
        }}
        placeholder={t("search")}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            if ([null, "", undefined].includes(search)) {
              setSearch("");
              getDonors(slug, true, { limit })(dispatch);
              setHasMoreDonors(true);
            } else {
              searchDonors();
            }
          }
        }}
      />
      <div className={styles.donors__content}>
        <ReactCustomScrollbar
          className={styles.donors__content__RSC}
          style={{ width: "100%", height: donors.length <= limit ? 250 : 450 }}
          onScroll={() => {
            if (hasMoreDonors) fetchMoreDonors();
          }}
        >
          {loading && !loadingMore ? (
            <Skeleton active />
          ) : (
            <>
              {searchError?.message && (
                <Alert
                  message={searchError?.message}
                  type="error"
                  closeText="RETRY"
                  onClose={() => getDonors(slug, true)(dispatch)}
                  showIcon
                />
              )}
              {!loading && !loadingMore && donors.length === 0 ? (
                <Empty description={t("no donors found")} />
              ) : (
                <>
                  {donors.map((d, i) => (
                    <div key={i} className={styles.donors__content__donor}>
                      <Typography.Text>
                        {d.donor_source ? (
                          <Link
                            href={`${ALL_CAUSES_PATH}/${d.donor_source.slug}`}
                          >
                            {d.donor_source.till_number}
                          </Link>
                        ) : (
                          d.user_names
                        )}
                      </Typography.Text>
                      <Typography.Text>
                        {numeral(d.amount).format()} RWF
                      </Typography.Text>
                    </div>
                  ))}

                  {loadingMore && (
                    <span style={{ color: " #219bb2" }}>
                      <Spin />
                      &nbsp; loading
                    </span>
                  )}

                  {donors.length >= total && donors.length >= limit && (
                    <Alert
                      message={t("no more donors")}
                      type="info"
                      showIcon
                      closable
                      banner
                    />
                  )}
                </>
              )}
            </>
          )}
        </ReactCustomScrollbar>
      </div>
    </div>
  );
};

export default Donors;
