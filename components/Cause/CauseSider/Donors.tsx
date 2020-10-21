import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "lodash";
import numeral from "numeral";
import InfiniteScroll from "react-infinite-scroll-component";
import { Input, Skeleton, Alert, Typography, Spin, Empty } from "antd";
import { IRootState } from "redux/initialStates";
import getDonors from "redux/actions/cause/donors";
import moreDonors from "redux/actions/cause/moreDonors";
import { CLEAR_SEARCH_DONORS } from "redux/action-types/cause/donors";

import styles from "./Donors.module.scss";

interface Props {
  slug: string;
}

const Donors: React.FC<Props> = ({ slug }) => {
  const limit = 10;
  const dispatch = useDispatch();

  const [page, setPage] = React.useState<number>(2);
  const [search, setSearch] = React.useState<string>("");
  const [donors, setDonors] = React.useState<any[]>([]);
  const [hasMoreDonors, setHasMoreDonors] = React.useState<boolean>(true);

  const {
    data: { search: donorsList },
    loading: { search: loading },
    error: { search: searchError },
    meta: {
      search: { total },
    },
  } = useSelector(({ cause: { donors } }: IRootState) => donors);

  const { data: moreDonorsList, loading: loadingMore } = useSelector(
    ({ cause: { moreDonors } }: IRootState) => moreDonors,
  );

  const searchDonors = (dt: any = null) => {
    getDonors(slug, true, dt ? dt : { search })(dispatch);
  };

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

  React.useEffect(() => {
    const delayTimer = setTimeout(() => {
      if (!isEmpty(search.trim())) return searchDonors();
    }, 1000);

    return () => clearTimeout(delayTimer);
  }, [dispatch, search]);

  const fetchMoreDonors = () => {
    setPage((prev) => prev + 1);
    if (donors.length === total) {
      setHasMoreDonors(false);
      return;
    }

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
        placeholder="Search"
        disabled={loading || searchError}
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
      <div className={styles.donors__content} id="scrollable">
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
              <Empty description="No donors found" />
            ) : (
              <InfiniteScroll
                dataLength={donors.length}
                next={fetchMoreDonors}
                hasMore={hasMoreDonors}
                loader={
                  <span style={{ color: " #219bb2" }}>
                    <Spin />
                    &nbsp; loading
                  </span>
                }
                endMessage={
                  <Alert
                    message="No more donors to load"
                    type="info"
                    showIcon
                    closable
                    banner
                    style={{
                      marginTop: "1rem",
                    }}
                  />
                }
                scrollableTarget="scrollable"
              >
                {donors.map((d, i) => (
                  <div key={i} className={styles.donors__content__donor}>
                    <Typography.Text>{d.user_names}</Typography.Text>
                    <Typography.Text>
                      {numeral(d.amount).format()} RWF
                    </Typography.Text>
                  </div>
                ))}
              </InfiniteScroll>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Donors;
