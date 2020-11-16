import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "redux/initialStates";
import { getAllCauses } from "redux/actions/cause/getAll";
import { getUserCauses } from "redux/actions/cause/getUserCauses";

import { isEmpty, find, upperFirst } from "lodash";

import validator from "validator";

import { Row, Col, Result, Tag } from "antd";

import { SvpType } from "helpers/context";

import Jumbotron from "components/home/Jumbotron";
import Cause from "components/cards/Cause";
import CauseSkeleton from "components/cards/CauseSkeleton";
import Section from "components/home/Section";

import LayoutWrapper from "components/LayoutWrapper";
import { PRIMARY } from "constants/colors";

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
  const dispatch = useDispatch();
  const { asPath, query, pathname, push } = useRouter();
  const [activeFilters, setActiveFilters] = React.useState<string[]>();

  const {
    data,
    /*loading,*/ fetched,
    error,
  } = useSelector(({ cause: { all, user } }: IRootState) =>
    myCauses ? user : all,
  );

  const category_id: any = query.category_id;
  const category: any = find(svpProps?.categories || [], {
    id: validator.isNumeric(`${category_id}`) ? category_id * 1 : category_id,
  });

  useEffect(() => {
    setActiveFilters(getActiveFilters());
  }, [query, asPath, pathname]);

  useEffect(() => {
    if (myCauses) {
      getUserCauses(asPath)(dispatch);
    } else {
      getAllCauses(asPath)(dispatch);
    }
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

  return (
    <LayoutWrapper
      title={`${myCauses ? "Your " : ""}${
        category ? `${category.title} ` : ""
      }Causes`}
      isCategory
      baseUrl={baseUrl}
    >
      <div data-content-padding>
        {!isEmpty(query) && (
          <Row
            align="middle"
            style={{ paddingTop: "1rem", paddingBottom: "2rem" }}
          >
            Active Filters &nbsp;
            {activeFilters?.map((filter, i) => (
              <Tag
                key={`${i}-filter`}
                color={PRIMARY}
                style={{ borderRadius: "10px" }}
                closable
                onClose={() => onTagClose(filter)}
                visible={true}
              >
                {upperFirst(filter)}&nbsp;
              </Tag>
            ))}
          </Row>
        )}
        {myCauses && (
          <Section
            title="Your Causes"
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
                Something went wrong.
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
            subTitle="Sorry, No causes were found"
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
      </div>
      <Jumbotron hideSignedIn />
    </LayoutWrapper>
  );
};

export default AllCauses;
