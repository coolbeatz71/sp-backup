import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "redux/initialStates";
import { getAllCauses } from "redux/actions/cause/getAll";
import { getUserCauses } from "redux/actions/cause/getUserCauses";

import { isEmpty, find, upperFirst } from "lodash";

import validator from "validator";

import { Row, Col, Result, Tag, Pagination, Grid } from "antd";

import { SvpType } from "helpers/context";

import Jumbotron from "components/home/Jumbotron";
import Cause from "components/cards/Cause";
import CauseSkeleton from "components/cards/CauseSkeleton";
import Section from "components/home/Section";

import LayoutWrapper from "components/LayoutWrapper";
import { PRIMARY } from "constants/colors";
import styles from "./causes.module.scss";

interface Props {
  svpProps: SvpType;
  myCauses?: boolean;
  baseUrl?: string;
}

const AllCauses: React.FC<Props> = ({
  svpProps,
  myCauses = false,
  baseUrl = "/causes",
}) => {
  const limit = 12;
  const dispatch = useDispatch();
  const screens = Grid.useBreakpoint();
  const { asPath, query, pathname, push } = useRouter();
  const [activeFilters, setActiveFilters] = React.useState<string[]>();

  const {
    data,
    error,
    fetched,
    meta: { total, page, pages },
  } = useSelector(({ cause: { all, user } }: IRootState) =>
    myCauses ? user : all
  );

  const category_id: any = query.category_id;
  const category: any = find(svpProps?.categories || [], {
    id: validator.isNumeric(`${category_id}`) ? category_id * 1 : category_id,
  });

  useEffect(() => {
    window?.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  useEffect(() => {
    setActiveFilters(getActiveFilters());
  }, [query, asPath, pathname]);

  useEffect(() => {
    myCauses
      ? getUserCauses(asPath)(dispatch, { limit })
      : getAllCauses(asPath)(dispatch, { limit });
  }, [asPath, dispatch]);

  const getActiveFilters = () => {
    const { feed_type, status } = query;
    const feedType = !isEmpty(feed_type)
      ? feed_type?.toString().split(",")
      : [];
    const statuses = !isEmpty(status) ? status?.toString().split(",") : [];
    return [...feedType, ...statuses];
  };

  const onTagClose = (filter: string) => {
    const key = Object.keys(query).find((key) => query[key].includes(filter))!;
    const value = query[key];

    const removeFilter = value
      .toString()
      .replace(filter, "")
      .replace(/,,/g, ",")
      .replace(/^,/g, "")
      .replace(/^,/g, "")
      .replace(/,$/g, "");

    setActiveFilters(getActiveFilters());

    if (isEmpty(removeFilter)) {
      delete query[key];
      push({ pathname, query });
    } else {
      push({
        pathname,
        query: { ...query, [key]: removeFilter },
      });
    }
  };

  const onPageChange = (page: number) => {
    myCauses
      ? getUserCauses(asPath)(dispatch, { limit, page })
      : getAllCauses(asPath)(dispatch, { limit, page });
  };

  const renderPagination = (
    _current: number,
    type: "page" | "prev" | "next" | "jump-prev" | "jump-next",
    originalElement: React.ReactNode
  ) => {
    if (type === "prev" && screens.md) return <a>{t("previous")}</a>;
    if (type === "next" && screens.md) return <a>{t("next")}</a>;

    return originalElement;
  };
  const { t } = useTranslation();

  return (
    <LayoutWrapper
      title={`${myCauses ? "Your " : ""}${
        category ? `${category.title} ` : ""
      }Causes`}
      isCategory
      baseUrl={baseUrl}
    >
      <div data-content-padding>
        {(!isEmpty(query.feed_type) || !isEmpty(query.status)) && (
          <Row
            align="middle"
            style={{ paddingTop: "1rem", paddingBottom: "2rem" }}
          >
            {t("active filters")} &nbsp;
            {activeFilters?.map((filter, i) => (
              <Tag
                key={`${i}-filter`}
                color={PRIMARY}
                style={{ borderRadius: "10px" }}
                closable
                onClose={() => onTagClose(filter)}
                visible={true}
              >
                {upperFirst(t(`${filter}_causes`))}&nbsp;
              </Tag>
            ))}
          </Row>
        )}
        {myCauses && (
          <Section
            title={t("your causes")}
            icon="/images/social-care.svg"
            fetched={true}
            error={null}
            data={[]}
            myCauses
          />
        )}
        {error ? (
          <Result
            status="500"
            title="Oooops!"
            subTitle={
              <div>
                {t("something went wrong")}
                <br />
                {error.message}
              </div>
            }
          />
        ) : !fetched ? (
          <Row gutter={[24, 24]}>
            {[1, 2, 3, 4, 5, 6].map((index: number) => (
              <Col
                key={index}
                xxl={{ span: 6, offset: 0 }}
                lg={{ span: 8, offset: 0 }}
                md={{ span: 12, offset: 0 }}
                sm={{ span: 16, offset: 4 }}
                xs={{ span: 24, offset: 0 }}
              >
                <CauseSkeleton />
              </Col>
            ))}
          </Row>
        ) : isEmpty(data.data) ? (
          <Result
            status="404"
            title="404"
            subTitle={t("no causes were found")}
          />
        ) : (
          <Row data-section-row={data.length} gutter={[24, 48]}>
            {data.data.map((cause: any, index: number) => (
              <Col
                key={index}
                xxl={{ span: 6, offset: 0 }}
                lg={{ span: 8, offset: 0 }}
                md={{ span: 12, offset: 0 }}
                sm={{ span: 16, offset: 4 }}
                xs={{ span: 24, offset: 0 }}
              >
                <Cause cause={cause} />
              </Col>
            ))}
          </Row>
        )}

        {total && pages > 1 && (
          <Row
            align="middle"
            justify="center"
            gutter={[24, 48]}
            data-section-row={true}
            className={styles.causes__pagination}
          >
            <Pagination
              total={total}
              pageSize={limit}
              hideOnSinglePage
              onChange={onPageChange}
              itemRender={renderPagination}
            />
          </Row>
        )}
      </div>
      <Jumbotron hideSignedIn />
    </LayoutWrapper>
  );
};

export default AllCauses;
